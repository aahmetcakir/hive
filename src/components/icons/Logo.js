import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
export default function Logo({ className }) {
    const { isDark } = useContext(ThemeContext);
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <img className="w-52" src={`/img/${isDark ? "logoInvert" : "logo"}.png`} />
        </div>
    )
}