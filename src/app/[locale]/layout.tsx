import { notFound } from 'next/navigation'
import { getNavHeader, getNavFooter } from '@/lib/strapi'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'

export const dynamic = 'force-dynamic'

const SUPPORTED_LOCALES = ['en-QA', 'ar-QA']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  if (!SUPPORTED_LOCALES.includes(locale)) notFound()

  const isRTL = locale === 'ar-QA'
  const [navHeader, navFooter] = await Promise.all([
    getNavHeader(locale),
    getNavFooter(locale),
  ])

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className="bg-ws-black text-white min-h-screen flex flex-col">
        <NavHeader data={navHeader} locale={locale} />
        <main className="flex-1">{children}</main>
        <NavFooter data={navFooter} locale={locale} />
      </body>
    </html>
  )
}
