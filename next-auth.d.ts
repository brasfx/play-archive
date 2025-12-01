import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      provider?: string;
    } & DefaultSession['user'];
  }
}
