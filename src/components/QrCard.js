import Card from "@/components/Card";
import QRCode from "react-qr-code";
import { useRouter } from 'next/router'
export default function QrCard() {
    const router = useRouter()
    return (
        <Card classname="max-w-[261px] h-[375px] flex flex-col items-center justify-center pb-12">
            <h1 className="font-bold mt-2 text-center mb-4">Derse katılmak için <br /> QR kodu okutabilirsiniz</h1>

            <QRCode value={'https://hive-omega.vercel.app' + router.pathname} size={200} />
        </Card>
    );
}