import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, image } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
