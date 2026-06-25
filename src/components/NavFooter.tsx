import Image from 'next/image'
import Link from 'next/link'

interface NavLink { id: number; label: string; url: string; target_blank: boolean }
interface SocialLinks { facebook?: string; instagram?: string; tiktok?: string; twitter?: string }
interface FooterData {
  copyright_notice: string
  primary_links: NavLink[]
  legal_links: NavLink[]
  social_links: SocialLinks
  logo?: { url: string; alternativeText?: string; width?: number; height?: number }
}

export default function NavFooter({ data, locale }: { data: FooterData | null; locale: string }) {
  if (!data) return null

  return (
    <footer className="bg-ws-black border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div>
            {data.logo ? (
              <Image
                src={data.logo.url}
                alt={data.logo.alternativeText ?? 'Wingstop'}
                width={160}
                height={56}
                className="mb-4"
              />
            ) : (
              <span className="text-ws-yellow font-bold text-2xl tracking-wider">WINGSTOP</span>
            )}

            <div className="flex gap-4 mt-4">
              {data.social_links?.instagram && (
                <a href={data.social_links.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-white/60 hover:text-ws-yellow transition-colors text-sm">IG</a>
              )}
              {data.social_links?.facebook && (
                <a href={data.social_links.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-white/60 hover:text-ws-yellow transition-colors text-sm">FB</a>
              )}
              {data.social_links?.tiktok && (
                <a href={data.social_links.tiktok} target="_blank" rel="noopener noreferrer"
                  className="text-white/60 hover:text-ws-yellow transition-colors text-sm">TT</a>
              )}
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {data.primary_links?.map((link) => (
              <Link key={link.id} href={link.url}
                target={link.target_blank ? '_blank' : undefined}
                className="text-white/70 hover:text-white text-sm tracking-wide transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-white/40 text-xs">{data.copyright_notice}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {data.legal_links?.map((link) => (
              <Link key={link.id} href={link.url}
                target={link.target_blank ? '_blank' : undefined}
                className="text-white/40 hover:text-white/80 text-xs transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
