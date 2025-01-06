import rc from "react-classmate"

const Excerpt = rc.p<{ $centered?: boolean }>`
  text-lg 
  mb-12 
  ${(p) => (p.$centered ? "text-center w-full" : "lg:w-3/4")}
`

export default Excerpt
