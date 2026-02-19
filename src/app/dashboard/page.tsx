import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/api/auth/signin")
    }

    return (
        <div className="container py-20 animate-fade-in">
            <h1 className="mb-4">Admin Dashboard</h1>
            <p className="text-xl mb-12">
                Welcome back, <span className="bg-gradient-text font-bold">{session.user?.name || session.user?.email}</span>
            </p>

            <div className="grid grid-cols-2 gap-8">
                <div className="card">
                    <h2 className="mb-4 text-accent">Projects</h2>
                    <p className="mb-6">Manage portfolio projects and case studies.</p>
                    <div className="flex gap-4">
                        <Link href="/projects" className="btn btn-ghost" style={{ border: '1px solid hsl(var(--border))' }}>View All</Link>
                        <Link href="/projects/new" className="btn btn-primary">Create New</Link>
                    </div>
                </div>

                <div className="card">
                    <h2 className="mb-4 text-accent">Research</h2>
                    <p className="mb-6">Manage research notes and technical documentation.</p>
                    <div className="flex gap-4">
                        <Link href="/research" className="btn btn-ghost" style={{ border: '1px solid hsl(var(--border))' }}>View All</Link>
                        <Link href="/research/new" className="btn btn-primary">Add Note</Link>
                    </div>
                </div>

                <div className="card glass" style={{ gridColumn: '1 / -1' }}>
                    <h2 className="mb-4">Quick Stats</h2>
                    <div className="flex gap-8">
                        <div>
                            <span className="text-2xl font-bold block">0</span>
                            <span className="text-sm opacity-70">Projects</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold block">0</span>
                            <span className="text-sm opacity-70">Notes</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold block">Active</span>
                            <span className="text-sm opacity-70">Status</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
