import{j as e,C as t,i as s,a as r,o as d}from"../chunks/chunk-Bokv7s76.js";import{D as p,H as a}from"../chunks/chunk-DYO16Mu5.js";import{S as n,a as i,b as o,c as l,i as u}from"../chunks/chunk-CEv1v94T.js";/* empty css                      */import"../chunks/chunk-B1VfgWyW.js";/* empty css                      *//* empty css                      *//* empty css                      */import"../chunks/chunk-ckwbz45p.js";const c=`export const CustomButton = rc.button\`
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
// <button class="test-class color-black" style="border: 1px solid blue; box-shadow: 0 0 0 1px black; font-size: 18px;">Variant Button</button>`,S=()=>e.jsxs(e.Fragment,{children:[e.jsx(p,{main:"CSS-in-JS",pre:"Advanced Interpolation",excerpt:e.jsxs(e.Fragment,{children:["While the library is mainly class name based, we can use our old friend CSS-in-JS alongside the"," ","Template strings. This allows us to add CSS to the components."]})}),e.jsx(n,{children:"Basic Styling"}),e.jsxs(i,{children:[e.jsxs(o,{children:["The interpolation system supports CSS with the ",e.jsx(t,{children:"style()"}),' function to add CSS in JS to the components. We are able to append this on every of the classmate "builders":']}),e.jsxs("ul",{className:"mb-4",children:[e.jsx("li",{children:e.jsx(t,{children:"rc.{intrinsicElement}"})}),e.jsx("li",{children:e.jsx(t,{children:"rc.{intrinsicElement}.variants()"})}),e.jsx("li",{children:e.jsx(t,{children:"rc.extend()"})})]}),e.jsx(a,{input:c}),e.jsx(l,{children:"Implementation"}),e.jsx(a,{input:h})]}),e.jsx(n,{children:"Use Properties"}),e.jsxs(i,{children:[e.jsxs(o,{children:["Using properties as they can be extracted from the same entity (",e.jsx(t,{children:"p"}),")"]}),e.jsx(a,{input:m}),e.jsx(l,{children:"Implementation"}),e.jsx(a,{input:x})]})]}),f=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"})),y=()=>"CSS-in-JS: style() | react-classmate",b=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),A={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:d}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/interpolation/style/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:f}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/pages/docs/+Layout.tsx",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/pages/+Layout.tsx",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"plus-file",exportValues:u},{type:"plus-file",exportValues:r}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/docs/interpolation/style/+title.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:b}},lang:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","lang"]},valueSerialized:{type:"js-serialized",value:"en"}},Loading:{type:"standard",definedAtData:{filePathToShowToUser:"vike-react/__internal/integration/Loading",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:s}}};export{A as configValuesSerialized};
