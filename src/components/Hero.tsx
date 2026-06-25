interface HeroData {
  media_type: 'video' | 'image'
  eyebrow?: string
  title?: string
  subtitle?: string
  overlay_position?: string
  overlay_opacity?: number
  video?: { url: string }
  image?: { url: string; alternativeText?: string }
}

const positionClasses: Record<string, string> = {
  'bottom-left': 'bottom-12 left-8 md:left-16',
  'bottom-right': 'bottom-12 right-8 md:right-16',
  'center': 'inset-0 flex items-center justify-center text-center',
  'top-left': 'top-12 left-8 md:left-16',
}

export default function Hero({ data }: { data: HeroData }) {
  const position = positionClasses[data.overlay_position ?? 'bottom-left'] ?? positionClasses['bottom-left']
  const opacity = (data.overlay_opacity ?? 30) / 100

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden bg-ws-black">
      {data.media_type === 'video' && data.video?.url ? (
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={data.video.url} type="video/mp4" />
        </video>
      ) : data.image?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.image.url}
          alt={data.image.alternativeText ?? ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ws-black via-zinc-900 to-ws-black" />
      )}

      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, rgba(0,0,0,${opacity + 0.4}) 0%, transparent 60%)` }}
      />

      <div className={`absolute ${position} max-w-2xl`}>
        {data.eyebrow && (
          <p className="text-ws-yellow text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            {data.title}
          </h1>
        )}
        {data.subtitle && (
          <p className="text-white/80 text-base md:text-lg max-w-lg leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
