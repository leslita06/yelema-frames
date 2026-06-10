import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "shadcn";
import { Badge } from "shadcn";
import { motion, AnimatePresence } from "motion/react";
import {
  Target,
  Zap,
  TrendingUp,
  Users,
  Briefcase,
  Shield,
  Clock,
  Building2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Check,
  AlertCircle
} from "lucide-react";
const vpcData = {
  persona: "Responsable M\xE9tier Fonctionnel (DRH, DAF, Juridique, Marketing, GP fonds) \u2014 entreprise priv\xE9e UEMOA sans \xE9quipe IA interne, budget d\xE9cisionnel propre",
  jobs: [
    "Livrer des r\xE9sultats dans sa fonction sans d\xE9pendre de la DSI",
    "Automatiser les t\xE2ches r\xE9p\xE9titives de son \xE9quipe sans recruter",
    "Justifier l'investissement tech aupr\xE8s de sa direction avec un ROI rapide"
  ],
  pains: [
    "Aucune offre IA calibr\xE9e pour l'UEMOA (OHADA, langues locales, workflows africains)",
    "Projets IA = 12\u201318 mois, risqu\xE9s, souvent sans r\xE9sultat mesurable",
    "Aucun acteur qui construit ET op\xE8re \u2014 risque permanent de transfert de comp\xE9tences rat\xE9"
  ],
  gains: [
    "Agents op\xE9rationnels en 2\u20134 semaines \u2014 ROI mesurable d\xE8s le 1er mois",
    "Z\xE9ro charge technique \u2014 Yelema op\xE8re, le client utilise",
    "Co\xFBt pr\xE9visible (abonnement annuel) vs \xE9quipe interne non ma\xEEtrisable"
  ],
  products: "Catalogue ~200 agents IA m\xE9tier off-the-shelf (Dust) : RH & Recrutement (80% maturit\xE9), Compta-Finance (priorit\xE9 Q3-Q4), L\xE9gal & Conformit\xE9, Marketing Automation, VC/PE Investissement. Mode Build & Operate : Yelema construit, d\xE9ploie et op\xE8re en continu.",
  relievers: [
    "Catalogue pr\xE9-construit \u2192 d\xE9ploiement 2\u20134 semaines, z\xE9ro d\xE9veloppement from scratch",
    "Stack cloud public / on-prem souverain \u2192 une r\xE9ponse \xE0 chaque contrainte de souverainet\xE9",
    "Build & Operate \u2192 Yelema reste responsable du r\xE9sultat dans la dur\xE9e (pas de transfert rat\xE9)"
  ],
  creators: [
    "Time-to-value 2\u20134 semaines vs 12\u201318 mois pour un d\xE9veloppement interne \xE9quivalent",
    "\xC9quipe m\xE9tier lib\xE9r\xE9e des t\xE2ches r\xE9p\xE9titives, focus d\xE9plac\xE9 vers la valeur ajout\xE9e",
    "No LLM lock-in + ancrage terrain UEMOA (OHADA, langues locales, r\xE9f\xE9rences CI/B\xE9nin)"
  ],
  steveBlank: {
    client: "Responsables M\xE9tier Fonctionnels d'entreprises priv\xE9es UEMOA (DRH, DAF, Juridique, Marketing, GP fonds)",
    besoin: "Automatiser leurs t\xE2ches fonctionnelles r\xE9p\xE9titives sans recruter ni monter d'\xE9quipe IA interne",
    solution: "Agents IA m\xE9tier off-the-shelf op\xE9r\xE9s par Yelema (Build & Operate) \u2014 catalogue ~200 agents calibr\xE9s UEMOA, d\xE9ploy\xE9s en 2\u20134 semaines"
  },
  alternatives: [
    { name: "Build Interne", reason: "12\u201318 mois, >300k\u20AC/an, expertise inexistante en UEMOA, risque projet maximal \u2014 et la DSI reste gatekeeper" },
    { name: "SaaS G\xE9n\xE9ralistes (ChatGPT, Copilot, Gemini)", reason: "Non op\xE9r\xE9, non contextualis\xE9 UEMOA, pas d'int\xE9gration workflows m\xE9tier, pas de support local ni de garantie de r\xE9sultat" },
    { name: "Cabinets Conseil Classiques", reason: "Livrent des slides et des recommandations, pas des agents en production. Non op\xE9rateurs. ROI non garanti." },
    { name: "Statu Quo", reason: "Excel + WhatsApp + process manuels. Productivit\xE9 stagnante, recrutements compensatoires co\xFBteux, perte de comp\xE9titivit\xE9 progressive." }
  ],
  segments: [
    { name: "Grands groupes panafricains", desc: "RH \xB7 Finance \xB7 L\xE9gal \xB7 Marketing", priority: 3, ticket: "15\u2013120 k\u20AC/an", cycle: "2\u20138 sem", mode: "Off-the-shelf" },
    { name: "Fonds PE/VC UEMOA", desc: "Sourcing \xB7 DD \xB7 Monitoring \xB7 LP Reporting", priority: 3, ticket: "20\u201380 k\u20AC/an", cycle: "2\u20136 sem", mode: "Off-the-shelf" },
    { name: "Startups via programmes", desc: "Catalogue ~200 agents via sponsor institutionnel", priority: 2, ticket: "5\u201330 k\u20AC (sponsor)", cycle: "J+7", mode: "Off-the-shelf" },
    { name: "Institutions internationales", desc: "Custom hybride Mistral EU (BAD, IFC, BCEAO)", priority: 1, ticket: "50\u2013200 k\u20AC", cycle: "2\u20134 mois", mode: "Semi-custom" },
    { name: "Gouvernements B2G", desc: "On-prem souverain \u2014 vocation r\xE9elle, jamais c\u0153ur de cible", priority: 0, ticket: "150k\u20AC\u20132M\u20AC", cycle: "3\u201318 mois", mode: "Full Custom" }
  ]
};
const TABS = ["VPC Canvas", "Formule & Segments", "vs Alternatives"];
const fadeProps = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.22 }
};
function YelemaVPC() {
  const [tab, setTab] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col bg-slate-50", style: { minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-900 text-white px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-blue-400 mb-1", children: "Yelema \xB7 Mstudio \xB7 Phase EIR" }),
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold tracking-tight", children: "Value Proposition Canvas" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Cible principale : B2B Priv\xE9 UEMOA \u2014 Juin 2026" })
      ] }),
      /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-slate-300 border-slate-600 text-xs px-3", children: "Build & Operate" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-slate-200 px-4 flex", children: TABS.map((t, i) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setTab(i),
        className: `px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${tab === i ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"}`,
        children: t
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
      tab === 0 && /* @__PURE__ */ jsx(PageVPC, {}, "vpc"),
      tab === 1 && /* @__PURE__ */ jsx(PageFormula, {}, "formula"),
      tab === 2 && /* @__PURE__ */ jsx(PageAlternatives, {}, "alts")
    ] }) })
  ] });
}
function PageVPC() {
  return /* @__PURE__ */ jsxs(motion.div, { ...fadeProps, className: "space-y-3 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(Card, { className: "border-slate-200", children: /* @__PURE__ */ jsxs(CardContent, { className: "py-3 px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5 text-blue-600 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-blue-700 uppercase tracking-wide", children: "Persona Cible \u2014 B2B Priv\xE9 UEMOA" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-800", children: vpcData.persona })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest px-1", children: "\u25FC Value Map" }),
        /* @__PURE__ */ jsxs(Card, { className: "border-blue-200 bg-blue-50", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-xs font-bold text-blue-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-3 h-3" }),
            " Produits & Services"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-900 leading-relaxed", children: vpcData.products }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-red-200 bg-red-50", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-xs font-bold text-red-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Shield, { className: "w-3 h-3" }),
            " Pain Relievers"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3 space-y-1.5", children: vpcData.relievers.map((r, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 text-red-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-red-900", children: r })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-emerald-200 bg-emerald-50", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-xs font-bold text-emerald-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-3 h-3" }),
            " Gain Creators"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3 space-y-1.5", children: vpcData.creators.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3 text-emerald-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-900", children: c })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-widest px-1 text-right", children: "Customer Profile \u25CF" }),
        /* @__PURE__ */ jsxs(Card, { className: "border-blue-200 bg-blue-50", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-xs font-bold text-blue-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Target, { className: "w-3 h-3" }),
            " Customer Jobs"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3 space-y-1.5", children: vpcData.jobs.map((j, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-blue-600 shrink-0", children: [
              i + 1,
              "."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-900", children: j })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-red-200 bg-red-50", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-xs font-bold text-red-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-3 h-3" }),
            " Pains"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3 space-y-1.5", children: vpcData.pains.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3 text-red-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-red-900", children: p })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-emerald-200 bg-emerald-50", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-xs font-bold text-emerald-800 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }),
            " Gains"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3 space-y-1.5", children: vpcData.gains.map((g, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-start", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-emerald-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-900", children: g })
          ] }, i)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 rounded-lg px-4 py-3 flex items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "Value Map" }),
      /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-blue-400" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-blue-300 uppercase tracking-wide", children: "Fit valid\xE9" }),
      /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-blue-400" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "Customer Profile" })
    ] })
  ] });
}
function PageFormula() {
  return /* @__PURE__ */ jsxs(motion.div, { ...fadeProps, className: "space-y-4 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-700 rounded-xl p-5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-blue-300 mb-3", children: "Formule Steve Blank \u2014 B2B Priv\xE9 UEMOA" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium leading-relaxed text-white", children: [
        '"Nous aidons les',
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-yellow-300 font-bold", children: "Responsables M\xE9tier d'entreprises priv\xE9es UEMOA" }),
        " ",
        "\xE0",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-emerald-300 font-bold", children: "automatiser leurs t\xE2ches fonctionnelles r\xE9p\xE9titives" }),
        " ",
        "gr\xE2ce \xE0 des",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-cyan-300 font-bold", children: "agents IA off-the-shelf op\xE9r\xE9s par Yelema, d\xE9ploy\xE9s en 2\u20134 semaines \u2014 sans projet informatique ni \xE9quipe IA interne" }),
        '."'
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxs(Card, { className: "border-yellow-200 bg-yellow-50", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xs font-bold text-yellow-700", children: "Pour qui" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-700", children: vpcData.steveBlank.client }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-emerald-200 bg-emerald-50", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xs font-bold text-emerald-700", children: "Quel besoin" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-700", children: vpcData.steveBlank.besoin }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-blue-200 bg-blue-50", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "py-2 px-3 pb-1", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xs font-bold text-blue-700", children: "Quelle solution" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "py-0 px-3 pb-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-700", children: vpcData.steveBlank.solution }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Priorit\xE9 segments" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "B2B Priv\xE9 = c\u0153ur \xB7 B2G = exceptionnel" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: vpcData.segments.map((seg, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.06 },
          className: "flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex gap-1 shrink-0", children: [0, 1, 2].map((d) => /* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full ${d < seg.priority ? "bg-blue-600" : "bg-slate-200"}` }, d)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-800 truncate", children: seg.name }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 shrink-0 font-mono", children: seg.ticket })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: [
                seg.desc,
                " \xB7 ",
                seg.cycle,
                " \xB7 ",
                seg.mode
              ] })
            ] })
          ]
        },
        i
      )) })
    ] })
  ] });
}
function PageAlternatives() {
  return /* @__PURE__ */ jsxs(motion.div, { ...fadeProps, className: "space-y-4 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-sm", children: "Pourquoi les alternatives \xE9chouent" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Ce que fait le prospect \u2014 et pourquoi \xE7a ne suffit pas" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: vpcData.alternatives.map((alt, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.07 },
          className: "flex items-start gap-3 p-3 rounded-lg border border-red-100 bg-red-50",
          children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-red-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800", children: alt.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 mt-0.5", children: alt.reason })
            ] })
          ]
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "border-blue-200", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm text-blue-800", children: "Yelema : combinaison non-copiable" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-3", children: [
        { icon: /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-blue-600" }), title: "Catalogue ~200 agents pr\xE9-construits", desc: "18\u201324 mois d'avance impossible \xE0 rattraper rapidement par un concurrent entrant" },
        { icon: /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-blue-600" }), title: "Build & Operate = barri\xE8re de switching", desc: "Une fois en production, sortir co\xFBte plus qu'en rester. Yelema reste op\xE9rateur dans la dur\xE9e." },
        { icon: /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4 text-blue-600" }), title: "Calibration UEMOA exclusive", desc: "OHADA, langues locales, workflows africains \u2014 les acteurs globaux ne font pas ce travail d'adaptation" },
        { icon: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-blue-600" }), title: "Ambidextrie cloud / on-prem souverain", desc: "Seul acteur avec les deux stacks op\xE9rationnels : Claude/GPT (priv\xE9) + Mistral/Llama (souverain)" }
      ].map((item, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 5 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          className: "flex items-start gap-3",
          children: [
            /* @__PURE__ */ jsx("div", { className: "shrink-0 mt-0.5", children: item.icon }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600", children: item.desc })
            ] })
          ]
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "border-orange-200 bg-orange-50", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "py-2 pb-1 px-4", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xs font-bold text-orange-700 uppercase tracking-wide", children: "Anti-persona \xB7 Ne pas cibler" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "px-4 pb-3 pt-1", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-orange-900 leading-relaxed", children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "DSI, CTO, CDO, \xE9quipes d'ing\xE9nieurs internes" }),
        " \u2014 gatekeepers qui ralentissent, pas acheteurs. Ils pr\xE9f\xE8rent construire en interne. La vente Yelema doit atteindre directement les",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Responsables M\xE9tier Fonctionnels" }),
        " \u2014 par-dessus ou en contournant la fonction IT."
      ] }) })
    ] })
  ] });
}
export {
  YelemaVPC as default
};
