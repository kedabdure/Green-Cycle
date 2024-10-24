import Header from "@/components/home/header/Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full shadow-md">
        <Header />
      </header>

      {/* Main content */}
      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-6">
        {children}
      </main>

      {/* Footer (optional) */}
      <footer className="w-full py-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Green Cycle. All rights reserved.
      </footer>
    </div>
  );
}
