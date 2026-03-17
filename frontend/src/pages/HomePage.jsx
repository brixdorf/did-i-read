import Calendar from '../components/Calendar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 pt-12">
      <h1 className="text-7xl font-bold text-center mb-8 font-heading">
        Did I Read Today?
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        <Calendar title="📰 Newspaper" />
        <Calendar title="📚 Book" />
      </div>
    </div>
  )
}