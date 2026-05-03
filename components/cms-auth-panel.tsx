"use client";

import { useState } from "react";
import { useCmsAuth } from "@/lib/supabase/use-cms-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSupabaseConnection } from "@/lib/supabase/use-supabase-connection";

export function CmsAuthPanel() {
  const { canEdit, loading, error, session, signIn, signOut, supabase } = useCmsAuth();
  const { checking, connected, error: connectionError, hasEnv } = useSupabaseConnection();
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      setPending(true);
      await signIn(email, password);
    } finally {
      setPending(false);
    }
  }

  if (!supabase || !hasEnv) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supabase env missing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-[#5c7792]">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to use the live CMS.
          Until then, the admin screens fall back to the JSON files committed in the repo.
        </CardContent>
      </Card>
    );
  }

  if (checking) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-[#5c7792]">Checking Supabase connection...</CardContent>
      </Card>
    );
  }

  if (!connected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supabase unavailable</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-[#5c7792]">
          {connectionError ?? "The CMS could not reach the configured Supabase project."}
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-[#5c7792]">Checking CMS session...</CardContent>
      </Card>
    );
  }

  if (canEdit) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authenticated</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-[#5c7792]">
            Signed in as <span className="font-semibold text-[#0e2951]">{session?.user.email}</span>
          </div>
          <Button type="button" variant="outline" size="xs" onClick={() => void signOut()}>
            Sign out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to edit</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={(formData) => {
            void handleSubmit(formData);
          }}
          className="grid gap-4 md:grid-cols-[1fr_1fr_auto]"
        >
          <div>
            <Label htmlFor="cms-email">Email</Label>
            <Input id="cms-email" name="email" type="email" className="mt-3" required />
          </div>
          <div>
            <Label htmlFor="cms-password">Password</Label>
            <Input id="cms-password" name="password" type="password" className="mt-3" required />
          </div>
          <div className="flex items-end">
            <Button type="submit" size="xs" disabled={pending}>
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
        {error ? <p className="mt-4 text-sm text-[#d60060]">{error}</p> : null}
      </CardContent>
    </Card>
  );
}
