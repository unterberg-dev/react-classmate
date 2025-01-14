import rc from "react-classmate"

import { H3Headline, H4Headline } from "#components/common/Headline"
import Notebox from "#components/common/Notebox"

export const Section = rc.extend(Notebox)`mb-8`

export const SectionHeadline = rc.extend(H3Headline)`mb-4`

export const SectionInnerHeadline = rc.extend(H4Headline)`mt-6`

export const SectionInnerParagraph = rc.p`mt-4`
