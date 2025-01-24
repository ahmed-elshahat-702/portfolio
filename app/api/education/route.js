import { connectToDatabase } from "@/lib/db";
import Education from "@/lib/models/Education";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectToDatabase();

  try {
    const educations = await Education.find();
    return NextResponse.json(educations);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching education records",
      error: error.message,
    });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const newEducation = new Education(await request.json());
    await newEducation.save();
    return NextResponse.json(newEducation);
  } catch (error) {
    return NextResponse.json({
      message: "Error creating education record",
      error: error.message,
    });
  }
}

export async function PUT(request) {
  await connectToDatabase();

  try {
    const { id, ...updateData } = await request.json();
    const updatedEducation = await Education.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return NextResponse.json(updatedEducation);
  } catch (error) {
    return NextResponse.json({
      message: "Error updating education record",
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  await connectToDatabase();

  try {
    const { id } = await request.json();
    await Education.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Education record deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting education record",
      error: error.message,
    });
  }
}
