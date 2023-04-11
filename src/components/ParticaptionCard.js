import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import { motion } from "framer-motion"
import Button from "./Button";
import { useState } from "react";
import { usePresence } from "framer-motion"
export default function ParticaptionCard() {
    const [isPresent, safeToRemove] = usePresence()
    const participantsDefault = [
        {
            id: 1,
            name: "anonymous123494",
        },
        {
            id: 2,
            name: "anonymous123494",
        },
        {
            id: 3,
            name: "anonymous123494",
        },
        {
            id: 4,
            name: "anonymous123494",
        },
        {
            id: 5,
            name: "anonymous123494",
        },
        {
            id: 6,
            name: "anonymous123494",
        },
        {
            id: 7,
            name: "anonymous123494",
        },
        {
            id: 8,
            name: "anonymous123494",
        },
        // {
        //     id: 9,
        //     name: "anonymous123494",
        // },
        // {
        //     id: 10,
        //     name: "anonymous123494",
        // },
        // {
        //     id: 11,
        //     name: "anonymous123494",
        // },
        // {
        //     id: 12,
        //     name: "anonymous123494",
        // },
        // {
        //     id: 13,
        //     name: "anonymous123494",
        // },
        // {
        //     id: 14,
        //     name: "anonymous123494",
        // },
    ]
    const [participant, setParticipant] = useState(participantsDefault);
    const addParticaption = () => {
        setParticipant([{ id: new Date().getTime(), name: `anonymous1234${participant.length + 1}` }, ...participant])
    }
    const removeParticaption = () => {
        participant.pop()
        setParticipant([...participant])
    }
    const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 }
    const animations = {
        layout: true,
        initial: 'out',
        style: {
            color: "#F2E3DB",
            position: isPresent ? 'static' : 'absolute'
        },
        animate: isPresent ? 'in' : 'out',
        whileTap: 'tapped',
        variants: {
            in: { scaleY: 1, opacity: 1, color: "#263A29" },
            out: { scaleY: 0, opacity: 0, zIndex: -1, color: "#41644A" },
            tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } }
        },
        onAnimationComplete: () => !isPresent && safeToRemove(),
        transition
    }
    const container = {
        hidden: { x: -50 },
        show: {
            x: 0,
            transition: {
                staggerChildren: 0.5,
            }
        }
    }

    return (
        <Card classname="max-w-[261px] flex flex-col items-center">
            <div className="flex items-center justify-between w-full space-x-2 p-2">
                <Button onClick={() => addParticaption()}>
                    Ekle
                </Button>
                <Button onClick={() => removeParticaption()} className={'bg-red-500'}>
                    Sil
                </Button>
            </div>
            <h1 className="font-bold mt-2 text-center mb-4">Katılımcılar</h1>
            {
                participant.map((participant) => (
                    <motion.ul
                        variants={container}
                        initial="hidden"
                        animate="show"
                        key={participant.id}>
                        <motion.li
                            {...animations}
                            className="flex items-center justify-center mt-2 border-b pb-2 cursor-pointer"
                        >
                            <div className="w-[30px] h-[30px]">
                                <Avatar size={30} />
                            </div>
                            <span className="pt-1">{participant.name}</span>
                        </motion.li>
                    </motion.ul>
                ))
            }
        </Card>
    );
}