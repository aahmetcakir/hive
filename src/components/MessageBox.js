import { motion } from "framer-motion";
import { Send, SendInvert } from "./icons";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { socket } from "../socket"
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
export default function MessageBox() {
    const { isDark } = useContext(ThemeContext);
    const [message, setMessage] = useState("")
    const router = useRouter()
    const textareRef = useRef(null)
    const { id } = router.query
    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit("question", {
            text: message, roomId: id,
        })
        setMessage("")
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div
            className="relative flex items-center justify-between w-full p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 pr-5"
        >
            <textarea
                ref={textareRef}
                className="w-full p-2 focus:outline-none resize-none dark:bg-[#121212] dark:text-white"
                name="messageBox" cols="4" rows="3" placeholder="Sorunuzu yazınız"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyDown={handleKeyDown}
            >
            </textarea>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white"
                onClick={handleSubmit}
            >
                {
                    isDark ? <SendInvert /> : <Send />
                }
            </ motion.button>
        </div>
    )
}