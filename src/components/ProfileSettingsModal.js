import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast'

export default function ProfileSettingsModal({ isOpen, onRequestClose }) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");


    const handleSubmit = async () => {
        const data = {
            firstName: name,
            lastName: surname
        }
        toast.loading('Güncelleniyor...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.status === 200 || res.status === 201) {
            toast.remove();
            toast.success('Bilgiler güncellendi.')
            setName('')
            setSurname('')
            // setTimeout(() => {
            //     router.push('/login')
            // }
            //     , 500)
        }
        else {
            toast.remove();
            toast.error('Bilgiler güncellenirken bir problem oluştu. Lütfen daha sonra tekrar deneyin.')
        }
    }

    return (
        <Card classname={'absolute top-[calc(50%_-_300px)] left-[calc(50%_-_472px)] bg-[#F7F8F9] w-[944px] z-10 !p-10 !block'}>
            <h1 className="text-2xl font-bold mb-10">Profil Ayarları</h1>
            {/* <div>
                <Input
                    label="Profil fotoğrafı"
                    placeholder="Lütfen profil fotoğrafınızı seçiniz"
                    className="mb-5 cursor-pointer"
                    labelColor="black"
                    type="file"
                >
                </Input>
            </div> */}
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
    )
}