import Head from 'next/head'
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
// import { sendResetPasswordEmail } from '@/lib/api'
import { useRouter } from 'next/router'

export default function Register() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  // const handleClick = async () => {
  //   toast.loading('Mail gönderiliyor...');
  //   const res = await sendResetPasswordEmail({ email: email });
  //   if (res.status === 200 || res.status === 201) {
  //     toast.remove();
  //     toast.success('Şifre resetleme maili gönderildi.')
  //     setEmail('')
  //     setTimeout(() => {
  //       router.push('/login')
  //     }
  //       , 500)
  //   }
  //   else {
  //     toast.remove();
  //     toast.error('Şifre resetleme sırasında bir problem oluştu. Lütfen daha sonra tekrar deneyin.')
  //   }
  // };

  const handleClick = async () => {
    toast.loading('Mail gönderiliyor...');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
    if (res.status === 200 || res.status === 201) {
      toast.remove();
      toast.success('Şifre resetleme maili gönderildi.')
      setEmail('')
      setTimeout(() => {
        router.push('/login')
      }
        , 500)
    }
    else {
      const err = await res.json()
      toast.remove();
      toast.error(err.error || 'Şifre resetleme sırasında bir problem oluştu. Lütfen daha sonra tekrar deneyin.')
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
      <main>
        <div className='flex flex-col items-center rounded-lg px-6 pt-7 w-[554px]'>
          <h1 className="text-4xl font-bold text-white mb-4">Şifreni sıfırla</h1>
          <h4 className='text-gray-400 mb-6 text-center'>Merak etme şifreni sıfırlama konusunda sana yardımcı olacağız.</h4>
          <Input className="mb-6" type="email" placeholder="Email" label="Email *" onChange={(e) => setEmail(e.target.value)} value={email} />
          <Button className="my-6" onClick={handleClick}>Şifreyi sıfırla</Button>
          <Link href="/login" className='text-white'>Hesabın zaten var mı? <span className='text-green-500 mb-4 inline-block'>Giriş yap</span> </Link>
        </div>
      </main>
    </>
  )
}
