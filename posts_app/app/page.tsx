import prisma from "./lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
  });

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Posts</h1>
        <p className="mt-2 text-slate-600">
          Browse published posts. If no posts are available yet, create a draft first and publish it from the Drafts page.
        </p>
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
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-950">{post.title}</h2>
              <p className="mt-4 text-slate-700 whitespace-pre-wrap">
                {post.content || "No content provided."}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
