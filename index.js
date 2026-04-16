import { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const C = {
  bg:"#0F172A", card:"#1E293B", card2:"#243044", border:"#334155",
  primary:"#2563EB", green:"#10B981", red:"#EF4444", orange:"#F97316",
  yellow:"#EAB308", purple:"#8B5CF6", cyan:"#06B6D4", pink:"#EC4899",
  text:"#F1F5F9", muted:"#94A3B8", white:"#FFFFFF"
};

const VOLS = [
  {id:1,name:"Rahul Sharma",init:"RS",skills:["Healthcare","Logistics","Outreach"],loc:"Vijay Nagar",xp:2840,level:"Champion",tw:6,hm:68,br:0.87,tasks:34,hours:156,people:289,badges:["Crisis Hero","Night Owl","First Task"]},
  {id:2,name:"Priya Patel",init:"PP",skills:["Education","Counseling","Tech"],loc:"Palasia",xp:3210,level:"Guardian",tw:4,hm:45,br:0.52,tasks:47,hours:203,people:412,badges:["Mentor","Polyglot","First Task"]},
  {id:3,name:"Amit Verma",init:"AV",skills:["Food Dist.","Construction"],loc:"Rajwada",xp:1560,level:"Helper",tw:2,hm:22,br:0.28,tasks:19,hours:87,people:143,badges:["First Task"]},
  {id:4,name:"Sneha Joshi",init:"SJ",skills:["Mental Health","Healthcare","Education"],loc:"Bhanwarkua",xp:4100,level:"Legend",tw:3,hm:38,br:0.41,tasks:62,hours:287,people:631,badges:["First Task","Crisis Hero","Mentor","Night Owl"]},
  {id:5,name:"Karan Singh",init:"KS",skills:["Logistics","Tech","Construction"],loc:"Nipania",xp:980,level:"Newcomer",tw:7,hm:75,br:0.93,tasks:11,hours:43,people:78,badges:["First Task","Night Owl"]},
  {id:6,name:"Meera Dubey",init:"MD",skills:["Outreach","Education","Food Dist."],loc:"Scheme 54",xp:2100,level:"Champion",tw:3,hm:30,br:0.38,tasks:28,hours:122,people:234,badges:["Polyglot","First Task","Mentor"]},
];

const NEEDS = [
  {id:1,title:"Emergency food supply for flood victims",type:"Food",urg:9.2,em:9.5,loc:"Rajwada Area",status:"critical",ago:"2h ago",aff:240,kw:["desperate","children starving","urgent"]},
  {id:2,title:"Medical camp for elderly residents",type:"Healthcare",urg:7.8,em:8.1,loc:"Vijay Nagar",status:"high",ago:"5h ago",aff:85,kw:["pain","no medicine","bedridden"]},
  {id:3,title:"School supplies for 3 government schools",type:"Education",urg:5.2,em:4.8,loc:"Palasia",status:"medium",ago:"1d ago",aff:320,kw:["learning gap","no books"]},
  {id:4,title:"Clean water access blocked — disease risk",type:"Water",urg:8.6,em:8.9,loc:"Bhanwarkua",status:"critical",ago:"3h ago",aff:150,kw:["contamination","children sick","urgent"]},
  {id:5,title:"Mental health support for trauma victims",type:"Mental Health",urg:7.1,em:8.3,loc:"Nipania",status:"high",ago:"12h ago",aff:42,kw:["trauma","anxiety","helpless"]},
  {id:6,title:"Shelter for 30 displaced families",type:"Shelter",urg:9.0,em:9.2,loc:"Scheme 54",status:"critical",ago:"1h ago",aff:130,kw:["homeless","rain","children crying"]},
];

const ZONES = [
  {x:35,y:30,r:45,i:0.95,label:"Rajwada",needs:["Food","Shelter"],c:8},
  {x:62,y:42,r:35,i:0.78,label:"Vijay Nagar",needs:["Healthcare"],c:5},
  {x:25,y:62,r:30,i:0.62,label:"Bhanwarkua",needs:["Water","Food"],c:4},
  {x:72,y:20,r:25,i:0.45,label:"Palasia",needs:["Education"],c:3},
  {x:52,y:72,r:38,i:0.88,label:"Nipania",needs:["Mental Health"],c:6},
  {x:82,y:65,r:20,i:0.35,label:"Scheme 54",needs:["Shelter"],c:2},
  {x:15,y:42,r:28,i:0.71,label:"Raj Nagar",needs:["Healthcare","Water"],c:4},
  {x:48,y:22,r:22,i:0.55,label:"Annapurna",needs:["Food","Education"],c:3},
];

const LB = [
  {rank:1,name:"Sneha Joshi",init:"SJ",xp:4100,level:"Legend",tasks:62,city:"Indore",d:0,story:"Organized 3 mega health camps"},
  {rank:2,name:"Priya Patel",init:"PP",xp:3210,level:"Guardian",tasks:47,city:"Indore",d:1,story:"Runs weekly coding workshops"},
  {rank:3,name:"Rahul Sharma",init:"RS",xp:2840,level:"Champion",tasks:34,city:"Indore",d:-1,story:"Led crisis response for floods"},
  {rank:4,name:"Meera Dubey",init:"MD",xp:2100,level:"Champion",tasks:28,city:"Bhopal",d:2,story:"Bridges rural-urban education gap"},
  {rank:5,name:"Amit Verma",init:"AV",xp:1560,level:"Helper",tasks:19,city:"Bhopal",d:0,story:"Builds affordable homes on weekends"},
  {rank:6,name:"Karan Singh",init:"KS",xp:980,level:"Newcomer",tasks:11,city:"Indore",d:-2,story:"Tech volunteer for 2 NGOs"},
];

const TREND = [
  {w:"Mar W1",needs:12,resolved:10},{w:"Mar W2",needs:18,resolved:14},
  {w:"Mar W3",needs:15,resolved:13},{w:"Mar W4",needs:22,resolved:16},
  {w:"Apr W1",needs:28,resolved:20},{w:"Apr W2",needs:24,resolved:22},
];

const PIE_DATA = [
  {name:"Food",val:8,color:"#F97316"},{name:"Healthcare",val:6,color:"#EC4899"},
  {name:"Education",val:5,color:"#8B5CF6"},{name:"Water",val:4,color:"#06B6D4"},
  {name:"Shelter",val:4,color:"#EAB308"},{name:"Mental Health",val:3,color:"#10B981"},
];

const DNA_DATA = [
  {skill:"Healthcare",A:85},{skill:"Education",A:60},{skill:"Food Dist.",A:45},
  {skill:"Construction",A:20},{skill:"Tech",A:70},{skill:"Counseling",A:55},
  {skill:"Logistics",A:75},{skill:"Outreach",A:90},
];

const CONTRIBS = Array.from({length:52}, () =>
  Array.from({length:7}, () => {
    const r = Math.random();
    return r < 0.4 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 2 : r < 0.95 ? 3 : 4;
  })
);

const BADGES_DEF = {
  "First Task":  {icon:"⭐", color:"#EAB308", desc:"First task completed"},
  "Crisis Hero": {icon:"🦸", color:"#EF4444", desc:"Surge mode participant"},
  "Night Owl":   {icon:"🦉", color:"#8B5CF6", desc:"Task after 10 PM"},
  "Polyglot":    {icon:"🌏", color:"#06B6D4", desc:"Multilingual input"},
  "Mentor":      {icon:"🎓", color:"#10B981", desc:"Referred 5+ volunteers"},
};

const LVLC = {Newcomer:"#94A3B8", Helper:"#10B981", Champion:"#2563EB", Guardian:"#8B5CF6", Legend:"#F97316"};
const NTYPES = {Food:"#F97316", Healthcare:"#EC4899", Education:"#8B5CF6", Water:"#06B6D4", Shelter:"#EAB308", "Mental Health":"#10B981"};

function heatColor(i) {
  if (i >= 0.85) return C.red;
  if (i >= 0.65) return C.orange;
  if (i >= 0.45) return C.yellow;
  return C.green;
}

function contribColor(val) {
  if (!val) return "#1E293B";
  if (val === 1) return "#2563EB44";
  if (val === 2) return "#2563EB88";
  if (val === 3) return "#2563EBCC";
  return C.primary;
}

// ── Micro components ──────────────────────────────────────────────

function Av({ init, color, size = 36 }) {
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:color||C.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.35,fontWeight:700,color:C.white,flexShrink:0}}>
      {init}
    </div>
  );
}

function Tag({ text, color }) {
  const col = color || C.primary;
  return (
    <span style={{background:col+"22",color:col,border:`1px solid ${col}44`,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:500}}>
      {text}
    </span>
  );
}

function UBadge({ score }) {
  const c = score >= 8.5 ? C.red : score >= 7 ? C.orange : score >= 5 ? C.yellow : C.green;
  const l = score >= 8.5 ? "CRITICAL" : score >= 7 ? "HIGH" : score >= 5 ? "MEDIUM" : "LOW";
  return (
    <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700}}>
      {l} {score.toFixed(1)}
    </span>
  );
}

function BBar({ risk }) {
  const c = risk > 0.9 ? C.red : risk > 0.75 ? C.orange : risk > 0.5 ? C.yellow : C.green;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:11,color:C.muted}}>Burnout Risk</span>
        <span style={{fontSize:11,color:c,fontWeight:600}}>{Math.round(risk*100)}%</span>
      </div>
      <div style={{height:4,background:C.border,borderRadius:2}}>
        <div style={{height:"100%",width:`${risk*100}%`,background:c,borderRadius:2}} />
      </div>
    </div>
  );
}

function KPI({ label, value, sub, color, icon }) {
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 22px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:12,color:C.muted,marginBottom:5}}>{label}</div>
          <div style={{fontSize:26,fontWeight:800,color:color||C.text}}>{value}</div>
          {sub && <div style={{fontSize:11,color:C.muted,marginTop:3}}>{sub}</div>}
        </div>
        <span style={{fontSize:26}}>{icon}</span>
      </div>
    </div>
  );
}

// ── Login ─────────────────────────────────────────────────────────

function Login({ onLogin }) {
  const [sel, setSel] = useState("ngo");
  const roles = [
    {id:"ngo",  label:"NGO Admin",    icon:"🏢", desc:"Manage needs, volunteers & campaigns", color:C.primary},
    {id:"vol",  label:"Volunteer",    icon:"🙋", desc:"Find tasks, track your impact",        color:C.green},
    {id:"field",label:"Field Worker", icon:"📱", desc:"Submit reports via voice or photo",    color:C.orange},
  ];
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{fontSize:48,marginBottom:8}}>⚡</div>
        <div style={{fontSize:36,fontWeight:900,color:C.text,letterSpacing:-1}}>VolunteerIQ</div>
        <div style={{fontSize:14,color:C.muted,marginTop:6}}>Smart Resource Allocation for Social Impact</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#2563EB22",border:"1px solid #2563EB44",borderRadius:20,padding:"5px 14px",marginTop:12}}>
          <span style={{fontSize:12,color:C.primary,fontWeight:700}}>🏅 Google for Developers Hackathon 2025</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,maxWidth:680,width:"100%",marginBottom:28}}>
        {roles.map(r => (
          <div key={r.id} onClick={() => setSel(r.id)} style={{background:sel===r.id?r.color+"22":C.card,border:`2px solid ${sel===r.id?r.color:C.border}`,borderRadius:16,padding:22,cursor:"pointer",textAlign:"center",transition:"all .2s"}}>
            <div style={{fontSize:38,marginBottom:10}}>{r.icon}</div>
            <div style={{fontWeight:700,color:C.text,marginBottom:5}}>{r.label}</div>
            <div style={{fontSize:12,color:C.muted}}>{r.desc}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:30,maxWidth:380,width:"100%"}}>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:5}}>Phone Number</label>
          <input defaultValue="+91 98765 43210" style={{width:"100%",background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box"}} />
        </div>
        <div style={{marginBottom:22}}>
          <label style={{fontSize:12,color:C.muted,display:"block",marginBottom:5}}>OTP / Password</label>
          <input type="password" defaultValue="••••••" style={{width:"100%",background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box"}} />
        </div>
        <button onClick={() => onLogin(sel)} style={{width:"100%",background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"12px 0",fontWeight:700,fontSize:15,cursor:"pointer"}}>
          Sign In →
        </button>
        <div style={{textAlign:"center",marginTop:12,fontSize:11,color:C.muted}}>🔐 Firebase Auth · OTP via Twilio · Polygon Wallet Optional</div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────

function Dashboard() {
  const crit = NEEDS.filter(n => n.status === "critical");
  const atRisk = VOLS.filter(v => v.br > 0.75);
  return (
    <div style={{padding:24}}>
      <div style={{marginBottom:22}}>
        <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>NGO Admin Dashboard</h1>
        <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Indore Seva Trust · Last updated 2 min ago · <span style={{color:C.green}}>● Live</span></p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <KPI label="Active Needs"      value="20"    sub="6 critical right now"   color={C.red}    icon="🎯" />
        <KPI label="Volunteers Active" value="15"    sub="3 at burnout risk"       color={C.primary} icon="👥" />
        <KPI label="People Helped"     value="1,890" sub="↑ 12% this week"        color={C.green}  icon="❤️" />
        <KPI label="Tasks Completed"   value="48"    sub="This month"              color={C.purple} icon="✅" />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:14}}>Weekly Activity Trend</div>
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={TREND}>
                <defs>
                  <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.red}   stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.red}   stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.green} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={C.green} stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill:C.muted,fontSize:11}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8}} labelStyle={{color:C.text}} />
                <Area type="monotone" dataKey="needs"    stroke={C.red}   fill="url(#gN)" name="Needs Reported" />
                <Area type="monotone" dataKey="resolved" stroke={C.green} fill="url(#gR)" name="Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{background:C.card,border:`2px solid ${C.red}44`,borderRadius:12,padding:20}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <span style={{fontSize:18}}>🧠</span>
              <span style={{fontSize:13,fontWeight:700,color:C.text}}>Emotion AI Triage</span>
              <span style={{background:C.red+"22",color:C.red,fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>GEMINI LIVE</span>
              <span style={{marginLeft:"auto",fontSize:11,color:C.muted}}>Hidden Distress Detector</span>
            </div>
            {crit.map(n => (
              <div key={n.id} style={{background:C.red+"0d",border:`1px solid ${C.red}33`,borderRadius:8,padding:14,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.text,flex:1,paddingRight:10}}>{n.title}</div>
                  <span style={{background:C.red,color:C.white,fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:20,flexShrink:0}}>⚡ {n.em}/10</span>
                </div>
                <div style={{fontSize:12,color:C.muted,marginBottom:7}}>📍 {n.loc} · {n.ago} · <strong style={{color:C.text}}>{n.aff}</strong> affected</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                  {n.kw.map(k => (
                    <span key={k} style={{background:"#EAB30822",color:"#EAB308",border:"1px solid #EAB30844",borderRadius:4,padding:"1px 7px",fontSize:11}}>
                      "{k}"
                    </span>
                  ))}
                </div>
                <div style={{fontSize:12,color:C.orange}}>📲 WhatsApp alert sent · AI: Immediate dispatch recommended</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:14}}>Needs by Category</div>
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={PIE_DATA} dataKey="val" cx="50%" cy="50%" outerRadius={65} innerRadius={35}>
                  {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8}} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
              {PIE_DATA.map(n => (
                <div key={n.name} style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:n.color}} />
                  <span style={{fontSize:11,color:C.muted}}>{n.name} ({n.val})</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:C.card,border:`2px solid ${C.orange}44`,borderRadius:12,padding:18}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <span>⚠️</span>
              <span style={{fontSize:13,fontWeight:700,color:C.text}}>Burnout Watch</span>
              <span style={{background:C.orange+"22",color:C.orange,fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>{atRisk.length} at risk</span>
            </div>
            {atRisk.map(v => (
              <div key={v.id} style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <Av init={v.init} size={30} color={v.br > 0.9 ? C.red : C.orange} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.text}}>{v.name}</div>
                    <div style={{fontSize:11,color:C.muted}}>{v.tw} tasks/week · {v.hm}h/month</div>
                  </div>
                  {v.br > 0.9 && <span style={{background:C.red+"22",color:C.red,fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:4}}>BLOCKED</span>}
                </div>
                <BBar risk={v.br} />
              </div>
            ))}
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:10}}>Quick Actions</div>
            {[["➕  Add New Need", C.primary],["👤  Smart Match Volunteers", C.green],["📄  Generate City Report", C.purple],["🚨  Declare Crisis", C.red]].map(([l, col]) => (
              <button key={l} style={{width:"100%",background:col+"22",border:`1px solid ${col}44`,color:col,borderRadius:8,padding:"9px 14px",marginBottom:7,textAlign:"left",fontWeight:700,fontSize:12,cursor:"pointer"}}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Needs ─────────────────────────────────────────────────────────

function NeedsPage() {
  const [view, setView] = useState("list");
  const cols = ["Reported","Assigned","In Progress","Completed"];
  const colData = [NEEDS.slice(0,3), NEEDS.slice(1,3), NEEDS.slice(3,5), NEEDS.slice(5,6)];
  return (
    <div style={{padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div>
          <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Needs Management</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>20 active needs · 6 critical · 3 NGOs reporting</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {["list","kanban"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{background:view===v?C.primary:C.card2,color:view===v?C.white:C.muted,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 14px",fontSize:12,cursor:"pointer",fontWeight:600}}>
              {v === "list" ? "📋 List" : "📌 Kanban"}
            </button>
          ))}
          <button style={{background:C.primary,color:C.white,border:"none",borderRadius:6,padding:"6px 14px",fontSize:12,cursor:"pointer",fontWeight:700}}>+ Add Need</button>
        </div>
      </div>

      {view === "list" ? (
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr style={{background:C.card2}}>
                {["Need","Type","Urgency","Emotion AI","Location","Affected","Status","Action"].map(h => (
                  <th key={h} style={{padding:"11px 15px",textAlign:"left",fontSize:11,color:C.muted,fontWeight:700,borderBottom:`1px solid ${C.border}`}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NEEDS.map(n => (
                <tr key={n.id} style={{borderBottom:`1px solid ${C.border}22`,background:n.status==="critical"?C.red+"07":"transparent"}}>
                  <td style={{padding:"13px 15px"}}><div style={{fontSize:13,fontWeight:600,color:C.text}}>{n.title}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{n.ago}</div></td>
                  <td style={{padding:"13px 15px"}}><Tag text={n.type} color={NTYPES[n.type]} /></td>
                  <td style={{padding:"13px 15px"}}><UBadge score={n.urg} /></td>
                  <td style={{padding:"13px 15px"}}><span style={{fontSize:14,fontWeight:800,color:n.em>=8?C.red:C.orange}}>{n.em}</span><span style={{fontSize:11,color:C.muted}}>/10</span></td>
                  <td style={{padding:"13px 15px",fontSize:12,color:C.muted}}>📍 {n.loc}</td>
                  <td style={{padding:"13px 15px",fontSize:14,fontWeight:700,color:C.text}}>{n.aff}</td>
                  <td style={{padding:"13px 15px"}}>
                    <span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:4,background:n.status==="critical"?C.red+"22":n.status==="high"?C.orange+"22":C.yellow+"22",color:n.status==="critical"?C.red:n.status==="high"?C.orange:C.yellow}}>
                      {n.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{padding:"13px 15px"}}>
                    <button style={{background:C.primary+"22",color:C.primary,border:`1px solid ${C.primary}44`,borderRadius:6,padding:"4px 10px",fontSize:11,cursor:"pointer",fontWeight:700}}>Assign →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {cols.map((col, ci) => (
            <div key={col} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14}}>
              <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>
                {col} <span style={{color:C.primary}}>({colData[ci].length})</span>
              </div>
              {colData[ci].map(n => (
                <div key={n.id} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:12,marginBottom:10,cursor:"grab"}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:8,lineHeight:1.4}}>{n.title}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Tag text={n.type} color={NTYPES[n.type]} />
                    <UBadge score={n.urg} />
                  </div>
                  <div style={{fontSize:11,color:C.muted,marginTop:8}}>📍 {n.loc} · {n.aff} affected</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Volunteers ────────────────────────────────────────────────────

function VolsPage() {
  return (
    <div style={{padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div>
          <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Volunteer Management</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>15 active · 3 burnout risk · Match score powered by Gemini AI</p>
        </div>
        <button style={{background:C.green+"22",color:C.green,border:`1px solid ${C.green}44`,borderRadius:8,padding:"8px 16px",fontSize:13,cursor:"pointer",fontWeight:700}}>+ Invite Volunteer</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {VOLS.map(v => (
          <div key={v.id} style={{background:C.card,border:`2px solid ${v.br>0.9?C.red:v.br>0.75?C.orange:C.border}`,borderRadius:12,padding:20}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <Av init={v.init} size={44} color={LVLC[v.level]} />
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>{v.name}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>📍 {v.loc}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:12,fontWeight:700,color:LVLC[v.level]}}>{v.level}</div>
                <div style={{fontSize:11,color:C.muted}}>{v.xp} XP</div>
              </div>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              {v.skills.map(s => <Tag key={s} text={s} />)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:12,textAlign:"center"}}>
              {[["Tasks",v.tasks],["Hours",v.hours],["Helped",v.people]].map(([l, val]) => (
                <div key={l} style={{background:C.card2,borderRadius:6,padding:"7px 0"}}>
                  <div style={{fontSize:16,fontWeight:800,color:C.text}}>{val}</div>
                  <div style={{fontSize:10,color:C.muted}}>{l}</div>
                </div>
              ))}
            </div>
            <BBar risk={v.br} />
            <div style={{marginTop:11,display:"flex",gap:5,flexWrap:"wrap"}}>
              {v.badges.map(b => (
                <span key={b} title={BADGES_DEF[b]?.desc} style={{fontSize:18,cursor:"default"}}>
                  {BADGES_DEF[b]?.icon}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Heatmap ───────────────────────────────────────────────────────

function HeatmapPage() {
  const [sel, setSel] = useState(null);
  return (
    <div style={{padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div>
          <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Live Needs Heatmap</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Indore City · Google Maps layer · Real-time community need density</p>
        </div>
        <div style={{display:"flex",gap:6}}>
          {["All","Food","Healthcare","Water","Shelter"].map(f => (
            <button key={f} style={{background:C.card2,color:C.muted,border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 10px",fontSize:11,cursor:"pointer"}}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 270px",gap:14}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",position:"relative"}}>
          <svg viewBox="0 0 100 100" style={{width:"100%",height:500}}>
            <rect width="100" height="100" fill="#1E293B" />
            {[15,30,45,60,75,90].map(x => <line key={"v"+x} x1={x} y1="0" x2={x} y2="100" stroke="#2A3A50" strokeWidth="0.25" />)}
            {[15,30,45,60,75,90].map(y => <line key={"h"+y} x1="0" y1={y} x2="100" y2={y} stroke="#2A3A50" strokeWidth="0.25" />)}
            <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="#334155" strokeWidth="0.5" />
            <circle cx="42" cy="55" r="16" fill="#2563EB0a" stroke="#2563EB" strokeWidth="0.6" strokeDasharray="2,2" />
            <circle cx="76" cy="38" r="11" fill="#8B5CF60a" stroke="#8B5CF6" strokeWidth="0.6" strokeDasharray="2,2" />
            <text x="42" y="51" textAnchor="middle" fill="#2563EB88" fontSize="3">Predicted</text>
            {ZONES.map((z, i) => (
              <g key={i} onClick={() => setSel(z)} style={{cursor:"pointer"}}>
                <circle cx={z.x} cy={z.y} r={z.r*.9} fill={heatColor(z.i)} opacity={0.08} />
                <circle cx={z.x} cy={z.y} r={z.r*.6} fill={heatColor(z.i)} opacity={0.18} />
                <circle cx={z.x} cy={z.y} r={z.r*.3} fill={heatColor(z.i)} opacity={0.6}  />
                <circle cx={z.x} cy={z.y} r={3}       fill={heatColor(z.i)} stroke="white" strokeWidth=".5" />
                <text x={z.x} y={z.y+z.r*.9+4.5} textAnchor="middle" fill="#94A3B8" fontSize="3.2" fontWeight="600">{z.label}</text>
              </g>
            ))}
            <text x="96" y="7" textAnchor="middle" fill="#475569" fontSize="4.5">N↑</text>
            <text x="5" y="97" fill="#475569" fontSize="3.5">© VolunteerIQ Maps</text>
          </svg>
          <div style={{position:"absolute",bottom:14,left:14,background:"#0F172Acc",borderRadius:8,padding:"7px 12px",display:"flex",gap:12}}>
            {[["Critical",C.red],["High",C.orange],["Medium",C.yellow],["Low",C.green],["Predicted","#2563EB"]].map(([l, col]) => (
              <div key={l} style={{display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:9,height:9,borderRadius:l==="Predicted"?"0":"50%",background:l==="Predicted"?"transparent":col,border:l==="Predicted"?`1.5px dashed ${col}`:"none"}} />
                <span style={{fontSize:11,color:C.muted}}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {sel ? (
            <div style={{background:C.card,border:`2px solid ${heatColor(sel.i)}55`,borderRadius:12,padding:18}}>
              <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:4}}>📍 {sel.label}</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Intensity {Math.round(sel.i*100)}% · {sel.c} reports</div>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Top Needs:</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {sel.needs.map(n => <Tag key={n} text={n} color={NTYPES[n]} />)}
                </div>
              </div>
              <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Nearby volunteers: 3 · ETA ~12 min</div>
              <button style={{width:"100%",background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"10px 0",fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:8}}>Assign Volunteers →</button>
              <button onClick={() => setSel(null)} style={{width:"100%",background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 0",fontSize:12,cursor:"pointer"}}>Close</button>
            </div>
          ) : (
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:20,textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>🗺️</div>
              <div style={{fontSize:13,color:C.muted}}>Click any hotspot on the map to see details and assign volunteers</div>
            </div>
          )}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:12}}>Active Zones — by Severity</div>
            {[...ZONES].sort((a,b) => b.i - a.i).map((z, i) => (
              <div key={i} onClick={() => setSel(z)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}22`,cursor:"pointer"}}>
                <div style={{width:9,height:9,borderRadius:"50%",background:heatColor(z.i),flexShrink:0}} />
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.text}}>{z.label}</div>
                  <div style={{fontSize:11,color:C.muted}}>{z.c} reports</div>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:heatColor(z.i)}}>{Math.round(z.i*100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Crisis ────────────────────────────────────────────────────────

function CrisisPage() {
  const [phase, setPhase] = useState("idle");
  const [prog, setProg] = useState(0);
  const [mob, setMob] = useState(0);
  const [msgs, setMsgs] = useState([
    {from:"System",  text:"Crisis Room initialized. All emergency channels open.", t:"10:42"},
    {from:"Rahul S.",text:"On site at Rajwada. Coordinating food distribution now.", t:"10:43"},
    {from:"Sneha J.",text:"Medical kit deployed. 3 volunteers confirmed on site.", t:"10:44"},
    {from:"Amit V.", text:"En route with supplies. ETA 8 mins.", t:"10:46"},
  ]);
  const [inp, setInp] = useState("");

  useEffect(() => {
    if (phase === "active") {
      const t = setInterval(() => {
        setProg(p => Math.min(p + 1.5, 88));
        setMob(m => Math.min(m + 1, 13));
      }, 250);
      return () => clearInterval(t);
    }
  }, [phase]);

  function send() {
    if (!inp.trim()) return;
    setMsgs(m => [...m, {from:"You (Admin)", text:inp, t:new Date().toTimeString().slice(0,5)}]);
    setInp("");
  }

  return (
    <div style={{padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div>
          <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Crisis Surge Mode</h1>
          <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Emergency coordination · Firebase Realtime · Twilio Broadcast</p>
        </div>
        {phase === "active" && (
          <div style={{background:C.red+"22",color:C.red,border:`2px solid ${C.red}`,borderRadius:8,padding:"6px 16px",fontSize:13,fontWeight:800}}>🚨 CRISIS ACTIVE</div>
        )}
      </div>

      {phase === "idle" && (
        <div style={{maxWidth:560,margin:"0 auto",paddingTop:20}}>
          <div style={{background:C.red+"0d",border:`2px solid ${C.red}33`,borderRadius:20,padding:36,marginBottom:20,textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:14}}>🚨</div>
            <div style={{fontSize:19,fontWeight:800,color:C.text,marginBottom:8}}>Declare Crisis Surge</div>
            <div style={{fontSize:14,color:C.muted,marginBottom:22,lineHeight:1.7}}>
              Immediately alerts <strong style={{color:C.text}}>ALL 15 volunteers</strong> within 10km radius via Push + WhatsApp + SMS. Activates Crisis Command Room and auto-reassigns tasks by proximity.
            </div>
            <button onClick={() => setPhase("confirm")} style={{background:C.red,color:C.white,border:"none",borderRadius:12,padding:"15px 0",fontWeight:800,fontSize:17,cursor:"pointer",width:"100%"}}>
              🚨 DECLARE CRISIS
            </button>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:12}}>Past Crisis Events</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0"}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>Flood Relief — Rajwada Sector</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>March 15, 2025 · 6h 23m duration</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:700,color:C.green}}>✓ Resolved</div>
                <div style={{fontSize:11,color:C.muted}}>12 volunteers · 340 helped</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === "confirm" && (
        <div style={{maxWidth:480,margin:"0 auto",paddingTop:30,textAlign:"center"}}>
          <div style={{background:C.red+"22",border:`3px solid ${C.red}`,borderRadius:16,padding:30}}>
            <div style={{fontSize:40,marginBottom:12}}>⚠️</div>
            <div style={{fontSize:18,fontWeight:800,color:C.red,marginBottom:8}}>Confirm Crisis Declaration</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:22}}>
              Alerts <strong style={{color:C.text}}>15 volunteers</strong> and broadcasts to <strong style={{color:C.text}}>3 NGOs</strong> in the city network. This action is logged and cannot be undone.
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <button onClick={() => setPhase("idle")} style={{background:C.card2,color:C.muted,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 0",fontWeight:700,fontSize:14,cursor:"pointer"}}>Cancel</button>
              <button onClick={() => setPhase("active")} style={{background:C.red,color:C.white,border:"none",borderRadius:8,padding:"12px 0",fontWeight:800,fontSize:14,cursor:"pointer"}}>🚨 CONFIRM</button>
            </div>
          </div>
        </div>
      )}

      {phase === "active" && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[["Volunteers Mobilized",`${mob}/15`,C.green],["Tasks Covered",`${Math.round(prog)}%`,C.primary],["Alerts Sent","15/15",C.cyan],["Est. Full Coverage","~18 min",C.orange]].map(([l, v, col]) => (
                <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:14}}>
                  <div style={{fontSize:11,color:C.muted,marginBottom:5}}>{l}</div>
                  <div style={{fontSize:22,fontWeight:800,color:col}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:10}}>Coverage Progress</div>
              <div style={{height:14,background:C.border,borderRadius:7,marginBottom:7,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${prog}%`,background:`linear-gradient(90deg,${C.green},${C.primary})`,borderRadius:7,transition:"width .4s"}} />
              </div>
              <div style={{fontSize:12,color:C.muted}}>{Math.round(prog)}% of urgent tasks assigned to nearest volunteers</div>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Mobilized Volunteers</div>
              {VOLS.slice(0, Math.min(mob, 6)).map(v => (
                <div key={v.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <Av init={v.init} size={30} color={LVLC[v.level]} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:C.text}}>{v.name}</div>
                    <div style={{fontSize:11,color:C.muted}}>{v.loc}</div>
                  </div>
                  <span style={{background:C.green+"22",color:C.green,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4}}>ON SITE</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setPhase("idle"); setProg(0); setMob(0); }} style={{background:C.green+"22",color:C.green,border:`2px solid ${C.green}44`,borderRadius:10,padding:"12px 0",fontWeight:700,fontSize:14,cursor:"pointer"}}>
              ✅ Declare All Clear
            </button>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,display:"flex",flexDirection:"column"}}>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:C.green}} />
              <span style={{fontSize:13,fontWeight:700,color:C.text}}>Crisis Command Room</span>
              <span style={{fontSize:11,color:C.green,marginLeft:"auto"}}>● Live</span>
            </div>
            <div style={{flex:1,padding:14,overflowY:"auto",maxHeight:340}}>
              {msgs.map((m, i) => (
                <div key={i} style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:C.muted,marginBottom:3}}>{m.from} · {m.t}</div>
                  <div style={{background:m.from.includes("You")?C.primary+"22":C.card2,border:`1px solid ${m.from.includes("You")?C.primary+"44":C.border}`,borderRadius:8,padding:"8px 12px",fontSize:13,color:C.text,display:"inline-block",maxWidth:"85%"}}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:12,borderTop:`1px solid ${C.border}`,display:"flex",gap:8}}>
              <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key==="Enter" && send()} placeholder="Broadcast to all volunteers..." style={{flex:1,background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",color:C.text,fontSize:13,outline:"none"}} />
              <button onClick={send} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"8px 16px",fontWeight:700,cursor:"pointer"}}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Impact DNA ────────────────────────────────────────────────────

function DNAPage() {
  const v = VOLS[0];
  const certs = [
    {t:"Flood Relief Coordination", s:"Logistics",   h:8, hash:"0x3f2a...d91b", dt:"Apr 10, 2025"},
    {t:"Medical Camp Vijay Nagar",  s:"Healthcare",  h:5, hash:"0x7c1d...e34a", dt:"Mar 28, 2025"},
    {t:"Food Distribution Drive",   s:"Food Dist.",  h:4, hash:"0xa9f3...b22c", dt:"Mar 15, 2025"},
  ];
  return (
    <div style={{padding:24}}>
      <div style={{marginBottom:18}}>
        <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Impact DNA Profile</h1>
        <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>volunteeriq.app/v/rahul-sharma · Shareable public profile · Blockchain verified</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:22,textAlign:"center"}}>
            <div style={{width:70,height:70,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:800,color:C.white,margin:"0 auto 12px"}}>RS</div>
            <div style={{fontSize:18,fontWeight:800,color:C.text}}>{v.name}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:8}}>📍 {v.loc}, Indore</div>
            <span style={{background:LVLC[v.level]+"33",color:LVLC[v.level],border:`1px solid ${LVLC[v.level]}66`,borderRadius:20,padding:"3px 14px",fontSize:12,fontWeight:700}}>⚡ {v.level}</span>
            <div style={{marginTop:14,background:C.card2,borderRadius:8,padding:"10px 0"}}>
              <div style={{fontSize:24,fontWeight:800,color:C.primary}}>{v.xp.toLocaleString()}</div>
              <div style={{fontSize:11,color:C.muted}}>Total XP</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginTop:12}}>
              {[["Tasks",v.tasks],["Hours",v.hours],["Helped",v.people]].map(([l, val]) => (
                <div key={l} style={{background:C.card2,borderRadius:6,padding:"7px 3px"}}>
                  <div style={{fontSize:14,fontWeight:800,color:C.text}}>{val}</div>
                  <div style={{fontSize:10,color:C.muted}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:12}}>Badge Wall</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {Object.entries(BADGES_DEF).map(([name, b]) => {
                const earned = v.badges.includes(name);
                return (
                  <div key={name} style={{background:earned?b.color+"22":C.card2,border:`1px solid ${earned?b.color+"44":C.border}`,borderRadius:8,padding:"10px",opacity:earned?1:0.35,textAlign:"center"}}>
                    <div style={{fontSize:20,marginBottom:3}}>{b.icon}</div>
                    <div style={{fontSize:10,fontWeight:600,color:earned?C.text:C.muted}}>{name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <button style={{background:C.primary,color:C.white,border:"none",borderRadius:10,padding:"11px 0",fontWeight:700,fontSize:13,cursor:"pointer"}}>📄 Export to PDF</button>
          <button style={{background:C.green+"22",color:C.green,border:`1px solid ${C.green}44`,borderRadius:10,padding:"11px 0",fontWeight:700,fontSize:13,cursor:"pointer"}}>🔗 Share Public Profile</button>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:22}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:3}}>Skill DNA Radar</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10}}>8 dimensions · Scores grow with every verified blockchain task</div>
            <ResponsiveContainer width="100%" height={270}>
              <RadarChart data={DNA_DATA}>
                <PolarGrid stroke={C.border} />
                <PolarAngleAxis dataKey="skill" tick={{fill:C.muted,fontSize:11}} />
                <Radar dataKey="A" stroke={C.primary} fill={C.primary} fillOpacity={0.28} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:22}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:3}}>Impact Timeline</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Last 52 weeks of volunteer activity</div>
            <div style={{display:"flex",gap:2,overflowX:"auto",paddingBottom:4}}>
              {CONTRIBS.map((wk, wi) => (
                <div key={wi} style={{display:"flex",flexDirection:"column",gap:2}}>
                  {wk.map((d, di) => (
                    <div key={di} style={{width:10,height:10,borderRadius:2,background:contribColor(d),flexShrink:0}} title={d+" tasks"} />
                  ))}
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center",marginTop:10,justifyContent:"flex-end"}}>
              <span style={{fontSize:11,color:C.muted}}>Less</span>
              {[0,1,2,3,4].map(val => <div key={val} style={{width:10,height:10,borderRadius:2,background:contribColor(val)}} />)}
              <span style={{fontSize:11,color:C.muted}}>More</span>
            </div>
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:22}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>⛓️ Blockchain Certificates</div>
              <span style={{background:"#8B5CF622",color:"#8B5CF6",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>Polygon Testnet</span>
            </div>
            {certs.map((cert, i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:`1px solid ${C.border}22`}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:C.text}}>{cert.t}</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:2}}>{cert.s} · {cert.h}h · {cert.dt}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:"#8B5CF6",fontFamily:"monospace"}}>{cert.hash}</div>
                  <button style={{background:"#8B5CF622",color:"#8B5CF6",border:"none",borderRadius:4,padding:"3px 8px",fontSize:10,cursor:"pointer",marginTop:4}}>View NFT →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Leaderboard ───────────────────────────────────────────────────

function LeaderboardPage() {
  const podium = [LB[1], LB[0], LB[2]];
  const podiumH = [155, 200, 130];
  const podiumC = ["#94A3B8", "#F97316", "#CD7F32"];
  const medals = ["🥈","🥇","🥉"];
  return (
    <div style={{padding:24}}>
      <div style={{marginBottom:22}}>
        <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>City Leaderboard</h1>
        <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Indore + Bhopal · April 2025 · XP earned from verified blockchain tasks</p>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:28,alignItems:"flex-end"}}>
        {podium.map((v, i) => (
          <div key={v.rank} style={{textAlign:"center",width:150}}>
            <Av init={v.init} size={50} color={LVLC[v.level]} />
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginTop:7}}>{v.name}</div>
            <div style={{fontSize:12,color:C.muted}}>{v.xp.toLocaleString()} XP</div>
            <div style={{height:podiumH[i],background:`linear-gradient(180deg,${podiumC[i]}33,${podiumC[i]}0d)`,border:`2px solid ${podiumC[i]}55`,borderRadius:"10px 10px 0 0",marginTop:10,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:10}}>
              <span style={{fontSize:30}}>{medals[i]}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
        {LB.map((v, i) => (
          <div key={v.rank} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",borderBottom:`1px solid ${C.border}22`,background:i===0?"#F9731609":"transparent"}}>
            <div style={{width:28,textAlign:"center",fontSize:15,fontWeight:800,color:i<3?C.orange:C.muted}}>#{v.rank}</div>
            <Av init={v.init} size={40} color={LVLC[v.level]} />
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>{v.name}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>💬 "{v.story}"</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:16,fontWeight:800,color:C.primary}}>{v.xp.toLocaleString()} XP</div>
              <div style={{fontSize:11,color:C.muted}}>{v.tasks} tasks · {v.city}</div>
            </div>
            <div style={{width:20,textAlign:"center",fontSize:14,fontWeight:700,color:v.d>0?C.green:v.d<0?C.red:C.muted}}>
              {v.d > 0 ? "↑" : v.d < 0 ? "↓" : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Voice Input ───────────────────────────────────────────────────

function VoicePage() {
  const [phase, setPhase] = useState("idle");
  const [lang, setLang] = useState("Hindi");
  const [wave, setWave] = useState(0);
  const [txt, setTxt] = useState("");
  const LANGS = ["Hindi","English","Marathi","Bengali","Tamil","Telugu","Gujarati","Kannada"];
  const SAMPLES = {
    Hindi:   "राजवाड़ा क्षेत्र में बाढ़ के कारण लगभग 240 परिवारों को खाने-पीने की तत्काल आवश्यकता है। बच्चे भूखे हैं और स्थिति बेहद गंभीर है।",
    English: "Urgent food shortage in Rajwada area. Approximately 240 families affected by floods. Children are starving. Need immediate relief supplies.",
    Marathi: "राजवाड्यात पूरामुळे सुमारे 240 कुटुंबांना तातडीने अन्न आणि पाण्याची गरज आहे. स्थिती अत्यंत गंभीर आहे.",
  };

  useEffect(() => {
    if (phase === "rec") {
      const t = setInterval(() => setWave(w => (w + 1) % 20), 90);
      return () => clearInterval(t);
    }
  }, [phase]);

  function stop() {
    setPhase("proc");
    setTimeout(() => {
      setTxt(SAMPLES[lang] || SAMPLES.English);
      setPhase("done");
    }, 1800);
  }

  return (
    <div style={{padding:24,maxWidth:660,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Voice Input — Field Report</h1>
        <p style={{fontSize:13,color:C.muted,margin:"6px 0 0"}}>Gemini Multilingual AI · 8 Languages · Auto-extracts location, need type & urgency</p>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18,marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:10}}>Select Language</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {LANGS.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{background:lang===l?C.primary:C.card2,color:lang===l?C.white:C.muted,border:`1px solid ${lang===l?C.primary:C.border}`,borderRadius:20,padding:"5px 14px",fontSize:12,cursor:"pointer",fontWeight:lang===l?700:400}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:36,textAlign:"center",marginBottom:14}}>
        {phase === "idle" && (
          <div>
            <div style={{fontSize:60,marginBottom:14}}>🎤</div>
            <div style={{fontSize:15,color:C.muted,marginBottom:22}}>Tap to start recording your field report in {lang}</div>
            <button onClick={() => setPhase("rec")} style={{background:C.primary,color:C.white,border:"none",borderRadius:"50%",width:78,height:78,fontSize:30,cursor:"pointer"}}>🎤</button>
            <div style={{fontSize:12,color:C.muted,marginTop:14}}>No internet needed for recording · Uploads when connected</div>
          </div>
        )}
        {phase === "rec" && (
          <div>
            <div style={{fontSize:15,fontWeight:800,color:C.red,marginBottom:18}}>● Recording in {lang}...</div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:3,height:60,marginBottom:22}}>
              {Array.from({length:20}).map((_, i) => (
                <div key={i} style={{width:4,borderRadius:2,background:C.red,height:`${18+Math.abs(Math.sin(i+wave)*44)}px`,transition:"height .1s"}} />
              ))}
            </div>
            <button onClick={stop} style={{background:C.red,color:C.white,border:"none",borderRadius:"50%",width:68,height:68,fontSize:22,cursor:"pointer"}}>⏹</button>
          </div>
        )}
        {phase === "proc" && (
          <div>
            <div style={{fontSize:46,marginBottom:14}}>⚙️</div>
            <div style={{fontSize:15,fontWeight:700,color:C.primary,marginBottom:6}}>Gemini AI Processing...</div>
            <div style={{fontSize:13,color:C.muted}}>Transcribing · Detecting language · Extracting urgency & location</div>
          </div>
        )}
      </div>

      {phase === "done" && (
        <div style={{background:C.card,border:`2px solid ${C.green}44`,borderRadius:12,padding:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text}}>Transcription Result</div>
            <div style={{display:"flex",gap:7}}>
              <span style={{background:C.green+"22",color:C.green,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>✓ AI Verified</span>
              <span style={{background:C.primary+"22",color:C.primary,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>🌐 {lang}</span>
            </div>
          </div>
          <textarea value={txt} onChange={e => setTxt(e.target.value)} rows={4} style={{width:"100%",background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:13,color:C.text,fontSize:14,lineHeight:1.7,boxSizing:"border-box",resize:"vertical"}} />
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginTop:14}}>
            {[["Need Type","🍲 Food",C.orange],["Urgency (AI)","⚡ 9.2/10",C.red],["Location","📍 Rajwada",C.primary]].map(([l, val, col]) => (
              <div key={l} style={{background:C.card2,borderRadius:8,padding:"9px 12px"}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{l}</div>
                <div style={{fontSize:13,fontWeight:700,color:col}}>{val}</div>
              </div>
            ))}
          </div>
          <button style={{width:"100%",background:C.green,color:C.white,border:"none",borderRadius:8,padding:"12px 0",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:14}}>✅ Submit Field Report</button>
          <button onClick={() => setPhase("idle")} style={{width:"100%",background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 0",fontWeight:600,fontSize:12,cursor:"pointer",marginTop:8}}>🔄 Record Again</button>
        </div>
      )}
    </div>
  );
}

// ── Network ───────────────────────────────────────────────────────

function NetworkPage() {
  const ngos = [
    {name:"Indore Seva Trust",  v:15, n:20, cov:82, color:C.primary},
    {name:"Bhopal Care Network",v:12, n:18, cov:67, color:C.green},
    {name:"MP Youth Force",     v:11, n:9,  cov:95, color:C.purple},
  ];
  const suggestions = [
    {from:"MP Youth Force",    to:"Bhopal Care Network", v:3, t:4, r:"Surplus volunteers free 10 AM–2 PM; BCN has 4 urgent unassigned Food tasks"},
    {from:"Indore Seva Trust", to:"Bhopal Care Network", v:2, t:3, r:"2 volunteers free 9–11 AM; BCN needs Healthcare + Logistics skills urgently"},
  ];
  return (
    <div style={{padding:24}}>
      <div style={{marginBottom:22}}>
        <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>City Network — NGO Interop</h1>
        <p style={{fontSize:13,color:C.muted,margin:"4px 0 0"}}>Madhya Pradesh · 3 NGOs connected · Surplus volunteer sharing active</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <KPI label="Total City Needs"    value="47" sub="Across all NGOs"    color={C.red}    icon="🎯" />
        <KPI label="Network Volunteers"  value="38" sub="Opt-in network"      color={C.primary} icon="👥" />
        <KPI label="Coverage Gap"        value="23%" sub="↓ 5% this week"    color={C.orange} icon="📉" />
        <KPI label="Cross-NGO Matches"   value="8"  sub="This week"           color={C.green}  icon="🤝" />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:16}}>
        {ngos.map(ngo => (
          <div key={ngo.name} style={{background:C.card,border:`1px solid ${ngo.color}33`,borderRadius:12,padding:20}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:24}}>🏢</span>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:C.text}}>{ngo.name}</div>
                <div style={{fontSize:11,color:C.green}}>✓ Verified Member</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              <div style={{background:C.card2,borderRadius:6,padding:"8px 10px"}}>
                <div style={{fontSize:20,fontWeight:800,color:ngo.color}}>{ngo.v}</div>
                <div style={{fontSize:10,color:C.muted}}>Volunteers</div>
              </div>
              <div style={{background:C.card2,borderRadius:6,padding:"8px 10px"}}>
                <div style={{fontSize:20,fontWeight:800,color:C.text}}>{ngo.n}</div>
                <div style={{fontSize:10,color:C.muted}}>Active Needs</div>
              </div>
            </div>
            <div style={{fontSize:11,color:C.muted,marginBottom:5}}>Coverage: {ngo.cov}%</div>
            <div style={{height:4,background:C.border,borderRadius:2}}>
              <div style={{height:"100%",width:`${ngo.cov}%`,background:ngo.cov>80?C.green:ngo.cov>60?C.yellow:C.red,borderRadius:2}} />
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,border:`2px solid ${C.green}33`,borderRadius:12,padding:20}}>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:14}}>🤝 AI-Suggested Cross-NGO Volunteer Sharing</div>
        {suggestions.map((s, i) => (
          <div key={i} style={{background:C.card2,borderRadius:10,padding:16,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>{s.from} <span style={{color:C.green}}>→</span> {s.to}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:4}}>{s.r}</div>
            </div>
            <div style={{textAlign:"right",marginLeft:16}}>
              <div style={{fontSize:12,color:C.muted}}>{s.v} vols → {s.t} tasks</div>
              <button style={{background:C.green,color:C.white,border:"none",borderRadius:6,padding:"6px 14px",fontSize:12,cursor:"pointer",fontWeight:700,marginTop:6}}>Approve →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────

function Sidebar({ view, setView, col, setCol }) {
  const items = [
    {id:"dashboard",   label:"Dashboard",   icon:"📊"},
    {id:"needs",       label:"Needs",        icon:"🎯"},
    {id:"volunteers",  label:"Volunteers",   icon:"👥"},
    {id:"heatmap",     label:"Heatmap",      icon:"🗺️"},
    {id:"crisis",      label:"Crisis Mode",  icon:"🚨"},
    {id:"impact-dna",  label:"Impact DNA",   icon:"🧬"},
    {id:"leaderboard", label:"Leaderboard",  icon:"🏆"},
    {id:"voice-input", label:"Voice Input",  icon:"🎤"},
    {id:"network",     label:"City Network", icon:"🌐"},
  ];
  return (
    <div style={{width:col?58:215,background:C.card,borderRight:`1px solid ${C.border}`,height:"100vh",display:"flex",flexDirection:"column",transition:"width .2s",flexShrink:0,overflow:"hidden"}}>
      <div style={{padding:"18px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:9}}>
        <span style={{fontSize:20,flexShrink:0}}>⚡</span>
        {!col && <span style={{fontSize:15,fontWeight:800,color:C.text,whiteSpace:"nowrap"}}>VolunteerIQ</span>}
        <button onClick={() => setCol(!col)} style={{marginLeft:"auto",background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:14,flexShrink:0}}>{col?"›":"‹"}</button>
      </div>
      <nav style={{flex:1,padding:8,overflowY:"auto"}}>
        {items.map(it => (
          <button key={it.id} onClick={() => setView(it.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 10px",borderRadius:8,border:"none",cursor:"pointer",textAlign:"left",marginBottom:2,background:view===it.id?C.primary+"22":"transparent",color:view===it.id?C.primary:C.muted,fontWeight:view===it.id?700:400,fontSize:13}}>
            <span style={{fontSize:17,flexShrink:0}}>{it.icon}</span>
            {!col && <span style={{whiteSpace:"nowrap"}}>{it.label}</span>}
          </button>
        ))}
      </nav>
      {!col && (
        <div style={{padding:14,borderTop:`1px solid ${C.border}`}}>
          <div style={{background:C.card2,borderRadius:8,padding:"9px 12px"}}>
            <div style={{fontSize:10,color:C.muted}}>Logged in as</div>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginTop:1}}>NGO Admin</div>
            <div style={{fontSize:11,color:C.muted}}>Indore Seva Trust</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Topbar ────────────────────────────────────────────────────────

function Topbar({ view }) {
  const titles = {
    dashboard:"NGO Admin Dashboard", needs:"Needs Management",
    volunteers:"Volunteer Management", heatmap:"Live Needs Heatmap",
    crisis:"Crisis Surge Mode", "impact-dna":"Impact DNA Profile",
    leaderboard:"City Leaderboard", "voice-input":"Voice Input (Field Worker)",
    network:"City Network — NGO Interop",
  };
  return (
    <div style={{height:58,background:C.card,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",paddingInline:22,gap:14,flexShrink:0}}>
      <div style={{flex:1,fontSize:15,fontWeight:700,color:C.text}}>{titles[view]}</div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{background:C.green+"22",color:C.green,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>● Live</span>
        <div style={{background:C.red+"22",color:C.red,borderRadius:7,padding:"3px 10px",fontSize:12,fontWeight:700,cursor:"pointer"}}>🔔 3</div>
        <div style={{background:"#2563EB22",color:C.primary,borderRadius:7,padding:"3px 10px",fontSize:12,fontWeight:700,cursor:"pointer"}}>📲 Twilio</div>
        <Av init="SA" size={30} color={C.primary} />
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────

export default function App() {
  const [auth, setAuth] = useState(false);
  const [view, setView] = useState("dashboard");
  const [col, setCol] = useState(false);

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  const pages = {
    dashboard:   <Dashboard />,
    needs:       <NeedsPage />,
    volunteers:  <VolsPage />,
    heatmap:     <HeatmapPage />,
    crisis:      <CrisisPage />,
    "impact-dna":<DNAPage />,
    leaderboard: <LeaderboardPage />,
    "voice-input":<VoicePage />,
    network:     <NetworkPage />,
  };

  return (
    <div style={{display:"flex",height:"100vh",background:C.bg,fontFamily:"'Inter',system-ui,sans-serif",color:C.text,overflow:"hidden"}}>
      <Sidebar view={view} setView={setView} col={col} setCol={setCol} />
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <Topbar view={view} />
        <div style={{flex:1,overflowY:"auto"}}>
          {pages[view] || <Dashboard />}
        </div>
      </div>
    </div>
  );
}
