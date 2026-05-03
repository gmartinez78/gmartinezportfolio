"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CmsShell } from "@/components/cms-shell";
import { CmsAuthPanel } from "@/components/cms-auth-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fallbackCaseStudies } from "@/lib/cms/fallback";
import type { CaseStudyRecord } from "@/lib/cms/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useSupabaseConnection } from "@/lib/supabase/use-supabase-connection";
import { useCmsAuth } from "@/lib/supabase/use-cms-auth";

const emptyCaseStudy: CaseStudyRecord = {
  slug: "",
  status: "draft",
  featured: false,
  order: 0,
  title: "",
  company: "",
  client_context: null,
  role: null,
  year: null,
  duration: null,
  industry: null,
  tagline: null,
  tags: [],
  filters: [],
  tools: [],
  images: { cover: "", hero: "", gallery: [] },
  client_logos: [],
  metrics: [],
  team: [],
  my_role: [],
  problem: { admin_pain_points: [], user_pain_points: [] },
  constraints: [],
  methodology: { name: "Design Thinking", steps: [] },
  design_strategy: [],
  reflections: [],
  content_blocks: [
    { id: "overview", type: "overview", title: "Overview" },
    { id: "metrics", type: "results", title: "Key Metrics" },
  ],
  nda_notice: null,
  password: null,
  external_link: null,
};

function csvValue(values: string[] | undefined) {
  return (values ?? []).join(", ");
}

function parseCsv(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function nullableString(value: FormDataEntryValue | null) {
  const trimmed = String(value ?? "").trim();
  return trimmed ? trimmed : null;
}

export function CmsCaseStudyEditorClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { canEdit, supabase } = useCmsAuth();
  const { checking, connected, error } = useSupabaseConnection();
  const isNew = slug === "new";
  const [study, setStudy] = useState<CaseStudyRecord | null>(isNew ? emptyCaseStudy : null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fallbackStudy = useMemo(
    () => fallbackCaseStudies.find((item) => item.slug === slug) ?? null,
    [slug],
  );

  useEffect(() => {
    if (isNew) {
      return;
    }

    const supabaseClient = getSupabaseBrowserClient();

    if (!supabaseClient) {
      setStudy(fallbackStudy);
      setLoading(false);
      return;
    }

    void supabaseClient
      .from("case_studies")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setStudy((data as CaseStudyRecord | null) ?? null);
        setLoading(false);
      });
  }, [fallbackStudy, isNew, slug]);

  const currentStudy = study ?? emptyCaseStudy;
  const jsonSections = [
    { label: "Images", name: "images_json", value: currentStudy.images },
    { label: "Client logos", name: "client_logos_json", value: currentStudy.client_logos },
    { label: "Metrics", name: "metrics_json", value: currentStudy.metrics },
    { label: "Problem", name: "problem_json", value: currentStudy.problem },
    { label: "Constraints", name: "constraints_json", value: currentStudy.constraints },
    { label: "Methodology", name: "methodology_json", value: currentStudy.methodology },
    { label: "Design strategy", name: "design_strategy_json", value: currentStudy.design_strategy },
    { label: "Reflections", name: "reflections_json", value: currentStudy.reflections },
    { label: "Content blocks", name: "content_blocks_json", value: currentStudy.content_blocks ?? [] },
  ];

  async function handleSave(formData: FormData) {
    if (!supabase || !canEdit) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const id = nullableString(formData.get("id"));
      const payload: CaseStudyRecord = {
        id: id ?? undefined,
        slug: String(formData.get("slug") ?? "").trim(),
        status: String(formData.get("status") ?? "draft") as CaseStudyRecord["status"],
        featured: formData.get("featured") === "on",
        order: Number(formData.get("order") ?? 0),
        title: String(formData.get("title") ?? "").trim(),
        company: String(formData.get("company") ?? "").trim(),
        client_context: nullableString(formData.get("client_context")),
        role: nullableString(formData.get("role")),
        year: nullableString(formData.get("year")) ? Number(formData.get("year")) : null,
        duration: nullableString(formData.get("duration")),
        industry: nullableString(formData.get("industry")),
        tagline: nullableString(formData.get("tagline")),
        tags: parseCsv(formData.get("tags_csv")),
        filters: parseCsv(formData.get("filters_csv")),
        tools: parseCsv(formData.get("tools_csv")),
        team: parseCsv(formData.get("team_csv")),
        my_role: parseCsv(formData.get("my_role_csv")),
        images: JSON.parse(String(formData.get("images_json"))),
        client_logos: JSON.parse(String(formData.get("client_logos_json"))),
        metrics: JSON.parse(String(formData.get("metrics_json"))),
        problem: JSON.parse(String(formData.get("problem_json"))),
        constraints: JSON.parse(String(formData.get("constraints_json"))),
        methodology: JSON.parse(String(formData.get("methodology_json"))),
        design_strategy: JSON.parse(String(formData.get("design_strategy_json"))),
        reflections: JSON.parse(String(formData.get("reflections_json"))),
        content_blocks: JSON.parse(String(formData.get("content_blocks_json"))),
        nda_notice: nullableString(formData.get("nda_notice")),
        password: nullableString(formData.get("password")),
        external_link: nullableString(formData.get("external_link")),
      };

      const response = id
        ? await supabase.from("case_studies").update(payload).eq("id", id)
        : await supabase.from("case_studies").insert(payload);

      if (response.error) {
        throw response.error;
      }

      setMessage("Case study saved.");
      setStudy(payload);

      if (slug !== payload.slug) {
        router.replace(`/cms/case-studies/${payload.slug}`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save case study.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!supabase || !canEdit || !currentStudy.slug) {
      return;
    }

    const confirmed = window.confirm(`Delete "${currentStudy.title}"?`);

    if (!confirmed) {
      return;
    }

    const { error } = await supabase.from("case_studies").delete().eq("slug", currentStudy.slug);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/cms/case-studies");
  }

  return (
    <CmsShell
      title={isNew ? "New Case Study" : currentStudy.title}
      description="This editor keeps metadata structured and leaves rich repeated sections in JSON so each case study can support different narrative shapes without breaking the schema."
      activeHref="/cms/case-studies"
      connected={connected}
      checking={checking}
      connectionError={error}
    >
      <div className="space-y-6">
        <CmsAuthPanel />

        {loading ? (
          <Card>
            <CardContent className="py-6 text-sm text-[#5c7792]">Loading case study...</CardContent>
          </Card>
        ) : !isNew && !study ? (
          <Card>
            <CardContent className="py-6 text-sm text-[#5c7792]">
              Case study not found in Supabase or fallback content.
            </CardContent>
          </Card>
        ) : (
          <form
            action={(formData) => {
              void handleSave(formData);
            }}
            className="space-y-6"
          >
            <input type="hidden" name="id" value={currentStudy.id ?? ""} />
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={currentStudy.title} className="mt-3" required />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" defaultValue={currentStudy.slug} className="mt-3" required />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={currentStudy.status}
                    className="mt-3 h-14 w-full rounded-[22px] border-2 border-[#CFE5F8] bg-[#F7FBFF] px-6 text-base text-[#3c3e3f] outline-none focus:border-[#1183D0]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" defaultValue={currentStudy.company} className="mt-3" required />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" defaultValue={currentStudy.role ?? ""} className="mt-3" />
                </div>
                <div>
                  <Label htmlFor="client_context">Client context</Label>
                  <Input id="client_context" name="client_context" defaultValue={currentStudy.client_context ?? ""} className="mt-3" />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" name="industry" defaultValue={currentStudy.industry ?? ""} className="mt-3" />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" type="number" defaultValue={currentStudy.year ?? ""} className="mt-3" />
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" name="order" type="number" defaultValue={currentStudy.order} className="mt-3" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" defaultValue={currentStudy.duration ?? ""} className="mt-3" />
                </div>
                <div className="flex items-end">
                  <label className="mt-3 inline-flex items-center gap-3 text-sm font-semibold text-[#0e2951]">
                    <input type="checkbox" name="featured" defaultChecked={currentStudy.featured} className="h-5 w-5 rounded border-[#CFE5F8]" />
                    Featured project
                  </label>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="tagline">Tagline / card summary</Label>
                  <Textarea id="tagline" name="tagline" className="mt-3 min-h-[120px]" defaultValue={currentStudy.tagline ?? ""} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lists</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 md:grid-cols-2">
                {[
                  ["Tags", "tags_csv", csvValue(currentStudy.tags)],
                  ["Filters", "filters_csv", csvValue(currentStudy.filters)],
                  ["Tools", "tools_csv", csvValue(currentStudy.tools)],
                  ["Team", "team_csv", csvValue(currentStudy.team)],
                  ["My role", "my_role_csv", csvValue(currentStudy.my_role)],
                ].map(([label, name, value]) => (
                  <div key={String(name)}>
                    <Label htmlFor={String(name)}>{label}</Label>
                    <Input id={String(name)} name={String(name)} defaultValue={String(value)} className="mt-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {jsonSections.map((section) => (
              <Card key={section.name}>
                <CardHeader>
                  <CardTitle>{section.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor={section.name}>{section.label} JSON</Label>
                  <Textarea
                    id={section.name}
                    name={section.name}
                    className="mt-3 min-h-[220px] font-mono text-[13px] leading-6"
                    defaultValue={JSON.stringify(section.value, null, 2)}
                  />
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Access and Legal</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div>
                  <Label htmlFor="nda_notice">NDA notice</Label>
                  <Textarea id="nda_notice" name="nda_notice" className="mt-3 min-h-[140px]" defaultValue={currentStudy.nda_notice ?? ""} />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <Label htmlFor="password">Optional password</Label>
                    <Input id="password" name="password" defaultValue={currentStudy.password ?? ""} className="mt-3" />
                  </div>
                  <div>
                    <Label htmlFor="external_link">External link</Label>
                    <Input id="external_link" name="external_link" defaultValue={currentStudy.external_link ?? ""} className="mt-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button type="button" variant="destructive" size="xs" onClick={() => void handleDelete()} disabled={!canEdit || !currentStudy.slug}>
                Delete case study
              </Button>
              <div className="flex items-center gap-4">
                <p className="text-sm text-[#5c7792]">{message}</p>
                <Button type="submit" disabled={!canEdit || saving}>
                  {saving ? "Saving..." : "Save case study"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </CmsShell>
  );
}
