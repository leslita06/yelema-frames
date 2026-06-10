import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const strip = (p, keys) => { const o = { ...p }; keys.forEach(k => delete o[k]); return o; };
export function Card({ className, ...p }) {
  return React.createElement("div", { className: cx("rounded-xl border border-gray-200 bg-white shadow-sm", className), ...p });
}
export function CardHeader({ className, ...p }) {
  return React.createElement("div", { className: cx("flex flex-col space-y-1.5 p-5", className), ...p });
}
export function CardTitle({ className, ...p }) {
  return React.createElement("h3", { className: cx("font-semibold leading-none tracking-tight text-lg", className), ...p });
}
export function CardDescription({ className, ...p }) {
  return React.createElement("p", { className: cx("text-sm text-gray-500", className), ...p });
}
export function CardContent({ className, ...p }) {
  return React.createElement("div", { className: cx("p-5 pt-0", className), ...p });
}
export function Badge({ className, variant, ...p }) {
  const v = variant === "outline"
    ? "border border-gray-300 text-gray-700"
    : variant === "secondary"
    ? "bg-gray-100 text-gray-800 border border-transparent"
    : "bg-gray-900 text-white border border-transparent";
  return React.createElement("span", { className: cx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", v, className), ...strip(p, []) });
}
export function Button({ className, variant, size, asChild, ...p }) {
  const v = variant === "outline"
    ? "border border-gray-300 bg-white hover:bg-gray-50"
    : variant === "ghost"
    ? "hover:bg-gray-100"
    : variant === "secondary"
    ? "bg-gray-100 hover:bg-gray-200"
    : "bg-gray-900 text-white hover:bg-gray-800";
  const s = size === "sm" ? "h-8 px-3 text-xs" : size === "lg" ? "h-11 px-6" : "h-9 px-4 text-sm";
  return React.createElement("button", { className: cx("inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors", v, s, className), ...p });
}
export function Separator({ className, orientation = "horizontal", decorative, ...p }) {
  const o = orientation === "vertical" ? "h-full w-px" : "h-px w-full";
  return React.createElement("div", { className: cx("shrink-0 bg-gray-200", o, className), ...strip(p, []) });
}
