import Link from 'next/link';

export default function Navbar() {

    const links = [
        { to: "/account", label: "Account" },
        { to: "/edit", label: "Edit" },
        { to: "/upload", label: "Upload" },
        { to: "/records", label: "Records" },
    ]

    return (
        <nav className="bg-transparent pt-4 mt-8 mb-4 w-full h-1/8">
            <div className="container mx-auto flex w-screen items-center justify-between">
                <div>
                <a href="/" className="text-gray-800 font-bold hover:text-gray-700 text-3xl block">
                    Mysite
                </a>
                </div>
                <ul className="flex space-x-4 ml-auto">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link href={link.to} className="text-gray-800 font-medium hover:text-gray-700 hover:bg-gray-300 text-lg rounded-md px-3 py-2">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
