import { Logo } from '@/components/icons'
import { useState } from 'react'

export default function Footer() {
    const [fullYear, setFullYear] = useState(new Date().getFullYear())
    return (
        <footer className='h-[64px] flex items-end justify-between pb-4'>
            <Logo className={"w-32"} />
            <div>
                <span>
                    © {fullYear} Hive. All rights reserved.
                </span>
            </div>
        </footer>
    )
}