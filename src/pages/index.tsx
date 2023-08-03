import { AuthBtn } from "@/components/AuthBtn/AuthBtn";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ApplyIT</title>
        <meta name="description" content="Job applications in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen max-h-screen flex-col items-center justify-center gap-10 bg-primaryBg p-10">
        <h1 className="text-center text-4xl text-white">Welcome to ApplyIT!</h1>
        <p className="text-center text-xl">
          A perfect place to hold your job applications and track your progress!
        </p>
        <div className="flex flex-col items-center gap-3">
          <span className="text-center text-xl">
            If you want to start, sign in clicking button below
          </span>
          <AuthBtn provider="google" />
        </div>
      </main>
    </>
  );
}
