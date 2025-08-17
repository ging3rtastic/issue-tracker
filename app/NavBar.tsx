import Link             from 'next/link'
import React            from 'react'

import { GiFire }       from "react-icons/gi";

const NavBar = () => {

    const links = [
        { href : "/",       label : "Dashboard" },
        { href : "/issues", label : "Issues" },
    ];
  return (
    <>
        <nav className='flex space-x-6 justify-between items-center bg-gray-800 text-white p-4'>
            
            <Link href="/" className="nav-link">
                <GiFire className='hover:text-green-500'/>
            </Link>

            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link className='hover:text-green-500 transition-colors' href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </>
  )
}

export default NavBar