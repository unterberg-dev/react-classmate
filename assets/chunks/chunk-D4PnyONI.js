const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/chunk-CYhdmgBW.js","assets/chunks/chunk-sNlpowyD.js","assets/chunks/chunk-CYDrz2XN.js","assets/static/style-ea1e2dae.BcWtY8Ol.css","assets/static/style-2e73b638.B7VT8aW2.css","assets/static/components_theme-afcc1bfa.Dhpa2y22.css","assets/static/uno-ff4db1d1.B-B4v_i2.css"])))=>i.map(i=>d[i]);
import{c as u,X as o,l as h,j as r,s as i,R as s,B as m}from"./chunk-sNlpowyD.js";import{_ as b}from"./chunk-D7HrI6pR.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=u("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),p=o.p`
  text-lg 
  mb-12
  ${e=>e.$centered?"text-center w-full":"lg:w-3/4"}
`,f=o.p`
  text-lg 
  text-gray
  mb-1
  ${e=>e.$centered?"text-center":""}
`,y=o.extend(h)`
  mb-8 
  ${e=>e.$centered?"text-center":""}
`,j=({main:e,pre:n,centered:a=!1,headingStyle:t="h2"})=>r.jsxs(r.Fragment,{children:[r.jsx(f,{$centered:a,children:n}),r.jsx(y,{as:"h2",variant:t,$centered:a,children:e})]}),_=({excerpt:e,main:n,pre:a,centered:t,headingStyle:l})=>r.jsxs(r.Fragment,{children:[r.jsx(j,{main:n,pre:a,centered:t,headingStyle:l}),e&&r.jsx(p,{$centered:t,children:e})]}),L=o.div.variants({base:`
    rounded 
    border-1
    p-3
  `,variants:{$type:{info:"border-none bg-white",warning:"border-warningLight bg-warningSuperLight",error:"border-errorLight bg-errorSuperLight",success:"border-successLight bg-successSuperLight",aside:"border-graySuperLight bg-white dark:bg-light"},$size:{sm:"md:p-3",md:"md:p-5 md:rounded-lg"}},defaultVariants:{$type:"info",$size:"md"}});function $(e){var n;(n=import.meta).env??(n.env={SSR:!0});{const a=i.lazy(()=>e().then(t=>"default"in t?t:{default:t}).catch(t=>(console.error("Component loading failed:",t),{default:()=>s.createElement("p",null,"Error loading component.")})));return i.forwardRef((t,l)=>{const[c,d]=i.useState(!1);if(i.useEffect(()=>{d(!0)},[]),!c)return s.createElement(s.Fragment,null,t.fallback);const{fallback:C,...g}=t;return s.createElement(i.Suspense,{fallback:s.createElement(s.Fragment,null,t.fallback)},s.createElement(a,{...g,ref:l}))})}}const v=o.div`
  bg-graySuperLight
  animate-delay-300
  animate-pulse
  rounded
`,w=$(()=>b(()=>import("./chunk-CYhdmgBW.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),E=({handleCopy:e})=>r.jsx("div",{className:"absolute top-2 right-2",children:r.jsxs(m,{size:"xs",color:"copy",type:"button",onClick:()=>{e()},children:[r.jsx(x,{size:16}),"Copy"]})}),k=o.div`
  highlighter 
  bg-lightBorder 
  relative 
  !min-w-none 
  w-[100%]
  rounded-md
  ${e=>e.$noGutter?"":"mb-4"}
`,z=({input:e,language:n="tsx",noGutter:a=!1,noCopy:t=!1})=>{const l=i.useCallback(()=>{navigator.clipboard.writeText(e)},[e]);return r.jsxs(k,{$noGutter:a,children:[!t&&r.jsx(E,{handleCopy:l}),r.jsx(w,{fallback:r.jsx(v,{className:"h-30 !bg-light"}),input:e,language:n})]})};export{_ as D,z as H,L as N,j as a};
