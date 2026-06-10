import React from "react";
const FRAMER_PROPS = new Set(["initial","animate","exit","transition","variants","whileHover","whileTap","whileFocus","whileInView","whileDrag","viewport","layout","layoutId","layoutScroll","drag","dragConstraints","dragElastic","onAnimationStart","onAnimationComplete","onViewportEnter","onViewportLeave","custom","style"]);
function clean(props) {
  const o = {}; let style = props.style && typeof props.style === "object" ? { ...props.style } : undefined;
  for (const k in props) { if (k === "style") continue; if (!FRAMER_PROPS.has(k)) o[k] = props[k]; }
  if (style) o.style = style;
  return o;
}
const cache = {};
function make(tag) {
  if (!cache[tag]) cache[tag] = React.forwardRef(function M(props, ref) {
    return React.createElement(tag, { ref, ...clean(props) }, props.children);
  });
  return cache[tag];
}
export const motion = new Proxy({}, { get: (_, tag) => make(typeof tag === "string" ? tag : "div") });
export function AnimatePresence({ children }) { return React.createElement(React.Fragment, null, children); }
export default { motion, AnimatePresence };
