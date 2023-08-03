import { AuthBtn } from "@/components/AuthBtn/AuthBtn";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Apply</title>
        <meta name="description" content="Job applications in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen max-h-screen flex-col items-center justify-center gap-10 bg-primaryBg">
        <span className="text-white">Hello there</span>
        <span>Sign in with google</span>
        <AuthBtn provider="google" />
      </main>
    </>
  );
}
