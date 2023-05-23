import { ThumbUp } from "./icons";
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useState, useEffect } from "react"
import MessageBox from "./MessageBox";
import { socket } from "../socket"
export default function Feeds() {
    const [feeds, setFeeds] = useState([])
    useEffect(() => {
        socket.on("newQuestion", (feed) => {
            console.log(feed);
            setFeeds((prev) => [feed, ...prev])
        })
        return () => {
            socket.off("newQuestion")
        }
    }, [socket])

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
                                    <Reorder.Item key={feed._id} value={feed}>
                                        <div className="border relative border-darkgray p-3 rounded-lg flex items-center justify-between mb-6">
                                            <span className="text-gray-500 absolute bottom-9 bg-white px-1">{feed.name}</span>
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