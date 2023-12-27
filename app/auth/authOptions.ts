import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/client';
import { NextAuthOptions } from 'next-auth';


const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({url, baseUrl}){
      return url.startsWith(baseUrl)
        ? url
        : `${baseUrl}/api/auth/callback/google`; // Ensure this matches your Google Cloud Console redirect URI
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;