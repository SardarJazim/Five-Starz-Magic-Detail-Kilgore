import React, { useEffect, useState } from "react";
import { Booking, ContactMessage } from "../types";
import { ShieldCheck, Calendar, MessageSquare, Check, X, Trash2, Clock, Car, Filter, RefreshCw, AlertCircle } from "lucide-react";

export default function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStr, setErrorStr] = useState("");
  
  const [activeTab, setActiveTab] = useState<"bookings" | "contacts">("bookings");
  
  // Filtering states
  const [bookingFilter, setBookingFilter] = useState<string>("all");
  const [contactFilter, setContactFilter] = useState<string>("all");

  // Fetch admin database arrays on mount
  const fetchDbData = async () => {
    setLoading(true);
    setErrorStr("");
    try {
      const bookingsRes = await fetch("/api/bookings");
      const contactsRes = await fetch("/api/contacts");
      
      if (!bookingsRes.ok || !contactsRes.ok) {
        throw new Error("Unable to read admin sheets from server.");
      }

      const bookingsArr = await bookingsRes.json();
      const contactsArr = await contactsRes.json();
      
      setBookings(bookingsArr);
      setContacts(contactsArr);
    } catch (err: any) {
      console.error(err);
      setErrorStr(err.message || "Failed to load database. Is the Express API server active?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  // Update Booking Status API Call
  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to alter booking status.");
      }

      // Locally update state array
      setBookings(prev => prev.map(item => item.id === id ? { ...item, status: newStatus as any } : item));
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    }
  };

  // Delete Booking API Call
  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking record? This database action is irreversible.")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Could not delete from backend.");
      setBookings(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed.");
    }
  };

  // Update Contact Status API Call
  const handleUpdateContactStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error("Could not update status.");
      setContacts(prev => prev.map(item => item.id === id ? { ...item, status: newStatus as any } : item));
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    }
  };

  // Delete Contact API Call
  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Delete this contact query?")) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Could not remove message.");
      setContacts(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed.");
    }
  };

  // Filter lists based on state
  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === "all") return true;
    return b.status === bookingFilter;
  });

  const filteredContacts = contacts.filter(c => {
    if (contactFilter === "all") return true;
    return c.status === contactFilter;
  });

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <span className="bg-[#7ED957]/25 text-[#7ED957] font-mono text-[10px] uppercase px-3 py-1 rounded-full font-bold">Confirmed</span>;
      case "completed":
        return <span className="bg-[#18A8FF]/25 text-[#18A8FF] font-mono text-[10px] uppercase px-3 py-1 rounded-full font-bold">★ Completed</span>;
      case "cancelled":
        return <span className="bg-red-500/20 text-red-500 font-mono text-[10px] uppercase px-3 py-1 rounded-full font-bold">Cancelled</span>;
      default:
        return <span className="bg-orange-500/20 text-orange-400 font-mono text-[10px] uppercase px-3 py-1 rounded-full font-bold animate-pulse">Pending</span>;
    }
  };

  return (
    <div className="py-12 relative z-10" id="admin-panel-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and stats summary */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1 bg-[#E63946]/10 border border-[#E63946]/30 px-3 py-1 rounded-lg text-xs font-mono text-[#E63946] mb-2 uppercase select-none">
              <ShieldCheck className="h-4 w-4" />
              <span>Owner Control Dashboard</span>
            </div>
            <h2 className="font-display text-2.5xl sm:text-3.5xl font-black text-white tracking-tight uppercase leading-none">
              Business <span className="text-[#18A8FF] text-glow-blue">Database</span> Manager
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Store, inspect, and update live detailing requests in Kilgore & Longview, Texas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDbData}
              className="flex items-center gap-1 px-3 py-2 text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 text-slate-200 rounded-md border border-white/5 transition-all outline-none cursor-pointer"
              disabled={loading}
              id="admin-refresh-btn"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Reload DB</span>
            </button>
          </div>
        </div>

        {/* Global tab controllers */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold font-sans text-sm transition-all focus:outline-none cursor-pointer ${
              activeTab === "bookings"
                ? "bg-[#18A8FF] text-black shadow-md shadow-[#18A8FF]/20"
                : "bg-[#0F132A] text-slate-400 hover:text-white border border-white/5"
            }`}
            id="admin-tab-bookings"
          >
            <Calendar className="h-4.5 w-4.5" />
            <span>Detailing Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold font-sans text-sm transition-all focus:outline-none cursor-pointer ${
              activeTab === "contacts"
                ? "bg-[#7ED957] text-black shadow-md shadow-[#7ED957]/20"
                : "bg-[#0F132A] text-slate-400 hover:text-white border border-white/5"
            }`}
            id="admin-tab-contacts"
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span>Contact Messages ({contacts.length})</span>
          </button>
        </div>

        {/* Catch error strings */}
        {errorStr && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorStr}</span>
          </div>
        )}

        {/* Core database table widgets */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 font-mono text-sm">
            <RefreshCw className="h-8 w-8 text-[#18A8FF] animate-spin mb-3" />
            <span>Accessing database queries...</span>
          </div>
        ) : activeTab === "bookings" ? (
          /* Bookings Tab View */
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-[#0F132A]/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 font-sans text-xs text-slate-400">
                <Filter className="h-4 w-4 text-[#18A8FF]" />
                <span>Filter Booking Status:</span>
              </div>
              <div className="flex gap-1">
                {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilter(status)}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                      bookingFilter === status
                        ? "bg-[#18A8FF]/20 text-[#18A8FF] border border-[#18A8FF]/40"
                        : "bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* List entries */}
            {filteredBookings.length === 0 ? (
              <div className="py-16 text-center text-slate-500 font-sans border border-dashed border-white/5 rounded-2xl">
                No bookings found with status "{bookingFilter}".
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl glass-border-blue border-l-4 md:border-l-8 border-l-[#18A8FF] transition-all grid grid-cols-1 md:grid-cols-4 items-start gap-4"
                    id={`admin-booking-row-${b.id}`}
                  >
                    {/* User and Vehicle Details */}
                    <div className="md:col-span-1 space-y-1">
                      <h4 className="font-display font-black text-white text-base leading-tight uppercase">
                        {b.name}
                      </h4>
                      <p className="text-xs font-mono text-[#18A8FF] text-glow-blue">{b.phone}</p>
                      <p className="text-xs text-slate-400 max-w-[180px] break-all">{b.email}</p>
                      <div className="pt-2 text-[10px] text-slate-500 font-sans">
                        Logged: {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Vehicle and Service */}
                    <div className="md:col-span-1 space-y-1">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#7ED957] font-bold uppercase tracking-wider text-glow-green">
                        <Car className="h-3.5 w-3.5" />
                        <span>{b.vehicleMakeModel}</span>
                      </div>
                      <span className="inline-block bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md text-[10px] uppercase font-mono mt-1">
                        🚗 {b.vehicleType}
                      </span>
                      <p className="text-xs text-slate-300 font-sans font-semibold pt-1">
                        Service: {b.serviceName}
                      </p>
                    </div>

                    {/* Preferred Date Schedule and Notes */}
                    <div className="md:col-span-1 space-y-1">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-white">
                        <Clock className="h-3.5 w-3.5 text-[#18A8FF]" />
                        <span>{b.preferredDate}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#18A8FF] font-mono">{b.preferredTime}</p>
                      {b.additionalNotes && (
                        <div className="mt-2 text-[10px] sm:text-[11px] leading-relaxed italic bg-black/30 p-2 rounded-lg border border-white/5 text-slate-300 font-sans max-h-[80px] overflow-y-auto">
                          Notes: "{b.additionalNotes}"
                        </div>
                      )}
                    </div>

                    {/* Operational controls */}
                    <div className="md:col-span-1 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-end gap-2 shrink-0 self-center">
                      <div className="mb-2 sm:mb-0 md:mb-2 lg:mb-0 mr-auto lg:mr-2">
                        {getStatusBadge(b.status)}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Confirm switch */}
                        {b.status === "pending" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, "confirmed")}
                            className="p-1.5 rounded-md bg-[#7ED957]/15 hover:bg-[#7ED957] text-[#7ED957] hover:text-black border border-[#7ED957]/30 transition-all cursor-pointer"
                            title="Confirm Booking"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        
                        {/* Complete execution switch */}
                        {b.status === "confirmed" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, "completed")}
                            className="p-1.5 rounded-md bg-[#18A8FF]/15 hover:bg-[#18A8FF] text-[#18A8FF] hover:text-black border border-[#18A8FF]/30 transition-all cursor-pointer font-bold"
                            title="Mark Completed"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}

                        {/* Cancel switch */}
                        {b.status !== "cancelled" && b.status !== "completed" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, "cancelled")}
                            className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all cursor-pointer"
                            title="Cancel Booking"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}

                        {/* Real database delete option */}
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="p-1.5 rounded-md bg-white/5 hover:bg-red-600/80 text-slate-400 hover:text-white border border-white/5 hover:border-red-600 transition-all cursor-pointer"
                          title="Delete booking data permanent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Contacts Messages Tab View */
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-[#0F132A]/50 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 font-sans text-xs text-slate-400">
                <Filter className="h-4 w-4 text-[#7ED957]" />
                <span>Filter Message Status:</span>
              </div>
              <div className="flex gap-1">
                {["all", "unread", "read", "replied"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setContactFilter(status)}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                      contactFilter === status
                        ? "bg-[#7ED957]/20 text-[#7ED957] border border-[#7ED957]/40"
                        : "bg-slate-900/40 text-slate-400 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* List entries */}
            {filteredContacts.length === 0 ? (
              <div className="py-16 text-center text-slate-500 font-sans border border-dashed border-white/5 rounded-2xl">
                No contact messages found with status "{contactFilter}".
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredContacts.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl glass-border-green border-l-4 md:border-l-8 border-l-[#7ED957] transition-all grid grid-cols-1 md:grid-cols-4 items-start gap-4"
                    id={`admin-contact-row-${c.id}`}
                  >
                    {/* User Profile */}
                    <div className="space-y-1">
                      <h4 className="font-display font-black text-white text-base uppercase leading-tight">
                        {c.name}
                      </h4>
                      {c.phone && <p className="text-xs font-mono text-[#7ED957] text-glow-green">{c.phone}</p>}
                      <p className="text-xs text-slate-400 max-w-[180px] break-all">{c.email}</p>
                      <div className="pt-2 text-[10px] text-slate-500 font-sans">
                        Sent: {new Date(c.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div className="md:col-span-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#18A8FF] text-glow-blue tracking-wide">
                        ● MESSAGE SUBJECT:
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white font-sans mt-1">
                        {c.subject || "No Subject provided"}
                      </p>
                    </div>

                    {/* Actual query text */}
                    <div className="md:col-span-1 bg-black/40 p-3 rounded-lg border border-white/5">
                      <span className="text-[9px] uppercase font-mono text-slate-500 font-semibold block mb-1">
                        MESSAGE BODY:
                      </span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed max-h-[120px] overflow-y-auto whitespace-pre-wrap">
                        "{c.message}"
                      </p>
                    </div>

                    {/* Options controller info */}
                    <div className="md:col-span-1 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-end gap-2 self-center shrink-0">
                      <div className="mb-2 sm:mb-0 md:mb-2 lg:mb-0 mr-auto lg:mr-2">
                        {c.status === "unread" ? (
                          <span className="bg-orange-500/20 text-orange-400 font-mono text-[10px] uppercase px-3 py-1 rounded-full font-bold animate-pulse">Unread</span>
                        ) : c.status === "read" ? (
                          <span className="bg-[#18A8FF]/25 text-[#18A8FF] font-mono text-[10px] uppercase px-3 py-1 rounded-full font-bold">Read</span>
                        ) : (
                          <span className="bg-[#7ED957]/25 text-[#7ED957] font-mono text-[10px] uppercase px-3 py-1 rounded-full font-bold">✔ Replied</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {c.status === "unread" && (
                          <button
                            onClick={() => handleUpdateContactStatus(c.id, "read")}
                            className="p-1.5 rounded-md bg-[#18A8FF]/15 hover:bg-[#18A8FF] text-[#18A8FF] hover:text-black border border-[#18A8FF]/30 transition-all cursor-pointer"
                            title="Mark Reed"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}

                        {c.status === "read" && (
                          <button
                            onClick={() => handleUpdateContactStatus(c.id, "replied")}
                            className="p-1.5 rounded-md bg-[#7ED957]/15 hover:bg-[#7ED957] text-[#7ED957] hover:text-black border border-[#7ED957]/30 transition-all cursor-pointer"
                            title="Mark Replied"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteContact(c.id)}
                          className="p-1.5 rounded-md bg-white/5 hover:bg-red-600/80 text-slate-400 hover:text-white border border-white/5 hover:border-red-600 transition-all cursor-pointer"
                          title="Delete contact record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
