import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface-dark pb-24 md:pb-0 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto min-h-screen relative shadow-sm border-x border-slate-100 flex flex-col md:flex-row bg-surface-dark">
        {/* Sidebar for Desktop / Topbar for Mobile */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-200 px-4 py-3 md:py-8 md:w-64 md:h-screen flex-shrink-0 flex md:flex-col justify-between items-center md:items-start order-1 md:order-none">
          <div className="flex items-center">
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent tracking-tight">
              Safar
            </h1>
          </div>
          {/* Mock nav links for desktop */}
          <nav className="hidden md:flex flex-col gap-2 mt-10 w-full">
            <a href="/" className="px-4 py-3 bg-primary-50 text-primary-700 font-medium rounded-xl">Dashboard</a>
            <a href="/request/new" className="px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl">New Ride</a>
            <a href="#" className="px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl mt-auto">Profile</a>
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full bg-slate-50 relative order-2 md:order-none">
          {/* Constrain width within main content to make it readable like a feed */}
          <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white md:min-h-screen md:border-x border-slate-100 shadow-sm">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
