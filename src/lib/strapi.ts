const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.globalwingstop.com'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

async function fetchStrapi<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status} ${url}`)
  return res.json()
}

export async function getMarket(locale: string) {
  const data = await fetchStrapi<any>('/markets', {
    'filters[slug]': 'qatar',
    'populate': '*',
    locale,
  })
  return data.data?.[0] ?? null
}

export async function getHomepage(locale: string) {
  const data = await fetchStrapi<any>('/homepages', {
    'filters[market][slug]': 'qatar',
    'populate[market]': '*',
    'populate[carousel][populate][slides][populate]': '*',
    'populate[featured_promotions][populate]': '*',
    'populate[seo]': '*',
    locale,
  })
  return data.data?.[0] ?? null
}

export async function getNavHeader(locale: string) {
  const data = await fetchStrapi<any>('/navigation-header', {
    'populate': '*',
    locale,
  })
  return data.data ?? null
}

export async function getNavFooter(locale: string) {
  const data = await fetchStrapi<any>('/navigation-footer', {
    'populate': '*',
    locale,
  })
  return data.data ?? null
}

export async function getMenuItems(locale: string) {
  const data = await fetchStrapi<any>('/menu-items', {
    'populate': '*',
    'pagination[pageSize]': '50',
    locale,
  })
  return data.data ?? []
}

export async function getCarousels(locale: string) {
  const data = await fetchStrapi<any>('/carousels', {
    'populate[slides][populate]': '*',
    locale,
  })
  return data.data ?? []
}

export async function getPromotions(locale: string) {
  const data = await fetchStrapi<any>('/promotions', {
    'filters[market][slug]': 'qatar',
    'populate': '*',
    locale,
  })
  return data.data ?? []
}
