import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch("http://localhost:8000/instructor/dashboard", {
      headers: {
        Authorization: request.headers.get("Authorization") || "",
        Cookie: request.headers.get("Cookie") || "",
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
