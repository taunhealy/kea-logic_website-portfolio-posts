import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/admin/posts"
          className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <h2 className="mb-2 text-xl font-semibold">Manage Blog Posts</h2>
          <p>Create, edit, and delete blog posts</p>
        </Link>
        <Link
          href="/admin/portfolio"
          className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <h2 className="mb-2 text-xl font-semibold">Manage Portfolio</h2>
          <p>Add, update, and remove portfolio items</p>
        </Link>
      </div>
    </div>
  );
}
