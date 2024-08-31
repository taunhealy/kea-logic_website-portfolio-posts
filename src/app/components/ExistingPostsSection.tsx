import PostsTable from "./PostsTable";
import { type Post } from "@prisma/client";

interface ExistingPostsSectionProps {
  posts: Post[];
}

export default function ExistingPostsSection({
  posts,
}: ExistingPostsSectionProps) {
  return (
    <main className="flex w-full flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="my-4 text-lg font-semibold md:text-2xl">Existing Posts</h1>
      <div className="rounded-lg border shadow-sm">
        <PostsTable posts={posts} />
      </div>
    </main>
  );
}
