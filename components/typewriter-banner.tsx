"use client";

import { useEffect, useRef, useState } from "react";

const TYPING_SPEED = 75;
const DELETING_SPEED = 38;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 350;

export function TypewriterBanner({
  greeting = "Hey there! I'm Greddys,",
  roles = ["Sr. Product Designer."],
  description = "Building products end to end, from UX architecture and design systems to cross-functional execution that ships.",
}: {
  greeting?: string;
  roles?: string[];
  description?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const safeRoles = roles.length ? roles : ["Sr. Product Designer."];
  const stateRef = useRef({
    currentIdx: 0,
    charIdx: 0,
    isDeleting: false,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const { currentIdx, charIdx, isDeleting } = stateRef.current;
      const current = safeRoles[currentIdx];

      if (!isDeleting) {
        const next = current.substring(0, charIdx + 1);
        setDisplayText(next);
        stateRef.current.charIdx += 1;

        if (stateRef.current.charIdx === current.length) {
          stateRef.current.isDeleting = true;
          timer = setTimeout(tick, PAUSE_AFTER_TYPE);
        } else {
          timer = setTimeout(tick, TYPING_SPEED);
        }

        return;
      }

      const next = current.substring(0, charIdx - 1);
      setDisplayText(next);
      stateRef.current.charIdx -= 1;

      if (stateRef.current.charIdx === 0) {
        stateRef.current.isDeleting = false;
        stateRef.current.currentIdx = (currentIdx + 1) % safeRoles.length;
        timer = setTimeout(tick, PAUSE_AFTER_DELETE);
      } else {
        timer = setTimeout(tick, DELETING_SPEED);
      }
    }

    timer = setTimeout(tick, TYPING_SPEED);

    return () => clearTimeout(timer);
  }, [safeRoles]);

  return (
    <section className="flex min-h-[280px] flex-col justify-center">
      <h1 className="m-0 text-[28px] font-normal leading-[1.2] text-white">
        {greeting}
      </h1>
      <div className="mb-8 mt-3 flex min-h-[120px] items-center sm:min-h-[76px]">
        <span
          aria-live="polite"
          className="text-[42px] font-medium leading-[1.1] text-[#7CB8E8] sm:text-[52px] lg:text-[64px]"
        >
          {displayText}
        </span>
        <span
          aria-hidden="true"
          className="ml-2 inline-block h-12 w-[3px] rounded-sm bg-[#1183D0] animate-[typewriter-cursor-blink_0.75s_step-end_infinite]"
        />
      </div>
      <p className="m-0 max-w-[560px] text-[15px] leading-[1.8] text-white">
        {description}
      </p>
    </section>
  );
}
