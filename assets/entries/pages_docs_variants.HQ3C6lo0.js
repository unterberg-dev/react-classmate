import{j as e,C as t,i as o,o as n,a as r}from"../chunks/chunk-DlyB0dlZ.js";import{S as l,a as s,c as a,i as d}from"../chunks/chunk-CPj5glON.js";import{D as p,H as i}from"../chunks/chunk-Trvvwpq7.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-D7HrI6pR.js";const u=`interface AlertProps {
  $severity: "info" | "warning" | "error"
  $isActive?: boolean
}

const Alert = rc.div.variants<AlertProps>({
  base: "p-4 rounded-md",
  variants: {
    $severity: {
      info: (p) => \`bg-blue-100 text-blue-800 \${p.$isActive ? "shadow-lg" : ""}\`,
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    },
  },
  defaultVariants: {
    $severity: "info",
  },
})`,c=`<Alert $severity="warning" $isActive>Warning alert</Alert>

// renders:
// <button type="button" class="p-4 rounded-md bg-yellow-100 text-yellow-800 font-bold">Warning alert</button>`,f=()=>e.jsxs(e.Fragment,{children:[e.jsx(p,{main:"Variants",pre:"Keep it together",excerpt:e.jsx(e.Fragment,{children:"This function allows you to create a styled component with different variants based on the props you pass to it."})}),e.jsx(l,{children:"Basic syntax"}),e.jsxs(s,{children:[e.jsx(i,{input:u}),e.jsx(a,{children:"The function receives the following properties:"}),e.jsxs("ul",{className:"mb-4",children:[e.jsxs("li",{children:[e.jsx(t,{children:"base"})," - optional - The base classname of the component"]}),e.jsxs("li",{children:[e.jsx(t,{children:"variants"})," - required - An object with the different variants"]}),e.jsxs("li",{children:[e.jsx(t,{children:"defaultVariants"})," - optional - a fallback for when no variant is passed"]})]}),e.jsx(a,{children:"Implementation"}),e.jsx(i,{input:c})]})]}),h=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),m=()=>"Variants - React Classmate Documentation",y=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),A={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:o}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:n}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:d},{type:"plus-file",exportValues:r}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/variants/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:h}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/variants/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:y}}};export{A as configValuesSerialized};
