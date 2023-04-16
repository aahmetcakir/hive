
export default function ErrorLayout({ children }) {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-error bg-cover">
            <main className="px-4">{children}</main>
        </div>
    )
}