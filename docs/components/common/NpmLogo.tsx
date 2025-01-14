interface NpmLogoProps {
  svgProps?: React.SVGProps<SVGSVGElement>
  color?: string
}

const NpmLogo = ({ svgProps, color }: NpmLogoProps) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 210"
      className="w-full h-full fill-current"
      {...svgProps}
    >
      <title>npm</title>
      <rect x="240" y="60" width="30" height="60" />
      <path d="M0,0v180h150v30h120v-30h270V0H0ZM150,150h-30V60h-30v90H30V30h120v120ZM300,150h-60v30h-60V30h120v120ZM510,150h-30V60h-30v90h-30V60h-30v90h-60V30h180v120Z" />
    </svg>
  )
}

export default NpmLogo
