interface CalloutData {
  heading: string
  body: string
  layout?: 'third' | 'half' | 'full'
  cta?: { label: string; url: string }
}

export default function Callout({ data }: { data: CalloutData }) {
  return (
    <section className="border-b border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{data.heading}</h2>
        {data.body && <p className="text-white/60 text-base max-w-lg">{data.body}</p>}
        {data.cta && (
          <a
            href={data.cta.url}
            className="inline-block mt-5 bg-ws-yellow text-ws-black px-6 py-3 text-sm font-bold tracking-wide hover:bg-yellow-300 transition-colors"
          >
            {data.cta.label}
          </a>
        )}
      </div>
    </section>
  )
}
