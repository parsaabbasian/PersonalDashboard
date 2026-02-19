import Link from 'next/link'

export default function Home() {
  return (
    <div className="container py-20">
      <section className="text-center mb-8 animate-fade-in">
        <h1 className="mb-4 bg-gradient-text" style={{ fontSize: '4rem' }}>Welcome</h1>
        <p className="text-xl mx-auto" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
          A centralized hub for my projects, research notes, and creative work.
          <br />
          Manage content securely through the admin dashboard.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/projects" className="btn btn-primary">View Projects</Link>
          <Link href="/research" className="btn btn-ghost" style={{ borderColor: 'hsl(var(--border))', border: '1px solid' }}>Read Research</Link>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8" style={{ marginTop: '4rem' }}>
        <div className="card">
          <h2 className="text-2xl mb-4">Featured Work</h2>
          <p>Explore a collection of my engineering projects and designs.</p>
          <Link href="/projects" className="text-primary font-bold hover:text-accent">Browse Projects &rarr;</Link>
        </div>
        <div className="card">
          <h2 className="text-2xl mb-4">Research & Notes</h2>
          <p>Technical deep dives, experiments, and ongoing research.</p>
          <Link href="/research" className="text-primary font-bold hover:text-accent">Read Notes &rarr;</Link>
        </div>
      </div>
    </div>
  )
}
