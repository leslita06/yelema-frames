import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
const STEPS = [
  { key: "s1", label: "\u221A\xE2TAPE 1", name: "ACTIVATION", sub: "D\u221A\xA9ploiement & acc\u221A\xAEs" },
  { key: "s2", label: "\u221A\xE2TAPE 2", name: "REQU\u221A\xE4TE", sub: "Soumission de la demande" },
  { key: "s3", label: "\u221A\xE2TAPE 3", name: "EX\u221A\xE2CUTION", sub: "Traitement agentique" },
  { key: "s4", label: "\u221A\xE2TAPE 4", name: "LIVRAISON", sub: "R\u221A\xA9ception du livrable" },
  { key: "s5", label: "\u221A\xE2TAPE 5", name: "OP\u221A\xE2RATION", sub: "Suivi & am\u221A\xA9lioration" }
];
const DIMENSIONS = [
  { key: "time", emoji: "\u201A\xE8\xB1\xD4\u220F\xE8", label: "TIME", bg: "bg-amber-50", header: "bg-amber-100", border: "border-amber-300" },
  { key: "evidence", emoji: "\uF8FF\xFC\xEC\xB1", label: "EVIDENCE", bg: "bg-sky-50", header: "bg-sky-100", border: "border-sky-300" },
  { key: "journey", emoji: "\uF8FF\xFC\xEB\xA7", label: "CUSTOMER JOURNEY", bg: "bg-emerald-50", header: "bg-emerald-100", border: "border-emerald-300" },
  { key: "tech", emoji: "\u201A\xF6\xF4\xD4\u220F\xE8", label: "TECHNOLOGY", bg: "bg-violet-50", header: "bg-violet-100", border: "border-violet-300" },
  { key: "actor", emoji: "\uF8FF\xFC\xEB\u2022", label: "\u221A\xE2QUIPE YELEMA", bg: "bg-indigo-50", header: "bg-indigo-100", border: "border-indigo-300" },
  { key: "value", emoji: "\uF8FF\xFC\xED\xE9", label: "VALUE PROPOSITION", bg: "bg-rose-50", header: "bg-rose-100", border: "border-rose-300" }
];
const DATA = {
  time: {
    s1: { before: "12\u201A\xC4\xEC24 MOIS", with_: "2\u201A\xC4\xEC3 SEMAINES" },
    s2: { before: "30 MIN", with_: "2 MIN" },
    s3: { before: "48\u201A\xC4\xEC72H", with_: "2\u201A\xC4\xEC3 MIN" },
    s4: { before: "2H", with_: "5 MIN" },
    s5: { before: "VEILLE MANUELLE EN CONTINU", with_: "SLA GARANTI YELEMA" }
  },
  evidence: {
    s1: { content: "Interface d'onboarding Yelema + questionnaire de contextualisation RH (30 min) \u201A\xC4\xEE acc\u221A\xAEs imm\u221A\xA9diat sans configuration technique" },
    s2: { content: "WhatsApp Business ou interface web Yelema \u201A\xC4\xEE message conversationnel naturel, z\u221A\xA9ro formulaire, z\u221A\xA9ro jargon technique" },
    s3: { content: "Dashboard op\u221A\xA9rateur Yelema \u201A\xC4\xEE confirmation de prise en charge + statut d'ex\u221A\xA9cution en temps r\u221A\xA9el dans le fil WhatsApp" },
    s4: { content: "Contrat OHADA complet (Word/PDF) livr\u221A\xA9 directement sur WhatsApp \u201A\xC4\xEE pr\u221A\u2122t \u221A\u2020 signer, sans mise en forme suppl\u221A\xA9mentaire" },
    s5: { content: "Rapport mensuel de performance Yelema + alertes proactives mises \u221A\u2020 jour r\u221A\xA9glementaires OHADA dans le canal d\u221A\xA9di\u221A\xA9" }
  },
  journey: {
    s1: { content: "Signe le contrat Build & Operate, r\u221A\xA9pond au questionnaire de contextualisation RH (30 min), acc\u221A\xAEde \u221A\u2020 son agent sans aucune action technique" },
    s2: { content: "Envoie sur WhatsApp : \xAC\xB4 R\u221A\xA9dige un contrat CDI cadre pour Kon\u221A\xA9 Amadou, Responsable Financier, 450 000 FCFA/mois, essai 3 mois \xAC\xAA" },
    s3: { content: "Re\u221A\xDFoit une confirmation instantan\u221A\xA9e de prise en charge, continue ses t\u221A\xA2ches \u201A\xC4\xEE aucune action requise pendant l'ex\u221A\xA9cution de l'agent" },
    s4: { content: "Re\u221A\xDFoit le contrat complet sur WhatsApp, valide ou demande une correction en 1 message, t\u221A\xA9l\u221A\xA9charge et transmet directement au salari\u221A\xA9" },
    s5: { content: "Consulte le rapport mensuel, escalade les cas complexes via le canal d\u221A\xA9di\u221A\xA9, b\u221A\xA9n\u221A\xA9ficie automatiquement des mises \u221A\u2020 jour OHADA sans aucune action" }
  },
  tech: {
    s1: { content: "Orchestrateur agentique LLM-agnostique (Mistral on-prem via Cassava) + connecteurs donn\u221A\xA9es RH existantes du client + playbooks OHADA propri\u221A\xA9taires Yelema" },
    s2: { content: "API WhatsApp Business + NLP multilingue (fran\u221A\xDFais + langues locales UEMOA) + parsing d'intent + routing intelligent vers l'agent RH vertical" },
    s3: { content: "Pipeline agentique autonome : extraction param\u221A\xAEtres \u201A\xDC\xED appel playbooks OHADA \u201A\xDC\xED g\u221A\xA9n\u221A\xA9ration documentaire \u201A\xDC\xED v\u221A\xA9rification conformit\u221A\xA9 \u201A\xDC\xED formatting livrable" },
    s4: { content: "Webhook de livraison WhatsApp + stockage souverain (Cassava) + signature \u221A\xA9lectronique optionnelle + audit trail complet + archivage gouvernance data" },
    s5: { content: "Monitoring SLA automatis\u221A\xA9 + fine-tuning continu sur les corrections client + alertes proactives r\u221A\xA9glementaires OHADA + reporting BI mensuel automatique" }
  },
  actor: {
    s1: { content: "Configure et d\u221A\xA9ploie l'agent RH en 2 semaines : mise en ordre des donn\u221A\xA9es client, int\u221A\xA9gration playbooks m\u221A\xA9tier, tests de conformit\u221A\xA9, formation interface 30 min" },
    s2: { content: "Disponible en support SLA J+1 si blocage dans la formulation \u201A\xC4\xEE pratiquement jamais d\u221A\xA9clench\u221A\xA9 apr\u221A\xAEs la premi\u221A\xAEre semaine d'usage" },
    s3: { content: "Monitore l'ex\u221A\xA9cution en temps r\u221A\xA9el, intervient manuellement sur les cas atypiques hors playbook, valide la conformit\u221A\xA9 du livrable avant envoi au client" },
    s4: { content: "Traite les demandes de correction dans le SLA contractuel (< 4h ouvr\u221A\xA9es), archive chaque livrable dans le syst\u221A\xAEme de gouvernance data du client" },
    s5: { content: "Produit le rapport mensuel de performance, d\u221A\xA9ploie automatiquement les mises \u221A\u2020 jour r\u221A\xA9glementaires, propose des extensions du p\u221A\xA9rim\u221A\xAEtre agent (nouveaux workflows RH)" }
  },
  value: {
    s1: { content: "Z\u221A\xA9ro projet technique c\u221A\xA5t\u221A\xA9 DRH : agent pr\u221A\u2122t en 2 semaines, contextualis\u221A\xA9 OHADA, sans ing\u221A\xA9nieur interne ni appel d'offres DSI \u201A\xC4\xEE vs 12 \u221A\u2020 24 mois de projet custom" },
    s2: { content: "D\u221A\xA9l\u221A\xA9gation en langage naturel sur le canal du quotidien \u201A\xC4\xEE le DRH interagit comme il enverrait un message \u221A\u2020 un collaborateur, sans formulaire ni interface m\u221A\xA9tier" },
    s3: { content: "Lib\u221A\xA9ration totale du temps DRH pendant l'ex\u221A\xA9cution : l'agent op\u221A\xAEre en autonomie compl\u221A\xAEte, sans aller-retour ni relance \u201A\xC4\xEE 48h de travail juridique compress\u221A\xA9es en 3 min" },
    s4: { content: "Livrable directement actionnable et conforme OHADA livr\u221A\xA9 en minutes \u201A\xC4\xEE contre 2 \u221A\u2020 3 jours avec un juriste interne ou externe, \u221A\u2020 un co\u221A\xAAt marginal nul" },
    s5: { content: "Garantie de conformit\u221A\xA9 permanente sans veille juridique interne : Yelema absorbe la complexit\u221A\xA9 r\u221A\xA9glementaire dans la dur\u221A\xA9e, le DRH se concentre sur la gestion des talents" }
  }
};
const TRANSFORM_ITEMS = [
  { icon: "\u201A\xE8\xB1\xD4\u220F\xE8", label: "Temps \u221A\xA9conomis\u221A\xA9", text: "De 18 mois de projet \u221A\u2020 2 semaines d'activation \xAC\u2211 De 72h de d\u221A\xA9lai par contrat \u221A\u2020 3 minutes d'ex\u221A\xA9cution agentique" },
  { icon: "\u201A\xF6\xF4\xD4\u220F\xE8", label: "Process simplifi\u221A\xA9s", text: "5 \u221A\xA9tapes manuelles (brief juriste \u201A\xDC\xED r\u221A\xA9daction \u201A\xDC\xED relecture \u201A\xDC\xED correction \u201A\xDC\xED mise en forme) remplac\u221A\xA9es par 1 message WhatsApp" },
  { icon: "\uF8FF\xFC\xF6\xC4", label: "Nouvelles capacit\u221A\xA9s", text: "Conformit\u221A\xA9 OHADA permanente \xAC\u2211 Multilingue (bambara, fran\u221A\xDFais) \xAC\u2211 Multi-canal natif \xAC\u2211 Z\u221A\xA9ro comp\u221A\xA9tence technique requise" },
  { icon: "\uF8FF\xFC\xED\u221E", label: "ROI estim\u221A\xA9", text: "~3h/jour r\u221A\xA9cup\u221A\xA9r\u221A\xA9es par DRH \xAC\u2211 Co\u221A\xAAt d'un juriste junior externalis\u221A\xA9 \u221A\xA9vit\u221A\xA9 \xAC\u2211 ROI estim\u221A\xA9 inf\u221A\xA9rieur \u221A\u2020 3 mois" }
];
const RECS = [
  { num: "01", color: "bg-violet-600", title: "Lancer un POC sur le vertical RH / contrats OHADA", desc: "Cas d'usage le plus d\u221A\xA9montrable et imm\u221A\xA9diatement visible pour le Responsable M\u221A\xA9tier \u201A\xC4\xEE preuve de valeur en < 2 semaines, id\u221A\xA9al pour enclencher la prescription bottom-up vers le DG." },
  { num: "02", color: "bg-indigo-600", title: "Activer le canal WhatsApp comme point d'entr\u221A\xA9e exclusif", desc: "Friction d'adoption quasi-nulle : le DRH utilise d\u221A\xA9j\u221A\u2020 WhatsApp quotidiennement. Aucune formation, aucune app \u221A\u2020 installer \u201A\xC4\xEE adoption imm\u221A\xA9diate d\u221A\xAEs le J+1." },
  { num: "03", color: "bg-emerald-600", title: "Instrumenter le temps \u221A\xA9conomis\u221A\xA9 d\u221A\xAEs J+7 pour la prescription DG", desc: "Mesurer et restituer le gain horaire hebdomadaire au DRH d\u221A\xAEs la premi\u221A\xAEre semaine : c'est le meilleur argument de prescription bottom-up vers le D\u221A\xA9cideur Ex\u221A\xA9cutif." }
];
function YelemaBlueprint() {
  const [collapsed, setCollapsed] = useState(/* @__PURE__ */ new Set());
  const [activeStep, setActiveStep] = useState(null);
  const toggleDim = (key) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };
  const allCollapsed = collapsed.size === DIMENSIONS.length;
  const toggleAll = () => {
    if (allCollapsed) {
      setCollapsed(/* @__PURE__ */ new Set());
    } else {
      setCollapsed(new Set(DIMENSIONS.map((d) => d.key)));
    }
  };
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-background px-4 py-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-5", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-xl border-2 border-violet-300 bg-violet-50 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-violet-400 mb-1", children: "Service Blueprint \xAC\u2211 Mstudio EIR \xAC\u2211 Juin 2026" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold text-violet-800", children: "YELEMA \u201A\xC4\xEE Agent RH \xAC\u2211 Contrats OHADA" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-violet-600 mt-1 max-w-xl", children: [
          /* @__PURE__ */ jsx("strong", { children: "Persona :" }),
          " Responsable M\u221A\xA9tier Fonctionnel (DRH) \xA0\xAC\u2211\xA0",
          /* @__PURE__ */ jsx("strong", { children: "Cas d'usage :" }),
          " D\u221A\xA9l\u221A\xA9gation r\u221A\xA9daction contrat de travail OHADA via WhatsApp"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 items-end", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700", children: "B2B Priv\u221A\xA9 \xAC\u2211 UEMOA" }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-700", children: "Build & Operate \xAC\u2211 Off-the-shelf" }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700", children: "Souverain \xAC\u2211 LLM-agnostique" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wide", children: "Filtrer par \u221A\xA9tape (cliquer pour surligner)" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-2", style: { gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }, children: STEPS.map((step) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveStep(activeStep === step.key ? null : step.key),
          className: `rounded-lg border-2 p-3 text-left transition-all ${activeStep === step.key ? "border-violet-500 bg-violet-50 shadow" : "border-slate-200 bg-card hover:border-violet-300"}`,
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-violet-500", children: step.label }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-800", children: step.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-0.5 leading-tight", children: step.sub })
          ]
        },
        step.key
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: toggleAll,
        className: "flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors",
        children: allCollapsed ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "h-3.5 w-3.5" }),
          " Tout d\u221A\xA9plier"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(ChevronsDownUp, { className: "h-3.5 w-3.5" }),
          " Tout replier"
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: DIMENSIONS.map((dim) => {
      const isOpen = !collapsed.has(dim.key);
      return /* @__PURE__ */ jsxs("div", { className: `rounded-xl border-2 overflow-hidden ${dim.border}`, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: `w-full flex items-center justify-between px-4 py-3 ${dim.header} font-bold text-slate-700 text-sm`,
            onClick: () => toggleDim(dim.key),
            children: [
              /* @__PURE__ */ jsxs("span", { children: [
                dim.emoji,
                " ",
                dim.label
              ] }),
              isOpen ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4 text-slate-500" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-slate-500" })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsx(
          "div",
          {
            className: "grid gap-px bg-slate-200",
            style: { gridTemplateColumns: "repeat(5, minmax(0, 1fr))" },
            children: STEPS.map((step) => {
              const cell = DATA[dim.key][step.key];
              const highlight = activeStep === step.key;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `p-3 text-xs leading-relaxed transition-all ${dim.bg} ${highlight ? "ring-2 ring-violet-500 ring-inset" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-extrabold text-violet-600 mb-2 uppercase tracking-wide", children: step.name }),
                    dim.key === "time" ? /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start gap-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-600", children: "BEFORE" }),
                        /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-600 text-xs", children: cell.before })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start gap-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-600", children: "WITH" }),
                        /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700 text-xs", children: cell.with_ })
                      ] })
                    ] }) : /* @__PURE__ */ jsx("p", { className: "text-slate-600", children: cell.content })
                  ]
                },
                step.key
              );
            })
          }
        )
      ] }, dim.key);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border-2 border-violet-200 bg-violet-50 p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-violet-800 mb-3", children: "\uF8FF\xFC\xED\xB0 TRANSFORMATION QUANTIFI\u221A\xE2E" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3", style: { gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }, children: TRANSFORM_ITEMS.map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white border border-violet-100 p-3", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-violet-500 uppercase tracking-wide mb-1", children: [
          item.icon,
          " ",
          item.label
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: item.text })
      ] }, item.label)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-indigo-800 mb-3", children: "\uF8FF\xFC\xE9\xD8 RECOMMANDATIONS PRIORITAIRES" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: RECS.map((rec) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 rounded-lg bg-white border border-indigo-100 p-3", children: [
        /* @__PURE__ */ jsx("span", { className: `shrink-0 flex h-8 w-8 items-center justify-center rounded-full ${rec.color} text-white text-xs font-extrabold`, children: rec.num }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-800", children: rec.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-0.5 leading-relaxed", children: rec.desc })
        ] })
      ] }, rec.num)) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-slate-400 pb-2", children: "Yelema \xAC\u2211 Service Blueprint \xAC\u2211 Mstudio EIR \xAC\u2211 Juin 2026 \u201A\xC4\xEE Document de travail confidentiel" })
  ] }) });
}
export {
  YelemaBlueprint as default
};
