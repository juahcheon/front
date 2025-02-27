import NextAuth, { DefaultSession } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: DefaultSession["user"];
    }

    interface JWT {
        accessToken?: string; 
    }
}

export default NextAuth({
    providers: [
        KakaoProvider({
            clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
        }),
    ],
});