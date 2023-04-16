import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from 'next/router'
export default function Custom404() {
  const router = useRouter()

  const relaodPage = () => {
    router.reload(window.location.pathname)
  }
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-9xl font-bold text-green-500">404</h1>
      <h2 className="text-6xl font-bold">Sayfa Bulunamadı</h2>
      <div className="flex space-x-4 mt-5">
        <Button>
          <Link
            href="/"
          >
            Anasayfaya Dön
          </Link>
        </Button>
        <Button onClick={relaodPage} className={"bg-white !text-black border"}>
          Tekrar Dene
        </Button>
      </div>
    </div>
  )

}