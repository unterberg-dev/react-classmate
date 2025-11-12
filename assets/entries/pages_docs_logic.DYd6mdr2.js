import{j as e,C as t,i,a as s,o as l}from"../chunks/chunk-Bokv7s76.js";import{D as d,H as n}from"../chunks/chunk-DYO16Mu5.js";import{D as p}from"../chunks/chunk-BEvwXEMf.js";import{S as r,a,b as o,c,i as u}from"../chunks/chunk-CEv1v94T.js";/* empty css                      */import"../chunks/chunk-B1VfgWyW.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-ckwbz45p.js";const h=`import rc from "react-classmate"

interface NotificationProps {
  events: { type: "error" | "info" }[]
  $severity?: "idle" | "error"
  $hasErrors?: boolean
}

export const NotificationBadge = rc.button
  .logic<NotificationProps>((props) => {
    const hasErrors = props.events.some((event) => event.type === "error")
    return {
      $hasErrors: hasErrors,
      $severity: hasErrors ? "error" : "idle",
    }
  })
  .logic<NotificationProps>((props) => ({
    ["aria-live"]: props.$hasErrors ? "assertive" : "polite",
    ["data-has-errors"]: props.$hasErrors ? "true" : "false",
  }))
  .variants<NotificationProps, { $severity: "idle" | "error" }>({
    base: \`
      inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm
      border transition-colors duration-150
    \`,
    variants: {
      $severity: {
        idle: "border-slate-300 bg-white text-slate-900",
        error: "border-red-500 bg-red-50 text-red-900",
      },
    },
  })
`,m=`import rc from "react-classmate"

type DayStatus = "completed" | "skipped" | "pending"

interface WorkoutProps {
  workouts: number
  completed: number
  skipped: number
  $status?: DayStatus
}

export const WorkoutDay = rc.div
  .logic<WorkoutProps>((props) => {
    if (props.completed === props.workouts) {
      return { $status: "completed" }
    }
    if (props.skipped > 0) {
      return { $status: "skipped" }
    }
    return { $status: "pending" }
  })
  .variants<WorkoutProps, { $status: DayStatus }>({
    base: "rounded-md border p-4 transition-colors",
    variants: {
      $status: {
        completed: "border-green-500 bg-green-50",
        skipped: "border-orange-400 bg-orange-50",
        pending: "border-slate-300 bg-white",
      },
    },
    defaultVariants: {
      $status: "pending",
    },
  })
`,f=()=>e.jsxs(e.Fragment,{children:[e.jsx(d,{pre:"Builder helpers",main:".logic()",excerpt:"Colocate pure setup logic with your classmate component and expose the result to the template, variants and DOM output."}),e.jsx(r,{children:"What is a logic header?"}),e.jsxs(a,{children:[e.jsxs(o,{children:["Call ",e.jsx(t,{children:".logic()"})," before the template literal to run arbitrary JavaScript on every render. The function receives the current props and can return additional props that should be merged back in. Anything prefixed with ",e.jsx(t,{children:"$"})," is stripped from the DOM but stays available for interpolations and variants."]}),e.jsx(n,{input:m}),e.jsx(p,{className:"mt-6",children:e.jsx("p",{children:"Logic handlers must stay pure. They cannot use hooks or render JSX. Think of them as a small “header” that derives data for the actual component."})})]}),e.jsx(r,{children:"Compose multiple logic blocks"}),e.jsxs(a,{children:[e.jsxs(o,{children:["You can chain as many logic handlers as you need. Later handlers receive the props returned by previous ones which makes it trivial to set derived variant props, ",e.jsx(t,{children:"data-*"})," ","attributes or accessibility metadata in one place."]}),e.jsx(n,{input:h}),e.jsx(c,{children:"Why chain?"}),e.jsx(o,{children:"Chaining keeps concerns focused: derive your computed values in the first handler, attach DOM attributes in the second, etc. The logic stack executes in order, so later handlers can override anything from earlier ones if necessary."})]}),e.jsx(r,{children:"Guidelines"}),e.jsx(a,{children:e.jsxs("ul",{className:"list-disc ml-6 space-y-2 text-sm",children:[e.jsxs("li",{children:["Always return plain objects. Anything else is ignored. Use ",e.jsx(t,{children:"$"})," prefixes for props that should never reach the DOM."]}),e.jsxs("li",{children:["Combine logic headers with ",e.jsx(t,{children:"rc.extend"})," or"," ",e.jsx(t,{children:"useClassmate"})," to reuse the same derived data in different contexts."]}),e.jsx("li",{children:"When you need heavy computations, memoize or pre-calculate the inputs before passing them into the logic handler to keep the render path fast."})]})})]}),y=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),D={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:l}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/logic/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:y}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:u},{type:"plus-file",exportValues:s}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"react-classmate"}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:i}}};export{D as configValuesSerialized};
