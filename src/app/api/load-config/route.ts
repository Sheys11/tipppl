import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/auth";
import { supabase } from "~/lib/supabase";
import { defaultConfig } from "~/lib/config";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.fid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fid = session.user.fid;

  const { data, error } = await supabase
    .from("configs")
    .select("config")
    .eq("fid", fid)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Load failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.config || defaultConfig);
}
