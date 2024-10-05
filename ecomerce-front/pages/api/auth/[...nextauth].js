import clientPromise from "../../../lib/mongoConnect";
import { mongooseConnect } from "../../../lib/mongoose";
// import {UserInfo} from "@/models/UserInfo";
import bcrypt from "bcrypt";
import User from '../../../models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

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

      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        // console.log('Received Credentials:', { email, password });

        await mongooseConnect();

        const user = await User.findOne({ email });
        // console.log("Found User:", user);

        if (!user) {
          console.log('No user found with this email');
          throw new Error('No user found with this email');
        }

        const passwordOk = bcrypt.compareSync(password, user.password);
        // console.log('Password Match:', passwordOk);

        if (passwordOk) {
          return user;
        } else {
          // console.log('Invalid password');
          throw new Error('Invalid password');
        }
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    }
  },
  debug: true,
};

export default NextAuth(authOptions);
