import Avatar from "./Avatar";
import Card from "./Card";
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
export default function ProfileMenu({ name }) {
  const ref = useRef();
  const parentRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  // Hook
  function useOnClickOutside(ref, handler, parentRef) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target) || parentRef.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
  }

  useOnClickOutside(ref, () => setIsOpen(false), parentRef);
  const variants = {
    open: { opacity: 1, y: "-5%", x: "0%", transition: { duration: 0.1 } },
    closed: { opacity: 0, y: "-20%", x: "-10%", transition: { duration: 0.1 } },
  }
  return (
    <>
      <Card onClick={() => setIsOpen(!isOpen)} classname="flex flex-col shadow-sm hover:bg-gray-50 cursor-pointer relative z-10">
        <div ref={parentRef} className="flex items-center justify-center">
          <span className="font-bold">{name}</span>
          <div className="w-[38px] pb-2">
            <Avatar size={38} />
          </div>
        </div>
        <motion.div
          ref={ref}
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          className={`absolute top-14 w-40 bg-white rounded-md shadow-md p-2 z-10 ${isOpen ? "block" : "hidden"}`}

        >
          <motion.div className="flex flex-col items-center justify-between divide-y space-y-2">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Link href="/dashboard">
                Panel
              </Link>
            </ motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Hesap Ayarları
            </ motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Çıkış Yap
            </ motion.button>
          </motion.div>
        </motion.div>
      </Card >

    </>

  );
}