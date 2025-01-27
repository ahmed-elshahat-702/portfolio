import { connectToDatabase } from "@/lib/db";
import Experience from "@/lib/models/Experience";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const { experienceId } = params;

    const { ...updateData } = await request.json();
    const updatedExperience = await Experience.findByIdAndUpdate(
      experienceId,
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

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const { experienceId } = params;
    await Experience.findByIdAndDelete(experienceId);
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
