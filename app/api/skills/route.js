import Skill from "@/lib/models/Skill";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(request) {
  await connectToDatabase();

  try {
    const skills = await Skill.find();
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching skills",
      error: error.message,
    });
  }
}

export async function POST(request) {
  await connectToDatabase();

  try {
    const newSkill = new Skill(await request.json());
    await newSkill.save();
    return NextResponse.json(newSkill);
  } catch (error) {
    return NextResponse.json({
      message: "Error creating skill",
      error: error.message,
    });
  }
}

export async function PUT(request) {
  await connectToDatabase();

  try {
    const { id, ...updateData } = await request.json();
    const updatedSkill = await Skill.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return NextResponse.json(updatedSkill);
  } catch (error) {
    return NextResponse.json({
      message: "Error updating skill",
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  await connectToDatabase();

  try {
    const { id } = await request.json();
    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting skill",
      error: error.message,
    });
  }
}
