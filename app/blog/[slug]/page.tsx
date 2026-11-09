import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { withBasePath } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { buildMetadata, getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";

type Block = string | { list: string[] };
type Post = { type: string; time: string; title: string; intro: string; sections: Array<[string, string | Block[]]>; cover?: { src: string; alt: string }; hideCover?: boolean; date?: string };

function renderInline(text: string) {
  return text.split(/(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) return <a key={i} href={link[2]} className="underline decoration-[#1183D0]/40 underline-offset-4 transition-colors hover:text-[#0E6FB4]">{link[1]}</a>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-semibold text-[#141114]">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function renderBody(body: string | Block[]) {
  const blocks = typeof body === "string" ? [body] : body;
  return blocks.map((block, i) => typeof block === "string"
    ? <p key={i} className="mt-4 text-lg leading-8 text-[var(--ui-color-text-body)]">{renderInline(block)}</p>
    : <ul key={i} className="mt-4 list-disc space-y-2 marker:text-[var(--ui-color-brand-primary)] pl-6 text-lg leading-8 text-[var(--ui-color-text-body)]">{block.list.map((item, j) => <li key={j}>{renderInline(item)}</li>)}</ul>);
}

const posts: Record<string, Post> = {
  "prototype-connections-code": {
    hideCover: true,
    date: "November 9, 2026",
    cover: { src: "/blog/prototype-connections-code.jpg", alt: "Warm peach background with prototype connection lines flowing into a code panel on a design canvas." },
    type: "Article",
    time: "3 min",
    title: "What have we decided, and what is the agent guessing?",
    intro: "A prototype can look convincing while leaving most of the experience undecided.",
    sections: [
      ["", [
        "The main action works. The confirmation screen appears. Everyone understands the idea.",
        "But what happens when the request fails? When someone goes back to change an answer? When there is nothing to display?",
        "Those questions become more important when AI uses the prototype to generate working behavior.",
        "On November 3, Figma announced that its agent can read prototype connections and interactions when creating code layers from design frames. Those connections now provide context for generation. Code layers remain in open beta. ([figma.com](https://www.figma.com/release-notes/))",
        "That is a useful change. It also gives prototype decisions more weight.",
        "A connection between two screens communicates an expectation: this action should lead here. A missing connection leaves that expectation unstated. The agent might fill the gap, but the result is an assumption someone still needs to examine.",
        "My interpretation is that this makes prototypes more valuable as reviewable descriptions of behavior. It does not turn them into complete specifications automatically.",
        "Consider a simple appointment flow.",
        "Someone chooses a time, enters their details, and confirms. The happy path takes three screens. But the appointment might become unavailable before confirmation. A slow connection might leave the person unsure whether the booking succeeded. Going back might erase information they have already entered.",
        "These situations determine whether the experience feels dependable. They deserve the same attention as the confirmation screen.",
        "Before generating code, I would review the flow through a few practical questions:",
        { list: [
          "What happens while the system is working?",
          "What can fail, and how does someone recover?",
          "Can someone go back without losing their progress?",
          "What appears when there is no data?",
          "Which decisions are still unresolved?",
        ]},
        "Accessibility needs additional attention. A visual connection does not, by itself, specify keyboard behavior, semantic structure, screen reader announcements, or where focus moves after a dialog closes. Those expectations need explicit definition and testing in the working interface.",
        "Figma’s workflow example also describes code layers as a shared space for comparing interactive alternatives and refining ideas together. That creates an opportunity to review actual behavior earlier, while decisions are still easy to change. ([figma.com](https://www.figma.com/blog/workflow-lab-build-with-code-on-the-canvas-using-the-figma-agent-and-code-layers/))",
        "I would use that opportunity to make uncertainty visible. Mark a flow as exploratory. Record which states it covers. Identify the assumptions that require validation.",
        "There is no need to prototype every possible situation before learning anything. There is a need to distinguish an intentionally narrow experiment from an experience that is ready to implement.",
        "When prototype connections become input for code, a useful review question is: What behavior have we actually decided, and what are we leaving the agent to guess?",
      ]],
    ],
  },
  "everyone-can-design": {
    hideCover: true,
    date: "November 6, 2026",
    cover: { src: "/blog/everyone-can-design.jpg", alt: "Over-the-shoulder view of a laptop showing a design tool with a Quality check list: Purpose, Hierarchy, Accessibility, Consistency, Feedback." },
    type: "Article",
    time: "5 min",
    title: "Everyone Can Design Now. But How Do You Know If Your Design Is Good?",
    intro: "AI is making design more accessible than ever. The next challenge is learning how to evaluate what we create.",
    sections: [
      ["", [
        "Canva’s recent introduction of [Brush](https://www.canva.com/newsroom/news/canva-brush/) has brought another interesting conversation to the surface: as AI tools become more capable, the distinction between professional designers and people who simply need to create something is becoming less obvious.",
        "Today, a business owner can build a brand identity, a marketing professional can develop campaign materials, and someone with no formal design background can create a website or prototype an application.",
        "I see this as a positive development. Making creative tools more accessible gives more people the opportunity to communicate ideas, experiment, and solve problems independently.",
        "But there’s one part of the conversation I think deserves more attention.",
        "Creating a design and understanding whether that design works are two different skills.",
        "AI can help us explore visual directions, organize information, and generate polished results. What it cannot guarantee is that those results are appropriate for the audience, accessible, or effective at achieving their intended purpose.",
        "And that’s where design knowledge becomes valuable.",
        "The good news is that you don’t need a design degree to start developing that knowledge. Design principles can be learned, practiced, and applied by anyone willing to look beyond aesthetics.",
        "So, whether you’re using Canva, Figma, or an AI-powered tool to create something, here are five questions that can help you evaluate your design decisions.",
      ]],
      ["1. Is the purpose of your design immediately clear?", [
        "Before evaluating colors, typography, or layout, consider what your design is trying to accomplish.",
        "Is it informing someone, encouraging an action, explaining a process, or helping a user make a decision?",
        "A visually appealing design can still fail if the person looking at it doesn’t understand its purpose.",
        "Try this: Show your design to someone unfamiliar with the project for five seconds. Then ask what they think it’s communicating.",
        "If their interpretation is significantly different from your intention, you may need to revisit the message or visual hierarchy.",
      ]],
      ["2. Does the visual hierarchy guide attention?", [
        "Good design doesn’t require every element to compete for attention.",
        "Typography, spacing, contrast, and positioning help communicate which information matters most and how different elements relate to one another.",
        "One common mistake when using design templates or AI-generated layouts is giving too many elements equal visual importance.",
        "The result might look attractive but feel overwhelming.",
        "Try this: Look at your design from a distance, or reduce its size. What catches your attention first?",
        "Is that the information you want people to notice?",
        "If not, consider adjusting the size, contrast, or placement of your elements before adding anything new.",
      ]],
      ["3. Can people actually use and understand it?", [
        "Accessibility is one of the most important aspects of design, and it’s often overlooked when the focus is primarily on visual results.",
        "Small text, insufficient contrast, unclear labels, or interactions that depend entirely on color can create unnecessary barriers.",
        "A design should not only look good on the screen where it was created. It should remain understandable and usable in different contexts.",
        "Try this: Check your text contrast, readability, and information structure. If you’re designing an interactive experience, also consider keyboard navigation and screen reader accessibility.",
        "You don’t need to become an accessibility expert overnight. Start by learning the fundamentals and incorporating them into your process.",
      ]],
      ["4. Are your design decisions consistent?", [
        "Consistency helps people understand and navigate experiences without having to relearn patterns.",
        "Imagine a website where every button looks different, headings follow different styles, and spacing changes unpredictably between sections.",
        "Even if every individual element looks polished, the experience may feel disconnected.",
        "This is particularly relevant when using AI to generate multiple screens, layouts, or design variations.",
        "Try this: Review your design for repeated elements. Are typography, spacing, colors, and interaction patterns being used consistently?",
        "A small set of intentional decisions is often more effective than a collection of individually impressive elements.",
      ]],
      ["5. Have you validated your assumptions with someone else?", [
        "One of the most valuable things I’ve learned throughout my experience in product design is that understanding your own design doesn’t mean everyone else will.",
        "When we create something, we already know how it’s supposed to work. We understand the terminology, the context, and the intended actions.",
        "Our audience doesn’t necessarily have that information.",
        "That’s why feedback matters.",
        "Try this: Ask someone who represents your intended audience to interact with your design without explaining it first.",
        "Observe where they hesitate, what they misunderstand, and what they do naturally.",
        "You don’t always need a formal research study to discover opportunities for improvement. Even a simple conversation can reveal assumptions you hadn’t questioned.",
      ]],
      ["Design is a skill you can continue developing", [
        "I don’t believe the increasing accessibility of design tools diminishes the importance of professional designers.",
        "I think it creates an opportunity for more people to understand what design actually involves.",
        "AI can accelerate execution, generate alternatives, and make experimentation easier. But understanding user needs, evaluating trade-offs, and recognizing whether something solves the intended problem are skills worth developing independently of the tools we use.",
        "And those skills aren’t exclusive to people with a design title.",
        "A marketer who understands visual hierarchy can communicate more effectively. A founder who considers accessibility can make more inclusive decisions. A product manager who understands usability can collaborate more effectively with designers and engineers.",
        "The opportunity isn’t just to make everyone capable of creating designs. It’s to make more people capable of making thoughtful design decisions.",
        "So, the next time you generate a design with AI, don’t stop at asking whether it looks good.",
        "Ask whether it communicates clearly, supports its audience, works consistently, and achieves its purpose.",
        "That’s where learning to design really begins.",
        "As AI makes design tools available to everyone, which design skill do you think is becoming the most important to learn?",
      ]],
    ],
  },
  "when-your-job-stops-being-your-whole-identity": { date: "November 4, 2026", cover: { src: "/blog/when-your-job-stops-being-your-whole-identity.png", alt: "Illustrated woman walking from a home workspace into a bright landscape, representing a life beyond work identity." }, type: "Article", time: "7 min", title: "When Your Job Stops Being Your Whole Identity", intro: "As technology, expectations, and work structures change, many people are rethinking what their jobs are supposed to mean and how much of their identity should depend on them.", sections: [["The job is still meaningful", "For a long time, many of us were taught to answer a simple question with our job title: What do you do? The answer often became more than an occupation. It became an identity, a source of status, a measure of progress, and sometimes the main definition of a successful life. But that relationship is changing. Not necessarily because people have stopped caring about their work. In many cases, they are asking better questions."], ["Questions people are asking", [{ list: ["Does this job give me energy or only consume it?", "What am I learning?", "Do I believe in the purpose behind the work?", "Can I build a life outside my role?", "If my job changes tomorrow, who am I beyond my title?"] }]], ["Work still matters, but not in the same way", "Research suggests that work still matters deeply. Pew found that 39% of U.S. workers say their job or career is extremely or very important to their overall identity. In a 17-country study, work was one of the most common sources of meaning in life, with a median of 25% mentioning their occupation or career. In Spain, the figure was 40%. So the answer is not that people no longer want meaningful work. The deeper change is that fewer people want work to be the only place where meaning comes from."], ["The job itself is being redesigned", "At the same time, the job itself is being redesigned. The World Economic Forum estimates that structural changes could affect 22% of today’s formal jobs by 2030, while nearly 40% of the skills required at work are expected to change. The International Labour Organization’s research on generative AI also points more toward job transformation than simple replacement, but with important consequences for autonomy, coordination, and job quality. People are not only looking for motivation inside existing jobs. They are trying to understand what a job will mean when the tasks, tools, and expectations keep changing."], ["Motivation may be moving from status to agency", "For some, motivation used to come from mastery: becoming the expert, earning the promotion, and building a long career in one direction. For others, it came from stability: knowing what their role was and what they could expect from it. Today, motivation may increasingly come from agency."], ["What agency can look like", [{ list: ["The ability to learn continuously.", "The freedom to make decisions.", "The opportunity to work on problems that matter.", "The feeling that technology supports, rather than diminishes, human contribution.", "The possibility of having a life that is not postponed until retirement."] }]], ["This is not a rejection of ambition", "This is not a rejection of ambition. It is a broader definition of ambition. Success may still mean building expertise or leading teams. It may also mean protecting health, making time for family, contributing to a community, or creating space for interests that do not produce a measurable business result."], ["What role should work play in my life?", "For one person, work may be central. For another, it may be one part of a life built around family, community, creativity, learning, or service. Neither approach is automatically more committed or more valuable."], ["The problem is not always motivation", "The real problem begins when organizations continue to expect identity-level loyalty while offering task-level relationships: limited development, weak management, little autonomy, and unclear purpose. People are not necessarily becoming less motivated. They may be becoming more selective about where they invest their motivation."], ["A job can matter without becoming everything", "As jobs evolve, companies will need to rethink what they offer employees. Salary will remain important. Security will remain important. But so will the quality of the working environment, the ability to grow, the trust given to employees, and the space to remain a whole person outside the organization. For individuals, the challenge is different. We may need to build identities that are strong enough to survive a career change. A job can be meaningful without being our entire life. It can be part of who we are without becoming the answer to who we are."], ["A better question", "That may be one of the most important transitions happening in work today: moving from asking, 'How can my job give my life meaning?' to asking, 'How can my work support the life and the person I am trying to build?'"], ["Sources", [{ list: ["[How Americans View Their Jobs](https://www.pewresearch.org/social-trends/2023/03/30/how-americans-view-their-jobs/), Pew Research Center", "[Meaning in Life Across 17 Advanced Economies](https://www.pewresearch.org/wp-content/uploads/sites/20/2021/11/PG_11.18.21_meaning-in-life_fullreport.pdf), Pew Research Center", "[The Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/2-jobs-outlook), World Economic Forum", "[Impact of GenAI on Jobs, Productivity and Work Organization](https://www.ilo.org/publications/impact-genai-jobs-productivity-and-work-organization-review-empirical), International Labour Organization", "[State of the Global Workplace](https://www.gallup.com/workplace/645416/key-insights-global-workplace.aspx), Gallup"] }]]] },
  "ai-job-search-advantage": { date: "November 3, 2026", cover: { src: "/blog/ai-job-search-advantage.png", alt: "Laptop and phone showing an AI-assisted job search dashboard beside a notebook and coffee on a pink desk." }, type: "Article", time: "8 min", title: "How to Use AI to Gain an Advantage in Your Job Search", intro: "Companies are already using AI to gain an advantage in the hiring process. Candidates should be able to use it to understand the market, communicate their value clearly, and focus their energy on the opportunities that matter most.", sections: [["Use AI to understand how the market is changing", "The job market does not stay still. New roles appear, old roles disappear, companies change their priorities, and job descriptions evolve as new skills become more important. Instead of checking job boards only when you urgently need a new role, use an AI assistant to review the market regularly. Every three or four weeks, compare current job postings with previous ones and look for changes in titles, responsibilities, tools, and requirements. This can reveal patterns that are difficult to notice when reviewing individual listings. You may discover that companies are increasingly looking for AI workflow experience, research skills, technical fluency, strategic thinking, or the ability to work across product and engineering teams. That information can help you decide what to highlight in your CV, which skills to develop, and which roles are worth pursuing."], ["Adapt your CV for the opportunity", "A single CV is unlikely to communicate your experience equally well for every position. This does not mean creating a different professional identity for every job. It means making the most relevant evidence easier for the reader, or the screening system, to find. An AI assistant can compare your CV with a job description and help identify which projects are most relevant, where your achievements need clearer outcomes, and which parts of your experience may be difficult to understand. It can also help you recognize missing keywords, rewrite vague descriptions, and make your professional impact more visible. Every suggestion needs to be reviewed carefully. AI should never invent achievements, add skills you do not have, or turn your CV into a collection of keywords. The goal is to present your actual experience with greater clarity and relevance."], ["Prepare for AI-mediated interviews", "If a company uses an automated assessment or video interview as part of its process, AI can also help you prepare. Use it to review the job description, identify likely questions, practice concise answers, and check whether your examples demonstrate the skills the company is asking for. It can help you rehearse how to explain your experience clearly when you have limited time and no human interviewer reacting to your answer. Preparation should not turn your responses into a performance written by a machine. The examples, decisions, and lessons need to come from your actual experience. AI can help you structure your answer. It cannot replace your judgment, your communication style, or the credibility that comes from speaking about work you genuinely did."], ["Research the people behind the opportunity", "A job search is not only about submitting applications. It is also about understanding the people and teams connected to the role. AI can help organize publicly available information about hiring managers, design leaders, recruiters, former employees, and people working in similar positions. It can help you identify possible connections and prepare relevant questions before reaching out. Do not automate hundreds of connection requests or send generic messages at scale. Use AI to support your research and prepare a message, but review and send it yourself. A strong message should be specific, respectful, and connected to something real about the person, the company, or the role."], ["Use every advantage available to you", "The hiring process is becoming more automated, but candidates do not have to approach it manually. AI can help you monitor opportunities, understand market changes, adapt your CV, prepare for assessments, research companies, and organize professional conversations. The strategy still belongs to you. Use AI to make your experience easier to understand, not to misrepresent it. Use it to move faster, not to become less thoughtful. Use it to create better opportunities for human conversations, not to avoid them. The goal is not to apply everywhere. The goal is to understand the market better, communicate your value more clearly, and focus your energy on the opportunities and relationships that matter most."]] },
  "ai-fatigue-cognitive-load": { hideCover: true, date: "November 1, 2026", cover: { src: "/blog/ai-fatigue-cognitive-load.jpg", alt: "A woman reviewing several AI-generated decision cards on a laptop against a purple background." }, type: "Article", time: "7 min", title: "AI Fatigue: When Easier Thinking Creates More Mental Work", intro: "AI can make work faster while quietly increasing the number of decisions people must make. This article explores AI fatigue, cognitive overload, and how better human-AI design can protect attention and judgment.", sections: [["The hidden workload of AI", "AI does not remove cognitive work. In many cases, it changes the type of cognitive work people perform. Instead of creating one initial draft, the user evaluates several drafts. Instead of searching for one answer, the user compares multiple plausible answers. Instead of completing one task, the user manages prompts, revisions, approvals, and corrections. The work becomes less about producing an output and more about supervising a system."], ["What AI fatigue means", "AI fatigue is more than screen fatigue. It can include cognitive overload, emotional strain, physical exhaustion, and disengagement from the activity itself. It may occur when people interact with AI for extended periods, manage several AI tools, or remain responsible for monitoring systems whose outputs are uncertain. A person may complete more tasks and still finish the day feeling mentally depleted."], ["The oversight problem", "AI outputs often appear more complete than they really are. A fluent answer can create a sense of progress before the user has evaluated whether it is correct. When a system reduces the visible effort required to produce an answer, users may also reduce the effort they invest in questioning it. The design of the system influences the quality of human judgment."], ["Productivity without recovery", "AI makes it easier to continue working: there is always another draft to improve, another option to explore, or another question to ask. The traditional stopping points of a task can disappear. A more useful principle is to create recovery points between demanding work blocks. A break should provide distance from the task, not simply move the user from one stimulating digital activity to another."], ["Designing for cognitive sustainability", [{ list: ["How many decisions does the user need to make?", "How much checking is required before an output can be trusted?", "Does the system communicate uncertainty clearly?", "Does it help users understand why a recommendation was made?", "Does it give users a clear stopping point?", "Does it encourage reflection before action?"] }]], ["A better definition of efficiency", "AI efficiency should not be measured only by how quickly a task is completed. A more meaningful definition includes the quality of the decision, the amount of review required, the user’s ability to remain attentive, and the mental energy left after the work is finished. The best AI systems help people know what deserves attention, what can be delegated, when an output is uncertain, and when the work is complete. AI should reduce unnecessary effort without increasing the number of decisions humans must carry."], ["Sources", [{ list: ["[The Impact of Generative AI on Critical Thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/), Microsoft Research and Carnegie Mellon University", "[AI Fatigue in Human-AI Interaction](https://www.sciencedirect.com/science/article/pii/S2451958826002605)", "[Microbreaks and Well-Being: A Systematic Review and Meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC9432722/)", "[The Impact of Within-day Work Breaks on Daily Recovery Processes](https://doi.org/10.1111/joop.12246)"] }]]] },
  "ai-feature-changes-less": {"hideCover": true, "date": "October 30, 2026", "cover": {"src": "/blog/ai-feature-changes-less.jpg", "alt": "A laptop showing Before and After versions of the same design, where only the heading changed."}, "type": "Article", "time": "4 min", "title": "The best AI feature is the one that changes less", "intro": "You ask AI to shorten a heading. It changes the layout, rewrites the paragraph, and replaces an image you wanted to keep.", "sections": [["", ["The result might look polished. But now you have to check everything.", "This is one of the most frustrating experiences with AI design tools: asking for a specific adjustment and getting a reinterpretation of the whole thing.", "Sometimes, you already like what you have. You just need help with one detail.", "[Canva's announcement of Brush](https://www.canva.com/newsroom/news/canva-brush/) caught my attention for that reason. It describes a model that works with an existing design, understands its structure, and makes requested changes while keeping the elements editable. Canva also acknowledges something essential: the model needs to understand what should stay exactly as it is.", "Knowing what to preserve is part of understanding the request.", "Think about how we give feedback to another person. \"Can you make this heading shorter?\" carries an expectation about scope. We expect a shorter heading. If the person also changes the colors and moves the image, we have to stop and explain which decisions were already settled.", "With AI, that conversation can become a loop.", "You ask it to restore the image. It restores the image but changes the spacing. You fix the spacing, then notice that the wording has shifted again.", "Each correction becomes another opportunity for something else to move."]], ["The effort after the edit", ["The experience continues after the AI finishes generating.", "There is the moment when you compare versions. The uncertainty about whether something changed outside the area you were watching. The decision to keep going or return to an earlier version.", "That effort deserves more attention.", "A tool can complete an action quickly and still leave you with a slow review process. If you have to inspect the entire design after every request, it becomes difficult to work with confidence.", "Predictability matters: I should have a reasonable idea of what will happen when I ask for a change.", "That does not mean every action must be tiny. A request to update all headings could affect an entire presentation. The scope is broad, but the intention is clear.", "The frustration starts when the scope expands without your direction."]], ["Make the change understandable", ["A good editing experience should make it easy to answer three questions:", {"list": ["What changed?", "Does it match what I asked for?", "How do I get back to the previous version?"]}, "A clear comparison can help. So can a short summary, the ability to accept individual changes, and an undo action that restores the expected state.", "That information also needs to work beyond visual highlighting. Someone using a screen reader needs an accessible way to understand and review the result. [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) describes how status messages can announce action results without moving focus, while warning against excessive announcements that interrupt the experience.", "\"Three headings updated\" is a useful starting point. From there, the person should be able to inspect those headings and reverse the change."]], ["Confidence comes from repeated interactions", ["One impressive result can make someone try a tool. Consistent, understandable behavior gives them a reason to keep using it.", "When a tool respects the scope of a request, you learn how to work with it. You can make an adjustment, review it, and continue without wondering what else happened.", "That is the experience I want AI design tools to get better at.", "There is still plenty of room for bold exploration and unexpected ideas. But when I ask for a precise edit, precision is the experience."]]]},
  "design-speed-faster-at-what": {"hideCover": true, "date": "October 29, 2026", "cover": {"src": "/blog/design-speed-faster-at-what.jpg", "alt": "A person working on a laptop showing a Figma canvas with app screens built from components and a 'Decide first' sticky note."}, "type": "Article", "time": "3 min", "title": "Revolut's Designers Got 3x Faster. Faster at What?", "intro": "Revolut's CEO says his designers got 3x faster by letting an LLM build with their design system. Designer Rasmus Andersson says \"designing fast\" isn't even a thing. I think the real question is what exactly got faster.", "sections": [["", ["The AI built the screens faster. That's real, and it's useful. But in my experience, building the screens was never the slow part of design."]], ["The slow part is deciding", ["In enterprise products, the time goes into decisions. What happens when the data is missing? Who is allowed to undo this action? What does a screen-reader user hear when the form fails? Answering those questions takes research, conversations and sometimes a few disagreements.", "Once those answers exist, the screens come quickly, with or without AI. So when a team says it designs 3x faster, I want to know: did the decisions get faster, or only the screens?"]], ["Fast screens without decisions multiply mistakes", ["If you speed up building but skip deciding, you don't save time. You move the problem later, and you make more of it.", "That happens because the AI builds from your design system. Every rule in the system gets repeated in every screen it produces, and so does every missing rule. If the system has no pattern for errors, empty states or accessibility, the AI will invent one, slightly differently each time, across a hundred screens. Then someone has to find and fix all of them.", "So the design system is no longer just a library. Once AI is building with it, it's doing the designing."]], ["How to make speed actually help", ["Speed is valuable when it comes after the decisions, not instead of them. Here's what I would do:", {"list": ["**Decide first, then build fast.** Measure how quickly the team reaches an answer it can trust, not how many screens it produces.", "**Put the decisions in the system.** Write the states, content rules and accessibility requirements next to the components, so the AI follows them instead of guessing.", "**Use the speed to test earlier.** A working prototype can be tested with a keyboard, a screen reader and zoom on day one. That's where faster building pays off: you find problems sooner, while they're cheap to fix."]}]], ["What \"fast\" should mean", ["Fast should mean getting to the right answer sooner. AI has made building cheap, which makes deciding well the most valuable part of a designer's job. That's also what designers should show when leadership asks about speed: not how many screens we made, but which decisions made all of them right."]]]},
  "ai-fail-design-problem": { hideCover: true, date: "October 28, 2026", cover: { src: "/blog/ai-fail-design-problem.jpg", alt: "Hands holding a phone showing an AI-written comment with an Output error message." }, "type": "Article", "time": "3 min", "title": "The Funniest AI Fail on LinkedIn Is Actually a Design Problem", "intro": "This week, an AI agent posted its own error message as a LinkedIn comment, under a real person's name, including the instruction it had been given: \"No em dash.\"", "sections": [["", ["People laughed, and so did I. Then the designer in me winced, because I've seen this in enterprise products. It usually happens inside a CRM or an HR portal, where nobody shares a screenshot and a customer just quietly loses trust. We call this an AI problem. I think it's a design problem."]], ["AI doesn't crash. It publishes the failure", ["Traditional software fails loudly: a spinner, a 500 page, a red banner. Agentic AI finishes the task with confidence and hands the failure to the world as if it were a success. We design the happy path in great detail. The unhappy path gets one line in the PRD: \"Handle errors gracefully.\""]], ["Three things I'd design differently", ["**1. A \"this will be said as you\" preview.**", "When an agent acts under a person's identity, show exactly what will go out and who will see it. Scale the friction to the stakes: a draft note can go straight through; a public comment under your name should pause.", "**2. Output validation as a visible state.**", "Check whether the output looks like an error, a prompt or system text. When it fails, show a clear, human state: \"Something went wrong writing this reply. Nothing was posted.\"", "**3. A clear trail of what the agent did.**", "Users should be able to answer \"what did my assistant do on my behalf today?\" in under ten seconds, so they can undo a mistake before it becomes an incident."]], ["This is also an accessibility issue", ["A screen-reader user may hear a confident, well-formed sentence with no cue that it's broken. Someone with a cognitive disability may not tell system text from human text. So the WCAG basics matter even more:", {"list": ["Errors are announced (live regions), not just shown.", "The language is plain and specific: what happened, what didn't happen, and what to do next.", "Reviewing and undoing work by keyboard and assistive tech, not only with a mouse hover."]}, "If your AI feature only fails safely for sighted mouse users, it doesn't fail safely."]], ["What this means for design careers", ["Companies don't need more people who can make an AI demo look beautiful. If you're building your portfolio, show one AI failure state you designed: the guardrail, the accessible error message, the undo. If you're hiring, ask candidates to walk you through how their product fails."]], ["The joke is the lesson", ["An instruction meant for a machine ended up in front of humans. Every AI product has a curtain like that, and our job is to decide, on purpose, what people see when it slips."]]]},
  "designing-ai-products": { type: "Featured guide", time: "12 min", title: "Designing AI products people can actually trust.", intro: "Trust is not a tooltip. It is the product experience that helps people understand what the system knows, where it is uncertain, and what they can do next.", sections: [["Start with the decision", "Design the moment where a person must decide whether to accept, edit, verify, or reject an AI suggestion. Make that decision legible before polishing the output."], ["Expose useful uncertainty", "Confidence should change the next action. Show what is stable, what needs review, and which evidence shaped the recommendation."], ["Keep human judgment in the loop", "The best AI workflows make human expertise faster and more visible. They do not hide responsibility behind an automated result."]] },
  "ai-discoverability": { type: "Article", time: "8 min", title: "AI discoverability for portfolio websites", intro: "A portfolio should be easy to scan, but also easy for search systems and AI assistants to understand accurately.", sections: [["Name the work clearly", "Use specific project titles, roles, outcomes, and technologies instead of relying on visual context alone."], ["Create evidence paths", "Connect short summaries to detailed case studies, measurable outcomes, and a clear contact path."], ["Write for retrieval", "Use meaningful headings, descriptive links, structured metadata, and language that matches how clients describe their problems."]] },
  "accessibility-checklist": { type: "Checklist", time: "10 min", title: "Accessibility checks I run before handoff", intro: "A practical review for keyboard access, content hierarchy, states, and assistive technology.", sections: [["Keyboard first", "Tab through every interactive element, check focus visibility, and make sure the order matches the visual flow."], ["Content hierarchy", "Use headings as navigation landmarks, label form controls, and make link text meaningful out of context."], ["States and feedback", "Design loading, error, success, disabled, and empty states with enough contrast and clear announcements."]] },
  "product-strategy": { type: "Guide", time: "10 min", title: "Product strategy that survives contact with reality", intro: "Good strategy connects customer evidence, constraints, and measurable outcomes without pretending uncertainty does not exist.", sections: [["Start with evidence", "Bring together interviews, behavior, support signals, and business constraints before defining the opportunity."], ["Make tradeoffs explicit", "A strategy becomes useful when it makes it clear what the team will not pursue yet and why."], ["Measure the change", "Choose an outcome that reflects customer value, then define leading signals that help the team learn quickly."]] },
  "design-systems": { type: "Essay", time: "9 min", title: "Design systems are a product, not a paint kit", intro: "A design system succeeds when people can adopt it, contribute to it, and trust it across the product—not just when the components look consistent.", sections: [["Design for adoption", "Make the right path the easy path with clear examples, accessible defaults, and documentation close to the code."], ["Govern the decisions", "Treat contribution, versioning, and deprecation as part of the system’s user experience."], ["Measure usefulness", "Look for reduced rework, faster delivery, stronger accessibility, and better product coherence."]] },
};

export function generateStaticParams() { return Object.keys(posts).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  const summary = BLOG_POSTS.find((item) => item.slug === slug);
  const published = summary?.published === true;
  const description = summary?.description ?? post.intro;
  const cover = summary?.cover ?? post.cover;
  const publishedAt = summary?.publishedAt;
  return buildMetadata({
    title: `${post.title} | Greddys Martinez`,
    description,
    path: `/blog/${slug}/`,
    image: cover?.src,
    imageAlt: cover?.alt ?? post.title,
    type: published ? "article" : "website",
    publishedTime: published && publishedAt ? `${publishedAt}T12:00:00.000Z` : undefined,
    noIndex: !published,
    keywords: [post.title, post.type, "AI product design", "UX design", "accessibility"],
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();
  const summary = BLOG_POSTS.find((item) => item.slug === slug);
  const published = summary?.published === true;
  const description = summary?.description ?? post.intro;
  const cover = summary?.cover ?? post.cover;
  const publishedAt = summary?.publishedAt ?? "2026-10-28";
  const articleSchema = published
    ? getArticleSchema({
        title: post.title,
        description,
        path: `/blog/${slug}/`,
        image: cover?.src,
        datePublished: `${publishedAt}T12:00:00.000Z`,
        keywords: [post.title, post.type, "AI product design", "UX design", "accessibility"],
      })
    : null;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${slug}/` },
  ]);
  const related = BLOG_POSTS.filter((item) => item.published && item.slug !== slug).slice(0, 2);
  return (
    <main className="min-h-screen bg-white text-[var(--ui-color-text-body)] lg:my-2 lg:mr-2 lg:overflow-clip lg:rounded-[28px] lg:border lg:border-[#e5eef7] lg:shadow-[0_10px_34px_rgba(14,41,81,0.06)]">
      {articleSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="mx-auto max-w-[1280px] px-6 pt-6 pb-10">
        <div className="flex items-center gap-3 text-sm text-[#5c5960]">
          <Link href={withBasePath("/blog")} className="hover:text-[var(--ui-color-brand-primary)]">Blog</Link>
          <span>/</span>
          <span className="text-[#141114]">{post.type}</span>
        </div>
        <article className="mt-12">
          <div className="mx-auto max-w-[720px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-[var(--ui-radius-pill)] bg-[var(--ui-color-brand-primary)] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">{post.type}</span>
              <span className="text-sm text-[#5c5960]">{post.date ?? "October 28, 2026"} · {post.time} read</span>
            </div>
            <h1 className="mt-7 max-w-[880px] text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-[#141114]">{post.title}</h1>
            <p className="mt-8 max-w-[760px] text-xl leading-8 text-[#5c5960]">{post.intro}</p>
          </div>
          {post.hideCover ? null : post.cover ? (
            <div className="relative mt-12 aspect-video overflow-hidden rounded-[18px] bg-[#aeb8c4]">
              <img src={withBasePath(post.cover.src)} alt={post.cover.alt} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="relative mt-12 flex h-[260px] items-center justify-center overflow-hidden rounded-[18px] bg-[#aeb8c4] md:h-[430px]">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#dbe2ea]">Article image · coming soon</span>
            </div>
          )}
          <div className="mx-auto mt-14 max-w-[720px] space-y-12">
            {post.sections.map(([heading, body], i) => (
              <section key={heading || i}>
                {heading ? <h2 className="text-3xl font-semibold tracking-[var(--ui-tracking-heading)] text-[#141114]">{heading}</h2> : null}
                {renderBody(body)}
              </section>
            ))}
            {related.length > 0 ? (
              <section className="border-t border-[#e5eef7] pt-12" aria-labelledby="related-articles-heading">
                <h2 id="related-articles-heading" className="text-3xl font-semibold tracking-[var(--ui-tracking-heading)] text-[#141114]">Related articles</h2>
                <ul className="mt-6 space-y-4">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={withBasePath(`/blog/${item.slug}`)} className="text-lg font-semibold text-[#0e2951] underline decoration-[#1183D0]/40 underline-offset-4 transition-colors hover:text-[#0E6FB4]">
                        {item.title}
                      </Link>
                      <p className="mt-1 text-base leading-7 text-[var(--ui-color-text-body)]">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
