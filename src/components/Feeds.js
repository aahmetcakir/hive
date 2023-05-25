import { ThumbUp } from "./icons";
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useState, useEffect } from "react"
import MessageBox from "./MessageBox";
import { socket } from "../socket"
import { useRouter } from "next/router"
export default function Feeds() {
    const [feeds, setFeeds] = useState([])
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        socket.on("newQuestion", (feed) => {
            setFeeds((prev) => [...prev, feed])
        })
        return () => {
            socket.off("newQuestion")
        }
    }, [socket])
    const getFeeds = async () => {
        // https://api.hive.net.tr/questions/646513a6d5d51c4cc6126bce
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`)
        const data = await res.json()
        setFeeds(data)
    }
    useEffect(() => {
        getFeeds()
    }, [])

    return (
        <div className="h-full">
            {
                feeds.length > 0 ? (
                    <Reorder.Group values={feeds} onReorder={setFeeds}
                        className="overflow-y-scroll max-h-[840px] mb-10 h-full"
                    >
                        <AnimatePresence>
                            {
                                feeds.map((feed) => (
                                    <Reorder.Item key={feed._id} value={feed}
                                    className="first:mt-2"
                                    >
                                        <div className="border relative border-darkgray p-3 rounded-lg flex items-center justify-between mb-6">
                                            <span className="text-gray-500 absolute bottom-9 bg-white px-1">{feed.name || "anonymous"}</span>
                                            <span className="text-gray-900 ">{feed.text}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => console.log("like")}
                                            >
                                                <ThumbUp />
                                            </ motion.button>
                                        </div>
                                    </Reorder.Item >
                                ))
                            }
                        </AnimatePresence>
                    </Reorder.Group>
                ) : (
                    <div className="text-center text-yellow-500  py-10 !h-full mb-5 border border-darkgray rounded-lg">
                        <span>
                            Henüz soru sorulmamış
                        </span>
                    </div>
                )
            }
            <MessageBox />
        </div>
    );
}