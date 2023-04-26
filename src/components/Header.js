import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import { Logo } from "./icons";
export default function Header({ classname }) {
  return (
    <header className={`p-4 flex justify-between ${classname}`}>
      <Link href="/">
        <Logo />
      </Link>
      <ProfileMenu />
    </header>
  );
}
