import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(request) {
  await connectToDatabase();

  try {
    const Projects = await Project.find();
    return NextResponse.json(Projects);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const newProject = new Project(await request.json());
    await newProject.save();
    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json({
      message: "Error creating project",
      error: error.message,
    });
  }
}

export async function PUT(request) {
  await connectToDatabase();

  try {
    const { id, ...updateData } = await request.json();
    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({
      message: "Error updating project",
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  await connectToDatabase();

  try {
    const { id } = await request.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting project",
      error: error.message,
    });
  }
}
