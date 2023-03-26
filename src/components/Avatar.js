export default function ProfileMenu({ name }) {
  return (
    <div className="flex items-center gap-2 border border-darkgray px-2 py-1  m-1 rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer">
      <span className="font-bold">{name}</span>
      <span className="bg-gray-500 rounded-full w-[38px] h-[38px] inline-block"></span>
    </div>
  );
}
