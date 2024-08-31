import Footer from "../components/Footer";
import HeroContent from "../components/HeroContent";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import type { PostCardProps } from "../components/PostCard";
import prisma from "@/lib/db";
import Link from "next/link";

type Props = {
  searchParams: { tagFilter: string };
};

const availableTags = ["nature", "adventure", "beach", "city", "culture"];

const PostsPage = async ({ searchParams: { tagFilter } }: Props) => {
  const posts = await prisma.post.findMany({
    include: { user: true },
  });

  const postCount = await prisma.post.count();

  const filteredPosts = tagFilter
    ? posts.filter((post) => post.tags.includes(tagFilter))
    : posts;

  return (
    <main>
      <section className="bg-hero-bg relative h-[65vh] w-screen min-w-full overflow-hidden bg-center object-cover md:h-[70vh]">
        <Navbar />
        <HeroContent
          postTitle="Exploring the Unseen Corners of the World."
          subheading="A voyage through hidden gems and cultural marvels, where every destination tells a story."
          contentClassName="bottom-[10%] w-1/2 md:w-1/2 lg:w-1/3 px-[20px] md:px-[70px]"
          titleClassName="text-2xl md:text-4xl my-6 mb-2"
          textClassName="font-bold text-sm md:text-base"
          subheadingClassName="text-sm md:text-base"
        />
      </section>

      <section className="my-16 w-screen px-[20px] md:px-[70px]">
        <h1 className="md:mt-18 font-lora mt-12 text-xl md:text-2xl">
          Posts ({postCount})
        </h1>
        <div>
          <Link
            href="/posts"
            className="font-lora mr-2 text-sm font-bold underline-offset-2 hover:underline"
          >
            All
          </Link>
          {availableTags.map((tag, i) => (
            <Link
              key={i}
              href={`/posts?tagFilter=${tag}`}
              className="font-lora mr-2 text-sm font-bold underline-offset-2 hover:underline"
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
          {filteredPosts.map((post) => (
            <PostCard 
              key={post.id} 
              post={{
                ...post,
                slug: post.id, // Assuming id can be used as slug
                subheading: post.excerpt,
                published: true, // Or use a condition if you have this information
                date: post.createdAt,
                tags: Array.isArray(post.tags) ? post.tags : [post.tags]
              }}
            />
          ))}
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default PostsPage;
