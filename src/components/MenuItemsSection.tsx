import Image from 'next/image'
import Link from 'next/link'

interface MenuItem {
  id: number
  name: string
  slug: string
  description?: string
  display_order?: number
  is_vegetarian?: boolean
  image?: { url: string; alternativeText?: string }
  chapter_label?: string
}

interface BlockData {
  heading?: string
  subheading?: string
}

export default function MenuItemsSection({
  data,
  menuItems,
}: {
  data: BlockData
  menuItems: MenuItem[]
}) {
  if (!menuItems?.length) return null

  const featured = [...menuItems]
    .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99))
    .slice(0, 6)

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {data.heading && (
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{data.heading}</h2>
        )}
        {data.subheading && (
          <p className="text-white/50 text-sm mb-8 max-w-xl">{data.subheading}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map((item) => (
            <div key={item.id} className="group bg-zinc-900 overflow-hidden">
              <div className="aspect-square relative bg-zinc-800">
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alternativeText ?? item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-700 flex items-center justify-center">
                    <span className="text-white/20 text-4xl">🍗</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{item.chapter_label}</p>
                <h3 className="text-white font-bold text-sm">{item.name}</h3>
                {item.description && (
                  <p className="text-white/50 text-xs mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className="inline-block border border-ws-yellow text-ws-yellow px-8 py-3 text-sm font-bold tracking-wide hover:bg-ws-yellow hover:text-ws-black transition-colors"
          >
            Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
