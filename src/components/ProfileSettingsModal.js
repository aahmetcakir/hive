import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { useState } from "react";
import toast from 'react-hot-toast'
import { useSession } from "next-auth/react";

export default function ProfileSettingsModal() {
    const { data: session, update } = useSession();
    const [name, setName] = useState(session.user.name || '');
    const [surname, setSurname] = useState(session.user.surname || '');
    const handleSubmit = async () => {
        const data = {
            firstName: name || session.user.name,
            lastName: surname || session.user.surname,
        }
        toast.loading('Güncelleniyor...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.tokens.accessToken}`
            },
            body: JSON.stringify(data),
        })
        if (res.status === 200 || res.status === 201) {
            const user = await res.json()
            const accessToken = session.user.tokens.accessToken;
            const refreshToken = session.user.tokens.refreshToken;
            update(
                {
                    id: user._id,
                    name: user.firstName,
                    surname: user.lastName,
                    email: user.email,
                    image: user.image,
                    rooms: user.rooms,
                    tokens: {
                        accessToken,
                        refreshToken,
                    },
                }
            )
            toast.remove();
            toast.success('Bilgiler güncellendi.')
            setName(user.firstName)
            setSurname(user.lastName)
        }
        else {
            const err = await res.json();
            toast.remove();
            toast.error(err.error || 'Bilgiler güncellenirken bir problem oluştu. Lütfen daha sonra tekrar deneyin.')
        }
    }

    return (
        <>
            <Card classname={'absolute top-[calc(50%_-_300px)] left-[calc(50%_-_472px)] bg-[#F7F8F9] w-[944px] z-10 !p-10 !block'}>
                <h1 className="text-2xl font-bold mb-10">Profil Ayarları</h1>
                <div>
                    <Input
                        label="Ad"
                        placeholder="Lütfen adınızı giriniz"
                        className="mb-5"
                        labelColor="black"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    ></Input>
                    <Input
                        label="Soyad"
                        placeholder="Lütfen soyadınızı giriniz"
                        className="mb-5"
                        labelColor="black"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                    ></Input>
                </div>
                <Button onClick={handleSubmit}>
                    Kaydet
                </Button>
            </Card>
        </>
    )
}