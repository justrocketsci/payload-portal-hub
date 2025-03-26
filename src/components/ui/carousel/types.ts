
import type { UseEmblaCarouselType } from "embla-carousel-react"
import type * as React from "react"

// Get the correct types from embla carousel
export type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>
export type EmblaViewportRefType = UseEmblaCarouselType[0]
export type CarouselApi = EmblaCarouselType

// Use the actual type parameters from embla-carousel-react
export type CarouselOptions = Parameters<UseEmblaCarouselType>[0]
export type CarouselPlugin = Parameters<UseEmblaCarouselType>[1]

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
  api: CarouselApi | null
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps
