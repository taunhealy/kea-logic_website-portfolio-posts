import Link from "next/link";
import { Button } from "./ui/button";
import { type Session } from "next-auth";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  return (
    <div className="flex justify-between bg-neutral-500 py-6 text-center font-bold">
      <div></div>
      <div className="flex justify-end gap-10 pr-16">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        {session ? (
          <form action="/api/auth/signout" method="POST">
            <Button type="submit">Logout</Button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
