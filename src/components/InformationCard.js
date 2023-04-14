import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import { useSession } from "next-auth/react";
export default function InformationCard() {
    const { data: session } = useSession();
    return (
        <Card classname="max-w-[261px] h-[375px] flex flex-col items-center justify-center pb-12 mb-28">
            <div className="w-[90px] h-[90px]">
                <Avatar size={90} />
            </div>
            <h1 className="text-xl font-bold mt-2">
                {session?.user?.name} {session?.user?.surname}
            </h1>
            <p className="text-gray-500 mt-1">Bülent Ecevit Üniversitesi</p>
            <p className="text-gray-500">Bilgisayar Mühendisliği</p>
            <p className="text-gray-500">Bilgisayar Ağları</p>
            <p className="text-gray-500 mt-5">Eğitmen iletişim</p>
            <p className="text-gray-500 text-sm">
                {session?.user?.email}
            </p>
        </Card>
    );
}