import './globals.css'
import { getNavHeader, getNavFooter } from '@/lib/strapi'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = 'en-QA'
  const [navHeader, navFooter] = await Promise.all([
    getNavHeader(locale),
    getNavFooter(locale),
  ])

  return (
    <html lang={locale} dir="ltr">
      <body className="bg-ws-black text-white min-h-screen flex flex-col">
        <NavHeader data={navHeader} locale={locale} />
        <main className="flex-1">{children}</main>
        <NavFooter data={navFooter} locale={locale} />
      </body>
    </html>
  )
}
