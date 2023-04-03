import Avatar from "./Avatar";
import Card from "./Card";

export default function ProfileMenu({ name }) {
  return (
    <Card classname="flex shadow-sm hover:bg-gray-50 cursor-pointer">
      <span className="font-bold">{name}</span>
      <div className="w-[38px] pb-2">
        <Avatar size={38} />
      </div>
    </Card>
  );
}