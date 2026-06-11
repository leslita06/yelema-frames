import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Button, Separator } from "shadcn";
import { Target, Layers, Wrench, AlertTriangle, Eye, EyeOff } from "lucide-react";
const points = [
  { startup: "Harvey", x: 85, y: 48, ready: 70, hv: "Vertical", verticals: "Legal & professional services", businessModel: "Enterprise SaaS per-seat", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Sierra", x: 85, y: 78, ready: 50, hv: "Vertical", verticals: "CX/support", businessModel: "Outcome-based", outcome: "\u2705", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Wonderful", x: 85, y: 82, ready: 40, hv: "Vertical", verticals: "CX/support multilingue", businessModel: "Enterprise SaaS full-stack managed deployment", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Adept", x: 20, y: 38, ready: 30, hv: "Horizontal", verticals: "Ops / knowledge workers", businessModel: "Enterprise SaaS workflow automation", outcome: "n.d.", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "inactif/absorb\xE9" },
  { startup: "Kore.ai", x: 55, y: 55, ready: 35, hv: "Hybride", verticals: "CX & Employee experience", businessModel: "Enterprise SaaS annual license", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Hybride", confidence: "faible\u2049", status: "actif" },
  { startup: "Ema", x: 20, y: 42, ready: 60, hv: "Horizontal", verticals: "Cross-role", businessModel: "Enterprise SaaS subscription", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Moveworks", x: 55, y: 50, ready: 70, hv: "Hybride", verticals: "Employee support", businessModel: "Enterprise SaaS subscription", outcome: "n.d.", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "inactif/absorb\xE9" },
  { startup: "Mercor", x: 55, y: 32, ready: 65, hv: "Hybride", verticals: "Recruiting / talent marketplace", businessModel: "Marketplace", outcome: "\u274C", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Cresta", x: 85, y: 45, ready: 55, hv: "Vertical", verticals: "CX / contact centers", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Ada", x: 85, y: 82, ready: 80, hv: "Vertical", verticals: "CX / support", businessModel: "Outcome-based", outcome: "\u2705", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Rogo", x: 85, y: 50, ready: 65, hv: "Vertical", verticals: "Finance / banque d'affaires", businessModel: "Enterprise SaaS", outcome: "\u274C", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "11x", x: 85, y: 50, ready: 85, hv: "Vertical", verticals: "Sales / GTM", businessModel: "Enterprise SaaS", outcome: "\u274C", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Forethought", x: 85, y: 73, ready: 75, hv: "Vertical", verticals: "CX / support", businessModel: "Outcome-based", outcome: "\u2705", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "EvenUp", x: 85, y: 42, ready: 80, hv: "Vertical", verticals: "Legal PI law", businessModel: "Usage-based", outcome: "\u274C", cs: "\u2705", autonomy: "Copilot", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Hippocratic AI", x: 85, y: 58, ready: 65, hv: "Vertical", verticals: "Sant\xE9 clinical agents", businessModel: "Usage-based $/hour", outcome: "\u274C", cs: "n.d.", autonomy: "Multi-agents", run: "Public", confidence: "faible\u2049", status: "actif" },
  { startup: "Numeric", x: 85, y: 58, ready: 75, hv: "Vertical", verticals: "Comptabilit\xE9", businessModel: "Enterprise SaaS per-seat", outcome: "\u274C", cs: "\u2705", autonomy: "Agent autonome", run: "Hybride", confidence: "haute", status: "actif" },
  { startup: "ConverzAI", x: 85, y: 75, ready: 85, hv: "Vertical", verticals: "Staffing / recrutement", businessModel: "Outcome pay per placement", outcome: "\u2705", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Lindy", x: 20, y: 38, ready: 30, hv: "Horizontal", verticals: "\u2014", businessModel: "Credit-based subscription", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Public", confidence: "haute", status: "actif" },
  { startup: "Salesforce Agentforce", x: 20, y: 55, ready: 35, hv: "Horizontal", verticals: "\u2014", businessModel: "Enterprise SaaS flex credits", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Hybride", confidence: "haute", status: "actif" },
  { startup: "Parloa", x: 20, y: 50, ready: 45, hv: "Horizontal", verticals: "Contact centers", businessModel: "Enterprise SaaS custom contracts", outcome: "n.d.", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "H Company", x: 20, y: 38, ready: 30, hv: "Horizontal", verticals: "\u2014", businessModel: "Enterprise + consumer usage/custom", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Legora", x: 85, y: 50, ready: 70, hv: "Vertical", verticals: "Legal", businessModel: "Enterprise SaaS", outcome: "\u274C", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Luminance", x: 85, y: 50, ready: 75, hv: "Vertical", verticals: "Legal", businessModel: "Enterprise SaaS", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "PolyAI", x: 85, y: 55, ready: 70, hv: "Vertical", verticals: "CX voice-first", businessModel: "Enterprise SaaS usage-based voice", outcome: "\u274C", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Cognigy", x: 85, y: 50, ready: 40, hv: "Vertical", verticals: "CX / contact centers", businessModel: "Enterprise SaaS", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "inactif/absorb\xE9" },
  { startup: "Maisa", x: 20, y: 42, ready: 45, hv: "Horizontal", verticals: "Ops entreprise", businessModel: "Enterprise SaaS per digital worker", outcome: "\u274C", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Robin AI", x: 85, y: 40, ready: 75, hv: "Vertical", verticals: "Legal contrats", businessModel: "Enterprise SaaS", outcome: "\u274C", cs: "\u2705", autonomy: "Copilot", run: "Sales-led", confidence: "haute", status: "inactif/absorb\xE9" },
  { startup: "Arabic.AI", x: 55, y: 45, ready: 45, hv: "Hybride", verticals: "Entreprises arabophones r\xE9gul\xE9es", businessModel: "Enterprise SaaS flat-capacity license", outcome: "\u274C", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Lucidya", x: 85, y: 52, ready: 65, hv: "Vertical", verticals: "CX/CXM MENA", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Qeen.ai", x: 85, y: 78, ready: 85, hv: "Vertical", verticals: "E-commerce / retail GCC", businessModel: "Outcome-based", outcome: "\u2705", cs: "\u2705", autonomy: "Agent autonome", run: "Public", confidence: "haute", status: "actif" },
  { startup: "Yellow.ai", x: 20, y: 50, ready: 45, hv: "Horizontal", verticals: "CX & EX multi-secteur", businessModel: "Usage-based", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Leena AI", x: 85, y: 52, ready: 70, hv: "Vertical", verticals: "HR / IT / Finance", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Atomicwork", x: 85, y: 50, ready: 70, hv: "Vertical", verticals: "IT / service management", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Sarvam AI", x: 55, y: 55, ready: 35, hv: "Hybride", verticals: "BFSI, gouvernement, entreprises", businessModel: "Enterprise SaaS / API + sovereign licensing", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "DevRev", x: 85, y: 58, ready: 60, hv: "Vertical", verticals: "Dev / support / produit", businessModel: "Subscription + usage-based", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Hybride", confidence: "haute", status: "actif" },
  { startup: "interface.ai", x: 85, y: 82, ready: 80, hv: "Vertical", verticals: "Community banks & credit unions", businessModel: "Outcome-based SaaS", outcome: "\u2705", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Observe.AI", x: 85, y: 78, ready: 70, hv: "Vertical", verticals: "Centres de contact", businessModel: "Enterprise SaaS ROI-based", outcome: "\u2705", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Kata.ai", x: 20, y: 52, ready: 45, hv: "Horizontal", verticals: "CX, financial services", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "n.d.", autonomy: "Agent autonome", run: "Hybride", confidence: "faible\u2049", status: "actif" },
  { startup: "Aivo", x: 20, y: 52, ready: 55, hv: "Horizontal", verticals: "CX banque/retail/e-commerce", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "inactif/absorb\xE9" },
  { startup: "Patagon AI", x: 85, y: 82, ready: 85, hv: "Vertical", verticals: "Marketing & growth", businessModel: "Outcome per qualified lead", outcome: "\u2705", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Yamify", x: 20, y: 28, ready: 30, hv: "Horizontal", verticals: "Infra IA / agents", businessModel: "Usage-based subscription tiers", outcome: "\u274C", cs: "n.d.", autonomy: "Agent autonome", run: "Public", confidence: "faible\u2049", status: "actif" },
  { startup: "Indigenius AI", x: 85, y: 38, ready: 55, hv: "Vertical", verticals: "Voix / langues africaines", businessModel: "Usage-based API platform", outcome: "n.d.", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Xara AI", x: 85, y: 40, ready: 70, hv: "Vertical", verticals: "Fintech / consumer banking", businessModel: "Transaction fees + commissions", outcome: "\u274C", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "ChatATP", x: 20, y: 30, ready: 25, hv: "Horizontal", verticals: "\u2014", businessModel: "Platform / marketplace", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "n.d.", confidence: "faible\u2049", status: "actif" },
  { startup: "Thunder Code", x: 85, y: 55, ready: 75, hv: "Vertical", verticals: "QA / software test automation", businessModel: "Subscription + usage overage", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Hybride", confidence: "haute", status: "actif" },
  { startup: "Hebbia", x: 85, y: 52, ready: 55, hv: "Vertical", verticals: "Finance, legal, Fortune 100", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Hybride", confidence: "faible\u2049", status: "actif" },
  { startup: "Eudia", x: 85, y: 78, ready: 45, hv: "Vertical", verticals: "In-house legal", businessModel: "Enterprise SaaS + AI-augmented law firm", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "BlueFlame AI", x: 85, y: 50, ready: 65, hv: "Vertical", verticals: "Alternative investment managers", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Brightwave", x: 85, y: 45, ready: 70, hv: "Vertical", verticals: "PE / investment research", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Eilla AI", x: 85, y: 57, ready: 50, hv: "Vertical", verticals: "M&A / VC / PE advisory", businessModel: "Enterprise SaaS + AI advisory", outcome: "\u274C", cs: "\u2705", autonomy: "Multi-agents", run: "Public", confidence: "haute", status: "actif" },
  { startup: "Maven AGI", x: 85, y: 85, ready: 85, hv: "Vertical", verticals: "Enterprise CX", businessModel: "Outcome per resolution", outcome: "\u2705", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "haute", status: "actif" },
  { startup: "Clay", x: 20, y: 50, ready: 45, hv: "Horizontal", verticals: "GTM / sales & marketing ops", businessModel: "Usage-based credits", outcome: "\u274C", cs: "\u2705", autonomy: "Agent autonome", run: "Hybride", confidence: "haute", status: "actif" },
  { startup: "Writer", x: 20, y: 50, ready: 50, hv: "Horizontal", verticals: "Enterprise marketing/ops/support", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "\u2705", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "LangChain", x: 20, y: 40, ready: 15, hv: "Horizontal", verticals: "Developer tooling", businessModel: "Usage-based / SaaS", outcome: "\u274C", cs: "n.d.", autonomy: "Multi-agents", run: "Hybride", confidence: "faible\u2049", status: "actif" },
  { startup: "Genspark", x: 20, y: 25, ready: 65, hv: "Horizontal", verticals: "Knowledge workers / prosumers", businessModel: "Credits/subscription", outcome: "\u274C", cs: "n.d.", autonomy: "Multi-agents", run: "Public", confidence: "faible\u2049", status: "actif" },
  { startup: "Beam AI", x: 20, y: 52, ready: 50, hv: "Horizontal", verticals: "Enterprise ops", businessModel: "Enterprise custom, outcome elements", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "DXwand", x: 55, y: 50, ready: 50, hv: "Hybride", verticals: "Gov, finance, sant\xE9, \xE9ducation", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "CoRover", x: 55, y: 60, ready: 60, hv: "Hybride", verticals: "Gouvernement, transport, BFSI", businessModel: "Chatbot-as-a-Service", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "AI Rudder", x: 20, y: 45, ready: 60, hv: "Horizontal", verticals: "CX / contact centers", businessModel: "Usage-based SaaS", outcome: "\u274C", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "WIZ.AI", x: 20, y: 55, ready: 60, hv: "Horizontal", verticals: "CX / engagement client", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Yalo", x: 55, y: 48, ready: 55, hv: "Hybride", verticals: "Commerce conversationnel B2B", businessModel: "Enterprise SaaS usage-based", outcome: "n.d.", cs: "\u2705", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Lua AI", x: 20, y: 30, ready: 25, hv: "Horizontal", verticals: "Developer platform", businessModel: "Developer platform SaaS", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Rulebase", x: 85, y: 45, ready: 65, hv: "Vertical", verticals: "Fintech / services financiers", businessModel: "Enterprise SaaS", outcome: "n.d.", cs: "n.d.", autonomy: "Agent autonome", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Unique", x: 85, y: 45, ready: 60, hv: "Vertical", verticals: "Services financiers", businessModel: "SaaS B2B entreprise", outcome: "n.d.", cs: "n.d.", autonomy: "Multi-agents", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Botmaker", x: 20, y: 48, ready: 50, hv: "Horizontal", verticals: "Multi-secteur LatAm", businessModel: "SaaS B2B abonnement", outcome: "n.d.", cs: "n.d.", autonomy: "Agents autonomes + HITL", run: "Sales-led", confidence: "faible\u2049", status: "actif" },
  { startup: "Gnani.ai", x: 55, y: 55, ready: 55, hv: "Hybride", verticals: "BFSI, assurance, t\xE9l\xE9coms, sant\xE9", businessModel: "SaaS B2B / B2B2C", outcome: "n.d.", cs: "n.d.", autonomy: "Agents autonomes + copilote", run: "Hybride", confidence: "faible\u2049", status: "actif" },
  { startup: "Haptik", x: 20, y: 55, ready: 55, hv: "Horizontal", verticals: "Retail, voyage, fintech, sant\xE9", businessModel: "Abonnement SaaS entreprise", outcome: "n.d.", cs: "\u2705", autonomy: "Agents autonomes + handoff", run: "Sales-led", confidence: "faible\u2049", status: "actif" }
];
const plotted = points.map((p) => ({ ...p, y: p.x, x: p.ready }));
const xThreshold = 60;
const yThreshold = 60;
const inactiveNames = /* @__PURE__ */ new Set(["Adept", "Moveworks", "Cognigy", "Robin AI", "Aivo"]);
function quadrantOf(p) {
  if (p.x >= xThreshold && p.y >= yThreshold) return "Top-Right";
  if (p.x < xThreshold && p.y >= yThreshold) return "Top-Left";
  if (p.x >= xThreshold && p.y < yThreshold) return "Bottom-Right";
  return "Bottom-Left";
}
function colorFor(p) {
  if (p.status !== "actif") return "hsl(var(--muted-foreground))";
  if (p.confidence === "faible\u2049") return "var(--chart-5)";
  const q = quadrantOf(p);
  if (q === "Top-Right") return "var(--chart-1)";
  if (q === "Bottom-Right") return "var(--chart-2)";
  if (q === "Top-Left") return "var(--chart-4)";
  return "var(--chart-3)";
}
function shortName(name) {
  if (name.length <= 12) return name;
  return `${name.slice(0, 11)}\u2026`;
}
function QuadrantComparablesYelema() {
  const [showLabels, setShowLabels] = useState(false);
  const [showInactive, setShowInactive] = useState(true);
  const [selected, setSelected] = useState(null);
  const visiblePoints = useMemo(() => plotted.filter((p) => showInactive || p.status === "actif"), [showInactive]);
  const activePoints = useMemo(() => plotted.filter((p) => p.status === "actif"), []);
  const topRightActive = activePoints.filter((p) => quadrantOf(p) === "Top-Right").length;
  const verticalActive = activePoints.filter((p) => p.x >= xThreshold).length;
  const operatedActive = activePoints.filter((p) => p.y >= yThreshold).length;
  const width = 1200;
  const height = 760;
  const margin = { top: 64, right: 120, bottom: 100, left: 120 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const sx = (x) => margin.left + x / 100 * plotW;
  const sy = (y) => margin.top + (1 - y / 100) * plotH;
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen bg-background text-foreground p-4 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Target, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Quadrant strat\xE9gique" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-3xl font-semibold tracking-tight", children: "Comparables IA agents \u2014 ready-to-go vs profondeur m\xE9tier" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-4xl", children: "Axe X = agents \xE0 construire \u2192 agents pr\xEAts \xE0 l'emploi (scoring heuristique 11/06). Axe Y = plateforme g\xE9n\xE9rique \u2192 suites verticales m\xE9tier (reprend la verticalisation 00.3)." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowLabels((v) => !v), children: [
          showLabels ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4 mr-2" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 mr-2" }),
          showLabels ? "Masquer labels" : "Afficher labels"
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => setShowInactive((v) => !v), children: showInactive ? "Masquer inactifs" : "Afficher inactifs" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Actifs analys\xE9s" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: activePoints.length }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "hors inactifs/absorb\xE9s" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Pr\xEAts \xE0 l'emploi" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: verticalActive }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "X \u2265 60 : off-the-shelf" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Suites m\xE9tier" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: operatedActive }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Y \u2265 60 : verticalis\xE9" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Top-right actif" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: topRightActive }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "proches du white space Yelema" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Layers, { className: "h-5 w-5" }),
          " Carte de positionnement"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Survolez ou cliquez un point pour voir les colonnes sources. Les points gris sont marqu\xE9s inactifs/absorb\xE9s et ne sont pas compt\xE9s comme pairs vivants." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full", style: { height: "760px" }, children: /* @__PURE__ */ jsxs("svg", { viewBox: `0 0 ${width} ${height}`, className: "w-full h-full", role: "img", "aria-label": "Quadrant strat\xE9gique des comparables IA agents", children: [
          /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width, height, rx: "18", fill: "hsl(var(--card))" }),
          /* @__PURE__ */ jsx("rect", { x: margin.left, y: margin.top, width: sx(xThreshold) - margin.left, height: sy(yThreshold) - margin.top, fill: "var(--chart-4)", opacity: "0.08" }),
          /* @__PURE__ */ jsx("rect", { x: sx(xThreshold), y: margin.top, width: margin.left + plotW - sx(xThreshold), height: sy(yThreshold) - margin.top, fill: "var(--chart-1)", opacity: "0.12" }),
          /* @__PURE__ */ jsx("rect", { x: margin.left, y: sy(yThreshold), width: sx(xThreshold) - margin.left, height: margin.top + plotH - sy(yThreshold), fill: "var(--chart-3)", opacity: "0.08" }),
          /* @__PURE__ */ jsx("rect", { x: sx(xThreshold), y: sy(yThreshold), width: margin.left + plotW - sx(xThreshold), height: margin.top + plotH - sy(yThreshold), fill: "var(--chart-2)", opacity: "0.08" }),
          /* @__PURE__ */ jsx("line", { x1: sx(xThreshold), x2: sx(xThreshold), y1: margin.top, y2: margin.top + plotH, stroke: "hsl(var(--border))", strokeWidth: "2", strokeDasharray: "8 8" }),
          /* @__PURE__ */ jsx("line", { x1: margin.left, x2: margin.left + plotW, y1: sy(yThreshold), y2: sy(yThreshold), stroke: "hsl(var(--border))", strokeWidth: "2", strokeDasharray: "8 8" }),
          /* @__PURE__ */ jsx("line", { x1: margin.left, x2: margin.left + plotW, y1: margin.top + plotH, y2: margin.top + plotH, stroke: "hsl(var(--foreground))", strokeWidth: "2" }),
          /* @__PURE__ */ jsx("line", { x1: margin.left, x2: margin.left, y1: margin.top, y2: margin.top + plotH, stroke: "hsl(var(--foreground))", strokeWidth: "2" }),
          /* @__PURE__ */ jsx("text", { x: margin.left, y: margin.top - 24, fontSize: "15", fontWeight: "700", fill: "hsl(var(--foreground))", children: "Haut-gauche : suites m\xE9tier \xE0 construire/custom" }),
          /* @__PURE__ */ jsx("text", { x: sx(73), y: margin.top - 24, fontSize: "15", fontWeight: "700", fill: "hsl(var(--foreground))", children: "Haut-droite : suites m\xE9tier pr\xEAtes \xE0 l'emploi" }),
          /* @__PURE__ */ jsx("text", { x: margin.left, y: margin.top + plotH + 44, fontSize: "15", fontWeight: "700", fill: "hsl(var(--foreground))", children: "Bas-gauche : plateformes g\xE9n\xE9riques DIY" }),
          /* @__PURE__ */ jsx("text", { x: sx(67), y: margin.top + plotH + 44, fontSize: "15", fontWeight: "700", fill: "hsl(var(--foreground))", children: "Bas-droite : outils g\xE9n\xE9riques pr\xEAts \xE0 l'emploi" }),
          /* @__PURE__ */ jsx("text", { x: margin.left + plotW / 2, y: height - 28, textAnchor: "middle", fontSize: "16", fontWeight: "700", fill: "hsl(var(--foreground))", children: "Agents \xE0 construire (DIY / sur-mesure) \u2192 Agents pr\xEAts \xE0 l'emploi" }),
          /* @__PURE__ */ jsx("text", { transform: `translate(34 ${margin.top + plotH / 2}) rotate(-90)`, textAnchor: "middle", fontSize: "16", fontWeight: "700", fill: "hsl(var(--foreground))", children: "Plateforme g\xE9n\xE9rique \u2192 Suites verticales m\xE9tier" }),
          /* @__PURE__ */ jsx("rect", { x: sx(80), y: sy(98), width: sx(100) - sx(80), height: sy(78) - sy(98), rx: "14", fill: "none", stroke: "var(--chart-1)", strokeWidth: "3", strokeDasharray: "10 8" }),
          /* @__PURE__ */ jsx("circle", { cx: sx(92), cy: sy(92), r: "12", fill: "var(--chart-1)", opacity: "0.92" }),
          /* @__PURE__ */ jsx("text", { x: sx(92), y: sy(92) + 5, textAnchor: "middle", fontSize: "16", fontWeight: "900", fill: "hsl(var(--background))", children: "Y" }),
          /* @__PURE__ */ jsx("text", { x: sx(81), y: sy(97) - 10, fontSize: "14", fontWeight: "800", fill: "var(--chart-1)", children: "WHITE SPACE YELEMA" }),
          /* @__PURE__ */ jsx("text", { x: sx(81), y: sy(97) + 10, fontSize: "12", fill: "hsl(var(--muted-foreground))", children: "Suites m\xE9tier UEMOA pr\xEAtes en 2-4 semaines" }),
          visiblePoints.map((p, index) => {
            const q = quadrantOf(p);
            const cx = sx(p.x) + (index % 7 - 3) * 4;
            const cy = sy(p.y) + (index % 5 - 2) * 4;
            const fill = colorFor(p);
            const low = p.confidence === "faible\u2049";
            const inactive = p.status !== "actif";
            return /* @__PURE__ */ jsxs("g", { onMouseEnter: () => setSelected(p), onClick: () => setSelected(p), style: { cursor: "pointer" }, children: [
              /* @__PURE__ */ jsx("circle", { cx, cy, r: inactive ? 6 : 7, fill: inactive ? "hsl(var(--card))" : fill, stroke: fill, strokeWidth: inactive ? 2 : 1.5, strokeDasharray: inactive ? "5 4" : void 0, opacity: inactive ? 0.75 : 0.94 }),
              low && /* @__PURE__ */ jsx("text", { x: cx + 8, y: cy - 8, fontSize: "14", fontWeight: "800", fill: "var(--chart-5)", children: "\u2049" }),
              (showLabels || q === "Top-Right") && !inactive && /* @__PURE__ */ jsx("text", { x: cx + 10, y: cy + 4, fontSize: "11", fontWeight: q === "Top-Right" ? 700 : 500, fill: "hsl(var(--foreground))", children: shortName(p.startup) })
            ] }, p.startup);
          })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-3 md:items-start md:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full", style: { background: "var(--chart-1)" } }),
              " Top-right actif"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full", style: { background: "var(--chart-2)" } }),
              " G\xE9n\xE9rique ready-to-go"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full", style: { background: "var(--chart-3)" } }),
              " \xC0 construire"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full", style: { background: "var(--chart-5)" } }),
              " Faible confiance \u2049"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full border border-muted-foreground" }),
              " Inactif/absorb\xE9"
            ] })
          ] }),
          selected ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-muted p-3 w-full md:max-w-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold", children: selected.startup }),
              /* @__PURE__ */ jsx(Badge, { variant: selected.status === "actif" ? "secondary" : "outline", children: selected.status })
            ] }),
            /* @__PURE__ */ jsx(Separator, { className: "my-2" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Coordonn\xE9es" }),
                /* @__PURE__ */ jsx("br", {}),
                "X ",
                selected.x,
                " / Y ",
                selected.y
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Quadrant" }),
                /* @__PURE__ */ jsx("br", {}),
                quadrantOf(selected)
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Horiz/Vert" }),
                /* @__PURE__ */ jsx("br", {}),
                selected.hv
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Verticale(s)" }),
                /* @__PURE__ */ jsx("br", {}),
                selected.verticals
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Pricing outcome" }),
                /* @__PURE__ */ jsx("br", {}),
                selected.outcome
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "CS / RUN" }),
                /* @__PURE__ */ jsx("br", {}),
                selected.cs,
                " / ",
                selected.run
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Business Model" }),
                /* @__PURE__ */ jsx("br", {}),
                selected.businessModel
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-muted p-3 text-sm text-muted-foreground w-full md:max-w-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4" }),
            " S\xE9lectionnez un point pour voir les colonnes sources."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Wrench, { className: "h-5 w-5" }),
        " R\xE8gle de lecture"
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "text-sm text-muted-foreground space-y-2", children: [
        /* @__PURE__ */ jsx("p", { children: "X : score de readiness 0-100 (15-35 = plateformes/dev \xE0 construire \xB7 40-60 = produits \xE0 forte int\xE9gration \xB7 65-90 = agents pr\xEAts \xE0 l'emploi). Seuil \xE0 60. Scoring heuristique 11/06 \u2014 confiance h\xE9rit\xE9e des fiches 00.3." }),
        /* @__PURE__ */ jsx("p", { children: "Y : Horizontal = 20, Hybride = 55, Vertical = 85 (verticalisation 00.3). Seuil \xE0 60." }),
        /* @__PURE__ */ jsx("p", { children: "Le coin haut-droite au-del\xE0 de 80/80 mat\xE9rialise le white space Yelema : suites verticales m\xE9tier livr\xE9es pr\xEAtes \xE0 l'emploi en 2-4 semaines, localis\xE9es UEMOA." })
      ] })
    ] })
  ] });
}
export {
  QuadrantComparablesYelema as default
};
