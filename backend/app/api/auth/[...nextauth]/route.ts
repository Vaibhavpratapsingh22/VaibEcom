import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/lib/monogdb";

const adminEmail = "vaibhav.nextpage@gmail.com";
const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (user && user.email.includes(adminEmail)) {
        return session;
      }
      throw new Error("Access Denied");
    },
  },
});

export { handler as GET, handler as POST };
