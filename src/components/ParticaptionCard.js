import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
export default function ParticaptionCard() {
    const participants = [
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
        {
            id: 9,
            name: "anonymous123494",
        },
        {
            id: 10,
            name: "anonymous123494",
        },
        {
            id: 11,
            name: "anonymous123494",
        },
        {
            id: 12,
            name: "anonymous123494",
        },
        {
            id: 13,
            name: "anonymous123494",
        },
        {
            id: 14,
            name: "anonymous123494",
        },
    ]
    return (
        <Card classname="max-w-[261px] flex flex-col items-center">
            <h1 className="font-bold mt-2 text-center mb-4">Katılımcılar</h1>
            {
                participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-center mt-2 border-b pb-2">
                        <div className="w-[30px] h-[30px]">
                            <Avatar size={30} />
                        </div>
                        <span className="pt-1">{participant.name}</span>
                    </div>
                ))

            }

        </Card>
    );
}