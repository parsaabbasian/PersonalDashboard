import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ResearchPage() {
    let notes: any[] = []
    try {
        notes = await prisma.note.findMany({
            orderBy: { createdAt: 'desc' },
        })
    } catch (error) {
        console.error("Failed to fetch notes:", error)
        // Fallback if DB is not ready
    }

    return (
        <div className="container py-20 animate-fade-in">
            <h1 className="mb-4 bg-gradient-text">Research Notes</h1>
            <p className="text-xl mb-12 max-w-2xl text-muted">
                Technical documentation, experiments, and learning resources.
            </p>

            {notes.length === 0 ? (
                <div className="text-center py-20 bg-secondary/20 rounded-lg border border-secondary">
                    <p className="text-xl">No research notes found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {notes.map((note: any) => (
                        <Link href={`/research/${note.id}`} key={note.id} className="card block hover:border-primary transition-colors group">
                            <h2 className="text-2xl mb-2 group-hover:text-primary transition-colors">{note.title}</h2>
                            <div className="text-sm text-muted-foreground mb-4">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </div>
                            <p className="mb-4 text-muted-foreground line-clamp-2">
                                {note.content}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {note.tags.map((tag: string) => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
