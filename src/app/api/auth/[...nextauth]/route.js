import { dbConnect } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
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
