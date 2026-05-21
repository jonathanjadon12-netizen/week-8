import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Users, UserCheck, UserX, Clock, ArrowRight, UserPlus, Calendar, Mail, Phone } from "lucide-react";

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    avgAge: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://localhost:5000/user-api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          const list = data.payload || data || [];

          const activeList = list.filter(u => u.status === true);
          const inactiveCount = list.length - activeList.length;

          const sumAge = list.reduce((acc, curr) => acc + (curr.age || 0), 0);
          const avgAge = list.length > 0 ? Math.round(sumAge / list.length) : 0;

          setStats({
            total: list.length,
            active: activeList.length,
            inactive: inactiveCount,
            avgAge: avgAge
          });

          // Sort by creation time (descending) to get recent users
          const sorted = [...list].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setRecentUsers(sorted.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Hero Banner */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_20px_50px_rgba(99,102,241,0.1)]">
        <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-semibold text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            System Live & Operational
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Welcome to the <br />
            <span className="text-gradient-purple-cyan font-extrabold">User Management </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg">
            Manage your corporate identity registry with microsecond response times. Track key user demographics, system activations, and audit logs.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <Link
              to="/users"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-2xl shadow-[0_4px_20px_rgba(99,102,241,0.35)] transition-all duration-200 hover:scale-[1.03] text-sm"
            >
              <span>Explore Users</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/add-user"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold py-3 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.03] text-sm"
            >
              <UserPlus className="w-4 h-4 text-indigo-400" />
              <span>Register User</span>
            </Link>
          </div>
        </div>

        {/* Decorative Regular Box */}
        <div className="w-56 h-40 hidden md:flex glass-panel border border-slate-800 rounded-2xl flex-col justify-center items-center p-6 text-center space-y-2 shrink-0">
          <Users className="w-10 h-10 text-indigo-400" />
          <span className="text-3xl font-black text-white">{stats.total}</span>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Total Accounts</span>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex items-center gap-5">
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/25 rounded-2xl text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</p>
            <p className="text-3xl font-black mt-0.5">{loading ? "..." : stats.total}</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex items-center gap-5">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Status</p>
            <p className="text-3xl font-black mt-0.5 text-emerald-400">{loading ? "..." : stats.active}</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex items-center gap-5">
          <div className="p-4 bg-rose-500/10 border border-rose-500/25 rounded-2xl text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Suspended</p>
            <p className="text-3xl font-black mt-0.5 text-rose-400">{loading ? "..." : stats.inactive}</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex items-center gap-5">
          <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Age</p>
            <p className="text-3xl font-black mt-0.5 text-amber-400">{loading ? "..." : `${stats.avgAge} yrs`}</p>
          </div>
        </div>
      </div>

      {/* Grid containing Recent Activity and Navigation Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations Table */}
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white">Recent Registrations</h3>
                <p className="text-xs text-slate-400 font-medium">Newly created directories in real-time</p>
              </div>
            </div>
            <Link to="/users" className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 group">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 space-y-3">
              <p className="text-sm font-medium">Fetching real-time updates...</p>
            </div>
          ) : recentUsers.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-400 space-y-2">
              <Users className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-sm font-bold">No registered users found</p>
              <p className="text-xs text-slate-500">Go ahead and register a new identity record.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800/80 text-xs uppercase tracking-wider text-slate-400 font-bold">
                    <th className="pb-3.5 pl-2">User</th>
                    <th className="pb-3.5">Details</th>
                    <th className="pb-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {recentUsers.map((user) => {
                    const initials = user.name
                      ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
                      : "U";
                    return (
                      <tr key={user._id} className="hover:bg-white/5 transition-all duration-150">
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold flex justify-center items-center shadow-lg text-sm">
                              {initials}
                            </div>
                            <div>
                              <p className="font-extrabold text-white text-base leading-tight">{user.name}</p>
                              <p className="text-xs text-slate-500 font-medium">Age: {user.age} yrs</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="space-y-1 text-xs font-semibold text-slate-400">
                            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-400/80" /> {user.email}</p>
                            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-indigo-400/80" /> {user.mobileNumber}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${user.status
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/25 shadow-[0_0_10px_rgba(244,63,94,0.1)]"
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status ? "bg-emerald-400" : "bg-rose-400"}`}></span>
                            {user.status ? "Active" : "Suspended"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Launch Panel & Stats Summary */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl w-fit text-indigo-400">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-white">Registry Tools</h3>
              <p className="text-xs text-slate-400 font-medium">Quick options to navigate the console</p>
            </div>
            <div className="space-y-3">
              <Link
                to="/add-user"
                className="w-full glass-panel glass-panel-hover p-4 rounded-2xl flex items-center justify-between group border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex justify-center items-center font-bold">
                    +
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white leading-tight">Add New Account</p>
                    <p className="text-[11px] text-slate-400">Calculate age automatically</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/users"
                className="w-full glass-panel glass-panel-hover p-4 rounded-2xl flex items-center justify-between group border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex justify-center items-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white leading-tight">View Directory</p>
                    <p className="text-[11px] text-slate-400">Filter, search & sort accounts</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl space-y-2.5 text-xs text-slate-400 font-semibold shadow-inner">
            <p className="flex justify-between">
              <span>Database Provider</span>
              <span className="text-slate-200 font-bold">MongoDB Atlas</span>
            </p>
            <p className="flex justify-between">
              <span>Sync Interval</span>
              <span className="text-slate-200 font-bold">Real-time</span>
            </p>
            <p className="flex justify-between">
              <span>Encryption Status</span>
              <span className="text-indigo-400 font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                Secure SSH
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;