"use client";

import { useState } from "react";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Register attempted with", { username, email, password });

    setTimeout(() => {
      alert("Registration successful! Please login.");
      onSwitch();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded-md"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded-md"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded-md"
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2 border rounded-md"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Register
      </button>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-600 underline">
          Login
        </button>
      </p>
    </form>
  );
}
