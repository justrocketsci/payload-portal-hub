
import type * as React from "react"
import useEmblaCarousel from "embla-carousel-react"

// Get the correct types from embla carousel
export type EmblaCarouselType = ReturnType<typeof useEmblaCarousel>[1]
export type EmblaViewportRefType = ReturnType<typeof useEmblaCarousel>[0]
export type CarouselApi = NonNullable<EmblaCarouselType>

// Use the actual type parameters from embla-carousel-react
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
  carouselRef: EmblaViewportRefType
  api: EmblaCarouselType
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps
