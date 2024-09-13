'use server';
import prisma from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("🚀 ~ file: getCurrentUser.ts:8 ~ getSession ~ error:", error);
    return null;
  }
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.log("🚀 ~ file: getCurrentUser.ts:33 ~ getCurrentUser ~ error:", error);
    return null;
  }
}
