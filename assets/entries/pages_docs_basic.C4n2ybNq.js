import{j as t,C as e,i as a,o as r,a as l}from"../chunks/chunk-D9omzb_q.js";import{i as p}from"../chunks/chunk-BIcnJ08U.js";import{D as u,H as o}from"../chunks/chunk-LWXXMUun.js";import{D as c}from"../chunks/chunk-F-X9b3Cv.js";import{S as n,a as i,b as s}from"../chunks/chunk-CuSZpGbS.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */const d=`export const CustomButton = rc.button\`
  text-blue
  px-3
  py-2
\``,m=`<CustomButton>Hello World</CustomButton>

// renders:
<button class="text-blue px-3 py-2">Hello World</button>`,h=`interface CustomButtonProps {
  $customState?: boolean
}

const CustomButton = rc.button<CustomButtonProps>\`
  text-blue
  px-3
  py-2
  \${(p) => (p.$customState ? "bg-black" : "")}
\``,x=`<CustomButton $customState>Button</CustomButton>

// renders:
<button class="text-blue px-3 py-2 bg-black">Button</button>`,f=`interface ButtonProps extends JSX.IntrinsicElements["button"] {
  $customState?: "button"
}

const CustomButton = rc.button<ButtonProps>\`
  text-blue 
  custom
  \${(p) => (p.$customState" ? "bg-black" : "")}
  \${(p) => (p.type === "button" ? "opacity-60" : "")}
\``,b=`<CustomButton type="button" $customState>Button</CustomButton>

// renders:
<button type="button" class="text-blue custom opacity-60 bg-black"></button>`,y=()=>t.jsxs(t.Fragment,{children:[t.jsx(u,{main:"Base Component",pre:"Get started / Basics",excerpt:`The following examples show how to create a base component and how to extend it with custom
        properties.`}),t.jsx(n,{children:"Create a base component"}),t.jsxs(i,{children:[t.jsxs("p",{children:["Select the component tag you wish by using it's intrinsic tag name. For example"," ",t.jsx(e,{children:"rc.div"})," or ",t.jsx(e,{children:"rc.button"}),". Via the interpolation you are able to pass classnames."]}),t.jsx(o,{input:d}),t.jsx(s,{children:"Implementation"}),t.jsx(o,{input:m})]}),t.jsx(n,{children:"Custom Properties"}),t.jsxs(i,{children:[t.jsxs(c,{className:"!mt-0",children:[t.jsx("strong",{children:"Important:"})," Prefix ",t.jsx(e,{$color:"warning",children:"rc"}),"-specific properties with ",t.jsx(e,{$color:"warning",children:"$"})," to not pass them to the created/extended component and to avoid conflicts with intrinsic properties (rc filters out props prefixed with ",t.jsx(e,{$color:"warning",children:"$"}),")"]}),t.jsx(o,{input:h}),t.jsx(s,{children:"Implementation"}),t.jsx(o,{input:x})]}),t.jsx(n,{children:"Intrinsic Properties"}),t.jsxs(i,{children:[t.jsxs("p",{children:[t.jsx(e,{children:"rc"})," is passing intrinsic properties and you can use them in the interpolation string. For typescript we provide the type of"," ",t.jsx(e,{children:"IntrinsicElements"})," to get them properly validated."]}),t.jsx(o,{input:f}),t.jsx(s,{children:"Implementation"}),t.jsx(o,{input:b})]})]}),S=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),g=()=>"Base Component | react-classmate",j=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"})),E={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:a}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:r}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:p},{type:"plus-file",exportValues:l}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/basic/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:S}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/basic/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:j}}};export{E as configValuesSerialized};
