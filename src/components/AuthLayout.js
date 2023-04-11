
export default function AuthLayout({ children }) {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-auth">
            <main className="px-4">{children}</main>
        </div>
    )
}