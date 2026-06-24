import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";

async function createPost(data: FormData) {
  "use server";

  const title = data.get("title");
  const content = data.get("content");

  if (typeof title !== "string" || title.trim() === "") return;

  await prisma.post.create({
    data: {
      title: title.trim(),
      content: typeof content === "string" ? content.trim() : "",
      published: false,
    },
  });

  redirect("/drafts");
}

export default function CreatePostPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Create Post</h1>
        <p className="mt-2 text-slate-600">
          Add a new post draft and publish it later from the Drafts page.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <form action={createPost} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              placeholder="Working with Databases in Next.js Using Prisma"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-slate-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={10}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
              placeholder="Next.js is a database-agnostic web-based framework..."
            />
          </div>

          <button
            type="submit"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Add Post
          </button>
        </form>
      </section>
    </div>
  );
}
