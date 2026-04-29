"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { resolveProjectHref, resolveTrustedLogo, usePublicCaseStudies, usePublicCaseStudy } from "@/lib/cms/public";
import { withBasePath } from "@/lib/site";

export function ProjectCaseStudyPageClient({ slug }: { slug: string }) {
  const { caseStudy, loading } = usePublicCaseStudy(slug);
  const { caseStudies } = usePublicCaseStudies();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
        <SiteHeader active="Projects" />
        <section className="mx-auto max-w-[1200px] px-6 py-20 text-sm text-[#5c7792]">Loading case study...</section>
      </main>
    );
  }

  if (!caseStudy || caseStudy.status !== "published") {
    return (
      <main className="min-h-screen bg-[#F0F7FF] text-[#3c3e3f]">
        <SiteHeader active="Projects" />
        <section className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-center justify-center px-6 py-20 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.45em] text-[#1183D0]">
            Case Study Unavailable
          </p>
          <h1 className="mt-6 font-serif-display text-[44px] italic leading-[1.05] text-[#0e2951]">
            This case study is no longer published
          </h1>
          <a
            href={withBasePath("/projects")}
            className="mt-8 inline-flex rounded-[24px] bg-[#1183D0] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e75b8]"
          >
            Back to Projects
          </a>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const otherProjects = caseStudies
    .filter((project) => project.slug !== caseStudy.slug && project.status === "published")
    .slice(0, 3);

  return (
    <main className="bg-[#F0F7FF] text-[#3c3e3f] overflow-x-hidden">
      <SiteHeader active="Projects" />

      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-6 pt-6 text-sm lg:px-20">
        <a href={withBasePath("/")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Home</a>
        <span className="text-[#b8cce0]">›</span>
        <a href={withBasePath("/projects")} className="text-[#5c7792] transition-colors hover:text-[#0e2951]">Projects</a>
        <span className="text-[#b8cce0]">›</span>
        <span className="font-semibold text-[#0e2951]">{caseStudy.title}</span>
      </div>

      <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-0 md:px-10 xl:px-20">
        <div className="mb-10 flex items-center gap-6">
          {caseStudy.client_logos.map((logo) => (
            <img
              key={logo.name}
              src={resolveTrustedLogo(logo.name, logo.logo)}
              alt={logo.name}
              className="h-8 w-auto object-contain opacity-80"
            />
          ))}
        </div>

        <div className="mb-6 flex items-end justify-between gap-12">
          <div className="max-w-[620px]">
            <p className="mb-3 font-inter text-[13px] uppercase tracking-[3px] text-[#5c7792]">
              {caseStudy.industry ?? "Case Study"}
            </p>
            <h1 className="mb-5 font-inter text-[44px] font-bold leading-[1.15] text-[#0e2951]">
              {caseStudy.title}
            </h1>
            <p className="text-[18px] leading-[1.7] text-[#5c7792]">{caseStudy.tagline}</p>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-inter text-[180px] font-bold leading-none text-[#1183D0]/10 select-none">
              {caseStudy.metrics[0]?.value ?? ""}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 xl:px-20">
        <SectionHeading eyebrow="Overview" title="Structure" className="mb-6" />
        <div className="mt-8 grid gap-0 border-t border-[#4d87ae]/30 pt-8 md:grid-cols-4">
          <div className="border-[#4d87ae]/20 pr-8 md:border-r">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] text-[#5c7792]">Team Members</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#4d87ae]/20" />
            <ul className="space-y-1">
              {caseStudy.team.map((item) => (
                <li key={item} className="font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-[#4d87ae]/20 px-8 md:border-r">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] font-medium text-[#3c3e3f]">My Role</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#1183D0]" />
            <ul className="space-y-1">
              {caseStudy.my_role.map((item) => (
                <li key={item} className="font-inter text-[16px] capitalize leading-[1.75] font-medium text-[#3c3e3f]">{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-[#4d87ae]/20 px-8 md:border-r">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] text-[#5c7792]">Tools Used</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#4d87ae]/20" />
            <ul className="space-y-1">
              {caseStudy.tools.map((item) => (
                <li key={item} className="font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">{item}</li>
              ))}
            </ul>
          </div>
          <div className="pl-8">
            <p className="mb-4 font-inter text-[15px] uppercase tracking-[1.5px] text-[#5c7792]">Timeline</p>
            <div className="mb-5 h-[3px] w-full rounded-full bg-[#4d87ae]/20" />
            <p className="font-inter text-[16px] capitalize leading-[1.75] text-[#5c7792]">{caseStudy.duration}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 xl:px-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Admins' Pain" title="Points" className="mb-8" />
            <div className="space-y-8">
              {caseStudy.problem.admin_pain_points.map((item) => (
                <p key={item} className="font-inter text-[22px] leading-[1.9] text-[#3c3e3f]">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Users' Pain" title="Points" className="mb-8" />
            <div className="space-y-8">
              {caseStudy.problem.user_pain_points.map((item) => (
                <p key={item} className="font-inter text-[22px] leading-[1.9] text-[#3c3e3f]">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 xl:px-20">
        <SectionHeading title="Constraints" centered className="mb-12" />
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudy.constraints.map((item) => (
            <Card key={item} className="p-0 py-0">
              <CardContent className="p-8">
                <Badge>Constraint</Badge>
                <p className="mt-4 font-inter text-[22px] leading-[1.85] text-[#3c3e3f]">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 xl:px-20">
        <SectionHeading eyebrow="Methodology" title={caseStudy.methodology.name} className="mb-12" />
        <div className="grid gap-4 md:grid-cols-5">
          {caseStudy.methodology.steps.map((step, index) => (
            <Card key={step.step} className="p-0 py-0">
              <CardContent className="p-6">
                <p className="font-inter text-[15px] font-semibold text-[#3c3e3f]">{index + 1}. {step.label}</p>
                <p className="mt-2 font-inter text-[13px] leading-[1.5] text-[#5c7792]">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 xl:px-20">
        <SectionHeading title="Design Strategy" className="mb-12" />
        <div className="space-y-8">
          {caseStudy.design_strategy.map((item) => (
            <p key={item} className="font-inter text-[22px] leading-[1.9] text-[#3c3e3f]">{item}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 xl:px-20">
        <SectionHeading eyebrow="Impact" title="Results" className="mb-12" />
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudy.metrics.map((metric) => (
            <Card key={metric.label} className="p-0 py-0">
              <CardContent className="p-8">
                <span className="font-inter text-[52px] font-bold leading-none text-[#1183D0]">{metric.value}</span>
                <p className="mt-4 font-inter text-[18px] leading-[1.5] text-[#3c3e3f]">{metric.label}</p>
                {metric.context ? <p className="mt-2 text-sm text-[#5c7792]">{metric.context}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 xl:px-20">
        <SectionHeading title="Reflections" className="mb-12" />
        <div className="space-y-8">
          {caseStudy.reflections.map((reflection) => (
            <p key={reflection.title} className="font-inter text-[22px] leading-[1.9] text-[#3c3e3f]">
              <strong className="font-semibold">{reflection.title} </strong>
              {reflection.body}
            </p>
          ))}
        </div>
      </section>

      {caseStudy.nda_notice ? (
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 xl:px-20">
          <div className="border-t border-[#bcd2ff]/40 pt-8">
            <p className="max-w-[900px] font-inter text-[13px] leading-[1.7] text-[#5c7792]">
              <strong className="font-semibold text-[#5c7792]">NDA notice:</strong> {caseStudy.nda_notice}
            </p>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 xl:px-20">
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.45em] text-[#1183D0]">More work</p>
        <h2 className="mb-8 font-serif-display text-[32px] italic text-[#0e2951]">Other Projects</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {otherProjects.map((project) => (
            <a key={project.slug} href={resolveProjectHref(project)} className="group overflow-hidden rounded-[28px] border border-[#CFE5F8] bg-white transition-all hover:-translate-y-0.5">
              <div className="flex h-36 items-center justify-center bg-[radial-gradient(ellipse_at_20%_50%,#d4e8ff_0%,#edf5fb_70%)]">
                <span className="font-serif-display text-3xl font-bold italic text-[#1183D0]">{project.metrics[0]?.value ?? project.year}</span>
              </div>
              <div className="p-6">
                <p className="mb-1 text-xs text-[#5c7792]">{project.company}</p>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug text-[#0e2951]">{project.title}</h3>
                <Badge variant="outline" size="tag">{project.tags[0]}</Badge>
              </div>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
