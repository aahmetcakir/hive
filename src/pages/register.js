import Head from 'next/head'
import Input from "@/components/Input"
import Button from "@/components/Button"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { Logo } from '@/components/icons'
export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault()
    const payload = {
      firstName: name,
      lastName: surname,
      email: email,
      password: password,
    }
    toast.loading('Giriş yapılıyor...');
    setLoading(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (res.status === 200 || res.status === 201) {
      setLoading(false)
      toast.remove();
      toast.success('Kayıt başarılı')
      setTimeout(() => {
        router.push('/login')
      }
        , 500)
    }
    else {
      setLoading(false)
      const err = await res.json()
      toast.remove();
      toast.error(err.error || 'Bir hata oluştu.')
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
        <div className='flex flex-col items-center  rounded-lg px-6 pt-7 w-[460px]'>
          <Logo className={'mb-5'} />
          <h1 className="text-4xl font-bold text-white mb-4">Topluluğumuza katıl</h1>
          <h4 className='text-gray-400 mb-6'>Etkinliğini ürünümüz ile güçlendir</h4>
          <form onSubmit={(e) => handleClick(e)}>
            <Input className="mb-6" type="text" placeholder="Ad" label="Ad *" onChange={(e) => setName(e.target.value)} value={name} />
            <Input className="mb-6" type="text" placeholder="Soyad" label="Soyad *" onChange={(e) => setSurname(e.target.value)} value={surname} />
            <Input className="mb-6" type="email" placeholder="Email" label="Email *" onChange={(e) => setEmail(e.target.value)} value={email} />
            <Input type="password" label="Password *" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} value={password} />
            <Button className="my-6" onClick={handleClick}>
              {loading ? 'Yükleniyor...' : 'Kayıt Ol'}
            </Button>
            <Link href="/login" className='text-white'>Hesabın zaten var mı? <span className='text-green-500 mb-2 inline-block'>Giriş yap</span> </Link>
          </form>

        </div>
      </main>
    </>
  )
}
