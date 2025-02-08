import type { HTMLAttributes } from "react"
import rc from "react-classmate"

import { H3Headline, H4Headline } from "#components/common/Headline"
import Notebox from "#components/common/Notebox"

export const Section = rc.extend(Notebox)`mb-8`

export const SectionHeadline = rc.extend((props: HTMLAttributes<HTMLElement>) => (
  <H3Headline as="h2" {...props} />
))`mb-4`

export const SectionInnerHeadline = rc.extend((props: HTMLAttributes<HTMLElement>) => (
  <H4Headline as="h3" {...props} />
))`mb-6`

export const SectionInnerParagraph = rc.p`mb-4`

export const SectionInnerExampleCode = rc.div`
  p-4 
  ml-6 
  border-1 
  border-grayLight 
  border-dashed 
  mb-6
`
