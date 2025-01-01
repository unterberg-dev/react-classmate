import rc from "react-classmate"
import H3Headline from "#components/common/H3Headline"
import Notebox from "#components/common/Notebox"

export const SectionHeadline = rc.extend(H3Headline)`mb-4`

export const Section = rc.extend(Notebox)`mb-8`

export const SectionInnerHeadline = rc.p`
  mt-4 
  font-bold
`
