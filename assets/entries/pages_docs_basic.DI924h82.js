import{j as t,C as e,i as r,o as l,a as p}from"../chunks/chunk-zXMca1fz.js";import{S as n,a as i,b as s,c as a,i as u}from"../chunks/chunk-BDz0aqLd.js";import{D as c,H as o}from"../chunks/chunk-aHVVYmMU.js";import{D as d}from"../chunks/chunk-Dspki3Ch.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-D7HrI6pR.js";const m=`export const CustomButton = rc.button\`
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
\``,f=`<CustomButton $customState>Button</CustomButton>

// renders:
// <button class="text-blue px-3 py-2 bg-black">Button</button>`,b=`interface ButtonProps extends JSX.IntrinsicElements["button"] {
  $customState?: "button"
}

const CustomButton = rc.button<ButtonProps>\`
  text-blue 
  custom
  \${(p) => (p.$customState" ? "bg-black" : "")}
  \${(p) => (p.type === "button" ? "opacity-60" : "")}
\``,y=`<CustomButton type="button" $customState>Button</CustomButton>

// renders:
// <button type="button" class="text-blue custom opacity-60 bg-black"></button>`,S=()=>t.jsxs(t.Fragment,{children:[t.jsx(c,{main:"Base Component",pre:"Get started / Basics",excerpt:`The following examples show how to create a base component and how to extend it with custom
        properties.`}),t.jsx(n,{children:"Create a base component"}),t.jsxs(i,{children:[t.jsxs(s,{children:["Select the component tag you wish by using it's intrinsic tag name. For example"," ",t.jsx(e,{children:"rc.div"})," or ",t.jsx(e,{children:"rc.button"}),". Via the interpolation you are able to pass classnames."]}),t.jsx(o,{input:m}),t.jsx(a,{children:"Implementation"}),t.jsx(o,{input:h})]}),t.jsx(n,{children:"Custom Properties"}),t.jsxs(i,{children:[t.jsxs(d,{children:[t.jsx("strong",{children:"Important:"})," Prefix ",t.jsx(e,{$color:"warning",children:"rc"}),"-specific properties with ",t.jsx(e,{$color:"warning",children:"$"})," to not pass them to the created/extended component and to avoid conflicts with intrinsic properties (rc filters out props prefixed with ",t.jsx(e,{$color:"warning",children:"$"}),")"]}),t.jsx(o,{input:x}),t.jsx(a,{children:"Implementation"}),t.jsx(o,{input:f})]}),t.jsx(n,{children:"Intrinsic Properties"}),t.jsxs(i,{children:[t.jsxs(s,{children:[t.jsx(e,{children:"rc"})," is passing intrinsic properties and you can use them in the interpolation string. For typescript we provide the type of"," ",t.jsx(e,{children:"IntrinsicElements"})," to get them properly validated."]}),t.jsx(o,{input:b}),t.jsx(a,{children:"Implementation"}),t.jsx(o,{input:y})]})]}),g=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"})),j=()=>"Base Implementation - React Classmate Documentation",T=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"})),I={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:r}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:l}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:u},{type:"plus-file",exportValues:p}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/basic/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:g}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/basic/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:T}}};export{I as configValuesSerialized};
