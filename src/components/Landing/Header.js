import Link from 'next/link'
import Button from '@/components/Button'
import { Logo } from '@/components/icons'

export default function Header() {
    return (
        <header className='flex items-center justify-between h-20 px-8'>
            <div>
                <Link href="/">
                    <Logo className={"w-40"} />
                </Link>
            </div>
            <div className='space-x-3 flex items-center w-48'>
                <Link href='/login' className='w-full'>
                    Giriş Yap
                </Link>
                <Button className={"text-md font-semibold !py-2.5 !px-1 !rounded-lg !bg-[#7F56D9]"}>
                    <Link href='/register'>
                        Kayıt Ol
                    </Link>
                </Button>
            </div>
        </header>
    )
}