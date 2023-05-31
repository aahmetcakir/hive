import Avatar from "./Avatar";
import Card from "./Card";
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
export default function ProfileMenu() {
  const ref = useRef();
  const parentRef = useRef();
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession()
  const eventCode = router.query.id
  // Hook
  function useOnClickOutside(ref, handler, parentRef) {
    useEffect(
      () => {
        const listener = (event) => {
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
    <Card onClick={() => setIsOpen(!isOpen)} classname={session?.user ? "flex items-center justify-center w-[120px  sm:w-fit shadow-sm hover:bg-gray-50 cursor-pointer relative" : "flex items-center justify-center"}>
      <div ref={parentRef} className="flex items-center justify-center">
        {
          session?.user.name ?
            <div className="flex items-center justify-center">
              <span className="font-medium sm:font-bold text-sm sm:text-base"
              >
                {session.user.name} {" "}
                {session.user.surname}
              </span>
              <div className="w-[38px] pb-2">
                <Avatar size={38} />
              </div>
            </div> :
            <span className="font-bold cursor-pointer"
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
          className={`absolute top-16 w-40 bg-white dark:bg-[#121212] rounded-md shadow-md p-2 z-10 ${isOpen ? "block" : "hidden"}`}

        >
          <motion.div className="flex flex-col  divide-y my-2 space-y-2 dark:divide-gray-700">
            <Link href="/dashboard" className="block w-full text-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Panel
              </ motion.button>
            </Link>
            <Link
              className="block w-full text-center"
              href={`?event=open`}
              as={`/events/${eventCode}/`}

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
              as={`/events/${eventCode}/`}
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
              as={`/events/${eventCode}/`}
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
              as={`/events/${eventCode}/`}

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