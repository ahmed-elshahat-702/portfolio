import { connectToDatabase } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await connectToDatabase();

  try {
    const { projectId } = params;

    const { ...updateData } = await request.json();
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({
      message: "Error updating project",
      error: error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const { projectId } = params;
    await Project.findByIdAndDelete(projectId);
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
