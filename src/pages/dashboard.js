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
import { getToken } from "next-auth/jwt"
import { useEffect, useState } from 'react'
import { ThumbUp } from '@/components/icons'
export default function Dashboard({ rooms }) {
  const router = useRouter()
  const { data: status } = useSession()
  const [roomMessages, setRoomMessages] = useState([])
  const [roomId, setRoomId] = useState()
  const [roomColor, setRoomColor] = useState()
  if (status === "loading") {
    return <p>Yükleniyor...</p>
  }

  if (status === "unauthenticated") {
    return <p>
      Önce giriş yapmalısınız.
    </p>
  }
  const swichRoom = (id) => () => {
    const color = generateRandomColor()
    setRoomColor(color)
    console.log(color);
    setRoomId(id)
  }
  const getRoomMessages = async (id) => {
    // https://api.hive.net.tr/questions/646513a6d5d51c4cc6126bce
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`)
    const data = await res.json()
    setRoomMessages(data)
  }
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor
  }
  useEffect(() => {
    if (roomId) {
      getRoomMessages(roomId)
    }
  }, [roomId])
  useEffect(() => {
    if (roomId) return
    setRoomId(rooms[0]._id)
  }, [])

  return (
    <>
      <Head>
        <title>Hive - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='grid grid-cols-12 gap-8 mb-10'>
          <Card classname={"col-span-12 sm:h-[180px] flex flex-col sm:flex-row items-center justify-between  sm:gap-x-4 gap-y-4 py-2 overflow-x-auto"}>
            {
              rooms.length > 0 ?
                rooms.map((room) => (
                  <Card key={room._id} classname={`flex flex-col items-center justify-center w-32 h-32 hover:bg-gray-200 hover:cursor-pointer ${roomId == room._id ? "bg-gray-200" : ""} text-[${roomColor}]`}
                    onClick={swichRoom(room._id)}
                  >
                    <h6 className={`text-sm font-bold divide-y-2`}>
                      {room.code}
                    </h6>
                    {/* <QRCode value={'https://hive.net.tr/events/' + room._id} size={200} /> */}
                    <Link
                      href={`/events/${room._id}`}
                      className='hover:text-purple-500 block duration-150 ease-in-out text-center'
                    >
                      odaya git
                    </Link>
                  </Card>
                ))
                :
                <span className="text-2xl font-bold text-center">
                  Henüz bir oda oluşturmadınız.
                </span>
            }
          </Card>
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
              {roomMessages.length}
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
          <Card classname={"sm:col-span-6 col-span-12 h-[355px] flex-col w-full overflow-auto"}>
            <h2 className="text-2xl font-bold my-2">
              Sorular
            </h2>
            {
              roomMessages.map((message, index) => (
                <div key={message._id} className={`w-full text-blue-500 flex items-center justify-between border relative border-darkgray p-3 rounded-lg mb-3 ${index == 0 ? "bg-[#ffef9ea4]" : index == 1 ? "bg-[#e8e8e87c]" : index == 2 ? "bg-[#f5c28e60]" : ""}`}>
                  {/* <span className="text-gray-500 absolute bottom-9 bg-white px-1">{message.name}</span> */}
                  {/* ${index == 0 ? "bg-[#ffef9e]" : index == 1 ? "bg-[#e8e8e8]" : index == 2 ? "bg-[#f5c18e]" : ""} */}
                  <span className="text-gray-900 ">{message.text}</span>
                  <div className='relative'>
                    <span className={`block absolute text-xs left-3 -top-2 bg-blue-500 text-white px-1 py-0.5 rounded-full leading-none border-2  ${index == 0 ? "border-[#ffef9e]" : index == 1 ? "border-[#e8e8e8]" : index == 2 ? "border-[#f5c28]" : "border-white"}`}>
                      3
                    </span>
                    <ThumbUp />
                  </div>
                </div >
              ))
            }
          </Card>
          <Card classname={"col-span-4 sm:h-[140px] h-[100px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#F59E0B] font-semibold sm:text-5xl text-3xl'>50</span>
            <span className='font-medium sm:text-xl text-md'>Katılımcı</span>
          </Card>
          <Card classname={"col-span-4 sm:h-[140px] h-[100px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#76A8F9] font-semibold sm:text-5xl text-3xl'>
              {roomMessages.length}
            </span>
            <span className='font-medium sm:text-xl text-md'>Soru</span>
          </Card>
          <Card classname={"col-span-4 sm:h-[140px] h-[100px] flex flex-col items-center justify-center hover:bg-gray-200 hover:cursor-pointer"}>
            <span className='text-[#C288F9] font-semibold sm:text-5xl text-3xl'>120</span>
            <span className='font-medium sm:text-xl text-md'>Oy</span>
          </Card>
        </div>
      </main >
      <Modal
        isOpen={!!router.query.profile}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-20"
      >
        <ProfileSettingsModal />
      </Modal>
      <Modal
        isOpen={!!router.query.event}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-20"
      >
        <CreateEventModal />
      </Modal>
      <Modal
        isOpen={!!router.query.password}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-20"
      >
        <PasswordChangeModal />
      </Modal>
      <Modal
        isOpen={!!router.query.account}
        onRequestClose={() => router.push("/dashboard")}
        className="bg-transparent z-20"
      >
        <DeleteAccount />
      </Modal>
    </>
  )
}
export async function getServerSideProps({ req }) {
  const { user } = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true
  })
  const accessToken = user.tokens.accessToken;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`
    },
  })
  let data = await res.json()
  data = data.reverse()

  return { props: { rooms: data } }
}