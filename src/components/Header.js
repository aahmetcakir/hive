import ProfileMenu from "./ProfileMenu";
export default function Header({ classname }) {
  return (
    <header className={`p-4 flex justify-between ${classname}`}>
      <img className="cursor-pointer" src="Logo.svg"/>
      <ProfileMenu name="Ahmet Çakır"/>
    </header>
  );
}
