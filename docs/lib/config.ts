export const APP_CONFIG = {
  viteUrl: `${import.meta.env.BASE_URL}`,
  prodUrl: import.meta.env.PROD ? "https://react-classmate.dev" : "http://localhost:3000",
  defaultDescription: "A react tool to separate class name logic, create variants and manage styles.",
  headerHeightConfig: {
    heightClass: " h-12 lg:h-16",
    footerPaddingBottomClass: " pb-12 lg:pb-16",
    footerNegativeMargin: "-mt-12 lg:-mt-16",
  },
  transition: {
    uno: "animate-duration-350 animate-ease-out",
    tw: "duration-350 ease-out",
    time: 350,
    ease: "ease-out",
  },
}
