export default function Logo({ className }) {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <img className="w-52" src="../Logo.png" />
        </div>
    )
}