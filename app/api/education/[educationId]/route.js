import { connectToDatabase } from "@/lib/db";
import Education from "@/lib/models/Education";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const { educationId } = params;

    const { ...updateData } = await request.json();
    const updatedEducation = await Education.findByIdAndUpdate(
      educationId,
      updateData,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedEducation);
  } catch (error) {
    return NextResponse.json({
      message: "Error updating education",
      error: error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const { educationId } = params;
    await Education.findByIdAndDelete(educationId);
    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
