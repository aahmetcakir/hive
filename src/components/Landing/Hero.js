import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import { LinePattern, LinePatternSection } from "../icons";
import { socket } from '@/socket'
import { useRouter } from "next/router";
export default function Hero() {
    const [roomCode, setRoomCode] = useState("");
    const router = useRouter();
    const joinEvent = (roomCode) => {
        console.log(roomCode);
        socket.emit("partipicant", { roomCode: roomCode })
    }
    useEffect(() => {
        socket.on("newParticipant", (participant) => {
            console.log(participant);
            router.push(`/events/${participant.roomId}`)
        })
        return () => {
            socket.off("newParticipant")
            socket.disconnect()
        }
    }, [socket])
    const handleClick = (roomCode) => {
        joinEvent(roomCode);
        console.log("asd");
    }
    return (
        <div className="w-full  pt-8 px-8">
            <div className="w-full from-[#53389E] to-[#6941C6] bg-gradient-to-t h-[674px] rounded-3xl flex flex-col items-center justify-center relative">
                <div className="absolute -bottom-32 -left-32">
                    <LinePattern />
                </div>
                <div className="relative -top-10">
                    <span className="text-7xl bg-clip-text text-center block bg-gradient-to-t from-purple-300 to-white text-transparent">
                        Basit, Güçlü. <br />
                        İnteraktif.
                    </span>
                    <span className="text-xl text-white leading-8 text-center mt-6 block">
                        Güçlü, etkileşim dolu bir deneyim için Hive ile etkinliklere interaktif bir dokunuş katın.
                    </span>
                    <div className="flex space-x-4 w-full items-start justify-center mt-12">
                        <div>
                            <Input placeholder={"Etkinlik kodunu gir"} className={"min-w-[360px]"}
                                onChange={(e) => setRoomCode(e.target.value)}
                                value={roomCode}
                            >
                            </Input>
                            <span className="text-white text-sm font-normal">
                                Gizliliğinize önem veriyoruz. {""}
                                <span className="underline">
                                    Gizlilik sözleşmesi
                                </span>
                                .
                            </span>
                        </div>
                        <Button className={"!px-5 !py-3 font-semibold text-md max-w-[136px] !bg-[#7F56D9]"}
                            onClick={() => handleClick(roomCode)}
                        >
                            Etkinliğe Gir
                        </Button>
                    </div>
                </div>
                <div className="absolute right-0 top-full">
                    <LinePatternSection />
                </div>
            </div>
            <div className="flex items-center justify-center !z-20 relative -top-20">
                <img src="./img/mockup.png" alt="mockup" width={"800px"} height={'492px'} />
            </div>
        </div>
    )
}