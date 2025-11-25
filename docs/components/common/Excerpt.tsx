import cm from "@classmate/react"

const Excerpt = cm.p<{ $centered?: boolean }>`
  text-lg 
  mb-12
  ${(p) => (p.$centered ? "text-center w-full" : "lg:w-3/4")}
`

export default Excerpt
