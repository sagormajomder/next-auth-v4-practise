import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const userList = [
  {
    username: 'hablu',
    password: '123',
  },
  {
    username: 'bablu',
    password: '456',
  },
  {
    username: 'jablu',
    password: '789',
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        secretCode: {
          label: 'Secret Code',
          type: 'number',
          placeholder: 'Enter Secret Code',
        },
      },
      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;

        const user = userList.find(u => u.username === username);

        if (user) {
          const isPasswordMatch = user.password === password;

          if (isPasswordMatch) return user;
        }

        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
