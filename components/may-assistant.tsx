"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { withBasePath } from "../lib/site";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const QUICK_ACTIONS = [
  { label: "View projects", href: withBasePath("/projects") },
  { label: "See resume", href: withBasePath("/resume") },
  { label: "Contact Greddys", href: withBasePath("/contact") },
  { label: "GitHub activity", href: withBasePath("/#github-activity") },
];

const SUGGESTIONS = [
  "Show product design work",
  "What industries has she worked in?",
  "How can I contact Greddys?",
];

const INITIAL_MESSAGE =
  "Hi! I am May, Greddys assistant, I can provide any info that you need.";

function getAssistantReply(input: string) {
  const normalized = input.toLowerCase();

  if (normalized.includes("project") || normalized.includes("work") || normalized.includes("portfolio")) {
    return "You can explore Greddys' case studies in Projects. I can point you to AI product design, design systems, UX research, or accessibility work.";
  }

  if (normalized.includes("resume") || normalized.includes("experience") || normalized.includes("hire")) {
    return "The Resume section is the fastest way to review Greddys' background, industries, and recent impact. It is tailored well for recruiters.";
  }

  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("reach")) {
    return "You can contact Greddys from the Contact page. There you will find email, LinkedIn, Behance, and availability details.";
  }

  if (normalized.includes("github") || normalized.includes("code") || normalized.includes("activity")) {
    return "There is a GitHub activity section at the end of the home page that shows recent public activity and repository work.";
  }

  if (normalized.includes("ai") || normalized.includes("design system") || normalized.includes("research")) {
    return "Greddys has recent work across AI-powered product design, enterprise UX research, and design systems. The pills on the hero can take you directly to related projects.";
  }

  return "I can help you find projects, resume details, contact info, or GitHub activity. Try one of the quick ideas below.";
}

export function MayAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "assistant-welcome", role: "assistant", text: INITIAL_MESSAGE },
  ]);

  const visibleMessages = useMemo(() => messages.slice(-5), [messages]);

  function submitMessage(message: string) {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: `user-${current.length + 1}`, role: "user", text: trimmed },
      { id: `assistant-${current.length + 2}`, role: "assistant", text: getAssistantReply(trimmed) },
    ]);
    setDraft("");
    setIsOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage(draft);
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex max-w-[340px] flex-col items-end gap-3">
      {isOpen ? (
        <div className="w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-[#ffd2a5] bg-white/95 shadow-[0_24px_60px_rgba(82,42,0,0.18)] backdrop-blur-xl">
          <div className="flex items-start gap-3 border-b border-[#ffe4c8] bg-[linear-gradient(135deg,#fff6db_0%,#ffe8c3_38%,#ffd8a0_100%)] px-5 py-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff4a8_0%,#ffcf64_55%,#ff9d2f_100%)] shadow-[inset_0_2px_8px_rgba(255,255,255,0.55),0_12px_24px_rgba(255,157,47,0.28)]">
              <div className="relative h-8 w-8">
                <span className="absolute left-[6px] top-[9px] h-[4px] w-[4px] rounded-full bg-[#8a4200]" />
                <span className="absolute right-[6px] top-[9px] h-[4px] w-[4px] rounded-full bg-[#8a4200]" />
                <span className="absolute left-1/2 top-[16px] h-[10px] w-[16px] -translate-x-1/2 rounded-b-full border-b-[3px] border-[#8a4200]" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b45a00]">May assistant</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#6d3b00]">
                {INITIAL_MESSAGE}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#a15800] transition-colors hover:bg-white/55"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 px-5 py-4">
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <Button key={action.label} asChild size="xs" variant="outline" className="h-auto border-[#ffd9b5] bg-[#fff9f1] px-4 py-2 text-[12px] text-[#a15800] hover:border-[#ffbf78] hover:bg-[#fff2df] hover:text-[#7a3f00]">
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </div>

            <div className="max-h-[220px] space-y-3 overflow-y-auto pr-1">
              {visibleMessages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-[18px] px-4 py-3 text-[13px] leading-[1.65] ${
                    message.role === "assistant"
                      ? "bg-[#fff7ea] text-[#6d3b00]"
                      : "ml-8 bg-[#fff0d7] text-[#7a3f00]"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b45a00]">
                <Sparkles className="h-4 w-4" />
                Ideas
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => submitMessage(suggestion)}
                    className="rounded-full border border-[#ffe0bf] bg-[#fffaf4] px-3 py-2 text-[12px] font-medium text-[#8a4200] transition-colors hover:border-[#ffc98d] hover:bg-[#fff1de]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask May anything..."
                className="h-12 border-[#ffd9b5] bg-[#fffaf4] text-[14px] text-[#6d3b00] placeholder:text-[#d39a64] focus-visible:border-[#ffad55] focus-visible:ring-[#ffad55]/20"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] leading-[1.5] text-[#b57b43]">
                  Start a conversation or jump into one of the quick links.
                </p>
                <Button type="submit" size="xs" className="h-auto gap-2 rounded-full bg-[#ff9d2f] px-4 py-2 text-[12px] text-white hover:bg-[#f08b17]">
                  <Send className="h-3.5 w-3.5" />
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-3 rounded-full border border-[#ffd2a5] bg-white/92 px-4 py-3 shadow-[0_20px_50px_rgba(82,42,0,0.18)] backdrop-blur-xl transition-transform hover:-translate-y-0.5"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff4a8_0%,#ffcf64_55%,#ff9d2f_100%)] shadow-[inset_0_2px_8px_rgba(255,255,255,0.55),0_10px_24px_rgba(255,157,47,0.24)]">
            <span className="relative h-7 w-7">
              <span className="absolute left-[5px] top-[8px] h-[4px] w-[4px] rounded-full bg-[#8a4200]" />
              <span className="absolute right-[5px] top-[8px] h-[4px] w-[4px] rounded-full bg-[#8a4200]" />
              <span className="absolute left-1/2 top-[14px] h-[9px] w-[14px] -translate-x-1/2 rounded-b-full border-b-[3px] border-[#8a4200]" />
            </span>
          </span>
          <span className="text-left">
            <span className="block text-[13px] font-semibold text-[#8a4200]">Talk to May</span>
            <span className="block text-[12px] text-[#b57b43]">Ask for projects, resume, or contact info</span>
          </span>
          <MessageCircle className="h-4 w-4 text-[#ff9d2f]" />
        </button>
      )}
    </div>
  );
}
