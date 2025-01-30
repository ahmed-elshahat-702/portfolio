import { connectToDatabase } from "@/lib/db";
import UserInfo from "@/lib/models/UserInfo";
import { NextResponse } from "next/server";

// Add CORS headers configuration
const setCORSHeaders = (response) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
};

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
    const { data } = await request.json();
    const { id, ...updateData } = data;

    const updatedUserInfo = await UserInfo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUserInfo) {
      return setCORSHeaders(
        NextResponse.json({ message: "User info not found" }, { status: 404 })
      );
    }

    return setCORSHeaders(NextResponse.json(updatedUserInfo));
  } catch (error) {
    return NextResponse.json({
      message: "Error updating user info",
      error: error.message,
    });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
