import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import { Logo } from "./icons";
import { useSession } from "next-auth/react";
export default function Header({ classname }) {
  const { data: session } = useSession();
  return (
    <header className={`p-4 flex justify-between ${classname}`}>
      <Link href={`${session?.user ? "/dashboard" : "/"}`}>
        <Logo />
      </Link>
      <ProfileMenu />
    </header>
  );
}
