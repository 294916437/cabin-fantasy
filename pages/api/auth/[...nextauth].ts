import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import cors, { runMiddleware } from "@/lib/cors";
import { NextApiRequest, NextApiResponse } from "next";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 初次登录时，将用户信息添加到 token 中
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // 将 token 中的信息合并到 session.user 中
      session.user = {
        ...session.user,
        email: token.email,
        name: token.name,
      };
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "github") {
        return false;
      }
      try {
        return await prisma.$transaction(async (prisma) => {
          let existingUser = await prisma.user.findUnique({
            where: { email: user?.email as string },
          });

          if (!existingUser) {
            // 如果用户不存在，则创建新用户
            existingUser = await prisma.user.create({
              data: {
                email: user?.email,
                name: user?.name,
                image: user?.image,
                emailVerified: new Date(),
              },
            });
          }

          // 检查账户是否已经存在
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account?.provider as string,
                providerAccountId: account?.providerAccountId as string,
              },
            },
          });

          if (!existingAccount) {
            // 如果账户不存在，则创建新账户并关联到用户
            await prisma.account.create({
              data: {
                userId: existingUser?.id,
                type: account?.type as string,
                provider: account?.provider as string,
                providerAccountId: account?.providerAccountId as string,
                access_token: account?.access_token as string,
                token_type: account?.token_type as string,
                scope: account?.scope as string,
              },
            });
          }

          return true;
        });
      } catch (error: any) {
        console.log("🚀 ~ file: [...nextauth].ts ~ signIn ~ error", error);
        return false;
      }
    },

    //第三方登录的回调URL
    async redirect({ url, baseUrl }) {
      // 处理重定向逻辑
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NEXTAUTH_DEBUG === "true",
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //添加跨域中间件
  await runMiddleware(req, res, cors);

  return NextAuth(req, res, authOptions);
}
