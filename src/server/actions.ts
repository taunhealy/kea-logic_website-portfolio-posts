"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";

// Create a new post
export const createPost = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const slug =
    (formData.get("slug") as string) || title.toLowerCase().replace(/ /g, "-");

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt: description, // Add this line
      tags: "",
      user: { connect: { id: session.user.id } }, // Add this line
    },
  });

  revalidatePath("/");
  return { success: true };
};

// Update an existing post
export const updatePost = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const slug =
    (formData.get("slug") as string) || title.toLowerCase().replace(/ /g, "-");

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
    },
  });

  revalidatePath("/");
  return { success: true };
};

// Delete a post
export const deletePost = async (id: string) => {
  await prisma.post.delete({ where: { id } });

  revalidatePath("/");
  return { success: true };
};

// Create a new portfolio item
export const createPortfolioItem = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectUrl = formData.get("projectUrl") as string;

  await prisma.portfolioItem.create({
    data: {
      title,
      description,
      projectUrl,
      user: { connect: { id: session.user.id } },
    },
  });

  revalidatePath("/");
  return { success: true };
};

// Update an existing portfolio item
export const updatePortfolioItem = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectUrl = formData.get("projectUrl") as string;

  await prisma.portfolioItem.update({
    where: { id },
    data: {
      title,
      description,
      projectUrl,
    },
  });

  revalidatePath("/");
  return { success: true };
};

// Delete a portfolio item
export const deletePortfolioItem = async (id: string) => {
  await prisma.portfolioItem.delete({ where: { id } });

  revalidatePath("/");
  return { success: true };
};

// Admin login
const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const adminLogin = async (formData: FormData) => {
  const result = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { error: result.error.issues[0]?.message };
  }

  const { username, password } = result.data;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      // Create the first user as admin if no users exist
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          isAdmin: true,
          email: `${username}@example.com`, // Add a default email or get it from formData
        },
      });

      // Set JWT token in an HTTP-only cookie
      await setAuthCookie(newUser.id);
      return redirect("/admin/dashboard");
    }

    // Check existing user credentials
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      if (user.isAdmin) {
        // Set JWT token in an HTTP-only cookie
        await setAuthCookie(user.id);
        return redirect("/admin/dashboard");
      } else {
        return { error: "User is not an admin" };
      }
    } else {
      return { error: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
};

async function setAuthCookie(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600, // 1 hour
    path: "/",
  });
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;

  try {
    // Implement your password reset logic here
    // This could involve sending an email, updating a database, etc.
    console.log(`Password reset requested for email: ${email}`);

    // Redirect to a confirmation page
    redirect("/password-reset-confirmation");
  } catch (error) {
    // Handle any errors
    console.error("Password reset error:", error);
    // You might want to redirect to an error page or return an error message
    redirect("/password-reset-error");
  }
}
