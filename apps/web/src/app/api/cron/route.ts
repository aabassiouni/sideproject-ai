import { db } from "@/lib/db/db";
import { sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("running cron job");
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  await db.execute(sql`SELECT version();`);

  return Response.json({ message: "success" });
}
