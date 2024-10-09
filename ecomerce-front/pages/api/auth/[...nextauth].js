import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongoConnect";
import bcrypt from "bcrypt";
import User from '../../../models/User';
import { mongooseConnect } from "../../../lib/mongoose";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        await mongooseConnect();
        const user = await User.findOne({ email });
        if (!user) {
          console.log('No user found with this email');
          throw new Error('No user found with this email');
        }
        if (!user.password || !bcrypt.compareSync(password, user.password)) {
          throw new Error('Invalid password');
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      } else {
        await mongooseConnect();
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.image = dbUser.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      return session;
    }
  },
  events: {
    async updateUser({ user }) {
      console.log("User was updated:", user);

      await updateUserToken(user._id, user.email, user.name, user.image);
    },
  },
};

async function updateUserToken(userId, email, name, image) {
  await mongooseConnect();
  const user = await User.findById(userId);

  if (user) {
    user.email = email;
    user.name = name;
    user.image = image;
    await user.save();

    console.log(`Token and session updated for user: ${user.name}`);
  }
};

export default NextAuth(authOptions);
