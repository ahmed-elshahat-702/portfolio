import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Missing credentials");
          }
          if (
            !process.env.DASHBOARD_USERNAME ||
            !process.env.DASHBOARD_PASSWORD
          ) {
            throw new Error("Missing environment variables");
          }
          if (
            credentials.username === process.env.DASHBOARD_USERNAME &&
            credentials.password === process.env.DASHBOARD_PASSWORD
          ) {
            return { id: 1, name: "Bondok" };
          }
          return null;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/signin",
  },
});

export { handler as GET, handler as POST };
