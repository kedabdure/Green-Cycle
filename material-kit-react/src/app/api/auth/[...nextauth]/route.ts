import Admin from '@/models/Admin';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import client from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';

const checkAdminUser = async (email: string) => {
  const adminEmail = process.env.SUPER_ADMIN_EMAIL;
  return email === adminEmail;
};

const options = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate credentials
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required!');
        }

        const { email, password } = credentials;

        await mongooseConnect();

        const adminName = process.env.SUPER_ADMIN_NAME;
        const adminEmail = process.env.SUPER_ADMIN_EMAIL;
        const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

        let existingAdmin = await Admin.findOne({ email: adminEmail });
        if (!existingAdmin) {
          existingAdmin = await Admin.create({
            name: adminName,
            email: adminEmail,
            password: adminPassword,
            role: 'super_admin',
          });
          console.log('Super admin created successfully!');
        }

        const admin = (await Admin.findOne({ email })) as {
          _id: string;
          name: string;
          email: string;
          password: string;
          image?: string;
          role: string;
        };
        if (!admin) {
          throw new Error('Admin not found.');
        }

        const isPasswordValid = bcrypt.compareSync(password, admin.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password.');
        }

        const isAdmin = await checkAdminUser(email);
        if (!isAdmin) {
          throw new Error('You are not an admin!');
        }

        return {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          image: admin.image,
          role: admin.role,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/error',
  },
callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role;
        console.log('JWT Callback - Updated Token with User Info:', token);
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      console.log('Session Callback - Token:', token);

      session.id = token.id;
      session.name = token.name;
      session.email = token.email;
      session.image = token.image;
      session.role = token.role;

      console.log('Session Callback - Session:', session); // Debugging
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export const GET = NextAuth(options);
export const POST = NextAuth(options);