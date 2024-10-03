import clientPromise from "../../../lib/mongoConnect";
import mongooseConnect from "../../../lib/mongoose";
// import {UserInfo} from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import User from '../../../models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        console.log('Email:', email);

        if (!email || !password) {
          throw new Error('Missing email or password');
        }

        try {
          console.log("mongooseConnect function:", mongooseConnect);
          await mongooseConnect();
          const user = await User.findOne({ email });
          console.log("user:" + user)
          if (!user) {
            throw new Error('No user found with this email');
          }

          const passwordOk = bcrypt.compareSync(password, user.password);
          console.log("password:" + passwordOk);
          if (!passwordOk) {
            throw new Error('Invalid password');
          }

          return user;
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Authorization failed');
        }
      }

    })
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

export default NextAuth(authOptions);