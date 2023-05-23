import Card from "@/components/Card";
import QRCode from "react-qr-code";
import { useRouter } from 'next/router'
export default function QrCard({ eventCode }) {
    const router = useRouter()
    return (
        <Card classname="max-w-[261px] h-[375px] flex flex-col items-center justify-center">
            <h1 className="font-bold mt-2 text-center mb-4">Derse katılmak için <br /> QR kodu okutabilirsiniz</h1>
            <QRCode value={'https://hive.net.tr/events/' + router.query.id} size={200} />
            <span className="font-bold mt-6">
                {eventCode}
            </span>
        </Card>
    );
}