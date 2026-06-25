export const dynamic = 'force-dynamic'

import { getHomepage, getCarousels, getMenuItems } from '@/lib/strapi'
import Hero from '@/components/Hero'
import Callout from '@/components/Callout'
import CarouselSection from '@/components/CarouselSection'
import MenuItemsSection from '@/components/MenuItemsSection'

const DEFAULT_LOCALE = 'en-QA'

export default async function RootPage() {
  const locale = DEFAULT_LOCALE

  let homepage: any = null
  let carousels: any[] = []
  let menuItems: any[] = []
  let fetchError: string | null = null

  try {
    ;[homepage, carousels, menuItems] = await Promise.all([
      getHomepage(locale),
      getCarousels(locale),
      getMenuItems(locale),
    ])
  } catch (e: any) {
    fetchError = e?.message ?? 'Unknown fetch error'
  }

  if (fetchError) {
    return (
      <div className="p-8 text-white">
        <p className="text-ws-yellow font-bold">Strapi fetch error:</p>
        <pre className="text-sm mt-2 text-white/70">{fetchError}</pre>
        <p className="text-sm mt-2 text-white/50">Token present: {process.env.STRAPI_API_TOKEN ? 'yes' : 'NO - missing!'}</p>
      </div>
    )
  }

  if (!homepage) {
    return (
      <div className="p-8 text-white">
        <p className="text-ws-yellow font-bold">No homepage found for locale: {locale}</p>
        <p className="text-sm mt-2 text-white/50">Token present: {process.env.STRAPI_API_TOKEN ? 'yes' : 'NO - missing!'}</p>
      </div>
    )
  }

  const body: any[] = homepage.body ?? []

  return (
    <>
      {body.length === 0 && (
        <div className="p-8 text-white/50">Homepage found but body is empty.</div>
      )}
      {body.map((block: any, i: number) => {
        switch (block.__component) {
          case 'sections.hero':
            return <Hero key={i} data={block} />
          case 'shared.callout':
            return <Callout key={i} data={block} />
          case 'blocks.carousel-ref':
            return <CarouselSection key={i} carousels={carousels} />
          case 'blocks.menu-items-ref':
            return <MenuItemsSection key={i} data={block} menuItems={menuItems} />
          default:
            return null
        }
      })}
    </>
  )
}
