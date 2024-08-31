import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

type PortfolioPostFormProps = {
  userSelectedImages: { imageURL: string; imageName: string }[];
  createPost: (data: FormData) => Promise<void>;
};

export default function PortfolioPostForm({
  createPost,
}: PortfolioPostFormProps) {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Portfolio project title"
          required
        />
      </div>
      {/* Add other fields specific to portfolio posts */}

      <Button formAction={createPost} className="mt-8 w-full">
        Create Portfolio Post
      </Button>
    </form>
  );
}
