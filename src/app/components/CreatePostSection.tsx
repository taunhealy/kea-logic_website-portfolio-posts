import Link from "next/link";
import { Button } from "./ui/button";
import PortfolioPostForm from "./PortfolioPostForm";
import BlogPostForm from "./BlogPostForm";
import { createPost } from "@/server/actions";

interface CreatePostSectionProps {
  activeTab: string;
}

export default function CreatePostSection({
  activeTab,
}: CreatePostSectionProps) {
  return (
    <section className="border-1 mx-auto my-6 w-[60vw] rounded-md border border-black p-4">
      <div className="mb-4 grid w-full grid-cols-2">
        <Button asChild>
          <Link href="?tab=portfolio">Create Portfolio Post</Link>
        </Button>
        <Button asChild>
          <Link href="?tab=blog">Create Blog Post</Link>
        </Button>
      </div>
      {activeTab === "portfolio" ? (
        // @ts-ignore
        <PortfolioPostForm createPost={createPost} />
      ) : (
        // @ts-ignore
        <BlogPostForm createPost={createPost} />
      )}
    </section>
  );
}
