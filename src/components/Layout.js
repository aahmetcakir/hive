import Header from "@/components/Header"

export default function Layout({ children }) {
    return (
        <div className="max-w-[1140px] mx-auto relative">
            <Header classname={"mb-7"} />
            <main className="px-4">{children}</main>
        </div>
    )
}