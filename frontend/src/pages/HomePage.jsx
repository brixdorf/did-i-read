import Calendar from "../components/Calendar";

export default function HomePage() {
  return (
    <div className="min-h-screen rainbow-bg p-4 pt-12">
      <h1 className="text-7xl heading-3d font-bold text-center mb-8 font-heading">
        Did I Read Today?
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        <Calendar title="📰 Newspaper" type="newspaper" />
        <Calendar title="📚 Book" type="book" />
      </div>
    </div>
  );
}
