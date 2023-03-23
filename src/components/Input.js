export default function Input({ type = "text", label, className, placeholder }) {
    return (
        <div className={`w-full ${className}`}>
            <label className="text-bold text-gray-800 mb-1.5">{label}</label>
            <input type={type} className="w-full h-[2.875rem] rounded-lg bg-white px-3 py-2.5 border border-gray-200" placeholder={placeholder} />
        </div>
    )
}
