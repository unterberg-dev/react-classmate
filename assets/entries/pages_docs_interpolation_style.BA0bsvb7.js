import{j as e,C as t,i as l,o as r,a as d}from"../chunks/chunk-uRu001Rx.js";import{S as n,a as i,b as o,c as s,i as p}from"../chunks/chunk-cgnbRicC.js";import{D as c,H as a}from"../chunks/chunk-DkjftF2P.js";/* empty css                      */import"../chunks/chunk-CYDrz2XN.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-D7HrI6pR.js";const u=`export const CustomButton = rc.button\`
  text-blue
  px-3
  py-2
  \${i => i.style({
    borderRadius: "10%",
    height: "calc(100% - 1rem)",
  })}
\``,h=`<CustomButton>Click me</CustomButton>

// renders:
// <button class="text-blue px-3 py-2" style="border-radius: 10%; height: calc(100% - 1rem);">Click me</button>`,m=`const VariantButton = rc.button.variants<{ $size: "small" | "large"; $disabled?: boolean }>({
  base: (p) => \`
    test-class
    color-black
    \${p.style({
      // we use the props in the style function
      border: p.$disabled ? "1px solid gray" : "1px solid blue",
      boxShadow: p.$disabled ? "none" : "0 0 0 1px black",
    })}
  \`,
  variants: {
    $size: {
      small: (p) => p.style({ fontSize: "12px" }),
      large: (p) => p.style({ fontSize: "18px" }),
    },
  },
  defaultVariants: {
    $size: "small",
  },
})`,x=`<VariantButton $disabled={false} $size="large">Variant Button</VariantButton>

// renders:
// <button class="test-class color-black" style="border: 1px solid blue; box-shadow: 0 0 0 1px black; font-size: 18px;">Variant Button</button>`,S=()=>e.jsxs(e.Fragment,{children:[e.jsx(c,{main:"CSS-in-JS",pre:"Advanced Interpolation",excerpt:e.jsxs(e.Fragment,{children:["While the library is mainly class name based, we can use our old friend CSS-in-JS alongside the"," ","Template strings. This allows us to add CSS to the components."]})}),e.jsx(n,{children:"Basic Styling"}),e.jsxs(i,{children:[e.jsxs(o,{children:["The interpolation system supports CSS with the ",e.jsx(t,{children:"style()"}),' function to add CSS in JS to the components. We are able to append this on every of the classmate "builders":']}),e.jsxs("ul",{className:"mb-4",children:[e.jsx("li",{children:e.jsx(t,{children:"rc.{intrinsicElement}"})}),e.jsx("li",{children:e.jsx(t,{children:"rc.{intrinsicElement}.variants()"})}),e.jsx("li",{children:e.jsx(t,{children:"rc.extend()"})})]}),e.jsx(a,{input:u}),e.jsx(s,{children:"Implementation"}),e.jsx(a,{input:h})]}),e.jsx(n,{children:"Use Properties"}),e.jsxs(i,{children:[e.jsxs(o,{children:["Using properties as they can be extracted from the same entity (",e.jsx(t,{children:"p"}),")"]}),e.jsx(a,{input:m}),e.jsx(s,{children:"Implementation"}),e.jsx(a,{input:x})]})]}),f=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"})),y=()=>"CSS-in-JS: style() | react-classmate",b=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),E={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:l}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:r}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:p},{type:"plus-file",exportValues:d}]},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/interpolation/style/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:f}},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/interpolation/style/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:b}}};export{E as configValuesSerialized};
