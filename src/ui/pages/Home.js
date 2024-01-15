import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Icon({ name, size = 18, sw = 1.8, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {ICONS[name]}
    </svg>
  );
}

const ICONS = {
  overview: <><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></>,
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></>,
  calendar: <><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></>,
  drop: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  sparkle: <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />,
  settings: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>,
  panel: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /></>,
  chevrons: <><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>,
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  rain: <><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v6" /><path d="M8 14v6" /><path d="M12 16v6" /></>,
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  partly: <><path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M20 12h2" /><path d="m19.07 4.93-1.41 1.41" /><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" /><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" className="ink-2" /></>,
  more: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
};

function LogoMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ flex: "0 0 auto" }}>
      <path d="M15.5 28C8 25.5 4.5 17 6.5 4.5c7 3.5 11 11.5 9 23.5z" style={{ fill: "var(--lime)" }} />
      <path d="M16.5 28c7.5-2.5 11-10 9.5-20-6.5 3-11 10-9.5 20z" style={{ fill: "var(--side-ink)", opacity: 0.9 }} />
      <path d="M15 26C12.5 19.5 10 13 7.5 7.5" style={{ stroke: "var(--side)", fill: "none" }} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const NAV = [
  { to: "/", label: "Overview", icon: "overview", current: true },
  { to: "/Plant-Health-Scanner", label: "Plant health", icon: "scan" },
  { to: "/Farm-scheduler", label: "Scheduler", icon: "calendar", badge: 2 },
  { to: "/Resources-tracker", label: "Resources", icon: "drop" },
  { to: "/Forum", label: "Forum", icon: "users" },
  { to: "/Chatbot", label: "Assistant", icon: "sparkle" },
];

const PLOTS = [
  { id: "north", name: "North plot", short: "North", crop: "Tomato", stage: "Fruiting", acres: "2.5", score: 92, scanWhen: "3 days ago", scanTitle: "No issues found", scanConf: "Clean scan, 3 leaves", moisture: 46, irrigated: "Today, 06:30", next: "Harvest rows 1–8", harvest: "Ongoing", cta: "Plan harvest", cx: 33.5, cy: 26 },
  { id: "river", name: "River field", short: "River", crop: "Wheat", stage: "Tillering", acres: "6.5", score: 81, scanWhen: "6 days ago", scanTitle: "No issues found", scanConf: "Clean scan, 5 leaves", moisture: 52, irrigated: "Wednesday, 17:00", next: "Top-dress urea, Mon", harvest: "Late February", cta: "Schedule task", cx: 35.5, cy: 73 },
  { id: "green", name: "Greenhouse 2", short: "GH 2", crop: "Cucumber", stage: "Vining", acres: "0.5", score: 88, scanWhen: "yesterday", scanTitle: "Powdery mildew ruled out", scanConf: "91% confidence", moisture: 61, irrigated: "Today, 07:15", next: "Prune laterals, Mon", harvest: "Early November", cta: "Schedule task", cx: 66.8, cy: 18 },
  { id: "south", name: "South plot", short: "South", crop: "Pepper", stage: "Flowering", acres: "3.0", score: 64, warn: true, scanWhen: "2 days ago", scanTitle: "Bacterial leaf spot", scanConf: "78% confidence", moisture: 38, irrigated: "Yesterday, 18:10", next: "Copper spray, 08:00", harvest: "Mid-November", cta: "Schedule spray", cx: 78, cy: 64 },
];

// Map shapes in the 600×330 field-map coordinate space.
const PLOT_SHAPES = {
  north: { points: "78,24 318,18 324,150 84,156", rows: "he-rows" },
  river: { points: "88,174 326,170 334,308 98,314", rows: "he-rows2" },
  south: { points: "352,124 578,108 584,308 362,314", rows: "he-rows" },
};

const TASKS = [
  { id: "t1", time: "06:30", title: "Drip irrigation, 45 min", meta: "North plot", cat: "Maintenance", catColor: "var(--s1)", pr: "Medium" },
  { id: "t2", time: "08:00", title: "Copper spray for leaf spot", meta: "South plot", cat: "Maintenance", catColor: "var(--s1)", pr: "High" },
  { id: "t3", time: "10:30", title: "Harvest tomatoes, rows 1–8", meta: "North plot", cat: "Harvesting", catColor: "var(--s2)", pr: "High" },
  { id: "t4", time: "14:00", title: "Sow coriander in bed 3", meta: "Greenhouse 2", cat: "Planting", catColor: "var(--s3)", pr: "Low" },
  { id: "t5", time: "16:30", title: "Receive urea delivery, 4 bags", meta: "Shed", cat: "General", catColor: "var(--s4)", pr: "Medium" },
];

const FORECAST = [
  { hi: 27, lo: 20, pop: 60, sky: "rain" },
  { hi: 28, lo: 20, pop: 30, sky: "cloud" },
  { hi: 30, lo: 20, pop: 10, sky: "sun" },
  { hi: 31, lo: 21, pop: 0, sky: "sun" },
  { hi: 32, lo: 21, pop: 0, sky: "sun" },
];

const POSTS = [
  { ini: "SJ", name: "Sunita Jadhav", place: "Niphad", when: "2 h", title: "Leaf curl on chilli after Tuesday’s rain. Is anyone else seeing this?", replies: 14, likes: 9 },
  { ini: "GM", name: "Ganesh More", place: "Sinnar", when: "5 h", title: "Drip vs furrow for winter wheat: my water numbers from last season", replies: 32, likes: 57 },
  { ini: "AS", name: "Amol Shinde", place: "Dindori", when: "Yesterday", title: "Copper oxychloride at 2.5 g/L cleared my pepper leaf spot in 10 days", replies: 21, likes: 40 },
];

function spark(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.2 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 100, 28 - ((v - lo) / (hi - lo)) * 28]);
  const line = "M" + pts.map((p) => p[0].toFixed(2) + " " + p[1].toFixed(2)).join(" L");
  return { line, area: line + " L100 28 L0 28 Z", endY: (pts[pts.length - 1][1] / 28) * 100 };
}

// Catmull-Rom through the points, as cubic Béziers.
function smooth(pts) {
  let d = "M" + pts[0][0].toFixed(2) + " " + pts[0][1].toFixed(2);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

const SPARK_HEALTH = spark([79, 81, 80, 83, 82, 84, 86]);
const SPARK_WATER = spark([21.2, 19.8, 22.4, 20.1, 19.6, 19.6, 18.4]);

const MONTHS = [["Apr", "April", 18], ["May", "May", 26], ["Jun", "June", 22], ["Jul", "July", 14], ["Aug", "August", 20], ["Sep", "September", 34], ["Oct", "October (to date)", 41]];
const STEP = 92 / (MONTHS.length - 1);
const XY = MONTHS.map((m, i) => [4 + i * STEP, 100 - (m[2] / 50) * 100]);
const HARVEST_LINE = smooth(XY);
const RING = 2 * Math.PI * 34;

function Sparkline({ data, color, id }) {
  return (
    <div className="spark">
      <svg viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" style={{ stopColor: color, stopOpacity: 0.2 }} />
            <stop offset="1" style={{ stopColor: color, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={data.area} fill={`url(#${id})`} />
        <path d={data.line} fill="none" style={{ stroke: color }} strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="spark-end" style={{ top: `${data.endY}%`, background: color }} aria-hidden="true" />
    </div>
  );
}

function HomePage() {
  const [dark, setDark] = useState(() => Boolean(window.matchMedia?.("(prefers-color-scheme: dark)").matches));
  const [collapsed, setCollapsed] = useState(false);
  const [plotId, setPlotId] = useState("south");
  const [hover, setHover] = useState(null);
  const [done, setDone] = useState({ t1: true });

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  const month = now.toLocaleDateString("en-GB", { month: "long" });
  const forecast = FORECAST.map((f, i) => ({
    ...f,
    day: new Date(now.getFullYear(), now.getMonth(), now.getDate() + i + 1).toLocaleDateString("en-GB", { weekday: "short" }),
  }));

  const sel = PLOTS.find((p) => p.id === plotId);
  const doneCount = TASKS.filter((t) => done[t.id]).length;
  const plotStyle = (p) => ({
    fill: p.warn ? "var(--plot-warn)" : "var(--plot-ok)",
    stroke: p.id === plotId ? "var(--ink)" : p.warn ? "var(--plot-warn-edge)" : "var(--plot-ok-edge)",
    strokeWidth: p.id === plotId ? 2.5 : 1.25,
  });
  const byId = Object.fromEntries(PLOTS.map((p) => [p.id, p]));

  return (
    <div className={dark ? "he he-dark" : "he"}>
      <aside className={collapsed ? "side is-collapsed" : "side"} aria-label="Sidebar">
        <div className="side-head">
          <Link to="/" className="side-brand" aria-label="HarvestEase home">
            <LogoMark />
            {!collapsed && <span>HarvestEase</span>}
          </Link>
          {!collapsed && (
            <button className="sghost" type="button" aria-label="Collapse sidebar" onClick={() => setCollapsed(true)} style={{ width: 32, height: 32 }}>
              <Icon name="panel" size={17} />
            </button>
          )}
        </div>
        {collapsed && (
          <button className="sghost" type="button" aria-label="Expand sidebar" onClick={() => setCollapsed(false)} style={{ width: 48, height: 36 }}>
            <Icon name="panel" size={17} />
          </button>
        )}

        {!collapsed && (
          <button className="sghost side-farm" type="button" aria-label="Switch farm: Patel Family Farm">
            <span className="farm-badge">PF</span>
            <span className="side-farm-text">
              <strong>Patel Family Farm</strong>
              <span>Nashik · 12.5 acres</span>
            </span>
            <Icon name="chevrons" size={15} sw={2} />
          </button>
        )}

        <nav className="side-nav" aria-label="App">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="snav" aria-label={n.label} aria-current={n.current ? "page" : undefined}>
              <Icon name={n.icon} />
              {!collapsed && <span>{n.label}</span>}
              {!collapsed && n.badge && <span className="snav-badge mono">{n.badge}</span>}
            </Link>
          ))}
        </nav>

        {!collapsed && (
          <div className="side-plots">
            <span className="side-plots-title">Plots</span>
            {PLOTS.map((p) => (
              <button key={p.id} type="button" className="snav plot-link" aria-pressed={p.id === plotId} onClick={() => setPlotId(p.id)}>
                <span className={p.warn ? "plot-sq warn" : "plot-sq"} aria-hidden="true" />
                <span>{p.name}</span>
                <span className={p.warn ? "mono warn" : "mono"}>{p.score}</span>
              </button>
            ))}
          </div>
        )}

        <div className="side-foot">
          <Link to="/Settings" className="snav" aria-label="Settings">
            <Icon name="settings" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <div className="side-user">
            <span className="avatar" aria-hidden="true">RP</span>
            {!collapsed && (
              <span className="side-user-text">
                <strong>Ravi Patel</strong>
                <span>Owner</span>
              </span>
            )}
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="top">
          <span className="top-logo"><LogoMark size={20} /></span>
          <nav className="crumb" aria-label="Breadcrumb">
            <span className="crumb-farm">Patel Family Farm</span>
            <span className="crumb-sep" aria-hidden="true">/</span>
            <span className="crumb-page" aria-current="page">Overview</span>
          </nav>
          <label className="search">
            <Icon name="search" size={15} sw={2} />
            <span className="vh">Search</span>
            <input type="search" placeholder="Search plots, tasks, posts" />
            <kbd className="mono">⌘K</kbd>
          </label>
          <div className="top-actions">
            <button className="icon-btn search-btn" type="button" aria-label="Search">
              <Icon name="search" size={19} />
            </button>
            <button className="icon-btn" type="button" aria-label="Notifications, 3 unread">
              <Icon name="bell" />
              <span className="bell-dot" aria-hidden="true" />
            </button>
            <button className="icon-btn" type="button" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark(!dark)}>
              <Icon name={dark ? "sun" : "moon"} />
            </button>
            <span className="top-sep" aria-hidden="true" />
            <Link to="/Settings" className="avatar" aria-label="Your profile">RP</Link>
          </div>
        </header>

        <main className="content">
          <div className="hello">
            <div className="hello-text">
              <span className="label">{today}</span>
              <h1>{greeting}, Ravi</h1>
              <p>South plot needs attention. You have 5 tasks today, 2 of them high priority.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-secondary" to="/Farm-scheduler"><Icon name="plus" size={16} sw={2} />Add task</Link>
              <Link className="btn btn-primary" to="/Plant-Health-Scanner"><Icon name="scan" size={16} sw={2} />Scan a plant</Link>
            </div>
          </div>

          <section className="card stats" aria-label="Key figures">
            <div className="stat">
              <div className="stat-head"><span className="label">Crop health</span><span className="chip chip-ok mono">+3</span></div>
              <div className="stat-value"><span className="mono">86</span><span className="label">/ 100 avg</span></div>
              <Sparkline data={SPARK_HEALTH} color="var(--brand)" id="he-sp1" />
            </div>
            <div className="stat">
              <div className="stat-head"><span className="label">Water this week</span><span className="chip chip-ok mono">−6%</span></div>
              <div className="stat-value"><span className="mono">18.4</span><span className="label">kL</span></div>
              <Sparkline data={SPARK_WATER} color="var(--s1)" id="he-sp2" />
            </div>
            <div className="stat">
              <div className="stat-head"><span className="label">Tasks today</span><span className="chip chip-warn">2 high</span></div>
              <div className="stat-value"><span className="mono">{doneCount}</span><span className="label">of {TASKS.length} done</span></div>
              <div className="task-bars" aria-hidden="true">
                {TASKS.map((t) => <span key={t.id} className={done[t.id] ? "on" : undefined} />)}
              </div>
            </div>
            <div className="stat">
              <div className="stat-head"><span className="label">Spent in {month}</span><span className="chip chip-neutral mono">70%</span></div>
              <div className="stat-value"><span className="mono">₹42,300</span></div>
              <div className="budget">
                <div className="meter" aria-hidden="true"><span style={{ width: "70%" }} /></div>
                <span className="label" style={{ fontSize: 12 }}>Budget <span className="mono">₹60,000</span></span>
              </div>
            </div>
          </section>

          <div className="split">
            <section className="card wide fields" aria-labelledby="he-fields">
              <header className="card-head">
                <div className="card-title">
                  <h2 id="he-fields">Fields</h2>
                  <span className="label">Health score from each plot's latest scan</span>
                </div>
                <div className="legend">
                  <span><span className="swatch ok" aria-hidden="true" />Healthy, 80+</span>
                  <span><span className="swatch warn" aria-hidden="true" />Watch, 60–79</span>
                </div>
              </header>
              <div className="map">
                <svg viewBox="0 0 600 330" role="img" aria-label="Farm map. North plot, tomato, score 92. River field, wheat, score 81. Greenhouse 2, cucumber, score 88. South plot, pepper, score 64.">
                  <defs>
                    <pattern id="he-rows" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-2)"><line x1="0" y1="0" x2="0" y2="9" style={{ stroke: "var(--map-rows)" }} strokeWidth="2.5" /></pattern>
                    <pattern id="he-rows2" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(88)"><line x1="0" y1="0" x2="0" y2="9" style={{ stroke: "var(--map-rows)" }} strokeWidth="2.5" /></pattern>
                  </defs>
                  <path d="M-20 -10 C 40 60, 18 130, 46 200 S 30 300, 52 350" fill="none" style={{ stroke: "var(--river)" }} strokeWidth="22" strokeLinecap="round" />
                  <path d="M338 -10 L342 340" fill="none" style={{ stroke: "var(--road-edge)" }} strokeWidth="12" />
                  <path d="M338 -10 L342 340" fill="none" style={{ stroke: "var(--road)" }} strokeWidth="9" />
                  <path d="M90 164 L340 160 L600 112" fill="none" style={{ stroke: "var(--road-edge)" }} strokeWidth="5" />
                  {["north", "river", "south"].map((id) => (
                    <g key={id}>
                      <polygon className="plot" points={PLOT_SHAPES[id].points} style={plotStyle(byId[id])} onClick={() => setPlotId(id)} />
                      <polygon points={PLOT_SHAPES[id].points} fill={`url(#${PLOT_SHAPES[id].rows})`} style={{ pointerEvents: "none" }} />
                    </g>
                  ))}
                  <rect className="plot" x="352" y="20" width="98" height="78" rx="8" style={plotStyle(byId.green)} onClick={() => setPlotId("green")} />
                  <path d="M352 46 H450 M352 72 H450" fill="none" style={{ stroke: "var(--map-rows)", pointerEvents: "none" }} strokeWidth="1.5" />
                  <rect x="470" y="26" width="34" height="26" rx="4" style={{ fill: "var(--road-edge)" }} />
                </svg>
                {PLOTS.map((p) => (
                  <button key={p.id} className="plot-btn" type="button" aria-pressed={p.id === plotId} onClick={() => setPlotId(p.id)} style={{ left: `${p.cx}%`, top: `${p.cy}%` }}>
                    <span className={p.warn ? "plot-dot warn" : "plot-dot"} aria-hidden="true" />
                    <span className="full">{p.name}</span>
                    <span className="short">{p.short}</span>
                    <span className="mono" style={{ opacity: 0.75 }}>{p.score}</span>
                  </button>
                ))}
                <span className="scale mono">N ↑ · 50 m</span>
              </div>
            </section>

            <section className="card narrow plot-card" aria-label="Selected plot">
              <div className="card-head" style={{ flexWrap: "nowrap" }}>
                <div className="card-title" style={{ gap: 2, minWidth: 0 }}>
                  <h2>{sel.name}</h2>
                  <span className="label">{sel.crop} · {sel.stage} · {sel.acres} acres</span>
                </div>
                <span className={sel.warn ? "chip chip-warn" : "chip chip-ok"}>{sel.warn ? "Needs attention" : "Healthy"}</span>
              </div>

              <div className="scan-sum">
                <svg width="84" height="84" viewBox="0 0 84 84" role="img" aria-label={`Health score ${sel.score} out of 100`} style={{ flex: "0 0 auto" }}>
                  <circle cx="42" cy="42" r="34" fill="none" style={{ stroke: "var(--surface-3)" }} strokeWidth="8" />
                  <circle cx="42" cy="42" r="34" fill="none" style={{ stroke: sel.warn ? "var(--warn)" : "var(--ok)" }} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${((sel.score / 100) * RING).toFixed(1)} ${RING.toFixed(1)}`} transform="rotate(-90 42 42)" />
                  <text x="42" y="47" textAnchor="middle" className="ring-text">{sel.score}</text>
                </svg>
                <div className="card-title" style={{ gap: 3, minWidth: 0 }}>
                  <span className="label">Latest scan · {sel.scanWhen}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{sel.scanTitle}</span>
                  <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{sel.scanConf}</span>
                </div>
              </div>

              <dl className="facts">
                <div>
                  <dt className="label">Soil moisture</dt>
                  <dd>
                    <span className="mono">{sel.moisture}%</span>
                    <span className="bar" aria-hidden="true"><span style={{ width: `${sel.moisture}%` }} /></span>
                  </dd>
                </div>
                <div><dt className="label">Last irrigated</dt><dd>{sel.irrigated}</dd></div>
                <div><dt className="label">Next task</dt><dd>{sel.next}</dd></div>
                <div><dt className="label">Expected harvest</dt><dd>{sel.harvest}</dd></div>
              </dl>

              <div className="card-actions">
                <Link className="btn btn-secondary" to="/Plant-Health-Scanner">View scan</Link>
                <Link className="btn btn-primary" to="/Farm-scheduler">{sel.cta}</Link>
              </div>
            </section>
          </div>

          <div className="split">
            <section className="card wide harvest" aria-labelledby="he-harvest">
              <header className="card-head">
                <div className="card-title">
                  <h2 id="he-harvest">Harvest</h2>
                  <span className="label">Quintals per month, all plots</span>
                </div>
                <div className="card-title" style={{ alignItems: "flex-end" }}>
                  <span className="mono" style={{ fontSize: 22, fontWeight: 560, letterSpacing: "-0.03em" }}>175 q</span>
                  <span className="label">Season to date</span>
                </div>
              </header>
              <div className="chart" role="img" aria-label="Harvest by month: April 18, May 26, June 22, July 14, August 20, September 34, October 41 quintals so far." onMouseLeave={() => setHover(null)}>
                {[50, 40, 30, 20, 10, 0].map((v) => (
                  <div key={v} className={v === 0 ? "gridline base" : "gridline"} style={{ top: `${100 - v * 2}%` }} aria-hidden="true">
                    <span className="mono">{v}</span>
                  </div>
                ))}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="he-area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" style={{ stopColor: "var(--brand)", stopOpacity: 0.22 }} />
                      <stop offset="1" style={{ stopColor: "var(--brand)", stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  <path d={HARVEST_LINE + " L96 100 L4 100 Z"} fill="url(#he-area)" />
                  <path d={HARVEST_LINE} fill="none" style={{ stroke: "var(--brand)" }} strokeWidth="2.25" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <span className="dot-last" style={{ left: `${XY[6][0]}%`, top: `${XY[6][1]}%` }} aria-hidden="true" />
                {hover !== null && (
                  <>
                    <div className="crosshair" style={{ left: `${XY[hover][0]}%` }} aria-hidden="true" />
                    <span className="dot-hover" style={{ left: `${XY[hover][0]}%`, top: `${XY[hover][1]}%` }} aria-hidden="true" />
                    <div className="tip" aria-hidden="true" style={{ left: `${XY[hover][0]}%`, top: `${XY[hover][1]}%`, transform: hover >= 5 ? "translate(calc(-100% - 12px), -50%)" : "translate(12px, -50%)" }}>
                      <div style={{ opacity: 0.7 }}>{MONTHS[hover][1]}</div>
                      <div className="mono" style={{ fontWeight: 600, fontSize: 13 }}>{MONTHS[hover][2]} quintals</div>
                    </div>
                  </>
                )}
                {XY.map(([x], i) => (
                  <div key={i} className="hit" aria-hidden="true" onMouseEnter={() => setHover(i)} style={{ left: `${x - STEP / 2}%`, width: `${STEP}%` }} />
                ))}
              </div>
              <div className="x-axis" aria-hidden="true">
                {MONTHS.map((m, i) => <span key={m[0]} className="mono" style={{ left: `${XY[i][0]}%` }}>{m[0]}</span>)}
              </div>
            </section>

            <section className="card narrow weather" aria-labelledby="he-weather">
              <header className="card-title">
                <h2 id="he-weather">Weather</h2>
                <span className="label">Nashik · updated 06:00</span>
              </header>
              <div className="now">
                <Icon name="partly" size={44} sw={1.6} className="warn-ink" />
                <div className="now-temp">
                  <span className="mono">31°</span>
                  <span>Partly cloudy</span>
                </div>
                <dl>
                  <dt className="label">Humidity</dt><dd className="mono">58%</dd>
                  <dt className="label">Wind</dt><dd className="mono">12 km/h</dd>
                </dl>
              </div>
              <ol className="forecast" aria-label="Five day forecast">
                {forecast.map((f) => (
                  <li key={f.day} className={f.sky === "rain" ? "wet" : undefined}>
                    <span className="fc-day">{f.day}</span>
                    <Icon name={f.sky} size={20} role="img" aria-hidden={undefined} aria-label={{ sun: "Sunny", rain: "Rain", cloud: "Cloudy" }[f.sky]} className={`sky-${f.sky}`} />
                    <span className="mono fc-temp">{f.hi}°<span> {f.lo}°</span></span>
                    <span className={f.pop >= 30 ? "mono fc-pop wet" : "mono fc-pop"}>{f.pop}%</span>
                  </li>
                ))}
              </ol>
              <div className="advice">
                <Icon name="drop" size={18} sw={2} />
                <div>
                  <strong>Rain likely tomorrow</strong>
                  <p>Skip tomorrow morning's irrigation on River field and North plot to save about 6 kL.</p>
                  <Link className="link" to="/Farm-scheduler">Adjust schedule <Icon name="arrow" size={14} sw={2} /></Link>
                </div>
              </div>
            </section>
          </div>

          <div className="split">
            <section className="card wide list-card" aria-labelledby="he-today">
              <header className="card-head">
                <div className="card-title">
                  <h2 id="he-today">Today</h2>
                  <span className="label">{doneCount} of {TASKS.length} done · 2 high priority</span>
                </div>
                <Link className="link" to="/Farm-scheduler">Open scheduler <Icon name="arrow" size={14} sw={2} /></Link>
              </header>
              <ul className="list">
                {TASKS.map((t) => (
                  <li key={t.id} className={done[t.id] ? "row task is-done" : "row task"}>
                    <span className="mono task-time">{t.time}</span>
                    <button className="check" type="button" aria-pressed={Boolean(done[t.id])} aria-label={`Mark ${t.title} done`} onClick={() => setDone({ ...done, [t.id]: !done[t.id] })}>
                      <span className="check-dot">{done[t.id] && <Icon name="check" size={13} sw={3} />}</span>
                    </button>
                    <div className="task-body">
                      <span className="task-title">{t.title}</span>
                      <span className="task-meta"><span className="cat" style={{ background: t.catColor }} aria-hidden="true" />{t.cat} · {t.meta}</span>
                    </div>
                    <span className={t.pr === "High" ? "chip chip-warn" : "chip chip-neutral"}>{t.pr}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card narrow list-card" aria-labelledby="he-forum">
              <header className="card-head">
                <div className="card-title">
                  <h2 id="he-forum">Near you</h2>
                  <span className="label">From growers within 40 km</span>
                </div>
                <Link className="link" to="/Forum">Forum <Icon name="arrow" size={14} sw={2} /></Link>
              </header>
              <ul className="list">
                {POSTS.map((p) => (
                  <li key={p.ini}>
                    <Link className="row post" to="/Forum">
                      <span className="avatar" aria-hidden="true">{p.ini}</span>
                      <span className="post-body">
                        <span className="post-by"><b>{p.name}</b> · {p.place} · {p.when}</span>
                        <span className="post-title">{p.title}</span>
                        <span className="mono post-stats">{p.replies} replies · {p.likes} likes</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>

      <nav className="tabbar" aria-label="App">
        <Link className="tab" to="/" aria-current="page"><Icon name="overview" size={22} />Overview</Link>
        <Link className="tab" to="/Farm-scheduler"><Icon name="calendar" size={22} />Tasks</Link>
        <Link className="tab tab-scan" to="/Plant-Health-Scanner" aria-label="Scan a plant"><span><Icon name="scan" size={23} sw={2} /></span></Link>
        <Link className="tab" to="/Forum"><Icon name="users" size={22} />Forum</Link>
        <Link className="tab" to="/Settings"><Icon name="more" size={22} />More</Link>
      </nav>
    </div>
  );
}

export default HomePage;
