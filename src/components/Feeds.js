import { ThumbUp, ThumbUpFilled, AlignBottom, AlignBottomInvert } from "./icons";
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useState, useEffect } from "react"
import MessageBox from "./MessageBox";
import { socket } from "../socket"
import { useRouter } from "next/router"
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { useSession } from "next-auth/react";
export default function Feeds() {
    const { isDark } = useContext(ThemeContext);
    const [feeds, setFeeds] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        socket.on("newQuestion", (feed) => {
            setFeeds((prev) => [...prev, { ...feed, likeCount: 0, likedBy: [] }])
        })
        return () => {
            socket.off("newQuestion")
        }
    }, [socket])
    useEffect(() => {
        socket.on("questionLiked", (data) => {
            setFeeds(data.sortedQuestions)
        })
        return () => {
            socket.off("questionLiked")
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

    useEffect(() => {
        checkRoomOwner(session?.user?.rooms, id)
    }, [session])

    const likeQuestion = (question) => {
        const participantName = "anonymous-" + socket?.id?.slice(1, 5)
        socket.emit("toggleLikeQuestion", {
            roomId: question.room,
            questionId: question._id,
            participantName: participantName
        })
    }
    const throwToBottom = (question) => {
        setFeeds((prev) => prev.filter((q) => q._id !== question._id))
        setFeeds((prev) => [...prev, question])
    }
    const checkRoomOwner = (rooms, id) => {
        rooms?.forEach((room) => {
            if (room === id) {
                setIsOwner(true)
            }
        })
    }
    return (
        <div className="h-full">
            {
                feeds.length > 0 ? (
                    <Reorder.Group values={feeds} onReorder={setFeeds}
                        className="overflow-y-auto max-h-[840px] mb-10 h-full"
                    >
                        <AnimatePresence>
                            {
                                feeds.map((feed) => (
                                    <Reorder.Item key={feed._id} value={feed}
                                        className="first:mt-2"
                                    >
                                        <div className="border relative border-darkgray p-3 rounded-lg flex items-center justify-between mb-6">
                                            <span className="text-gray-500 absolute bottom-11 bg-white dark:bg-[#121212] px-1">{feed.name || feed.participant || "anonymous"}</span>
                                            <span className="text-gray-900 dark:text-white">
                                                {feed?.text}
                                            </span>
                                            <div className="space-x-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => likeQuestion(feed)}
                                                >
                                                    {
                                                        feed?.likedBy?.indexOf(`anonymous-${socket?.id?.slice(1, 5)}`) != -1 ?
                                                            <div className='relative text-blue-500'>
                                                                {
                                                                    feed?.likeCount > 0 && (
                                                                        <span className={`block absolute text-xs left-3 -top-2 bg-blue-500 text-white px-1 py-0.5 rounded-full leading-none border-2 border-white dark:border-[#121212]`}>
                                                                            {feed?.likeCount}
                                                                        </span>
                                                                    )
                                                                }
                                                                <ThumbUpFilled />
                                                            </div>
                                                            :
                                                            <div className='relative dark:text-white'>
                                                                {
                                                                    feed?.likeCount > 0 && (
                                                                        <span className={`block absolute text-xs left-3 -top-2 bg-blue-500 text-white px-1 py-0.5 rounded-full leading-none border-2 border-white dark:border-[#121212]`}>
                                                                            {feed?.likeCount}
                                                                        </span>
                                                                    )
                                                                }
                                                                <ThumbUp />
                                                            </div>
                                                    }
                                                </ motion.button>
                                                {
                                                    isOwner && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => throwToBottom(feed)}
                                                        >
                                                            {
                                                                isDark ? <AlignBottomInvert /> : <AlignBottom />
                                                            }
                                                        </motion.button>
                                                    )
                                                }
                                            </div>
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
            {
                !isOwner &&
                <MessageBox />

            }
        </div>
    );
}