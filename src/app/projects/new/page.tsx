import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function NewProject() {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/api/auth/signin")

    async function createProject(formData: FormData) {
        "use server"

        // Check auth again in action for security
        const session = await getServerSession(authOptions)
        if (!session) throw new Error("Unauthorized")

        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const content = formData.get("content") as string
        const tagsString = formData.get("tags") as string
        const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : []

        try {
            await prisma.project.create({
                data: {
                    title,
                    description,
                    content,
                    tags,
                },
            })
        } catch (e) {
            console.error(e)
            throw new Error("Failed to create project")
        }

        redirect("/projects")
    }

    return (
        <div className="container py-20 animate-fade-in">
            <h1 className="mb-8">Create New Project</h1>
            <form action={createProject} className="flex flex-col gap-6 max-w-2xl bg-card p-8 rounded-lg border border-border">
                <div>
                    <label className="label">Project Title</label>
                    <input name="title" placeholder="e.g. Personal Dashboard" className="input" required />
                </div>

                <div>
                    <label className="label">Short Description</label>
                    <textarea name="description" placeholder="Brief overview for the card..." className="input h-24" required />
                </div>

                <div>
                    <label className="label">Content (Markdown)</label>
                    <textarea name="content" placeholder="# Project Details..." className="input h-64 font-mono text-sm" />
                </div>

                <div>
                    <label className="label">Tags</label>
                    <input name="tags" placeholder="nextjs, typescript, prisma" className="input" />
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="submit" className="btn btn-primary w-full">Publish Project</button>
                </div>
            </form>
        </div>
    )
}
