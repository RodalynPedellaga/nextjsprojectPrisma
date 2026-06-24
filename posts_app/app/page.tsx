import prisma from "./lib/prisma";
import { redirect } from "next/navigation";

async function deletePost(data: FormData) {
  "use server";

  const postId = data.get("postId");
  if (typeof postId !== "string") return;

  await prisma.post.delete({
    where: { id: postId },
  });

  redirect("/");
}

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-slate-950">Posts</h1>
          <p className="mt-2 text-slate-600">
            Browse published posts. If no posts are available yet, create a draft first and publish it from the Drafts page.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
          No published posts found.
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-950">{post.title}</h2>
              <p className="mt-4 text-slate-700 whitespace-pre-wrap">
                {post.content || "No content provided."}
              </p>
              <form action={deletePost} className="mt-6">
                <input type="hidden" name="postId" value={post.id} />
                <button
                  type="submit"
                  className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Delete
                </button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
