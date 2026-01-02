'use client';

export function Sidebar() {
  // Sidebar pode ser expandida no futuro com navegação adicional
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden lg:block">
      <nav className="space-y-2">
        <a
          href="/dashboard"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          Dashboard
        </a>
      </nav>
    </aside>
  );
}





