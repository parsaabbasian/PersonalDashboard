"use client"

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <nav className="glass sticky px-8 py-4">
            <div className="container flex items-center justify-between" style={{ maxWidth: '1200px', margin: '0 auto', padding: 0 }}>
                <Link href="/" className="font-bold text-xl bg-gradient-text">
                    Personal Portfolio
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/projects" className="py-2 px-4 hover:text-accent transition-colors">Projects</Link>
                    <Link href="/research" className="py-2 px-4 hover:text-accent transition-colors">Research</Link>
                    {session ? (
                        <>
                            <Link href="/dashboard" className="py-2 px-4 text-primary font-bold">Dashboard</Link>
                            <button onClick={() => signOut()} className="btn btn-ghost text-sm">Sign Out</button>
                        </>
                    ) : (
                        <button onClick={() => signIn()} className="btn btn-primary text-sm">Sign In</button>
                    )}
                </div>
            </div>
        </nav>
    )
}
