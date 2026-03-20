import Calendar from '../components/Calendar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 pt-12">
      <h1 className="text-7xl text-gray-900 dark:text-white font-bold text-center mb-8 font-heading">
        Did I Read Today?
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        <Calendar title="📰 Newspaper" type="newspaper" />
<Calendar title="📚 Book" type="book" />
      </div>
    </div>
  )
}