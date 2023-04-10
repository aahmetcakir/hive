import Head from 'next/head'
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    const payload = {
      email: email,
      password: password,
    }
    toast.loading('Giriş yapılıyor...');
    setLoading(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (res.status === 200 || res.status === 201) {
      toast.remove();
      toast.success('Giriş başarılı')
      setTimeout(() => {
        router.push('/dashboard')
      }
        , 500)
    }
    else {
      toast.remove();
      toast.error('Giriş başarısız')
    }
  }




  return (
    <>
      <Head>
        <title>Hive - Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-gray-800 h-screen flex items-center justify-center'>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div className='flex flex-col items-center bg-white rounded-lg px-6 py-5 pt-12 w-[554px]'>
          <h1 className="text-4xl font-bold text-black mb-4">Hesabınıza giriş yapın</h1>
          <h4 className='text-gray-500 mb-6'>etkinliğinizi hemen oluşturun</h4>
          <Input className="mb-6" type="email" label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <Input type="password" label="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <Button className="my-6" onClick={handleClick}>Giriş Yap</Button>
          <Link href="/reset-password" className='block mb-4'><span className='text-green-500'>
            Şifremi unuttum
          </span> </Link>
          <Link href="/register">Henüz bir hesabın yok mu? <span className='text-green-500'>Kayıt ol</span> </Link>
        </div>

      </main>
    </>
  )
}
