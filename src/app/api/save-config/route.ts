import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/auth";

let inMemoryConfigStore: Record<number, any> = {}; // key = FID

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.fid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fid = session.user.fid;
  const body = await req.json();

  inMemoryConfigStore[fid] = body;

  return NextResponse.json({ status: "success", fid });
}
