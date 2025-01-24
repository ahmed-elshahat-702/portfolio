import Experience from "@/lib/models/Experience";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(request) {
  await connectToDatabase();

  try {
    const experiences = await Experience.find();
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching experiences",
      error: error.message,
    });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const newExperience = new Experience(await request.json());
    await newExperience.save();
    return NextResponse.json(newExperience);
  } catch (error) {
    return NextResponse.json({
      message: "Error creating experience",
      error: error.message,
    });
  }
}

export async function PUT(request) {
  await connectToDatabase();

  try {
    const { id, ...updateData } = await request.json();
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedExperience);
  } catch (error) {
    return NextResponse.json({
      message: "Error updating experience",
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  await connectToDatabase();

  try {
    const { id } = await request.json();
    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting experience",
      error: error.message,
    });
  }
}
