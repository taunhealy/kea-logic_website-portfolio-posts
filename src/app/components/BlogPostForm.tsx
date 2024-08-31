import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { createPost } from "@/server/actions";

export default function BlogPostForm() {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Blog post title"
          required
        />
      </div>
      {/* Add other fields specific to blog posts */}
      <div className="grid gap-2">
        <Label htmlFor="content">Content</Label>
        <textarea
          id="content"
          name="content"
          placeholder="Enter your blog post content here"
          required
          className="border-1 h-32 w-full border border-black p-2"
        />
      </div>
      <Button formAction={createPost} className="mt-8 w-full">
        Create Blog Post
      </Button>
    </form>
  );
}
