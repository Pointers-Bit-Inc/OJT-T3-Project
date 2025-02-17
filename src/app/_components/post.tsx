"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const { data: allPosts } = api.post.getAll.useQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults } = api.post.search.useQuery(
    { query: searchQuery },
    { enabled: !!searchQuery }, // Only run when query is not empty
  );

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

  // UPDATE POST MUTATION
  const updatePost = api.post.update.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setEditMode(null); // Exit edit mode after update
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
                {editMode === post.id ? (
                  // EDIT MODE: Show input field
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="rounded border px-2 py-1 text-black"
                  />
                ) : (
                  // NORMAL MODE: Show post name
                  <span>{post.name}</span>
                )}

                <div className="flex gap-2">
                  {editMode === post.id ? (
                    // SHOW SAVE BUTTON IN EDIT MODE
                    <button
                      onClick={() =>
                        updatePost.mutate({ id: post.id, name: editName })
                      }
                      className="text-blue-500 hover:text-blue-700"
                      disabled={updatePost.isPending}
                    >
                      {updatePost.isPending ? "Saving..." : "💾"}
                    </button>
                  ) : (
                    // SHOW EDIT BUTTON IN NORMAL MODE
                    <button
                      onClick={() => {
                        setEditMode(post.id);
                        setEditName(post.name);
                      }}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      ✏️
                    </button>
                  )}

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deletePost.mutate({ id: post.id })}
                    className="text-red-500 hover:text-red-700"
                    disabled={deletePost.isPending}
                  >
                    {deletePost.isPending ? "Deleting..." : "❌"}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No reports found.</p>
          )}
        </ul>
      </div>
      <input
        type="text"
        placeholder="Search reports..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded border px-4 py-2 text-black"
      />

      {/* DISPLAY SEARCH RESULTS */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Search Results:</h3>
        <ul className="mt-2">
          {searchQuery && searchResults?.length ? (
            searchResults.map((post) => (
              <li key={post.id} className="text-black-300 truncate">
                {post.name}
              </li>
            ))
          ) : searchQuery ? (
            <p>No results found.</p>
          ) : (
            <p>Type to search...</p>
          )}
        </ul>
      </div>
    </div>
  );
}
