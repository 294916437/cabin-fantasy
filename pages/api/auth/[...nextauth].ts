import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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
  // callbacks: {
  //   async signIn({ user, account }) {
  //     if (account?.provider === "github") {
  //       await upsertAccount({
  //         userId: user.id,
  //         type: account.type,
  //         provider: account.provider,
  //         providerAccountId: account.providerAccountId,
  //         access_token: account.access_token,
  //         refresh_token: account.refresh_token,
  //         expires_at: account.expires_at,
  //         token_type: account.token_type,
  //         scope: account.scope,
  //         id_token: account.id_token,
  //         session_state: account.session_state,
  //       });
  //     }
  //     return true;
  //   },
  //   async session({ session, token }) {
  //     session.user = {
  //       ...session.user,
  //       ...token,
  //     };
  //     return session;
  //   },
  //   async jwt({ token, user, account }) {
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  // },
  pages: {
    signIn: "/",
  },
  // process.env.NODE_ENV === "development"
  debug: true,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
