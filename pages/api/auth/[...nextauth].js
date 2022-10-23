import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import pool from 'lib/db-connection';
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

          if (existingUser.length === 0) {
            throw new Error('no user found');
          }

          const passwordsMatch = await bcrypt.compare(
            enteredPassword,
            existingUser[0].password
          );

          if (!passwordsMatch) {
            throw new Error('Could not log in - passwords are not equal!');
          }

          pool.end();
          console.log('User is authenticated!');
          return existingUser[0];
        } catch (error) {
          throw new Error(error);
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
