import Head from 'next/head'
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast'
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    toast.loading('Giriş yapılıyor...')
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        router.push('/dashboard')
        toast.dismiss()
        toast.success("Giriş başarılı")
      }
      else {
        toast.dismiss()
        toast.error("Giriş başarısız")
      }
    })
  }

  return (
    <>
      <Head>
        <title>Hive - Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex flex-col items-center bg-transparent rounded-lg px-6 py-5 pt-12 w-[460px]'>
          <h1 className="text-4xl font-bold text-white mb-4">Hesabınıza giriş yapın</h1>
          <h4 className='text-gray-400 mb-6'>etkinliğinizi hemen oluşturun</h4>
          <Input className="mb-6" type="email" label="Email *" onChange={(e) => setEmail(e.target.value)} value={email} />
          <Input type="password" label="Password *" onChange={(e) => setPassword(e.target.value)} value={password} />
          <Link href="/reset-password" className='mt-4 text-sm text-green-500 inline-block ml-auto'>
            Şifremi unuttum
          </Link>
          <Button className="my-6" onClick={handleClick}>Giriş Yap</Button>
          <Link href="/register" className='text-white'>Henüz bir hesabın yok mu? <span className='text-green-500'>Kayıt ol</span> </Link>
        </div>
      </main>
    </>
  )
}
