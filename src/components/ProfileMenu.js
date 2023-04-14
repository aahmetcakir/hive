import Avatar from "./Avatar";
import Card from "./Card";
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

export default function ProfileMenu() {
  const ref = useRef();
  const parentRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession()
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
    <Card onClick={() => setIsOpen(!isOpen)} classname="flex flex-col shadow-sm hover:bg-gray-50 cursor-pointer relative z-10">
      <div ref={parentRef} className="flex items-center justify-center">
        {
          session?.user.name ?
            <div className="flex items-center justify-center">
              <span className="font-bold"
              >
                {session.user.name} {" "}
                {session.user.surname}
              </span>
              <div className="w-[38px] pb-2">
                <Avatar size={38} />
              </div>
            </div>
            :
            <span className="font-bold"
              onClick={() => signIn()}
            >
              Giriş Yap
            </span>
        }
      </div>
      {
        session?.user && <motion.div
          ref={ref}
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          className={`absolute top-16 w-40 bg-white rounded-md shadow-md p-2 z-10 ${isOpen ? "block" : "hidden"}`}

        >
          <motion.div className="flex flex-col  divide-y my-2 space-y-2">
            <Link href="/dashboard" className="block w-full text-center">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                Panel
              </ motion.button>
            </Link>
            <Link
              className="block w-full text-center"
              href={`?event=open`}
              as={`/create-event`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Etkinlik Oluştur
              </ motion.button>
            </Link>
            <Link
              className="block w-full text-center"
              href={`?profile=open`}
              as={`/profile`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Hesap Ayarları
              </ motion.button>
            </Link>
            <Link
              className="block w-full text-center"
              href={`?password=open`}
              as={`/profile`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Şifre Değiştir
              </ motion.button>
            </Link>
            <Link
              className="block w-full text-center"
              href={`?account=open`}
              as={`/profile`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500"
              >
                Hesabı Sil
              </ motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="block w-full text-center"
              onClick={() => signOut({
                callbackUrl: "/login"
              })}
            >
              Çıkış Yap
            </ motion.button>
          </motion.div>
        </motion.div>
      }
    </Card >

  );
}