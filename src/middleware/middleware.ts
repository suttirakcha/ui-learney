// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// function decodeJWT(token: string) {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
//       .join(""),
//   );

//   return JSON.parse(jsonPayload);
// }

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   try {
//     const payload = decodeJWT(token); // ⭐ ใช้ฟังก์ชันใหม่

//     if (payload.role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   } catch (err) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
