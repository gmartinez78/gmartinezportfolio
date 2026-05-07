const truthyPattern = /^(1|true|yes)$/i;

function envFlag(value: string | undefined) {
  return truthyPattern.test(value ?? "");
}

export function shouldUseLocalPublicContent() {
  if (envFlag(process.env.NEXT_PUBLIC_USE_LOCAL_CONTENT)) {
    return true;
  }

  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;
  return vercelEnv === "preview";
}
