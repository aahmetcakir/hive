export default function Button({ children, className }) {
    return (
        <button className={`w-full py-3 bg-green-500 rounded-md text-white ${className}`}>
            {children}
        </button>
    )
}
