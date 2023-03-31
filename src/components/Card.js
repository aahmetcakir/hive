import cn from "classnames";
export default function Card({ children, classname }) {
  let classNames = cn("flex items-center px-2 border border-darkgray rounded-xl ", classname);
  return (
    <div className={classNames}>
      {children}
    </div>
  );
}
