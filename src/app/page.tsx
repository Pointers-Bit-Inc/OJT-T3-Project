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
          className="rounded-xl bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700"
          onClick={() => router.push("/auth/loginform")} // ✅ Corrected path
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
