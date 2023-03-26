export default function Card({ children, classname }) {
  return (
    <section className={`border border-darkgray rounded-xl  ${classname}`}>
      {children}
    </section>
  );
}
