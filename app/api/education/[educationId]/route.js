import { connectToDatabase } from "@/lib/db";
import Education from "@/lib/models/Education";
import { NextResponse } from "next/server";

// export async function PUT(request) {
//   await connectToDatabase();

//   try {
//     const { id, ...updateData } = await request.json();
//     const updatedEducation = await Education.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });
//     return NextResponse.json(updatedEducation);
//   } catch (error) {
//     return NextResponse.json({
//       message: "Error updating Education",
//       error: error.message,
//     });
//   }
// }

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
