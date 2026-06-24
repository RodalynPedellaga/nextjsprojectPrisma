import prisma from "../lib/prisma";
import { redirect } from "next/navigation";

async function publishPost(data: FormData) {
  "use server";

  const postId = data.get("postId");
  if (typeof postId !== "string") return;

  await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });

  redirect("/");
}

export default async function DraftsPage() {
  const drafts = await prisma.post.findMany({
    where: { published: false },
    orderBy: { id: "desc" },
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Drafts</h1>
        <p className="mt-2 text-slate-600">
          Publish drafts to make them visible on the Posts page.
        </p>
      </section>

      {drafts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
          No drafts found.
        </div>
      ) : (
        <div className="space-y-6">
          {drafts.map((draft) => (
            <article
              key={draft.id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-950">{draft.title}</h2>
              <p className="mt-4 text-slate-700 whitespace-pre-wrap">
                {draft.content || "No content provided."}
              </p>
              <form action={publishPost} className="mt-6">
                <input type="hidden" name="postId" value={draft.id} />
                <button
                  type="submit"
                  className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Publish
                </button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
