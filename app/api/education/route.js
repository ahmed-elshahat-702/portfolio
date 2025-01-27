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
