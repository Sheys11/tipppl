import { NextResponse } from "next/server";
import { defaultConfig } from "@/lib/config";

let userConfig: any = null; // shared with save-config

export async function GET() {
  return NextResponse.json(userConfig ?? defaultConfig);
}
