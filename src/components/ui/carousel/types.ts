
import type { UseEmblaCarouselType } from "embla-carousel-react"

// Define the API type from the useEmblaCarousel hook return type
export type CarouselApi = UseEmblaCarouselType[1]

// Define the options and plugin types
export type CarouselOptions = NonNullable<Parameters<typeof UseEmblaCarouselType[0]>[0]>
export type CarouselPlugin = NonNullable<Parameters<typeof UseEmblaCarouselType[0]>[1]>

// Define custom types for the autoplay options
export type CustomCarouselOptions = Partial<CarouselOptions> & {
  autoplay?: boolean
  delay?: number
}

export type CarouselProps = {
  opts?: CustomCarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof UseEmblaCarouselType[0]>[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps
