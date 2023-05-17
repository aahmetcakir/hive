import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function ProfileSettingsModal() {
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async () => {
        toast.loading('Etkinlik oluşturuluyor...');
        const event = {
            eventName: eventName,
            eventDescription: description,
            lessonName: course,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.tokens.accessToken}`
            },
            body: JSON.stringify(event),
        })
        if (res.status === 200 || res.status === 201) {
            const event = await res.json()
            toast.remove();
            toast.success('Etkinlik oluşturuldu.')
            setEventName("");
            setDescription("");
            setCourse("");
            setTimeout(() => {
                router.push(`/events/${event?._id}`)
            }, 400);

        }
        else {
            const err = await res.json();
            toast.remove();
            toast.error(err.message || 'Etkinlik oluşturulurken bir problem oluştu. Lütfen daha sonra tekrar deneyin.')
        }
    }

    return (
        <Card classname={'absolute top-[calc(50%_-_300px)] left-[calc(50%_-_472px)] bg-[#F7F8F9] w-[944px] z-10 !p-10 !block'}>
            <h1 className="text-2xl font-bold mb-10">Etkinlik Oluştur</h1>
            <Input
                label="Etkinlik adı"
                placeholder="Lütfen etkinlik adını giriniz"
                className="mb-5"
                labelColor="black"
                onChange={(e) => setEventName(e.target.value)}
                value={eventName}
            ></Input>
            <Input
                label="Etkinlik açıklaması"
                placeholder="etkinliğinizi açıklayınız..."
                className="mb-4"
                labelColor="black"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            ></Input>
            <Input
                label="Ders adı"
                placeholder="Ders adı"
                className="mb-4"
                labelColor="black"
                onChange={(e) => setCourse(e.target.value)}
                value={course}
            ></Input>
            <Button onClick={handleSubmit}>
                Etkinliği oluştur
            </Button>
        </Card>
    )
}