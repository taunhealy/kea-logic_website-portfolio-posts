import React from "react";
import Link from "next/link";
import Tag from "./Tag";

export type PostCardProps = {
  post: {
    id: string;
    title: string;
    slug: string;
    subheading: string;
    content: string;
    tags: string[];
    published: boolean;
    date: Date;
  };
};

type Post = {
  post: {
    id: string;
    title: string;
    slug: string;
    subheading: string;
    content: string;
    tags: string[];
    published: boolean;
    date: Date;
    author: User;
    authorId: string;
    image: string;
  };
};

/**
 * Represents a user, typically the author of a post.
 */
type User = {
  id: string;
  email: string;
  name: string;
  date: Date;
};

/**
 * PostCard Component
 *
 * Renders a card displaying summary information for a blog post.
 *
 * @param {Post} props - The props object containing the post data.
 * @returns {JSX.Element} A link wrapping the post card content.
 */

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link key={post.id} href={`/posts/${post.slug}`}>
      <section className="cursor-pointer">
        <div className="mt-8">
          <div className="relative">
            <div className="absolute right-2 top-4 overflow-hidden">
              {post.tags.map((tag: string, i) => {
                return <Tag key={i} tag={tag} />;
              })}
            </div>
          </div>
          <div className="font-lora text-date-color mt-3 text-xs">{`${post.date.getFullYear()}.${(post.date.getMonth() + 1).toString().padStart(2, "0")}.${post.date.getDate()}`}</div>
          <h2 className="font-lora mt-6 text-xl font-semibold">{post.title}</h2>
        </div>
      </section>
    </Link>
  );
};

export default PostCard;
