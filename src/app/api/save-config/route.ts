import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/auth";
import { supabase } from "~/lib/supabase";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.fid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fid = session.user.fid;
  const body = await req.json();

  const { error } = await supabase
    .from("configs")
    .upsert({ fid, config: body });

  if (error) {
    console.error("Save failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: "success", fid });
}
