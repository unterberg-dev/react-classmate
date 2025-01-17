import{X as s,l as a,j as r}from"./chunk-CMvKMWtq.js";const o=s.p`
  text-lg 
  mb-12
  ${e=>e.$centered?"text-center w-full":"lg:w-3/4"}
`,c=s.p`
  text-lg 
  text-gray
  mb-1
  ${e=>e.$centered?"text-center":""}
`,g=s.extend(a)`
  mb-8 
  ${e=>e.$centered?"text-center":""}
`,l=({main:e,pre:i,centered:t=!1,headingStyle:n="h2"})=>r.jsxs(r.Fragment,{children:[r.jsx(c,{$centered:t,children:i}),r.jsx(g,{as:"h2",variant:n,$centered:t,children:e})]}),h=({excerpt:e,main:i,pre:t,centered:n,headingStyle:d})=>r.jsxs(r.Fragment,{children:[r.jsx(l,{main:i,pre:t,centered:n,headingStyle:d}),e&&r.jsx(o,{$centered:n,children:e})]}),x=s.div.variants({base:`
    rounded 
    border-1
    p-3
  `,variants:{$type:{info:"border-none bg-white",warning:"border-warningLight bg-warningSuperLight",error:"border-errorLight bg-errorSuperLight",success:"border-successLight bg-successSuperLight",aside:"border-graySuperLight bg-white dark:bg-light"},$size:{sm:"md:p-3",md:"md:p-5 md:rounded-lg"}},defaultVariants:{$type:"info",$size:"md"}});export{h as D,l as H,x as N};
