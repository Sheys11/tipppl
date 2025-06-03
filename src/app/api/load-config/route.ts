import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/auth";
import { defaultConfig } from "~/lib/config";

let inMemoryConfigStore: Record<number, any> = {}; // shared with save

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.fid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fid = session.user.fid;
  const config = inMemoryConfigStore[fid] || defaultConfig;

  return NextResponse.json(config);
}
