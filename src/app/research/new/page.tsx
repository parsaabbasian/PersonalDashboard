import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function NewNote() {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/api/auth/signin")

    async function createNote(formData: FormData) {
        "use server"

        // Check auth again
        const session = await getServerSession(authOptions)
        if (!session) throw new Error("Unauthorized")

        const title = formData.get("title") as string
        const content = formData.get("content") as string // Markdown content
        const tagsString = formData.get("tags") as string
        const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : []

        try {
            await prisma.note.create({
                data: {
                    title,
                    content,
                    tags,
                },
            })
        } catch (e) {
            console.error(e)
            throw new Error("Failed to create note")
        }

        redirect("/research")
    }

    return (
        <div className="container py-20 animate-fade-in">
            <h1 className="mb-8">New Research Note</h1>
            <form action={createNote} className="flex flex-col gap-6 max-w-2xl bg-card p-8 rounded-lg border border-border">
                <div>
                    <label className="label">Title</label>
                    <input name="title" placeholder="Research Topic" className="input" required />
                </div>

                <div>
                    <label className="label">Content (Markdown Supported)</label>
                    <textarea name="content" placeholder="# Abstract..." className="input h-64 font-mono text-sm" required />
                </div>

                <div>
                    <label className="label">Tags</label>
                    <input name="tags" placeholder="ai, research, design" className="input" />
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="submit" className="btn btn-primary w-full">Save Note</button>
                </div>
            </form>
        </div>
    )
}
