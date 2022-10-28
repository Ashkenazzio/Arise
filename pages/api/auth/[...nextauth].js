import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import pool from 'lib/dbConnection';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'login',
      async authorize(credentials) {
        try {
          const enteredEmail = credentials.email;
          const enteredPassword = credentials.password;

          const [existingUser] = await pool.query(
            `SELECT * FROM users WHERE email='${enteredEmail}'`
          );

          pool.end();

          if (existingUser.length === 0) {
            throw Error('No user with this email has been found');
          }

          const passwordsMatch = await bcrypt.compare(
            enteredPassword,
            existingUser[0].password
          );

          if (!passwordsMatch) {
            throw Error('Wrong password - try again!');
          }
          return existingUser[0];
        } catch (error) {
          throw Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.avatar = token.avatar;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
