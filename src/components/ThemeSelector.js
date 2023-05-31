import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Moon, Sun } from './icons'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
export default function ThemeSelector() {
    const { isDark, setIsDark } = useContext(ThemeContext);
    const changeTheme = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    }
    const changeThemeClick = () => {
        if (localStorage.theme === 'dark') {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        } else {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        }
        setIsDark(localStorage.theme === "dark" ? true : false)
    }
    useEffect(() => {
        changeTheme()
        setIsDark(localStorage.theme === "dark" ? true : false)
    }, [])
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={changeThemeClick}
        >
            {
                isDark ?
                    <Sun />
                    : <Moon />
            }

        </motion.button>
    )
}
