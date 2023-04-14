import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
export default function Header({ classname }) {
  return (
    <header className={`p-4 flex justify-between ${classname}`}>
      <Link href="/">
        <img className="cursor-pointer" src="Logo.svg" />
      </Link>
      <ProfileMenu />
    </header>
  );
}
