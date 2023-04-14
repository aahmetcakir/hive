import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { useState } from "react";
import toast from 'react-hot-toast'
import { useSession } from "next-auth/react";

export default function PasswordChangeModal() {
    const { data: session } = useSession();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleSubmit = async () => {
        const data = {
            oldpassword: oldPassword,
            newpassword: newPassword
        }
        toast.loading('Güncelleniyor...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password/${session.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.tokens.accessToken}`
            },
            body: JSON.stringify(data),
        })

        if (res.status === 200 || res.status === 201) {
            const user = await res.json()
            toast.remove();
            toast.success('Bilgiler güncellendi.')
            setOldPassword("")
            setNewPassword("")
        }
        else {
            const err = await res.json()
            toast.remove();
            toast.error(err.error || 'Bir hata oluştu.')
        }
    }

    return (
        <>
            <Card classname={'absolute top-[calc(50%_-_300px)] left-[calc(50%_-_472px)] bg-[#F7F8F9] w-[944px] z-10 !p-10 !block'}>
                <h1 className="text-2xl font-bold mb-10">
                    Şifre Değiştir
                </h1>
                <div>
                    <Input
                        label="Eski Şifre"
                        placeholder="Lütfen eski şifrenizi giriniz"
                        type="password"
                        className="mb-5"
                        labelColor="black"
                        onChange={(e) => setOldPassword(e.target.value)}
                        value={oldPassword}
                    ></Input>
                    <Input
                        label="Yeni Şifre"
                        placeholder="Lütfen yeni şifrenizi giriniz"
                        type="password"
                        className="mb-5"
                        labelColor="black"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    ></Input>
                </div>
                <Button onClick={handleSubmit}>
                    Kaydet
                </Button>
            </Card>
        </>
    )
}