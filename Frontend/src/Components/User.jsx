import { Mail, Phone, Calendar, UserCheck, Trash2, Edit2 } from "lucide-react";

function User({ user, onEdit, onDelete }) {
  // Generate user initials
  const initials = user.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "U";

  // Format DOB safely
  const formattedDob = user.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "N/A";

  return (
    <div className="glass-panel glass-panel-hover p-6 rounded-3xl flex flex-col justify-between space-y-6 border-white/5 relative overflow-hidden transition-all duration-300">
      {/* Decorative Glow Dot */}
      <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${user.status ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`}></span>

      {/* Profile Summary Header */}
      <div className="flex items-start gap-4">
        {/* Colorful Gradient Avatar */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold flex justify-center items-center shadow-lg text-sm shrink-0">
          {initials}
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-white text-lg leading-tight tracking-tight hover:text-indigo-300 transition-colors duration-200">
            {user.name}
          </h3>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.status
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/25"
            }`}>
            {user.status ? "Active" : "Suspended"}
          </span>
        </div>
      </div>

      {/* Core Demographics / Contact Information */}
      <div className="space-y-3.5 text-xs font-semibold text-slate-400 border-t border-b border-white/5 py-4">
        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-indigo-400/80 shrink-0" />
          <span className="truncate text-slate-300" title={user.email}>{user.email}</span>
        </div>

        {/* Mobile Number */}
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-indigo-400/80 shrink-0" />
          <span className="text-slate-300">{user.mobileNumber}</span>
        </div>

        {/* Date of Birth */}
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-indigo-400/80 shrink-0" />
          <span className="text-slate-300">DOB: {formattedDob}</span>
        </div>

        {/* Age */}
        <div className="flex items-center gap-3">
          <UserCheck className="w-4 h-4 text-indigo-400/80 shrink-0" />
          <span className="text-slate-300">Age: {user.age} years old</span>
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="flex items-center justify-end gap-2.5 pt-1">
        <button
          onClick={() => onEdit(user)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all duration-200 hover:scale-[1.03]"
          title="Edit User Profile"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(user)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold bg-rose-500/10 border border-rose-500/25 text-rose-400 hover:bg-rose-600 hover:text-white rounded-xl transition-all duration-200 hover:scale-[1.03]"
          title="Delete User Record"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}

export default User;