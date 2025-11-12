import{j as e,C as t,i,a as l,o as p}from"../chunks/chunk-Bokv7s76.js";import{D as u,H as n}from"../chunks/chunk-DYO16Mu5.js";import{D as d}from"../chunks/chunk-BEvwXEMf.js";import{S as o,a as s,b as a,c as r,i as c}from"../chunks/chunk-CEv1v94T.js";/* empty css                      */import"../chunks/chunk-B1VfgWyW.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-ckwbz45p.js";const m=`export const CustomButton = rc.button\`
  text-blue
  px-3
  py-2
\``,h=`<CustomButton>Hello World</CustomButton>

// renders:
// <button class="text-blue px-3 py-2">Hello World</button>`,x=`interface CustomButtonProps {
  $customState?: boolean
}

const CustomButton = rc.button<CustomButtonProps>\`
  text-blue
  px-3
  py-2
  \${(p) => (p.$customState ? "bg-black" : "")}
\``,y=`<CustomButton $customState>Button</CustomButton>

// renders:
// <button class="text-blue px-3 py-2 bg-black">Button</button>`,b=`interface ButtonProps extends JSX.IntrinsicElements["button"] {
  $customState?: "button"
}

const CustomButton = rc.button<ButtonProps>\`
  text-blue 
  custom
  \${(p) => (p.$customState" ? "bg-black" : "")}
  \${(p) => (p.type === "button" ? "opacity-60" : "")}
\``,f=`<CustomButton type="button" $customState>Button</CustomButton>

// renders:
// <button type="button" class="text-blue custom opacity-60 bg-black"></button>`,g=`import rc from "react-classmate"

type DayStatus = "completed" | "pending"

interface WorkoutProps {
  workouts: unknown[]
  allResolved: boolean
  hasCompleted: boolean
  hasSkipped: boolean
  $status?: DayStatus
}

const deriveDayStatus = ({ workouts, allResolved, hasCompleted, hasSkipped }: WorkoutProps): DayStatus => {
  if (workouts.length === 0) return "pending"
  if (allResolved && hasCompleted && !hasSkipped) return "completed"
  return "pending"
}

export const WorkoutDay = rc.div
  .logic<WorkoutProps>((props) => {
    const status = deriveDayStatus(props)
    return {
      $status: status,
      ["data-status"]: status,
    }
  })
  .variants<WorkoutProps, { $status: DayStatus }>({
    base: "rounded-md border p-4 text-sm transition-colors",
    variants: {
      $status: {
        completed: "border-green-500 bg-green-50",
        pending: "border-slate-300 bg-white",
      },
    },
  })
`,S=`import rc, { useClassmate } from "react-classmate"

type WorkoutStatus = "completed" | "pending"

const WorkoutDay = ({ status }: { status: WorkoutStatus }) => {
  const StyledDay = useClassmate(
    () =>
      rc.div.variants<{ $status: WorkoutStatus }>({
        base: "rounded-md border p-4 text-sm",
        variants: {
          $status: {
            completed: "border-green-400 bg-green-50",
            pending: "border-yellow-400 bg-yellow-50",
          },
        },
      }),
    [status],
  )

  return <StyledDay $status={status}>Workout details</StyledDay>
}
`,j=()=>e.jsxs(e.Fragment,{children:[e.jsx(u,{main:"Base Component",pre:"Get started / Basics",excerpt:`The following examples show how to create a base component and how to extend it with custom
        properties.`}),e.jsx(o,{children:"Create a base component"}),e.jsxs(s,{children:[e.jsxs(a,{children:["Select the component tag you wish by using it's intrinsic tag name. For example"," ",e.jsx(t,{children:"rc.div"})," or ",e.jsx(t,{children:"rc.button"}),". Via the interpolation you are able to pass classnames."]}),e.jsx(n,{input:m}),e.jsx(r,{children:"Implementation"}),e.jsx(n,{input:h})]}),e.jsx(o,{children:"Custom Properties"}),e.jsxs(s,{children:[e.jsxs(d,{children:[e.jsx("strong",{children:"Important:"})," Prefix ",e.jsx(t,{$color:"warning",children:"rc"}),"-specific properties with ",e.jsx(t,{$color:"warning",children:"$"})," to not pass them to the created/extended component and to avoid conflicts with intrinsic properties (rc filters out props prefixed with ",e.jsx(t,{$color:"warning",children:"$"}),")"]}),e.jsx(n,{input:x}),e.jsx(r,{children:"Implementation"}),e.jsx(n,{input:y})]}),e.jsx(o,{children:"Intrinsic Properties"}),e.jsxs(s,{children:[e.jsxs(a,{children:[e.jsx(t,{children:"rc"})," is passing intrinsic properties and you can use them in the interpolation string. For typescript we provide the type of"," ",e.jsx(t,{children:"IntrinsicElements"})," to get them properly validated."]}),e.jsx(n,{input:b}),e.jsx(r,{children:"Implementation"}),e.jsx(n,{input:f})]}),e.jsx(o,{children:"Declare rc components inside React components"}),e.jsxs(s,{children:[e.jsxs(a,{children:["Need to define a component during render? Wrap the factory in"," ",e.jsx(t,{children:"useClassmate"})," to memoize it between renders and avoid re-instantiating the element tree. Pass dependencies just like you would to ",e.jsx(t,{children:"React.useMemo"})," if the factory relies on runtime values."]}),e.jsx(n,{input:S})]}),e.jsx(o,{children:"Colocate logic with your component"}),e.jsxs(s,{children:[e.jsxs(a,{children:["Use ",e.jsx(t,{children:".logic()"})," before calling your template literal to run arbitrary JavaScript for every render. Whatever object you return is merged back into the props so you can derive variant values, data attributes, or additional ",e.jsx(t,{children:"$"})," props without wiring extra hooks."]}),e.jsx(n,{input:g})]})]}),v=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"})),w=()=>"Base Implementation - React Classmate Documentation",P=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"})),A={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:p}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/basic/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:v}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:c},{type:"plus-file",exportValues:l}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/basic/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:P}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:i}}};export{A as configValuesSerialized};
