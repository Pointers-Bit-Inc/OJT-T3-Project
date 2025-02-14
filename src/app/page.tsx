"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-blue-600">JTechSpofy</span>
        </h1>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700"
          onClick={() => router.push("/auth")}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
