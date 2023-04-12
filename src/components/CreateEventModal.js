import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { useState } from "react";

export default function ProfileSettingsModal() {
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = () => {
        console.log(eventName, description, course, email);
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
            <Input
                label="Email adresi"
                placeholder="Email adresinizi giriniz.."
                className="mb-12"
                labelColor="black"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            ></Input>
            <Button onClick={handleSubmit}>
                Etkinliği oluştur
            </Button>
        </Card>
    )
}