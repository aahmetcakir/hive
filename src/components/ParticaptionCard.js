import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import { motion } from "framer-motion"
import { usePresence } from "framer-motion"
export default function ParticaptionCard({ eventData }) {
    const [isPresent, safeToRemove] = usePresence()
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
        <Card classname="max-w-[261px] flex flex-col items-center overflow-y-auto max-h-[800px]">
            <h1 className="font-bold mt-2 text-center mb-4">Katılımcılar</h1>

            {
                eventData.participants.length > 0 ?
                    eventData.participants.map((participant) => (
                        <motion.ul
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="w-full"
                            key={participant}>

                            <motion.li
                                {...animations}
                                className="flex items-center mt-2 border-b pb-2 cursor-pointer"
                            >
                                <div className="w-[30px] h-[30px]">
                                    <Avatar size={30} />
                                </div>
                                <span className="pt-1 w-full text-center">{participant}</span>
                            </motion.li>
                        </motion.ul>
                    ))
                    :
                    <div className="flex items-center justify-center w-full mb-4 bg-yellow-100 rounded-lg border border-yellow-500">
                        <span className="text-center text-yellow-500 text-sm">Henüz katılımcı yok</span>
                    </div>
            }
        </Card>
    );
}