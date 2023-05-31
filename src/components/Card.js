import cn from "classnames";
export default function Card({ children, classname, onClick }) {
  let classNames = cn("flex items-center px-2 border border-darkgray dark:border-gray-700 rounded-xl dark:text-white hover:bg-gray-200 hover:dark:bg-black hover:cursor-pointer", classname);
  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
}
