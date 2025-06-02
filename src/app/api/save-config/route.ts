import { NextRequest, NextResponse } from "next/server";

let userConfig: any = null; // mock in-memory storage

export async function POST(req: NextRequest) {
  const body = await req.json();
  userConfig = body;
  return NextResponse.json({ status: "success", stored: userConfig });
}
