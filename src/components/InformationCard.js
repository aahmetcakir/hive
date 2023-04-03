import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
export default function InformationCard() {
    return (
        <Card classname="max-w-[261px] h-[375px] flex flex-col items-center justify-center pb-12 mb-28">
            <div className="w-[90px] h-[90px]">
                <Avatar size={90} />
            </div>
            <h1 className="text-xl font-bold mt-2">Ahmet ÇAKIR</h1>
            <p className="text-gray-500 mt-1">Bülent Ecevit Üniversitesi</p>
            <p className="text-gray-500">Bilgisayar Mühendisliği</p>
            <p className="text-gray-500">Bilgisayar Ağları</p>
            <p className="text-gray-500 mt-5">Eğitmen iletişim</p>
            <p className="text-gray-500 text-sm">ahmet.cakir@mf.karaelmas.edu.tr</p>
        </Card>
    );
}