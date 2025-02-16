"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const { data: allPosts } = api.post.getAll.useQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  // DELETE POST MUTATION
  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent Report: {latestPost.name}</p>
      ) : (
        <p>You have no reports yet.</p>
      )}

      {/* CREATE POST FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="mt-4 flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* DISPLAY ALL POSTS */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">All Reports:</h3>
        <ul className="mt-2">
          {allPosts?.length ? (
            allPosts.map((post) => (
              <li
                key={post.id}
                className="text-black-300 flex items-center justify-between truncate"
              >
                <span>{post.name}</span>
                <button
                  onClick={() => deletePost.mutate({ id: post.id })}
                  className="ml-4 text-red-500 hover:text-red-700"
                  disabled={deletePost.isPending}
                >
                  {deletePost.isPending ? "Deleting..." : "❌"}
                </button>
              </li>
            ))
          ) : (
            <p>No reports found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
