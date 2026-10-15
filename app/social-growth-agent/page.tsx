"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BellRing,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Eye,
  Flame,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Video,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/site";

type Channel = "Patreon" | "LinkedIn" | "Instagram" | "TikTok" | "YouTube";
type DraftStatus = "Needs approval" | "Scheduled" | "Published";

type Draft = {
  id: number;
  channel: Channel;
  status: DraftStatus;
  date: string;
  title: string;
  body: string;
  format: string;
};

const initialDrafts: Draft[] = [
  {
    id: 1,
    channel: "Patreon",
    status: "Needs approval",
    date: "Today · 17:30",
    format: "Member post",
    title: "The story we left on the cutting-room floor",
    body:
      "A short behind-the-scenes note for members: what changed in this week’s episode, plus a question that invites replies.",
  },
  {
    id: 2,
    channel: "LinkedIn",
    status: "Needs approval",
    date: "Tomorrow · 08:45",
    format: "Text + image",
    title: "One insight from Episode 14 for product leaders",
    body:
      "Turn the strongest moment from the episode into a practical takeaway, then invite readers to share their own experience.",
  },
  {
    id: 3,
    channel: "Instagram",
    status: "Scheduled",
    date: "Fri · 18:15",
    format: "Reel",
    title: "A 24-second clip with a strong first sentence",
    body: "Hook: “Most teams don’t have a product problem, they have a listening problem.”",
  },
  {
    id: 4,
    channel: "YouTube",
    status: "Scheduled",
    date: "Sun · 11:00",
    format: "Short",
    title: "The moment our guest changed their mind",
    body: "Vertical cut with captions, episode card, and full-episode call to action.",
  },
];

const channelDetails: Record<Channel, { color: string; icon: typeof CircleDollarSign }> = {
  Patreon: { color: "#F96854", icon: CircleDollarSign },
  LinkedIn: { color: "#0A66C2", icon: MessageCircle },
  Instagram: { color: "#D9468D", icon: Video },
  TikTok: { color: "#111827", icon: Play },
  YouTube: { color: "#FF0000", icon: Play },
};

const performance = [
  { day: "Mon", value: 43 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 84 },
  { day: "Fri", value: 72 },
  { day: "Sat", value: 38 },
  { day: "Sun", value: 61 },
];

function ChannelBadge({ channel }: { channel: Channel }) {
  const detail = channelDetails[channel];
  const Icon = detail.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: `${detail.color}15`, color: detail.color }}
    >
      <Icon className="h-3.5 w-3.5" />
      {channel}
    </span>
  );
}

function StatusBadge({ status }: { status: DraftStatus }) {
  const styles = {
    "Needs approval": "bg-[#FFF4D9] text-[#A56600]",
    Scheduled: "bg-[#E0EEFB] text-[#1183D0]",
    Published: "bg-[#E6F7EE] text-[#198754]",
  };

  return <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", styles[status])}>{status}</span>;
}

export default function SocialGrowthAgentPage() {
  const [drafts, setDrafts] = useState(initialDrafts);
  const [selectedDraftId, setSelectedDraftId] = useState(1);
  const [notification, setNotification] = useState("Agent is ready for your review.");
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<Channel | "All">("All");

  const pendingCount = drafts.filter((draft) => draft.status === "Needs approval").length;
  const selectedDraft = drafts.find((draft) => draft.id === selectedDraftId) ?? drafts[0];
  const filteredDrafts = useMemo(
    () => (activeChannel === "All" ? drafts : drafts.filter((draft) => draft.channel === activeChannel)),
    [activeChannel, drafts],
  );

  function updateDraftStatus(id: number, status: DraftStatus) {
    setDrafts((current) => current.map((draft) => (draft.id === id ? { ...draft, status } : draft)));
    const draft = drafts.find((item) => item.id === id);
    setNotification(
      status === "Scheduled"
        ? `${draft?.channel ?? "Post"} draft approved and queued for ${draft?.date ?? "its planned time"}.`
        : `${draft?.channel ?? "Post"} draft was sent back to the idea queue.`,
    );
  }

  function createDraft() {
    const nextId = Math.max(...drafts.map((draft) => draft.id)) + 1;
    const draft: Draft = {
      id: nextId,
      channel: "TikTok",
      status: "Needs approval",
      date: "Next available slot",
      format: "Short video idea",
      title: "A fresh angle from this week’s episode",
      body: "Draft generated from the latest episode theme. Edit the angle and approve when it feels like your voice.",
    };
    setDrafts((current) => [draft, ...current]);
    setSelectedDraftId(nextId);
    setActiveChannel("All");
    setNotification("New TikTok draft created for review.");
  }

  return (
    <main className="min-h-screen bg-[#F4F8FC] text-[#153353]">
      <header className="border-b border-[#D9E7F4] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link href={withBasePath("/")} className="inline-flex items-center gap-2 text-sm font-semibold text-[#5C7792] transition-colors hover:text-[#1183D0]">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <div className="hidden items-center gap-2 text-sm text-[#5C7792] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#30B879] shadow-[0_0_0_4px_rgba(48,184,121,0.13)]" />
            Approval-first mode is on
          </div>
          <Button variant="outline" size="xs" onClick={() => setBriefingOpen((open) => !open)} className="gap-2">
            <BellRing className="h-4 w-4" />
            Morning briefing
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
        <section className="relative overflow-hidden rounded-[32px] bg-[#0E2951] px-6 py-8 text-white shadow-[0_24px_55px_rgba(14,41,81,0.18)] sm:px-9 lg:px-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#1183D0]/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-110px] left-[38%] h-56 w-56 rounded-full bg-[#D9468D]/20 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.26em] text-[#90C8ED]">
                <Sparkles className="h-4 w-4" />
                Social Growth Agent · Pilot workspace
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Turn every episode into a week of meaningful growth.</h1>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#D5E7F5]">
                Your agent watches performance, finds timely angles, prepares content across channels, and asks before anything is published.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" onClick={createDraft} className="gap-2 bg-white text-[#0E2951] hover:bg-[#E8F3FC]">
                <Plus className="h-4 w-4" />
                Create a draft
              </Button>
              <Button variant="tertiary" size="sm" onClick={() => setNotification("The next report will be prepared for 08:30 tomorrow.")} className="gap-2 border-white/30 text-white hover:border-white/65 hover:bg-white/10 hover:text-white">
                <RefreshCw className="h-4 w-4" />
                Refresh report
              </Button>
            </div>
          </div>
        </section>

        {briefingOpen ? (
          <section className="mt-5 rounded-[26px] border border-[#B9D9F3] bg-[#EAF5FF] p-5 shadow-[0_12px_30px_rgba(17,131,208,0.08)] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-[#0E2951]"><BellRing className="h-4 w-4 text-[#1183D0]" /> Today’s morning briefing · 08:30</p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#4E6D89]">Reach is up 14.6% this week, driven by short clips. Your highest-converting path is YouTube Short → full episode → Patreon. Review the two drafts waiting below before they are scheduled.</p>
              </div>
              <button type="button" onClick={() => setBriefingOpen(false)} aria-label="Close briefing" className="rounded-full p-2 text-[#5C7792] hover:bg-white hover:text-[#0E2951]"><X className="h-4 w-4" /></button>
            </div>
          </section>
        ) : null}

        <p className="mt-5 rounded-2xl border border-[#D8E6F4] bg-white px-4 py-3 text-sm text-[#4E6D89] shadow-[0_6px_18px_rgba(14,41,81,0.04)]">
          <ShieldCheck className="mr-2 inline h-4 w-4 text-[#198754]" />
          {notification}
        </p>

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total reach", value: "48.2K", change: "+14.6%", icon: Eye, color: "#1183D0" },
            { label: "Engagement rate", value: "6.8%", change: "+1.2 pts", icon: MessageCircle, color: "#D9468D" },
            { label: "Audience growth", value: "+328", change: "+9.1%", icon: UsersRound, color: "#6647C6" },
            { label: "Patreon clicks", value: "1,294", change: "+19.0%", icon: ArrowUpRight, color: "#F96854" },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="border-[#DDE9F4] bg-white shadow-[0_8px_24px_rgba(14,41,81,0.05)]">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <span className="rounded-2xl p-2.5" style={{ backgroundColor: `${metric.color}14`, color: metric.color }}><Icon className="h-5 w-5" /></span>
                    <span className="rounded-full bg-[#E7F8EF] px-2 py-1 text-[11px] font-bold text-[#198754]">{metric.change}</span>
                  </div>
                  <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#0E2951]">{metric.value}</p>
                  <p className="mt-1 text-sm text-[#5C7792]">{metric.label} · last 28 days</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.28fr_0.72fr]">
          <Card className="border-[#DDE9F4] shadow-[0_10px_30px_rgba(14,41,81,0.05)]">
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-[#0E2951]">Content performance</p>
                  <p className="mt-1 text-sm text-[#5C7792]">Reach across your connected channels</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F8EF] px-3 py-1.5 text-xs font-semibold text-[#198754]"><TrendingUp className="h-3.5 w-3.5" /> 14.6% vs. prior period</span>
              </div>
              <div className="mt-8 flex h-52 items-end gap-3 sm:gap-5">
                {performance.map((point) => (
                  <div key={point.day} className="flex h-full flex-1 flex-col justify-end gap-2 text-center">
                    <div className="group relative flex flex-1 items-end rounded-t-xl bg-[#E9F3FB] px-1">
                      <div className="w-full rounded-t-lg bg-[linear-gradient(180deg,#1183D0_0%,#69B6E7_100%)] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,#0C72B7_0%,#4CA5DC_100%)]" style={{ height: `${point.value}%` }} />
                      <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#0E2951] px-2 py-1 text-[10px] font-semibold text-white group-hover:block">{point.value}K</span>
                    </div>
                    <span className="text-xs font-medium text-[#7890A7]">{point.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#E6EEF6] pt-5 text-xs text-[#5C7792]">
                <span><span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#1183D0]" />Organic reach</span>
                <span>Best format: video clips</span>
                <span>Best publish window: Thu 17:00, 19:00</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-[#DDE9F4] shadow-[0_10px_30px_rgba(14,41,81,0.05)]">
            <CardContent className="p-0">
              <div className="bg-[linear-gradient(135deg,#FFF4E3_0%,#FFF9F1_100%)] p-6 sm:p-7">
                <p className="flex items-center gap-2 text-lg font-semibold text-[#0E2951]"><Flame className="h-5 w-5 text-[#E67D22]" /> Trend signals</p>
                <p className="mt-1 text-sm text-[#6C6258]">Useful angles to adapt, never copy.</p>
              </div>
              <div className="space-y-4 p-6 sm:p-7">
                {[
                  ["LinkedIn", "Practical ‘what I learned’ posts are earning deeper comments than polished announcements.", "Authority"],
                  ["TikTok", "The strongest clips begin with a clear tension in the first two seconds.", "Retention"],
                  ["YouTube", "Episode chapters and a specific promise in the title are improving long-form discovery.", "Discovery"],
                ].map(([channel, insight, tag]) => (
                  <div key={channel} className="flex gap-3">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#E67D22]" />
                    <div>
                      <p className="text-sm font-semibold text-[#0E2951]">{channel} <span className="ml-1 rounded-full bg-[#FFF2D9] px-2 py-0.5 text-[10px] text-[#A56600]">{tag}</span></p>
                      <p className="mt-1 text-sm leading-5 text-[#5C7792]">{insight}</p>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => setNotification("Trend research queued for the next briefing.")} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1183D0] hover:text-[#0E75B8]">Research new trends <ChevronRight className="h-4 w-4" /></button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
          <Card className="border-[#DDE9F4] shadow-[0_10px_30px_rgba(14,41,81,0.05)]">
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-[#0E2951]">Approval queue <span className="ml-1 rounded-full bg-[#FFF4D9] px-2 py-1 text-xs text-[#A56600]">{pendingCount} waiting</span></p>
                  <p className="mt-1 text-sm text-[#5C7792]">The agent can prepare and schedule; it cannot publish without your confirmation.</p>
                </div>
                <div className="flex items-center rounded-full bg-[#F2F7FB] p-1">
                  {(["All", "Patreon", "LinkedIn", "Instagram", "TikTok", "YouTube"] as const).map((channel) => (
                    <button key={channel} type="button" onClick={() => setActiveChannel(channel)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold transition-colors", activeChannel === channel ? "bg-white text-[#1183D0] shadow-sm" : "text-[#7890A7] hover:text-[#0E2951]")}>{channel}</button>
                  ))}
                </div>
              </div>
              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[660px] space-y-3">
                  {filteredDrafts.map((draft) => (
                    <button key={draft.id} type="button" onClick={() => setSelectedDraftId(draft.id)} className={cn("grid w-full grid-cols-[130px_1fr_142px_100px] items-center gap-4 rounded-2xl border p-4 text-left transition-all", selectedDraft?.id === draft.id ? "border-[#94C9ED] bg-[#F4FAFF] shadow-[0_8px_20px_rgba(17,131,208,0.08)]" : "border-[#E2EBF3] bg-white hover:border-[#BCD7EB]")}> 
                      <ChannelBadge channel={draft.channel} />
                      <div><p className="text-sm font-semibold text-[#0E2951]">{draft.title}</p><p className="mt-1 text-xs text-[#7890A7]">{draft.format}</p></div>
                      <span className="text-xs font-medium text-[#5C7792]">{draft.date}</span>
                      <StatusBadge status={draft.status} />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#B8D6EC] bg-[linear-gradient(155deg,#EFF8FF_0%,#FFFFFF_76%)] shadow-[0_10px_30px_rgba(14,41,81,0.05)]">
            <CardContent className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {selectedDraft ? <ChannelBadge channel={selectedDraft.channel} /> : null}
                  <p className="mt-4 text-lg font-semibold leading-6 text-[#0E2951]">{selectedDraft?.title}</p>
                </div>
                <button type="button" aria-label="More draft options" className="rounded-full p-2 text-[#7890A7] hover:bg-white hover:text-[#0E2951]"><MoreHorizontal className="h-5 w-5" /></button>
              </div>
              <div className="mt-5 rounded-2xl border border-white bg-white/80 p-4 text-sm leading-6 text-[#4E6D89]">{selectedDraft?.body}</div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#7890A7]"><span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {selectedDraft?.date}</span><span>{selectedDraft?.format}</span></div>
              {selectedDraft?.status === "Needs approval" ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" size="xs" onClick={() => updateDraftStatus(selectedDraft.id, "Published")} className="gap-2"><X className="h-4 w-4" /> Send back</Button>
                  <Button size="xs" onClick={() => updateDraftStatus(selectedDraft.id, "Scheduled")} className="gap-2"><Check className="h-4 w-4" /> Approve & schedule</Button>
                </div>
              ) : (
                <p className="mt-6 flex items-center gap-2 rounded-xl bg-[#E7F8EF] px-3 py-2.5 text-sm font-medium text-[#198754]"><Check className="h-4 w-4" /> This post is {selectedDraft?.status.toLowerCase()}.</p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-7 grid gap-6 lg:grid-cols-2">
          <Card className="border-[#DDE9F4] shadow-[0_10px_30px_rgba(14,41,81,0.05)]">
            <CardContent className="p-6 sm:p-7">
              <p className="flex items-center gap-2 text-lg font-semibold text-[#0E2951]"><CircleDollarSign className="h-5 w-5 text-[#F96854]" /> Monetization path to test</p>
              <p className="mt-2 text-sm leading-6 text-[#5C7792]">Make the podcast funnel obvious before adding more content. This is the highest-leverage next experiment based on the demo data.</p>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
                {[
                  ["Short clip", "#E0EEFB", "#1183D0"],
                  ["Full episode", "#EEE8FF", "#6647C6"],
                  ["Patreon post", "#FFE8E3", "#C84F3F"],
                  ["Member offer", "#E7F8EF", "#198754"],
                ].map(([label, background, color], index) => (
                  <div key={label} className="flex items-center gap-2"><span className="rounded-full px-3 py-2" style={{ backgroundColor: background, color }}>{label}</span>{index < 3 ? <ChevronRight className="h-4 w-4 text-[#9BB2C6]" /> : null}</div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-[#F4D8CE] bg-[#FFF9F7] p-4"><p className="text-sm font-semibold text-[#9D4B3B]">Offer idea: “Listener’s field guide”</p><p className="mt-1 text-sm leading-6 text-[#78615B]">Bundle episode notes, prompts, and a monthly private Q&A into a Patreon tier. Test it with one clear call-to-action at the end of each episode.</p></div>
            </CardContent>
          </Card>

          <Card className="border-[#DDE9F4] shadow-[0_10px_30px_rgba(14,41,81,0.05)]">
            <CardContent className="p-6 sm:p-7">
              <p className="flex items-center gap-2 text-lg font-semibold text-[#0E2951]"><ListChecks className="h-5 w-5 text-[#1183D0]" /> Agent operating rules</p>
              <div className="mt-5 space-y-4">
                {[
                  ["Every morning", "Collect metrics, detect changes, and prepare a concise report."],
                  ["Every episode", "Create platform-specific drafts, clips, captions, and calls to action."],
                  ["Before publishing", "Ask for approval; record what was approved, changed, or rejected."],
                  ["Every week", "Recommend one growth experiment and one monetization experiment."],
                ].map(([title, copy]) => (
                  <div key={title} className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E0EEFB] text-[#1183D0]"><Check className="h-3.5 w-3.5" /></span><div><p className="text-sm font-semibold text-[#0E2951]">{title}</p><p className="mt-0.5 text-sm leading-5 text-[#5C7792]">{copy}</p></div></div>
                ))}
              </div>
              <button type="button" onClick={() => setNotification("Setup guide added to your build checklist.")} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1183D0] hover:text-[#0E75B8]"><LockKeyhole className="h-4 w-4" /> Review the connection checklist</button>
            </CardContent>
          </Card>
        </section>

        <p className="mt-8 text-center text-xs leading-5 text-[#7890A7]">This pilot uses clearly labeled sample metrics and draft content. Connect your accounts and a secure agent runtime before relying on it for real reporting or publishing.</p>
      </div>
    </main>
  );
}
