const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/chunk-BwesaqfM.js","assets/chunks/chunk-6Ukzi71G.js","assets/chunks/chunk-CYDrz2XN.js","assets/static/style-ea1e2dae.BcWtY8Ol.css","assets/static/style-2e73b638.B7VT8aW2.css","assets/static/components_theme-afcc1bfa.Dhpa2y22.css","assets/static/uno-ff4db1d1.DMuwOVC0.css"])))=>i.map(i=>d[i]);
import{c as h,X as c,l as u,j as t,s as l,R as s,B as m}from"./chunk-6Ukzi71G.js";import{_ as x}from"./chunk-D7HrI6pR.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=h("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),b=c.p`
  text-lg 
  mb-12
  ${e=>e.$centered?"text-center w-full":"lg:w-3/4"}
`,p=c.p`
  text-lg 
  text-gray
  mb-1
  ${e=>e.$centered?"text-center":""}
`,y=c.extend(u)`
  mb-8 
  ${e=>e.$centered?"text-center":""}
`,j=({main:e,pre:n,centered:a=!1,headingStyle:r="h2"})=>t.jsxs(t.Fragment,{children:[t.jsx(p,{$centered:a,children:n}),t.jsx(y,{as:"h2",variant:r,$centered:a,children:e})]}),_=({excerpt:e,main:n,pre:a,centered:r,headingStyle:o})=>t.jsxs(t.Fragment,{children:[t.jsx(j,{main:n,pre:a,centered:r,headingStyle:o}),e&&t.jsx(b,{$centered:r,children:e})]}),S=c.div.variants({base:`
    rounded 
    border-1
    p-3
  `,variants:{$type:{info:"border-none bg-white",warning:"border-warningLight bg-warningSuperLight",error:"border-errorLight bg-errorSuperLight",success:"border-successLight bg-successSuperLight",aside:"border-graySuperLight bg-white dark:bg-light"},$size:{sm:"md:p-3",md:"md:p-5 md:rounded-lg"}},defaultVariants:{$type:"info",$size:"md"}});function $(e){var n;(n=import.meta).env??(n.env={SSR:!0});{const a=l.lazy(()=>e().then(r=>"default"in r?r:{default:r}).catch(r=>(console.error("Component loading failed:",r),{default:()=>s.createElement("p",null,"Error loading component.")})));return l.forwardRef((r,o)=>{const[i,d]=l.useState(!1);if(l.useEffect(()=>{d(!0)},[]),!i)return s.createElement(s.Fragment,null,r.fallback);const{fallback:E,...g}=r;return s.createElement(l.Suspense,{fallback:s.createElement(s.Fragment,null,r.fallback)},s.createElement(a,{...g,ref:o}))})}}const w=$(()=>x(()=>import("./chunk-BwesaqfM.js"),__vite__mapDeps([0,1,2,3,4,5,6]))),v=({handleCopy:e})=>t.jsx("div",{className:"absolute top-2 right-2",children:t.jsxs(m,{size:"xs",color:"copy",type:"button",onClick:()=>{e()},children:[t.jsx(f,{size:16}),"Copy"]})}),k=c.div`
  highlighter
  bg-lightBorder 
  relative 
  !min-w-none 
  w-[100%]
  rounded-md
  ${e=>e.$noGutter?"":"mb-4"}
`,L=({input:e,language:n="tsx",noGutter:a=!1,noCopy:r=!1})=>{const o=l.useCallback(()=>{navigator.clipboard.writeText(e)},[e]);return t.jsxs(k,{$noGutter:a,children:[!r&&t.jsx(v,{handleCopy:o}),t.jsx(w,{fallback:t.jsx("div",{className:"h-full w-full overflow-scroll max-h-105 p-4",children:t.jsx("code",{className:"w-full text-sm block leading-5 text-grayDark",children:t.jsx("pre",{children:e})})}),input:e,language:n})]})};export{_ as D,L as H,S as N,j as a};