import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function ProjectsPage() {
    let projects: any[] = []
    try {
        projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        })
    } catch (error) {
        console.error("Failed to fetch projects:", error)
        // Return empty if DB fails
    }

    return (
        <div className="container py-20 animate-fade-in">
            <h1 className="mb-4 bg-gradient-text">Projects</h1>
            <p className="text-xl mb-12 max-w-2xl text-muted">
                Explore a curated selection of my professional work and side projects.
            </p>

            {projects.length === 0 ? (
                <div className="text-center py-20 bg-secondary/20 rounded-lg border border-secondary">
                    <p className="text-xl">No projects published yet.</p>
                    <p className="text-muted-foreground mt-2">Check back soon for updates.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-8">
                    {projects.map((project: any) => (
                        <div key={project.id} className="card h-full flex flex-col">
                            <h2 className="text-2xl mb-4 group-hover:text-primary transition-colors">
                                <Link href={`/projects/${project.id}`}>{project.title}</Link>
                            </h2>
                            <p className="mb-4 flex-grow text-muted-foreground line-clamp-3">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-full bg-opacity-50">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <Link href={`/projects/${project.id}`} className="mt-6 text-primary font-medium hover:underline inline-flex items-center">
                                View Details <span className="ml-1">&rarr;</span>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
