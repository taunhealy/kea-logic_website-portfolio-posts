import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Header from "../components/Header";
import CreatePostSection from "../components/CreatePostSection";
import ExistingPostsSection from "../components/ExistingPostsSection";

async function getPageData() {
  const session = await getServerSession();
  if (!session) {
    return { redirect: { destination: "/admin", permanent: false } };
  }
  const posts = await prisma.post.findMany({
    where: { userId: session.user.email ?? undefined },
  });
  return { session, posts };
}

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const { session, posts, redirect } = await getPageData();
  if (redirect) return redirect;

  const activeTab = searchParams.tab || "portfolio";

  return (
    <main className="w-screen">
      <Header session={session} />
      <CreatePostSection activeTab={activeTab} />
      <ExistingPostsSection posts={posts} />
    </main>
  );
}
