import Head from 'next/head'
import Link from 'next/link'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import ProfileSettingsModal from '@/components/ProfileSettingsModal'
import CreateEventModal from '@/components/CreateEventModal'
import PasswordChangeModal from '@/components/PasswordChangeModal'
import DeleteAccount from '@/components/DeleteAccount'
import Card from '@/components/Card'
import QRCode from "react-qr-code";
import { useSession } from "next-auth/react"
export default function Dashboard() {
  const router = useRouter()
  const { data: status } = useSession()
  if (status === "loading") {
    return <p>Yükleniyor...</p>
  }

  if (status === "unauthenticated") {
    return <p>
      Önce giriş yapmalısınız.
    </p>
  }
  const userRooms = [
    {
      id: 1,
      name: "Yazılım Geliştirme",
      code: "e6KW6zMOA"
    },
    {
      id: 2,
      name: "Yazılım Geliştirme",
      code: "e6KW6zMOA"
    },
    {
      id: 3,
      name: "Yazılım Geliştirme",
      code: "e6KW6zMOA"
    },
    {
      id: 4,
      name: "Yazılım Geliştirme",
      code: "e6KW6zMOA"
    },
    {
      id: 5,
      name: "Yazılım Geliştirme",
      code: "e6KW6zMOA"
    },
  ]

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
            className="block w-full text-center sm:col-span-4 col-span-12"
            href={`?event=open`}
            as={`/events/undefined`}
          >
            <Card classname={"sm:col-span-4 col-span-12 sm:h-[140px] sm:flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
              <span className="text-2xl font-bold text-purple-500 text-center">
                Yeni Etkinlik <br />
                Oluştur
              </span>
            </Card>
          </Link>
          <Card classname={"sm:col-span-8 col-span-12 sm:h-[140px] h-[300px] flex flex-col sm:flex-row items-center justify-around text-center font-medium"}>
            <div>
              Anonim <br />
              Katılımcılar <br />
              50
            </div>
            <div className='sm:w-px sm:h-[90px] w-[90px] h-px bg-black'>
            </div>
            <div>
              Soru <br />
              Adedi <br />
              25
            </div>
            <div className='sm:w-px sm:h-[90px] w-[90px] h-px bg-black'>
            </div>
            <div>
              Soru / <br /> kullanıcı oranı
              <br />
              %50
            </div>
          </Card>
          <Card classname={"sm:col-span-6 col-span-12 h-[355px] flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <h2 className="text-2xl font-bold ">
              grafikler
            </h2>
          </Card>
          <Card classname={"sm:col-span-6 col-span-12 h-[355px] flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <h2 className="text-2xl font-bold">
              sorular
            </h2>
          </Card>
          <Card classname={"col-span-4 sm:h-[140px] h-[100px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#F59E0B] font-semibold sm:text-5xl text-3xl'>50</span>
            <span className='font-medium sm:text-xl text-md'>Katılımcı</span>
          </Card>
          <Card classname={"col-span-4 sm:h-[140px] h-[100px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#76A8F9] font-semibold sm:text-5xl text-3xl'>24</span>
            <span className='font-medium sm:text-xl text-md'>Soru</span>
          </Card>
          <Card classname={"col-span-4 sm:h-[140px] h-[100px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#C288F9] font-semibold sm:text-5xl text-3xl'>120</span>
            <span className='font-medium sm:text-xl text-md'>Oy</span>
          </Card>
          <Card classname={"col-span-12 sm:h-[140px] flex flex-col sm:flex-row items-center justify-evenly sm:gap-x-4 gap-y-4 py-2"}>
            {
              userRooms.map((room) => (
                <Card key={room.id} classname="flex flex-col w-32 h-32 hover:bg-gray-200 hover:cursor-pointer">
                  <h6 className="text-sm font-bold divide-y-2">
                    {room.code}
                  </h6>
                  <QRCode value={'https://hivecom.vercel.app/events/' + room.id} size={200} />
                  <Link
                    href={`/events/${room.id}`}
                  >
                    odaya git
                  </Link>
                </Card>
              ))
            }
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
// export async function getServerSideProps(context) {
//   // Fetch data from external API
//   const accessToken = context.req.cookies["next-auth.session-token"];
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/users`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": `Bearer ${accessToken}`
//     },
//   })
//   const data = await res.json()
//   if (data.error) {
//     return {
//       notFound: true,
//     }
//   }

//   return { props: { rooms: data } }
// }