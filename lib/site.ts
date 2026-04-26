const BASE_PATH = process.env.NODE_ENV === "production" ? "/gmartinezportfolio" : "";

export function withBasePath(path: string) {
  if (!BASE_PATH) {
    return path;
  }

  if (path === "/") {
    return `${BASE_PATH}/`;
  }

  return `${BASE_PATH}${path}`;
}
