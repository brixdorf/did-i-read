import Calendar from '../components/Calendar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8 tracking-tight">
        Did I Read?
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        <Calendar title="📰 Newspaper" />
        <Calendar title="📚 Book" />
      </div>
    </div>
  )
}