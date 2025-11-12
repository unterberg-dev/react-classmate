import{j as e,C as t,i as r,a as i,o as l}from"../chunks/chunk-Bokv7s76.js";import{D as d,H as o}from"../chunks/chunk-DYO16Mu5.js";import{D as p}from"../chunks/chunk-BEvwXEMf.js";import{S as a,a as n,b as s,i as c}from"../chunks/chunk-CEv1v94T.js";/* empty css                      */import"../chunks/chunk-B1VfgWyW.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-ckwbz45p.js";const h=`import rc, { useClassmate } from "react-classmate"

type Tone = "primary" | "secondary"

interface InsightCardProps {
  tone: Tone
  headline: string
  description: string
}

export const InsightCard = ({ tone, headline, description }: InsightCardProps) => {
  const Card = useClassmate(
    () =>
      rc.article\`
        p-6 rounded-xl border transition-all duration-200 shadow-sm
        \${tone === "primary" ? "bg-primary/5 border-primary/50" : "bg-slate-900 border-slate-800 text-white"}
      \`,
    [tone],
  )

  return (
    <Card aria-label={\`\${tone} insight\`}>
      <h3 className="text-base font-semibold mb-1">{headline}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </Card>
  )
}
`,m=`import rc, { useClassmate } from "react-classmate"

type DayStatus = "completed" | "pending"

export const WorkoutDay = ({ label, status }: { label: string; status: DayStatus }) => {
  const StyledDay = useClassmate(
    () =>
      rc.div<{ $status: DayStatus }>\`
        rounded-md border p-4 text-sm font-medium transition-colors
        \${(p) => (p.$status === "completed" ? "bg-green-50 border-green-500 text-green-900" : "")}
        \${(p) => (p.$status === "pending" ? "bg-slate-50 border-slate-300 text-slate-900" : "")}
      \`,
    [],
  )

  return (
    <StyledDay $status={status}>
      {label}: {status}
    </StyledDay>
  )
}
`,u=()=>e.jsxs(e.Fragment,{children:[e.jsx(d,{main:"useClassmate",pre:"Hooks",excerpt:"Memoize classmate components when you need to declare them inside another React component."}),e.jsx(a,{children:"When to use it"}),e.jsx(n,{children:e.jsxs(s,{children:[e.jsx(t,{children:"useClassmate"})," keeps a stable component reference between renders. Reach for the hook whenever you have to create a classmate component inside another component (for example because the builder depends on React state, context or hooks). Without memoization every render would create a brand-new component tree which makes React re-mount your component and can lead to hydration mismatches."]})}),e.jsx(a,{children:"Memoize inline builders"}),e.jsxs(n,{children:[e.jsxs(s,{children:["Wrap the factory with ",e.jsx(t,{children:"useClassmate"})," and return the memoized component. All props still work the same way and you can forward ",e.jsx(t,{children:"$"}),"-prefixed values for dynamic interpolations."]}),e.jsx(o,{input:m})]}),e.jsx(a,{children:"Control re-computation with dependencies"}),e.jsxs(n,{children:[e.jsxs(s,{children:["Pass a dependency array as the second argument. It behaves the same as"," ",e.jsx(t,{children:"React.useMemo"}),": the classmate component is only re-created when one of the dependencies changes. This enables things like theme-aware builders or locale-specific layout tweaks without re-instantiating on every render."]}),e.jsx(o,{input:h}),e.jsx(p,{className:"mt-6",children:e.jsx("p",{children:"Keep the dependency array in sync with the values captured inside the factory. Forgetting a dependency will freeze the previous classes because the memoized component never re-computes."})})]}),e.jsx(a,{children:"Tips"}),e.jsx(n,{children:e.jsxs("ul",{className:"list-disc ml-6 space-y-2 text-sm",children:[e.jsx("li",{children:"Build the component outside of render whenever possible. Use the hook only when you truly rely on render-time data."}),e.jsxs("li",{children:["You can still extend or wrap the memoized component with ",e.jsx(t,{children:"rc.extend"}),"; the hook just guarantees that React sees a stable component identity."]}),e.jsxs("li",{children:["Combine ",e.jsx(t,{children:"useClassmate"})," with the new ",e.jsx(t,{children:".logic()"})," ","helper if you need derived props and memoization at the same time."]})]})})]}),y=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"})),C={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:l}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/use-classmate/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:y}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:c},{type:"plus-file",exportValues:i}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"react-classmate"}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:r}}};export{C as configValuesSerialized};
