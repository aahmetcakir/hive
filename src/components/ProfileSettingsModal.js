import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { useState } from "react";

export default function ProfileSettingsModal() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = () => {
        console.log(name, surname, password);
    }

    return (
        <Card classname={'absolute top-[calc(50%_-_130px)] left-[calc(50%_-_472px)] bg-[#F7F8F9] w-[944px] z-10 py-10 px-10 !block'}>
            <h1 className="text-2xl font-bold mb-10">Profil Ayarları</h1>
            <div>
                <Input
                    label="Profil fotoğrafı"
                    placeholder="Lütfen profil fotoğrafınızı seçiniz"
                    className="mb-5 cursor-pointer"
                    labelColor="black"
                    type="file"
                >
                </Input>
            </div>
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
                <Input
                    label="Şifre"
                    placeholder="Lütfen şifrenizi giriniz"
                    className="mb-5"
                    labelColor="black"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                ></Input>
            </div>
            <Button onClick={handleSubmit}>
                Kaydet
            </Button>
        </Card>
    )
}