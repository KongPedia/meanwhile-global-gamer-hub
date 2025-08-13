type LanguageCode = string;

function ensureLink(rel: string, attrs: Record<string, string>): HTMLLinkElement {
  const selectorParts = [`link[rel="${rel}"]`];
  if (attrs.hreflang) selectorParts.push(`[hreflang="${attrs.hreflang}"]`);
  const selector = selectorParts.join("");
  let link = document.head.querySelector<HTMLLinkElement>(`${selector}[data-managed="seo"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    link.setAttribute("data-managed", "seo");
    document.head.appendChild(link);
  }
  Object.entries(attrs).forEach(([k, v]) => link!.setAttribute(k, v));
  return link!;
}

function removeManagedLinks(rel: string) {
  document.head.querySelectorAll(`link[rel="${rel}"][data-managed="seo"]`).forEach((el) => el.remove());
}

function ensureMeta(property: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"][data-managed="seo"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    meta.setAttribute("data-managed", "seo");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function removeManagedMetas(property: string) {
  document.head.querySelectorAll(`meta[property="${property}"][data-managed="seo"]`).forEach((el) => el.remove());
}

function mapOgLocale(lang: string): string {
  switch (lang) {
    case "ko": return "ko_KR";
    case "ja": return "ja_JP";
    case "zh": return "zh_CN";
    case "es": return "es_ES";
    default: return "en_US";
  }
}

function replaceFirstPathSegment(pathname: string, newLang: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return `/${newLang}`;
  segments[0] = newLang;
  return `/${segments.join('/')}`;
}

export function updateI18nSeo(params: {
  currentLang: LanguageCode;
  supportedLangs: LanguageCode[];
  defaultLang?: LanguageCode;
  siteUrl?: string;
  pathname: string;
  search?: string;
  hash?: string;
}) {
  const { currentLang, supportedLangs, defaultLang = "en", siteUrl, pathname, search = "", hash = "" } = params;

  // html lang
  document.documentElement.lang = currentLang;

  const baseUrl = siteUrl || window.location.origin;
  const absolute = (p: string) => `${baseUrl}${p}${search}${hash}`;

  // canonical
  ensureLink("canonical", { href: absolute(pathname) });

  // hreflang alternates
  removeManagedLinks("alternate");
  supportedLangs.forEach((lang) => {
    const href = absolute(replaceFirstPathSegment(pathname, lang));
    ensureLink("alternate", { hreflang: lang, href });
  });
  const xDefaultHref = absolute(replaceFirstPathSegment(pathname, defaultLang));
  ensureLink("alternate", { hreflang: "x-default", href: xDefaultHref });

  // og:locale and alternates
  ensureMeta("og:locale", mapOgLocale(currentLang));
  removeManagedMetas("og:locale:alternate");
  supportedLangs
    .filter((l) => l !== currentLang)
    .forEach((lang) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:locale:alternate");
      meta.setAttribute("content", mapOgLocale(lang));
      meta.setAttribute("data-managed", "seo");
      document.head.appendChild(meta);
    });
}


