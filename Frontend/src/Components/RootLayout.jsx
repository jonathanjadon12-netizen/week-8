import { NavLink, Outlet } from "react-router";
import { Users, UserPlus, Home, AppWindow, ShieldCheck } from "lucide-react";

function RootLayout() {
  return (
    <div className="relative min-h-screen bg-[#050811] text-slate-200 flex flex-col overflow-x-hidden">
      {/* Dynamic Ambient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none animate-blob-1 z-0"></div>
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-blob-2 z-0"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none animate-blob-3 z-0"></div>

      {/* Modern Frosted Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080d1a]/75 backdrop-blur-md px-6 py-4 md:px-16 flex justify-between items-center transition-all duration-300">
        <NavLink to="/" className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-white group">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
            <AppWindow className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="flex items-center">
            User Management
            <span className="text-indigo-400 font-medium text-lg ml-1">Hub</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-2 md:gap-4 z-10">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`
            }
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`
            }
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Users Lists</span>
            <span className="sm:hidden">Users</span>
          </NavLink>

          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`
            }
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </NavLink>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 lg:px-16 max-w-7xl w-full mx-auto z-10">
        <Outlet />
      </main>

      {/* Polished Footer */}
      <footer className="w-full py-6 text-center border-t border-white/5 bg-[#050811]/90 text-xs text-slate-500 z-10 flex flex-col sm:flex-row justify-between items-center gap-3 px-6 md:px-16">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400/70" />
          <span>Enterprise User Management Portal</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} User Management Hub. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default RootLayout;