'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Slide {
  id: number
  title?: string
  eyebrow?: string
  subtitle?: string
  image?: { url: string; alternativeText?: string; width?: number; height?: number }
  cta?: { label: string; url: string }
}

interface CarouselData {
  id: number
  name: string
  slides: Slide[]
}

export default function CarouselSection({ carousels }: { carousels: CarouselData[] }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const carousel = carousels?.[0]
  if (!carousel?.slides?.length) return null

  const slides = carousel.slides
  const slide = slides[activeIdx]

  return (
    <section className="py-16 px-4 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-sm">
          <div className="aspect-[16/7] relative bg-zinc-800">
            {slide.image?.url && (
              <Image
                src={slide.image.url}
                alt={slide.image.alternativeText ?? slide.title ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 md:left-12 max-w-lg">
              {slide.eyebrow && (
                <p className="text-ws-yellow text-xs font-bold tracking-widest uppercase mb-2">
                  {slide.eyebrow}
                </p>
              )}
              {slide.title && (
                <h3 className="text-2xl md:text-4xl font-black text-white mb-3">{slide.title}</h3>
              )}
              {slide.subtitle && (
                <p className="text-white/70 text-sm mb-4">{slide.subtitle}</p>
              )}
              {slide.cta && (
                <a
                  href={slide.cta.url}
                  className="inline-block bg-ws-yellow text-ws-black px-5 py-2.5 text-sm font-bold tracking-wide hover:bg-yellow-300 transition-colors"
                >
                  {slide.cta.label}
                </a>
              )}
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="flex gap-2 mt-4 justify-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-1 transition-all ${i === activeIdx ? 'w-8 bg-ws-yellow' : 'w-4 bg-white/30'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
