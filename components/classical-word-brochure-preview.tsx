import Image from "next/image";

import { withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

type ClassicalWordBrochurePreviewProps = {
  className?: string;
};

export function ClassicalWordBrochurePreview({ className }: ClassicalWordBrochurePreviewProps) {
  return (
    <div aria-hidden="true" className={cn("relative h-full w-full overflow-hidden bg-[#f5f3eb]", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.96),transparent_42%),linear-gradient(145deg,#ece8d9_0%,#faf9f3_54%,#e7e2d1_100%)]" />
      <div className="absolute -bottom-[30%] left-[8%] h-[38%] w-[82%] rounded-full bg-[#84775e]/25 blur-2xl" />

      <div className="absolute left-[3%] top-[10%] h-[76%] w-[77%] -rotate-[7deg] overflow-hidden rounded-[2.5%] border border-white/85 bg-white shadow-[0_18px_28px_rgba(62,53,38,0.27)]">
        <Image
          src={withBasePath("/images/projects/classical-word/brochure-inside-panels.png")}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 500px"
          className="object-cover"
        />
      </div>

      <div className="absolute left-[65%] top-[14%] h-[76%] w-[26%] rotate-[8deg] overflow-hidden rounded-[3%] border border-white/90 bg-white shadow-[0_20px_32px_rgba(62,53,38,0.36)]">
        <Image
          src={withBasePath("/images/projects/classical-word/brochure-cover-panels.png")}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 500px"
          className="object-cover object-right"
        />
      </div>
    </div>
  );
}
