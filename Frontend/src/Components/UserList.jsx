import { useEffect, useState } from "react";
import User from "./User";
import { Search, SlidersHorizontal, Grid, List, Mail, Phone, Calendar, Trash2, Edit2, AlertTriangle, X, Check, ShieldAlert } from "lucide-react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // Modals state
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    dob: "",
    mobile: "",
    status: true
  });
  const [toast, setToast] = useState(null);

  // Fetch users
  async function getUsers() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/user-api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.payload || data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Error connecting to server. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Handle Edit click
  const handleEditClick = (user) => {
    // Format date to YYYY-MM-DD for date input
    let formattedDate = "";
    if (user.dateOfBirth) {
      const d = new Date(user.dateOfBirth);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toISOString().split("T")[0];
      }
    }
    setEditingUser(user);
    setEditFormData({
      name: user.name || "",
      email: user.email || "",
      dob: formattedDate,
      mobile: user.mobileNumber || "",
      status: user.status ?? true
    });
  };

  // Handle Edit form change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Submit Edit Form
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Calculate age from Date of Birth
    const calculateAge = (dobString) => {
      if (!dobString) return 0;
      const today = new Date();
      const birthDate = new Date(dobString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const payload = {
      name: editFormData.name,
      email: editFormData.email,
      age: calculateAge(editFormData.dob),
      dateOfBirth: editFormData.dob,
      mobileNumber: Number(editFormData.mobile),
      status: editFormData.status
    };

    try {
      const res = await fetch(`http://localhost:5000/user-api/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast("User updated successfully ✅");
        setEditingUser(null);
        getUsers(); // Refresh list
      } else {
        const errData = await res.json();
        showToast(`Failed to update: ${errData.message || "Unknown error"}`, "error");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showToast("Error updating user. Try again.", "error");
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user-api/users/${deletingUser._id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        showToast("User removed from database successfully ✅");
        setDeletingUser(null);
        getUsers(); // Refresh list
      } else {
        showToast("Failed to remove user record", "error");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Connection error while deleting user", "error");
    }
  };

  // Search and Sort logic
  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term) ||
      String(u.mobileNumber || "").includes(term)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "name-asc") {
      return (a.name || "").localeCompare(b.name || "");
    }
    if (sortBy === "name-desc") {
      return (b.name || "").localeCompare(a.name || "");
    }
    if (sortBy === "age-asc") {
      return (a.age || 0) - (b.age || 0);
    }
    if (sortBy === "age-desc") {
      return (b.age || 0) - (a.age || 0);
    }
    if (sortBy === "newest") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`fixed top-24 right-6 md:right-12 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] border backdrop-blur-md ${
          toast.type === "success" 
            ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30" 
            : "bg-rose-950/80 text-rose-300 border-rose-500/30"
        }`}>
          <div className={`p-1.5 rounded-lg ${toast.type === "success" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
            {toast.type === "success" ? <Check className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
          </div>
          <span className="text-sm font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header controls section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">Users List</h2>
          <p className="text-sm text-slate-400 font-medium">Browse, search, sort, and manage system accounts</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
            title="List Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search & Sort Panel */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-[0_10px_30px_-10px_rgba(99,102,241,0.05)]">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-semibold glass-input shadow-inner"
          />
        </div>

        {/* Sort drop-down */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            <span>Sort By:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2.5 pl-3 pr-8 rounded-xl text-sm font-semibold bg-[#0f172a] border border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          >
            <option value="newest">Recently Registered</option>
            <option value="name-asc">Name (A - Z)</option>
            <option value="name-desc">Name (Z - A)</option>
            <option value="age-asc">Age (Youngest First)</option>
            <option value="age-desc">Age (Oldest First)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-32 text-center text-slate-400 space-y-3">
          <p className="text-sm font-bold">Querying registry database...</p>
        </div>
      ) : sortedUsers.length === 0 ? (
        <div className="py-24 text-center glass-panel border-dashed border-slate-800/80 rounded-3xl text-slate-400 space-y-3">
          <Search className="w-12 h-12 mx-auto text-slate-600" />
          <p className="text-lg font-black text-slate-300">No identities match criteria</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or verify that user accounts have been added to the directory.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map((user) => (
            <User 
              key={user._id} 
              user={user} 
              onEdit={handleEditClick} 
              onDelete={setDeletingUser} 
            />
          ))}
        </div>
      ) : (
        /* Highly Polished List View Table */
        <div className="glass-panel rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="bg-slate-950/30 border-b border-slate-800/80 text-xs uppercase tracking-wider text-slate-400 font-bold">
                  <th className="py-4 px-6">User Profile</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {sortedUsers.map((user) => {
                  const initials = user.name
                    ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
                    : "U";
                  return (
                    <tr key={user._id} className="hover:bg-white/5 transition-all duration-150">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold flex justify-center items-center shadow-lg text-sm">
                            {initials}
                          </div>
                          <div>
                            <p className="font-extrabold text-white text-base leading-tight">{user.name}</p>
                            <p className="text-xs text-slate-500 font-medium">Age: {user.age} yrs • DOB: {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="space-y-1 text-xs font-semibold text-slate-400">
                          <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-400/80" /> {user.email}</p>
                          <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-indigo-400/80" /> {user.mobileNumber}</p>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          user.status 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" 
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/25"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status ? "bg-emerald-400" : "bg-rose-400"}`}></span>
                          {user.status ? "Active" : "Suspended"}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:text-white transition-all"
                            title="Edit User"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingUser(user)}
                            className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-white transition-all"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit User Custom Glass Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <div 
            className="absolute inset-0 bg-[#05070d]/80 backdrop-blur-sm"
            onClick={() => setEditingUser(null)}
          ></div>

          {/* Modal content */}
          <div className="glass-panel w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-indigo-500/20 z-10">
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-black text-white">Edit User Directory</h3>
              </div>
              <button 
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold glass-input"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={editFormData.dob}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold glass-input"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold glass-input"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={editFormData.mobile}
                  onChange={handleEditChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold glass-input"
                />
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800 rounded-2xl">
                <div>
                  <p className="text-sm font-bold text-white leading-tight">Account Status</p>
                  <p className="text-[11px] text-slate-500 font-semibold">Active accounts are listable in dashboards</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={editFormData.status}
                    onChange={handleEditChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-5 py-3 rounded-xl text-sm font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.3)] transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Custom Glass Dialog */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#05070d]/80 backdrop-blur-sm"
            onClick={() => setDeletingUser(null)}
          ></div>

          <div className="glass-panel w-full max-w-md rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-rose-500/20 z-10">
            <div className="p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex justify-center items-center text-rose-400 mx-auto shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-white">Confirm Record Removal</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed px-4">
                  Are you absolutely sure you want to remove <span className="text-white font-extrabold">{deletingUser.name}</span> from the systems database? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex px-6 pb-6 gap-3">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="w-1/2 py-3 rounded-xl text-sm font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="w-1/2 py-3 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-[0_4px_15px_rgba(244,63,94,0.3)] transition"
              >
                Remove Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;