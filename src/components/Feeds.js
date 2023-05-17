import { ThumbUp } from "./icons";
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { useState } from "react"
export default function Feeds() {
    const dummyFeeds = [
        {
            id: 1,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 2,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 3,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 4,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 5,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 6,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 7,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 8,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 9,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 10,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 11,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
        {
            id: 12,
            name: "anonymous123494",
            question: "What is your favorite color?",
        },
    ]
    const [feeds, setFeeds] = useState(dummyFeeds)

    return (
        <Reorder.Group values={feeds} onReorder={setFeeds}>
            <AnimatePresence>
                {
                    feeds.map((feed) => (
                        <Reorder.Item key={feed.id} value={feed}>
                            <div className="border relative border-darkgray p-3 rounded-lg flex items-center justify-between mb-6">
                                <span className="text-gray-500 absolute bottom-9 bg-white px-1">{feed.name}</span>
                                <span className="text-gray-900 ">{feed.question}</span>
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
    );
}