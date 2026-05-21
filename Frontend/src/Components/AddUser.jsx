import React, { useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Phone, Calendar, ArrowLeft, Check, ShieldAlert } from "lucide-react";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      name: formData.name,
      email: formData.email,
      age: calculateAge(formData.dob),
      dateOfBirth: formData.dob,
      mobileNumber: Number(formData.mobile),
      status: true
    };

    try {
      const res = await fetch("http://localhost:5000/user-api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast("Identity registered successfully ✅");
        // Reset form
        setFormData({
          name: "",
          dob: "",
          email: "",
          mobile: ""
        });
        
        // Wait briefly for the user to see the success toast, then redirect
        setTimeout(() => {
          navigate("/users");
        }, 1500);
      } else {
        const errData = await res.json();
        showToast(`Failed to register: ${errData.message || "Unknown error"}`, "error");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      showToast("Network error. Please verify the API connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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

      {/* Back button */}
      <div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm font-bold group transition"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-all" />
          <span>Back to safety</span>
        </button>
      </div>

      {/* Core Add Form Container */}
      <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(99,102,241,0.08)] border-white/5 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-black text-white">Create Identity Profile</h2>
          <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
            Input the details below to generate a new entry. Age is calculated automatically.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Jonathan Doe"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-semibold glass-input shadow-inner"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 pointer-events-none" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-semibold glass-input shadow-inner"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. jonathan@example.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-semibold glass-input shadow-inner"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                required
                placeholder="e.g. 9876543210"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-semibold glass-input shadow-inner"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-650 text-white font-extrabold rounded-xl shadow-[0_4px_25px_rgba(99,102,241,0.25)] transition-all duration-250 hover:scale-[1.02] text-sm flex items-center justify-center gap-2 cursor-pointer ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <span>Syncing with server...</span>
              </>
            ) : (
              <span>Add User</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;