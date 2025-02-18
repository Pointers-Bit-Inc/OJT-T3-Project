"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-black">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-blue-600">JTechShafey</span>
        </h1>
        <button
          className="mt-16 rounded-xl bg-blue-600 px-6 py-3 text-lg text-white transition-all duration-300 hover:bg-blue-700 active:scale-95"
          onClick={() => router.push("/auth")}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
