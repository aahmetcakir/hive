import Button from "./Button";
import Card from "./Card";
import toast from 'react-hot-toast'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function DeleteAccount() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const handleSubmit = async () => {
        toast.loading('Hesabınız siliniyor...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.tokens.accessToken}`
            },
        })

        if (res.status === 200 || res.status === 201) {
            toast.remove();
            toast.success('Hesabınız silindi.')
            // update({ name: null, email: null, image: null, id: null, tokens: null, rooms: null })
            setTimeout(() => {
                signOut({
                    callbackUrl: "/login"
                })
            }
                , 200)

        }
        else {
            const err = await res.json()
            toast.remove();
            toast.error(err.message || 'Bir hata oluştu.')
        }
    }

    return (
        <>
            <Card classname={'absolute top-[calc(50%_-_300px)] left-[calc(50%_-_472px)] bg-[#F7F8F9] w-[944px] z-10 !p-10 !block'}>
                <h1 className="text-2xl font-bold mb-10">
                    Hesabı Sil
                </h1>
                <div className="mb-4">
                    Hesabı silmek istediğinize emin misiniz?
                    <br />
                    Bu hesabı silerseniz, hesabınızın tüm verileri kalıcı olarak silinecektir ve hesabınıza erişiminiz kaldırılacaktır
                </div>
                <Button onClick={handleSubmit} className={"bg-red-500"}>
                    Hesabı Sil
                </Button>
            </Card>
        </>
    )
}