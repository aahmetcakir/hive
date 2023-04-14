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

export default function Events({ eventData }) {
    Modal.setAppElement("#__next");
    const router = useRouter()

    if (!eventData) {
        return <div>Loading</div>
    }


    return (
        <>
            <Head>
                <title>Hive</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='grid grid-cols-12 gap-x-8'>
                <div className='col-span-3'>
                    <InformationCard eventData={eventData} />
                    <QrCard eventCode={eventData.code} />
                </div>
                <div className="col-span-6">
                    <Feeds />
                </div>
                <div className="col-span-3">
                    <ParticaptionCard eventData={eventData} />
                </div>
                <Modal
                    isOpen={!!router.query.profile}
                    onRequestClose={() => router.push(`/events/${eventCode}`)}
                    className="bg-transparent z-10"
                >
                    <ProfileSettingsModal />
                </Modal>
                <Modal
                    isOpen={!!router.query.password}
                    onRequestClose={() => router.push(`/events/${eventCode}`)}
                    className="bg-transparent z-10"
                >
                    <PasswordChangeModal />
                </Modal>
                <Modal
                    isOpen={!!router.query.account}
                    onRequestClose={() => router.push(`/events/${eventCode}`)}
                    className="bg-transparent z-10"
                >
                    <DeleteAccount />
                </Modal>
                <Modal
                    isOpen={!!router.query.event}
                    onRequestClose={() => router.push(`/events/${eventCode}`)}
                    className="bg-transparent z-10"
                >
                    <CreateEventModal />
                </Modal>
            </main >
        </>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const accessToken = context.req.cookies["next-auth.session-token"];
    const eventCode = context.query.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${eventCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`
        },
    })
    const data = await res.json()
    // Pass data to the page via props
    return { props: { eventData: data } }
}