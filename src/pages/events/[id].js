import Head from 'next/head'
import InformationCard from '@/components/InformationCard'
import QrCard from '@/components/QrCard'
import ParticaptionCard from '@/components/ParticaptionCard'
import Feeds from '@/components/Feeds'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import ProfileSettingsModal from '@/components/ProfileSettingsModal'
import CreateEventModal from '@/components/CreateEventModal'
import PasswordChangeModal from '@/components/PasswordChangeModal'
import DeleteAccount from '@/components/DeleteAccount'
import { useEffect, useState } from 'react'
import { socket } from '@/socket'
import { useSession } from "next-auth/react"
export default function Events({ eventData }) {
    Modal.setAppElement("#__next");
    const router = useRouter()
    const { data: session } = useSession()
    const eventId = eventData?.id
    console.log(eventData);
    if (!eventData) {
        return <div>Loading</div>
    }

    const joinEvent = () => {
        socket.emit("partipicant", { roomId: eventId })
    }
    useEffect(() => {
        joinEvent()
    }, [])
    return (
        <>
            <Head>
                <title>Hive</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='grid grid-cols-12 sm:gap-x-8 gap-y-8 my-10 sm:my-0 sm:gap-y-0'>
                <div className='col-span-12 mx-auto sm:col-span-3 sm:order-1 mt-40 sm:mt-0'>
                    <InformationCard eventData={eventData} />
                    <QrCard eventCode={eventData.code} />
                </div>
                <div className="col-span-12 sm:col-span-6 order-first sm:order-2">
                    <Feeds />
                </div>
                {
                    eventData.createdBy.id === session?.user?.id &&
                    <div className="sm:col-span-3 hidden sm:block sm:order-3">
                        <ParticaptionCard eventData={eventData} />
                    </div>
                }
                <Modal
                    isOpen={!!router.query.profile}
                    onRequestClose={() => router.push(`/events/${eventId}`)}
                    className="bg-transparent z-20"
                >
                    <ProfileSettingsModal />
                </Modal>
                <Modal
                    isOpen={!!router.query.password}
                    onRequestClose={() => router.push(`/events/${eventId}`)}
                    className="bg-transparent z-20"
                >
                    <PasswordChangeModal />
                </Modal>
                <Modal
                    isOpen={!!router.query.account}
                    onRequestClose={() => router.push(`/events/${eventId}`)}
                    className="bg-transparent z-20"
                >
                    <DeleteAccount />
                </Modal>
                <Modal
                    isOpen={!!router.query.event}
                    onRequestClose={() => router.push(`/events/${eventId}`)}
                    className="bg-transparent z-20"
                >
                    <CreateEventModal />
                </Modal>
            </main >
        </>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const eventCode = context.query.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${eventCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()
    if (data.error) {
        return {
            notFound: true,
        }
    }

    return { props: { eventData: data } }
}