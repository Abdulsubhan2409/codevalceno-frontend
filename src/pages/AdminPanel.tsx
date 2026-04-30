import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, FolderKanban, Mail, Users, BookOpen,
  LogOut, Plus, Search, Eye, Trash2, Edit, Bell, X,
  Send, CheckCircle, ArrowLeft, ChevronDown,
} from "lucide-react";

const API = "https://codevalceno-backend.vercel.app/api";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project { id: number; title: string; type: string; country: string; status: string; tech: string[]; }
interface Message { id: number; name: string; full_name: string; email: string; type: string; project_type: string; budget: string; budget_range: string; message: string; company: string; phone: string; status: string; date: string; created_at: string; }
interface TeamMember { id: number; name: string; role: string; email: string; status: string; }
interface BlogPost { id: number; title: string; content: string; status: string; views: number; date: string; created_at: string; }
interface Stats { projects: number; messages: number; unread: number; team: number; posts: number; }

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "team", label: "Team", icon: Users },
  { id: "blog", label: "Blog", icon: BookOpen },
];

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
    <div style={{ background: "#0d1120", border: "0.5px solid rgba(0,229,255,0.2)", borderRadius: 16, padding: 28, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{title}</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><X size={18} /></button>
      </div>
      {children}
    </div>
  </div>
);

const inputStyle: React.CSSProperties = { width: "100%", background: "#080b14", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 6 };
const btnPrimary: React.CSSProperties = { background: "#00e5ff", color: "#080b14", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" };
const btnGhost: React.CSSProperties = { background: "transparent", color: "#64748b", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer", width: "100%" };

export default function AdminPanel() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("cv_token"));
  const [token, setToken] = useState(localStorage.getItem("cv_token") || "");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState<Stats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // ─── Modal states
  const [projectModal, setProjectModal] = useState(false);
  const [teamModal, setTeamModal] = useState(false);
  const [blogModal, setBlogModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySent, setReplySent] = useState(false);

  // ─── Form states
  const [pForm, setPForm] = useState({ title: "", type: "", country: "", status: "In Progress", tech: "" });
  const [tForm, setTForm] = useState({ name: "", role: "", email: "", status: "Active" });
  const [bForm, setBForm] = useState({ title: "", content: "", status: "Draft" });

  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const safeFetch = useCallback(async (url: string) => {
    try {
      const res = await fetch(url, { headers: authHeaders() });
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  }, [authHeaders]);

  const fetchAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [s, p, m, t, b] = await Promise.all([
        safeFetch(`${API}/stats`),
        safeFetch(`${API}/projects`),
        safeFetch(`${API}/messages`),
        safeFetch(`${API}/team`),
        safeFetch(`${API}/blog`),
      ]);
      if (s) setStats(s);
      setProjects(Array.isArray(p) ? p : []);
      setMessages(Array.isArray(m) ? m : []);
      setTeam(Array.isArray(t) ? t : []);
      setPosts(Array.isArray(b) ? b : []);
      setUnreadCount((Array.isArray(m) ? m : []).filter((x: Message) => x.status === "unread").length);
    } finally {
      setLoading(false);
    }
  }, [token, safeFetch]);

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("cv_token", data.token);
        setToken(data.token); setAuthed(true); setLoginError("");
      } else { setLoginError(data.message || "Invalid email or password."); }
    } catch { setLoginError("Cannot connect to server."); }
  };

  const handleLogout = () => { localStorage.removeItem("cv_token"); setToken(""); setAuthed(false); };

  const deleteItem = async (endpoint: string, id: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${API}/${endpoint}/${id}`, { method: "DELETE", headers: authHeaders() });
    fetchAll();
  };

  const markMessageRead = async (id: number) => {
    await fetch(`${API}/messages/${id}/status`, {
      method: "PATCH", headers: authHeaders(), body: JSON.stringify({ status: "read" }),
    });
    fetchAll();
  };

  const openMessage = async (m: Message) => {
    setSelectedMessage(m);
    setReplyText("");
    setReplySent(false);
    if (m.status === "unread") await markMessageRead(m.id);
  };

 const sendReply = async () => {
  if (!replyText.trim() || !selectedMessage) return;

  try {
    const res = await fetch(`${API}/messages/${selectedMessage.id}/reply`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        replyText,
        toEmail: selectedMessage.email,
        toName: selectedMessage.full_name || selectedMessage.name,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Failed to send: " + (err.error || "Unknown error"));
      return;
    }

    setReplySent(true);
    setReplyText("");
    fetchAll();
  } catch {
    alert("Network error. Is your server running?");
  }
};

  // ─── Project CRUD
  const openAddProject = () => { setEditingProject(null); setPForm({ title: "", type: "", country: "", status: "In Progress", tech: "" }); setProjectModal(true); };
  const openEditProject = (p: Project) => { setEditingProject(p); setPForm({ title: p.title, type: p.type, country: p.country, status: p.status, tech: Array.isArray(p.tech) ? p.tech.join(", ") : "" }); setProjectModal(true); };
  const saveProject = async () => {
    const body = { ...pForm, tech: pForm.tech.split(",").map(t => t.trim()).filter(Boolean) };
    if (editingProject) {
      await fetch(`${API}/projects/${editingProject.id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(body) });
    } else {
      await fetch(`${API}/projects`, { method: "POST", headers: authHeaders(), body: JSON.stringify(body) });
    }
    setProjectModal(false); fetchAll();
  };

  // ─── Team CRUD
  const openAddMember = () => { setEditingMember(null); setTForm({ name: "", role: "", email: "", status: "Active" }); setTeamModal(true); };
  const openEditMember = (m: TeamMember) => { setEditingMember(m); setTForm({ name: m.name, role: m.role, email: m.email, status: m.status }); setTeamModal(true); };
  const saveMember = async () => {
    if (editingMember) {
      await fetch(`${API}/team/${editingMember.id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(tForm) });
    } else {
      await fetch(`${API}/team`, { method: "POST", headers: authHeaders(), body: JSON.stringify(tForm) });
    }
    setTeamModal(false); fetchAll();
  };

  // ─── Blog CRUD
  const openAddPost = () => { setEditingPost(null); setBForm({ title: "", content: "", status: "Draft" }); setBlogModal(true); };
  const openEditPost = (p: BlogPost) => { setEditingPost(p); setBForm({ title: p.title, content: p.content || "", status: p.status }); setBlogModal(true); };
  const savePost = async () => {
    if (editingPost) {
      await fetch(`${API}/blog/${editingPost.id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(bForm) });
    } else {
      await fetch(`${API}/blog`, { method: "POST", headers: authHeaders(), body: JSON.stringify(bForm) });
    }
    setBlogModal(false); fetchAll();
  };

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#080b14", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: "0 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Code<span style={{ color: "#00e5ff", textShadow: "0 0 12px rgba(0,229,255,0.5)" }}>Valceno</span></div>
          <div style={{ fontSize: 13, color: "#64748b" }}>Admin Panel — Restricted Access</div>
        </div>
        <div style={{ background: "#0d1120", border: "0.5px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: "32px 28px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#e2e8f0", margin: "0 0 24px" }}>Sign in</h2>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div><label style={labelStyle}>Email</label><input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="admin@codevalceno.com" style={inputStyle} /></div>
            <div><label style={labelStyle}>Password</label><input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••" style={inputStyle} /></div>
            {loginError && <div style={{ fontSize: 12, color: "#f87171", background: "rgba(248,113,113,0.1)", borderRadius: 8, padding: "8px 12px" }}>{loginError}</div>}
            <button type="submit" style={btnPrimary}>Sign in to Admin</button>
          </form>
        </div>
      </div>
    </div>
  );

  // ─── Message Detail View ──────────────────────────────────────────────────
  if (selectedMessage) return (
    <div style={{ minHeight: "100vh", background: "#080b14", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0", padding: 32 }}>
      <button onClick={() => setSelectedMessage(null)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Messages
      </button>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ background: "#0d1120", border: "0.5px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: 28, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#00e5ff", flexShrink: 0 }}>
              {(selectedMessage.full_name || selectedMessage.name || "?")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{selectedMessage.full_name || selectedMessage.name}</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{selectedMessage.email}</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "3px 10px", background: selectedMessage.status === "replied" ? "rgba(167,139,250,0.15)" : "rgba(52,211,153,0.15)", color: selectedMessage.status === "replied" ? "#a78bfa" : "#34d399" }}>{selectedMessage.status}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Company", value: selectedMessage.company || "—" },
              { label: "Phone", value: selectedMessage.phone || "—" },
              { label: "Project Type", value: selectedMessage.project_type || selectedMessage.type || "—" },
              { label: "Budget", value: selectedMessage.budget_range || selectedMessage.budget || "—" },
              { label: "Date", value: selectedMessage.created_at?.split("T")[0] || selectedMessage.date || "—" },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: "#080b14", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#080b14", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Message</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#cbd5e1", margin: 0 }}>{selectedMessage.message || "No message content."}</p>
          </div>
        </div>

        {/* Reply Box */}
        {replySent ? (
          <div style={{ background: "rgba(52,211,153,0.1)", border: "0.5px solid rgba(52,211,153,0.3)", borderRadius: 12, padding: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <CheckCircle size={20} color="#34d399" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#34d399" }}>Reply sent!</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Message marked as replied.</div>
            </div>
          </div>
        ) : (
          <div style={{ background: "#0d1120", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Reply to {selectedMessage.email}</div>
            <textarea
              rows={5}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              style={{ ...inputStyle, resize: "vertical", marginBottom: 12 }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={sendReply} disabled={!replyText.trim()} style={{ ...btnPrimary, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: replyText.trim() ? 1 : 0.5 }}>
                <Send size={14} /> Send Reply
              </button>
              <button onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: Your inquiry&body=${encodeURIComponent(replyText)}`, "_blank")} style={{ ...btnGhost, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                Open in Mail
              </button>
            </div>
            <p style={{ fontSize: 11, color: "#334155", marginTop: 10 }}>
              Note: "Send Reply" marks message as replied. "Open in Mail" opens your email client to actually send the email.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // ─── Main Layout ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#080b14", display: "flex", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>

      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 220 : 64, minHeight: "100vh", background: "#0d1120", borderRight: "0.5px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", transition: "width 0.2s", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ padding: "20px 16px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
          {sidebarOpen && <span style={{ fontSize: 16, fontWeight: 700, whiteSpace: "nowrap" }}>Code<span style={{ color: "#00e5ff" }}>Valceno</span></span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveSection(id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer", textAlign: "left", background: activeSection === id ? "rgba(0,229,255,0.1)" : "transparent", color: activeSection === id ? "#00e5ff" : "#64748b", fontSize: 13, fontWeight: activeSection === id ? 500 : 400, whiteSpace: "nowrap", transition: "all 0.15s" }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span>{label}</span>}
              {sidebarOpen && id === "messages" && unreadCount > 0 && (
                <span style={{ marginLeft: "auto", background: "#00e5ff", color: "#080b14", fontSize: 10, fontWeight: 700, borderRadius: 999, padding: "1px 6px" }}>{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 8px", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "#64748b", fontSize: 13, width: "100%", whiteSpace: "nowrap" }}>
            <LogOut size={16} />{sidebarOpen && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ height: 56, borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 24px", gap: 12, background: "#0d1120" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#080b14", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 12px", maxWidth: 320 }}>
            <Search size={14} color="#64748b" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{ background: "none", border: "none", outline: "none", color: "#e2e8f0", fontSize: 13, width: "100%" }} />
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", position: "relative" }}>
              <Bell size={16} />
              {unreadCount > 0 && <span style={{ position: "absolute", top: -2, right: -2, width: 6, height: 6, background: "#00e5ff", borderRadius: "50%" }} />}
            </button>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,229,255,0.15)", border: "0.5px solid rgba(0,229,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#00e5ff" }}>A</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {loading && <div style={{ textAlign: "center", padding: 40, color: "#64748b", fontSize: 13 }}>Loading...</div>}

          {/* DASHBOARD */}
          {!loading && activeSection === "dashboard" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Dashboard</h1>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 24px" }}>Welcome back — here's what's happening.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
                {[
                  { label: "Total projects", value: stats?.projects ?? projects.length, change: "All time", icon: FolderKanban, color: "#00e5ff" },
                  { label: "New messages", value: stats?.messages ?? messages.length, change: `${unreadCount} unread`, icon: Mail, color: "#a78bfa" },
                  { label: "Team members", value: stats?.team ?? team.length, change: "All active", icon: Users, color: "#34d399" },
                  { label: "Blog posts", value: stats?.posts ?? posts.length, change: "Total articles", icon: BookOpen, color: "#f59e0b" },
                ].map(({ label, value, change, icon: Icon, color }) => (
                  <div key={label} style={{ background: "#0d1120", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 12, color: "#64748b" }}>{label}</span>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={14} color={color} /></div>
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{value}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{change}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#0d1120", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 500, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}><Mail size={14} color="#00e5ff" /> Recent messages</h3>
                  {messages.slice(0, 4).map(m => (
                    <div key={m.id} onClick={() => openMessage(m)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid rgba(255,255,255,0.04)", cursor: "pointer" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#00e5ff", flexShrink: 0 }}>{(m.full_name || m.name || "?")[0]}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.full_name || m.name}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{m.project_type || m.type}</div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 500, borderRadius: 999, padding: "2px 8px", background: m.status === "unread" ? "rgba(0,229,255,0.15)" : m.status === "replied" ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.06)", color: m.status === "unread" ? "#00e5ff" : m.status === "replied" ? "#a78bfa" : "#64748b" }}>{m.status}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#0d1120", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 500, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}><FolderKanban size={14} color="#a78bfa" /> Recent projects</h3>
                  {projects.slice(0, 4).map(p => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{p.type} · {p.country}</div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 500, borderRadius: 999, padding: "2px 8px", background: p.status === "Live" ? "rgba(52,211,153,0.15)" : "rgba(245,158,11,0.15)", color: p.status === "Live" ? "#34d399" : "#f59e0b" }}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {!loading && activeSection === "projects" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div><h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Projects</h1><p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{projects.length} projects total</p></div>
                <button onClick={openAddProject} style={{ display: "flex", alignItems: "center", gap: 6, background: "#00e5ff", color: "#080b14", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> Add project</button>
              </div>
              <div style={{ background: "#0d1120", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>{["Title", "Type", "Country", "Status", "Actions"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {projects.filter(p => p.title?.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: i < projects.length - 1 ? "0.5px solid rgba(255,255,255,0.04)" : "none" }}>
                        <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500 }}>{p.title}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b" }}>{p.type}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b" }}>{p.country}</td>
                        <td style={{ padding: "14px 16px" }}><span style={{ fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "3px 8px", background: p.status === "Live" ? "rgba(52,211,153,0.15)" : "rgba(245,158,11,0.15)", color: p.status === "Live" ? "#34d399" : "#f59e0b" }}>{p.status}</span></td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => openEditProject(p)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><Edit size={14} /></button>
                            <button onClick={() => deleteItem("projects", p.id)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && <tr><td colSpan={5} style={{ padding: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>No projects yet. Click "Add project" to get started.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {!loading && activeSection === "messages" && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Messages</h1>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Contact form submissions · click to view & reply</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {messages.filter(m => (m.full_name || m.name)?.toLowerCase().includes(search.toLowerCase())).map(m => (
                  <div key={m.id} onClick={() => openMessage(m)} style={{ background: "#0d1120", border: `0.5px solid ${m.status === "unread" ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "border-color 0.15s" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#00e5ff", flexShrink: 0 }}>{(m.full_name || m.name || "?")[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{m.full_name || m.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "2px 8px", background: m.status === "unread" ? "rgba(0,229,255,0.15)" : m.status === "replied" ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.06)", color: m.status === "unread" ? "#00e5ff" : m.status === "replied" ? "#a78bfa" : "#64748b" }}>{m.status}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{m.email} · {m.project_type || m.type} · {m.budget_range || m.budget}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b", flexShrink: 0 }}>{m.created_at?.split("T")[0] || m.date}</div>
                    <div style={{ display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => openMessage(m)} style={{ background: "rgba(0,229,255,0.08)", border: "0.5px solid rgba(0,229,255,0.2)", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: "#00e5ff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Eye size={12} /> View</button>
                      <button onClick={() => deleteItem("messages", m.id)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && <div style={{ textAlign: "center", padding: 48, color: "#64748b", fontSize: 13 }}>No messages yet.</div>}
              </div>
            </div>
          )}

          {/* TEAM */}
          {!loading && activeSection === "team" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div><h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Team</h1><p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{team.length} members</p></div>
                <button onClick={openAddMember} style={{ display: "flex", alignItems: "center", gap: 6, background: "#00e5ff", color: "#080b14", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> Add member</button>
              </div>
              {team.length === 0 && <div style={{ textAlign: "center", padding: 48, color: "#64748b", fontSize: 13 }}>No team members yet. Click "Add member" to get started.</div>}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
                {team.filter(m => m.name?.toLowerCase().includes(search.toLowerCase())).map(m => (
                  <div key={m.id} style={{ background: "#0d1120", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(167,139,250,0.15)", border: "0.5px solid rgba(167,139,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#a78bfa" }}>{m.name?.split(" ").map((n: string) => n[0]).join("")}</div>
                      <div><div style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</div><div style={{ fontSize: 12, color: "#64748b" }}>{m.role}</div></div>
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>{m.email}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "2px 8px", background: "rgba(52,211,153,0.15)", color: "#34d399" }}>{m.status || "Active"}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => openEditMember(m)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><Edit size={13} /></button>
                        <button onClick={() => deleteItem("team", m.id)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><Trash2 size={13} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BLOG */}
          {!loading && activeSection === "blog" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div><h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Blog</h1><p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{posts.length} articles</p></div>
                <button onClick={openAddPost} style={{ display: "flex", alignItems: "center", gap: 6, background: "#00e5ff", color: "#080b14", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Plus size={14} /> New post</button>
              </div>
              <div style={{ background: "#0d1120", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>{["Title", "Status", "Views", "Date", "Actions"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {posts.filter(p => p.title?.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: i < posts.length - 1 ? "0.5px solid rgba(255,255,255,0.04)" : "none" }}>
                        <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 500, maxWidth: 300 }}>{p.title}</td>
                        <td style={{ padding: "14px 16px" }}><span style={{ fontSize: 11, fontWeight: 500, borderRadius: 999, padding: "3px 8px", background: p.status === "Published" ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)", color: p.status === "Published" ? "#34d399" : "#64748b" }}>{p.status}</span></td>
                        <td style={{ padding: "14px 16px", fontSize: 13, color: "#64748b" }}>{p.views > 0 ? p.views.toLocaleString() : "—"}</td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>{p.created_at?.split("T")[0] || p.date}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => openEditPost(p)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><Edit size={14} /></button>
                            <button onClick={() => deleteItem("blog", p.id)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && <tr><td colSpan={5} style={{ padding: 32, textAlign: "center", color: "#64748b", fontSize: 13 }}>No posts yet. Click "New post" to get started.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PROJECT MODAL */}
      {projectModal && (
        <Modal title={editingProject ? "Edit Project" : "Add Project"} onClose={() => setProjectModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={labelStyle}>Title</label><input value={pForm.title} onChange={e => setPForm({ ...pForm, title: e.target.value })} placeholder="Project name" style={inputStyle} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={labelStyle}>Type</label><input value={pForm.type} onChange={e => setPForm({ ...pForm, type: e.target.value })} placeholder="Web App" style={inputStyle} /></div>
              <div><label style={labelStyle}>Country</label><input value={pForm.country} onChange={e => setPForm({ ...pForm, country: e.target.value })} placeholder="Saudi Arabia" style={inputStyle} /></div>
            </div>
            <div><label style={labelStyle}>Status</label>
              <select value={pForm.status} onChange={e => setPForm({ ...pForm, status: e.target.value })} style={inputStyle}>
                <option>In Progress</option><option>Live</option><option>Completed</option><option>Paused</option>
              </select>
            </div>
            <div><label style={labelStyle}>Tech Stack (comma separated)</label><input value={pForm.tech} onChange={e => setPForm({ ...pForm, tech: e.target.value })} placeholder="React, Node.js, MySQL" style={inputStyle} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
              <button onClick={() => setProjectModal(false)} style={btnGhost}>Cancel</button>
              <button onClick={saveProject} style={btnPrimary}>{editingProject ? "Save changes" : "Add project"}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* TEAM MODAL */}
      {teamModal && (
        <Modal title={editingMember ? "Edit Member" : "Add Team Member"} onClose={() => setTeamModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={labelStyle}>Full Name</label><input value={tForm.name} onChange={e => setTForm({ ...tForm, name: e.target.value })} placeholder="John Doe" style={inputStyle} /></div>
            <div><label style={labelStyle}>Role</label><input value={tForm.role} onChange={e => setTForm({ ...tForm, role: e.target.value })} placeholder="Senior Developer" style={inputStyle} /></div>
            <div><label style={labelStyle}>Email</label><input type="email" value={tForm.email} onChange={e => setTForm({ ...tForm, email: e.target.value })} placeholder="john@codevalceno.com" style={inputStyle} /></div>
            <div><label style={labelStyle}>Status</label>
              <select value={tForm.status} onChange={e => setTForm({ ...tForm, status: e.target.value })} style={inputStyle}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
              <button onClick={() => setTeamModal(false)} style={btnGhost}>Cancel</button>
              <button onClick={saveMember} style={btnPrimary}>{editingMember ? "Save changes" : "Add member"}</button>
            </div>
          </div>
        </Modal>
      )}

      {/* BLOG MODAL */}
      {blogModal && (
        <Modal title={editingPost ? "Edit Post" : "New Blog Post"} onClose={() => setBlogModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={labelStyle}>Title</label><input value={bForm.title} onChange={e => setBForm({ ...bForm, title: e.target.value })} placeholder="Post title" style={inputStyle} /></div>
            <div><label style={labelStyle}>Content</label><textarea rows={8} value={bForm.content} onChange={e => setBForm({ ...bForm, content: e.target.value })} placeholder="Write your post content..." style={{ ...inputStyle, resize: "vertical" }} /></div>
            <div><label style={labelStyle}>Status</label>
              <select value={bForm.status} onChange={e => setBForm({ ...bForm, status: e.target.value })} style={inputStyle}>
                <option>Draft</option><option>Published</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
              <button onClick={() => setBlogModal(false)} style={btnGhost}>Cancel</button>
              <button onClick={savePost} style={btnPrimary}>{editingPost ? "Save changes" : "Publish post"}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}