import { connectToDatabase } from "@/lib/db";
import Skill from "@/lib/models/Skill";
import { NextResponse } from "next/server";

// export async function PUT(request) {
//   await connectToDatabase();

//   try {
//     const { id, ...updateData } = await request.json();
//     const updatedSkill = await Skill.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });
//     return NextResponse.json(updatedSkill);
//   } catch (error) {
//     return NextResponse.json({
//       message: "Error updating skill",
//       error: error.message,
//     });
//   }
// }

export async function DELETE(request, { params }) {
  await connectToDatabase();

  try {
    const { skillId } = params;
    await Skill.findByIdAndDelete(skillId);
    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
