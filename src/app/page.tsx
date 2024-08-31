import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const portfolioItems = await prisma.portfolioItem.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">My Blog & Portfolio</h1>
      </header>
      <main className="container mx-auto p-6">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Featured Portfolio Items
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {portfolioItems.map((item) => (
              <div key={item.id} className="rounded-lg bg-white p-4 shadow-md">
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
