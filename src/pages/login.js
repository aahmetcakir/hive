import Head from 'next/head'
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from 'next/link'
export default function Login() {
  return (
    <>
      <Head>
        <title>Hive - Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-gray-800 h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center bg-white rounded-lg px-6 py-5 pt-12 w-[554px] h-[530px]'>
          <h1 className="text-4xl font-bold text-black mb-4">Hesabınıza giriş yapın</h1>
          <h4 className='text-gray-500 mb-6'>etkinliğinizi hemen oluşturun</h4>
          <Input className="mb-6" type="email" label="Email" />
          <Input type="password" label="Password" />
          <Button className="my-6">Giriş Yap</Button>
          <Link href="/register">Henüz bir hesabın yok mu? <span className='text-green-500'>Kayıt ol</span> </Link>
        </div>

      </main>
    </>
  )
}
