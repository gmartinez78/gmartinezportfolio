const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string) {
  if (!BASE_PATH) {
    return path;
  }

  if (path === "/") {
    return `${BASE_PATH}/`;
  }

  return `${BASE_PATH}${path}`;
}

export function isExternalHref(href: string) {
  if (!href || href.startsWith("/") || href.startsWith("#")) {
    return false;
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return true;
  }

  try {
    const baseOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://example.com";
    const url = new URL(href, baseOrigin);

    if (typeof window !== "undefined") {
      return url.origin !== window.location.origin;
    }

    return /^https?:/i.test(href);
  } catch {
    return false;
  }
}

export function normalizeNavigableHref(href: string) {
  if (!href) {
    return href;
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return href;
  }

  try {
    const baseOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://example.com";
    const url = new URL(href, baseOrigin);

    if (typeof window !== "undefined" && url.origin === window.location.origin) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return href;
  } catch {
    return href;
  }
}
