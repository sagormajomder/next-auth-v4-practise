import { dbConnect } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// nextauth store only name, email, image property in session

export const authOptions = {
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await dbConnect('users').findOne({ email });

        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (isPasswordMatch) return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });
      const payload = {
        ...user,
        provider: account.provider,
        providerId: account.providerAccountId,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      if (!user?.email) {
        return false;
      }

      const isExist = await dbConnect('users').findOne({ email: user?.email });

      if (!isExist) {
        const result = await dbConnect('users').insertOne(payload);
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return url || baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
