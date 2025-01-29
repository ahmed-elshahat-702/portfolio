import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
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
    const formData = await request.formData();

    // Convert FormData to object
    const projectData = {
      name: formData.get("name"),
      description: formData.get("description"),
      link: formData.get("link"),
      image: formData.get("image"),
    };

    // Create new project
    const newProject = new Project(projectData);
    const savedProject = await newProject.save();

    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
