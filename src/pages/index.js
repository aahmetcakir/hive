import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import toast from 'react-hot-toast'
export default function Home() {
  const router = useRouter()
  const [eventCode, setEventCode] = useState('')

  const joinEvent = async () => {
    // https://hive-deployment.onrender.com/rooms/e6KW6zMOA
    if (eventCode) {
      toast.loading('Odaya giriş yapılıyor...')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${eventCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.status === 200) {
        const data = await res.json()
        toast.dismiss()
        toast.success(data.message || 'Odaya giriş yapıldı')
        setTimeout(() => {
          router.push(`/events/${data.participant.room}`)
        }, 1000)
      }
      else {
        const err = await res.json()
        toast.dismiss()
        toast.error(err.message || 'Odaya giriş yapılamadı')
      }
    }
  }
  return (
    <>
      <Head>
        <title>Hive Ana Sayfa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <h1 className="text-4xl font-bold text-white mb-4">Hıve - Etkinliğe girin</h1>
        <h4 className='text-gray-400 mb-6 text-center'>Hocanızdan aldığınız kodu aşağı giriniz</h4>
        <Input className="mb-6" type="email" onChange={(e) => setEventCode(e.target.value)} value={eventCode} />
        <Button onClick={() => joinEvent()}>Go to event page</Button>

      </main >
    </>
  )
}
