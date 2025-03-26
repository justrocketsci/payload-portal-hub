
import type { UseEmblaCarouselType } from "embla-carousel-react"

// Define the API type from the useEmblaCarousel hook return type
export type CarouselApi = NonNullable<UseEmblaCarouselType[1]>

// Define the options and plugin types
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
export type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1]

// Define custom types for the autoplay options
export type CustomCarouselOptions = {
  autoplay?: boolean
  delay?: number
} & Partial<CarouselOptions>

export type CarouselProps = {
  opts?: CustomCarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: CarouselApi | null
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

// Declare useEmblaCarousel to fix type references
declare function useEmblaCarousel(
  options?: CarouselOptions,
  plugins?: CarouselPlugin
): [React.RefObject<HTMLElement>, CarouselApi | null]
