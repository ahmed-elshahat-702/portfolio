import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import UserInfo from "@/lib/models/UserInfo";

export async function GET(request) {
  await connectToDatabase();

  try {
    const userInfo = await UserInfo.find();
    return NextResponse.json(userInfo);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching user info",
      error: error.message,
    });
  }
}

export async function PUT(request) {
  await connectToDatabase();

  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const updatedUserInfo = await UserInfo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUserInfo) {
      return NextResponse.json({
        message: "User info not found",
      });
    }

    return NextResponse.json({
      message: "User info updated successfully",
      data: updatedUserInfo,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating user info",
      error: error.message,
    });
  }
}
