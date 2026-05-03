"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type ConnectionState = {
  checking: boolean;
  connected: boolean;
  error: string | null;
  hasEnv: boolean;
};

const initialState: ConnectionState = {
  checking: true,
  connected: false,
  error: null,
  hasEnv: false,
};

export function useSupabaseConnection() {
  const [state, setState] = useState<ConnectionState>(initialState);

  useEffect(() => {
    const client = getSupabaseBrowserClient();

    if (!client) {
      setState({
        checking: false,
        connected: false,
        error: null,
        hasEnv: false,
      });
      return;
    }

    const supabase = client;
    let alive = true;

    async function checkConnection() {
      setState({
        checking: true,
        connected: false,
        error: null,
        hasEnv: true,
      });

      const [siteResult, studiesResult] = await Promise.all([
        supabase.from("site_content").select("id").limit(1),
        supabase.from("case_studies").select("id").limit(1),
      ]);

      if (!alive) {
        return;
      }

      const firstError = siteResult.error ?? studiesResult.error;

      setState({
        checking: false,
        connected: !firstError,
        error: firstError?.message ?? null,
        hasEnv: true,
      });
    }

    void checkConnection();

    return () => {
      alive = false;
    };
  }, []);

  return state;
}
