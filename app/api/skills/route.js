import { connectToDatabase } from "@/lib/db";
import Skill from "@/lib/models/Skill";
import { NextResponse } from "next/server";

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
