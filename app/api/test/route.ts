import { NextResponse } from "next/server";

export async function GET() {
  console.log("TEST ENDPOINT: Working!");
  return NextResponse.json({ message: "Test endpoint working" });
}

export async function POST() {
  console.log("TEST ENDPOINT: POST request received");
  return NextResponse.json({ success: true, message: "Test POST working" });
}