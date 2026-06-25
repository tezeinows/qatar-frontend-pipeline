import { notFound } from 'next/navigation'
import { getHomepage, getCarousels, getMenuItems } from '@/lib/strapi'
import Hero from '@/components/Hero'
import Callout from '@/components/Callout'
import CarouselSection from '@/components/CarouselSection'
import MenuItemsSection from '@/components/MenuItemsSection'

const SUPPORTED_LOCALES = ['en-QA', 'ar-QA']

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  if (!SUPPORTED_LOCALES.includes(locale)) notFound()

  const [homepage, carousels, menuItems] = await Promise.all([
    getHomepage(locale),
    getCarousels(locale),
    getMenuItems(locale),
  ])

  if (!homepage) notFound()

  const body: any[] = homepage.body ?? []

  return (
    <>
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
