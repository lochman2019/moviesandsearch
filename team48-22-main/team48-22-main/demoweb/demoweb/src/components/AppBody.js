import Navbar from "./Navbar"


export default function AppBody({ current }) {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <Navbar />
            <div className="flex mx-auto h-7/8 overflow-y-auto w-screen bg-opacity-50 backdrop-blur-lg grow p-8 shadow-md rounded-md">
                {current}
            </div>
        </div>
    )
}