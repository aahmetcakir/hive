import Head from 'next/head'
import Link from 'next/link'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import ProfileSettingsModal from '@/components/ProfileSettingsModal'
import CreateEventModal from '@/components/CreateEventModal'
import PasswordChangeModal from '@/components/PasswordChangeModal'
import DeleteAccount from '@/components/DeleteAccount'
import Card from '@/components/Card'
import { getToken } from "next-auth/jwt"
import { useEffect, useState } from 'react'
import { ThumbUp } from '@/components/icons'
import Chart from "chart.js/auto";
export default function Dashboard({ rooms }) {
  const router = useRouter()
  const [roomMessages, setRoomMessages] = useState([])
  const [roomParticipant, setRoomParticipant] = useState([])
  const [roomId, setRoomId] = useState()
  if (rooms.error) {
    return <div>
      {rooms.error} <br />
      önce giriş yapmalısın
    </div>
  }
  const swichRoom = (id) => () => {
    setRoomId(id)
  }
  const chartData = [
    {
      id: 1,
      option: "A) Javascript",
      value: 32,
      color: "#FBD89D80",
    },
    {
      id: 2,
      option: "B) Python",
      value: 8,
      color: "#86EFAC80",
    },
    {
      id: 3,
      option: "C)Java",
      value: 12,
      color: "#DCBBFC80",
    },
    {
      id: 4,
      option: "D) C++",
      value: 48,
      color: "#B1CDFB80",
    }
  ];
  useEffect(() => {
    const ctx = document.getElementById('myChart')?.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Javascript", "Python", "Java", "C++"],
        datasets: [{
          data: [32, 8, 12, 48],
          borderColor: [
            "rgb(251, 216,157,50%)",
            "rgb(134, 239, 172,50%)",
            "rgb(220, 187, 252,50%)",
            "rgb(177, 205, 251,50%)",
          ],
          backgroundColor: [
            "rgb(251, 216,157,50%)",
            "rgb(134, 239, 172,50%)",
            "rgb(220, 187, 252,50%)",
            "rgb(177, 205, 251,50%)",
          ],
          borderWidth: 2,
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          }
        },
      },

    });
  }, [])
  const getRoomMessages = async (id) => {
    // https://api.hive.net.tr/questions/646513a6d5d51c4cc6126bce
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`)
    const data = await res.json()
    setRoomMessages(data)
  }
  const getRoomParticipant = async (id) => {
    // http://api.hive.net.tr/partipicants/6465151ed5d51c4cc6126bff
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partipicants/${id}`)
    const data = await res.json()
    setRoomParticipant(data)
  }
  useEffect(() => {
    if (roomId) {
      getRoomMessages(roomId)
      getRoomParticipant(roomId)
    }
  }, [roomId])
  useEffect(() => {
    if (roomId) return
    setRoomId(rooms[0]?._id)
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
          <Card classname={"col-span-12 sm:max-h-[180px] grid sm:grid-cols-4 grid-cols-2 sm:flex-row items-center justify-around overflow-y-auto text-center !p-0"}>
            {
              rooms?.length > 0 ?
                rooms?.map((room, index) => (
                  <div
                    key={room?._id}
                    className='hover:bg-gray-100 min-h-[180px] flex flex-col items-center justify-center cursor-pointer relative
                      border-r-2
                      border-b-2
                    '
                    onClick={swichRoom(room?._id)}
                  >
                    {
                      room?._id === roomId &&
                      <span className="flex h-3 w-3 absolute sm:top-5 top-5 right-5 sm:right-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    }

                    <h6 className={`text-sm font-bold divide-y-2`}>
                      {room.eventName}
                    </h6>

                    <Link
                      href={`/events/${room._id}`}
                      className='hover:text-purple-500 block duration-150 ease-in-out text-center'
                    >
                      odaya git
                    </Link>
                  </div>
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
            <Card classname={"sm:col-span-4 col-span-12 sm:h-[140px] sm:flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer p-5"}>
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
              {roomParticipant.length}
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
              %{Math.round((roomMessages.length / roomParticipant.length) * 100)}
            </div>
          </Card>
          {/* Charts */}
          <Card classname={"sm:col-span-6 col-span-12 h-[355px] grid grid-cols-12 !p-5"}>
            <div className='col-span-12'>
              <h6 className='text-xl font-bold text-center'>
                Anket Sonuçları
              </h6>
            </div>
            <div className='col-span-6'>
              <canvas id='myChart'></canvas>
            </div>
            <div className='col-span-6 flex flex-col gap-5'>
              {
                chartData.map((data, index) => (
                  <div
                    key={data.id}
                    className='flex items-center justify-between relative'>
                    <div className={`h-8 absolute`}
                      style={{
                        width: `${data.value}%`,
                        backgroundColor: `${data.color}`
                      }}
                    >
                    </div>
                    <div className='text-black flex items-center justify-between w-full pl-2'>
                      <span>
                        {data.option}
                      </span>
                      <span>
                        %{data.value}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          </Card>
          <Card classname={"sm:col-span-6 col-span-12 h-[355px] flex-col w-full overflow-auto"}>
            <h2 className="text-xl font-bold my-2 bg-white w-full p-2 text-center">
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
            <span className='text-[#F59E0B] font-semibold sm:text-5xl text-3xl'>
              {roomParticipant.length}
            </span>
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
  const user = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true
  })
  const accessToken = user?.user?.tokens.accessToken;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${accessToken}`
    },
  })
  let data = await res.json()
  console.log(data);
  if (data.error) {
    return { props: { rooms: data } }
  }
  else {
    data = data.reverse()
  }


  return { props: { rooms: data } }
}