import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import { Logo } from "./icons";
import { useSession } from "next-auth/react";
import ThemeSelector from "./ThemeSelector";
export default function Header({ classname }) {
  const { data: session } = useSession();
  return (
    <header className={`p-4 flex justify-between ${classname}`}>
      <Link href={`${session?.user ? "/dashboard" : "/"}`}>
        <Logo />
      </Link>
      <div className="flex items-center space-x-10">
        <ThemeSelector />
        <ProfileMenu />
      </div>
    </header>
  );
}
