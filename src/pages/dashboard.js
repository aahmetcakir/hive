import Head from 'next/head'
import Link from 'next/link'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import ProfileSettingsModal from '@/components/ProfileSettingsModal'
import CreateEventModal from '@/components/CreateEventModal'
import PasswordChangeModal from '@/components/PasswordChangeModal'
import DeleteAccount from '@/components/DeleteAccount'
import Card from '@/components/Card'
// import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
// import { useEffect } from 'react'
export default function Dashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <p>Yükleniyor...</p>
  }

  if (status === "unauthenticated") {
    return <p>
      Önce giriş yapmalısınız.
    </p>
  }
  // useEffect(() => {
  //   // http://hive-deployment.onrender.com/rooms/user/6439c94a096ba3e94d87bc31
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/user/${session.user.id}`)
  //     .then(res => res.json())
  //     .then(data => { console.log(data) })
  // }, [])

  return (
    <>
      <Head>
        <title>Hive - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='grid grid-cols-12 gap-8'>
          <Link
            className="block w-full text-center col-span-4"
            href={`?event=open`}
            as={`/events/undefined`}
          >
            <Card classname={"col-span-4 h-[140px] flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
              {/* <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} className="text-2xl font-bold text-purple-500 text-center"> */}
              <span className="text-2xl font-bold text-purple-500 text-center">
                Yeni Etkinlik <br />
                Oluştur
              </span>
              {/* </ motion.button> */}
            </Card>
          </Link>
          <Card classname={"col-span-8 h-[140px] flex items-center justify-around text-center font-medium"}>
            <div>
              Anonim <br />
              Katılımcılar <br />
              50
            </div>
            <div className='w-px h-[90px] bg-black'>
            </div>
            <div>
              Soru <br />
              Adedi <br />
              25
            </div>
            <div className='w-px h-[90px] bg-black'>
            </div>
            <div>
              soru / <br /> kullanıcı oranı
              <br />
              %50
            </div>
          </Card>
          <Card classname={"col-span-6 h-[355px] flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <h2 className="text-2xl font-bold ">
              grafikler
            </h2>
          </Card>
          <Card classname={"col-span-6 h-[355px] flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <h2 className="text-2xl font-bold">
              sorular
            </h2>
          </Card>
          <Card classname={"col-span-4 h-[140px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#F59E0B] font-semibold text-5xl'>50</span>
            <span className='font-medium text-xl'>Katılımcı</span>
          </Card>
          <Card classname={"col-span-4 h-[140px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#76A8F9] font-semibold text-5xl'>24</span>
            <span className='font-medium text-xl'>Soru</span>
          </Card>
          <Card classname={"col-span-4 h-[140px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#C288F9] font-semibold text-5xl'>120</span>
            <span className='font-medium text-xl'>Oy</span>
          </Card>
          <Card classname={"col-span-12 h-[140px] flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <h2 className="text-2xl font-bold">Odalar</h2>
          </Card>
        </div>
      </main>
      <Modal
        isOpen={!!router.query.profile}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-10"
      >
        <ProfileSettingsModal />
      </Modal>
      <Modal
        isOpen={!!router.query.event}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-10"
      >
        <CreateEventModal />
      </Modal>
      <Modal
        isOpen={!!router.query.password}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-10"
      >
        <PasswordChangeModal />
      </Modal>
      <Modal
        isOpen={!!router.query.account}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-10"
      >
        <DeleteAccount />
      </Modal>
    </>
  )
}
