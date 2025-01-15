import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma-client";

export async function GET() {
    const users = await prisma.user.findMany();
    
  return NextResponse.json({
    users: users
  });
}

// export function POST() {
//   return {
//     status: 200,
//     body: {
//       message: "Hello from the API!",
//     },
//   };
// }