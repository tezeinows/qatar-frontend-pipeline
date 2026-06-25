import Link from 'next/link'

interface NavItem {
  id: number
  label: string
  url: string
  target_blank: boolean
}

interface NavHeaderData {
  nav_items: NavItem[]
  primary_cta?: { label: string; url: string } | null
}

export default function NavHeader({ data, locale }: { data: NavHeaderData | null; locale: string }) {
  const altLocale = locale === 'en-QA' ? 'ar-QA' : 'en-QA'
  const altLabel = locale === 'en-QA' ? 'عربي' : 'EN'

  return (
    <header className="bg-ws-black border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center">
          <span className="text-ws-yellow font-bold text-xl tracking-wider">WINGSTOP</span>
          <span className="text-white/60 text-xs ml-2 tracking-widest uppercase">Qatar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {data?.nav_items?.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              target={item.target_blank ? '_blank' : undefined}
              className="text-white/80 hover:text-ws-yellow text-sm font-medium tracking-wide transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={`/${altLocale}`}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            {altLabel}
          </Link>
          {data?.primary_cta && (
            <Link
              href={data.primary_cta.url}
              className="bg-ws-yellow text-ws-black px-4 py-2 text-sm font-bold tracking-wide hover:bg-yellow-300 transition-colors"
            >
              {data.primary_cta.label}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
