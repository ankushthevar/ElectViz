import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, History, Map as MapIcon, Settings, BarChart3 } from 'lucide-react';

const navItems = [
  { name: 'Parliament Overview', icon: LayoutDashboard, href: '/' },
  { name: 'Lok Sabha Map', icon: MapIcon, href: '/' },
  { name: 'Performance Stats', icon: BarChart3, href: '#' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 fixed left-0 top-0 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            E
          </div>
          ElectionViz
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <Settings size={20} />
          Settings
        </button>
      </div>
    </aside>
  );
};
