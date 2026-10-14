# Social Growth Agent: implementation blueprint

The Social Growth Agent turns one podcast episode into channel-aware content, checks performance every morning, and helps turn attention into paid membership or products. It is designed to be autonomous about analysis and drafting, but approval-first for external publishing.

## What the agent does

| Cadence | Agent job | Output |
| --- | --- | --- |
| Daily, 08:30 | Pull the latest account metrics, compare them with the prior period, identify wins/risk, and suggest one action | A short briefing in the dashboard plus email/Slack/WhatsApp notification |
| Per episode | Read a transcript or episode notes, select themes, and create platform-specific content | Patreon member post, LinkedIn post, Instagram/TikTok/YouTube clip briefs, titles, descriptions, and CTA variants |
| Before publish | Show the proposed copy, assets, platform, schedule, and link destination | An approve / edit / reject decision; only approved items enter the scheduler |
| Weekly | Correlate formats, topics, post time, clicks, and memberships | A focused growth experiment and a monetization experiment |

## Product definition

The first version should have five small workflows rather than a vaguely “fully autonomous” bot:

1. **Metrics collector**: read account and referral data into a single canonical daily snapshot.
2. **Morning analyst**: summarize changes, explain likely drivers, and recommend one next action.
3. **Content repurposer**: transform a podcast transcript into distinctly written channel drafts. It should not copy a trending post or publish the same caption everywhere.
4. **Approval and publishing queue**: schedule, version, approve, and publish a draft. A human approval is required by default.
5. **Revenue strategist**: propose paid tier/product tests based on the content that brings the most qualified clicks and conversions.

## Safety boundary

The model can recommend and prepare. The application decides what actions are allowed.

- **Allowed automatically:** collecting approved metrics, trend research, draft generation, reporting, and scheduling drafts *after* a user approval.
- **Must request confirmation:** public posts, replies/comments, direct messages, paid-ad changes, deleting content, or changing a recurring subscription/offer.
- **Never use browser automation with saved credentials** when an official API, OAuth authorization, or a manual approval route exists.
- Store social OAuth tokens encrypted server-side. Do not send them to the model or place them in `NEXT_PUBLIC_*` variables.

## Data model

Use Supabase/Postgres for the agent’s durable memory:

```text
social_accounts(id, platform, external_account_id, display_name, token_ref, connected_at, scopes)
metric_snapshots(id, account_id, metric_date, metric_name, value, source_payload)
episodes(id, title, published_at, transcript_url, themes, canonical_url)
content_drafts(id, episode_id, platform, format, body, asset_brief, cta, scheduled_for, status, version)
approvals(id, draft_id, decision, editor_notes, approved_by, decided_at)
published_posts(id, draft_id, external_post_id, published_at, permalink)
trend_signals(id, platform, source_url, summary, relevance_score, captured_at)
experiments(id, hypothesis, success_metric, status, result, started_at, ended_at)
```

Use `metric_snapshots` for the source-of-truth numbers. Give the language model only the relevant, aggregated views—not broad database access.

## Tools the agent needs

Define narrowly scoped application functions. Each one validates ownership and returns structured data.

```text
get_metrics(account_ids, date_range, metric_names)       # read-only
get_episode_context(episode_id)                          # read-only
research_trends(platform, niche, region, date_range)     # read-only, cite source URLs
create_draft(episode_id, platform, brief)                # creates draft only
list_pending_approvals()                                 # read-only
schedule_approved_post(draft_id, scheduled_for)          # requires approval record
publish_approved_post(draft_id)                          # requires approval record + platform connection
record_experiment(hypothesis, metric, duration)           # internal write
```

The `publish_approved_post` function must independently verify the latest approval record, the account/platform match, and the scheduled time. Do not trust an agent’s claimed approval.

## Connection plan

Start with the best data/API path available for each platform, and gracefully support “manual import” where an API cannot provide all required data.

| Platform | First capability | Later capability |
| --- | --- | --- |
| Patreon | Membership and post performance | Create/schedule member posts, if the authorized API scope supports it |
| YouTube | Video/channel analytics and traffic sources | Upload metadata, descriptions, community posts where supported |
| Instagram | Professional-account Insights | Publish approved feed/reel content through Meta’s official APIs |
| LinkedIn | Organization/page analytics | Create approved organization posts; personal-profile publishing availability must be verified for the user’s access level |
| TikTok | Business analytics | Publish approved content only through its official, authorized publishing flow |

For website traffic, add GA4 and use UTM parameters per post (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`). This makes “which social channel is growing the podcast?” answerable instead of guessed.

## Architecture

```text
Platform APIs + GA4 + podcast transcript
              ↓
          Scheduled collectors
              ↓
       Supabase/Postgres snapshots
              ↓
      Agent tools + brand/offer context
              ↓
 Morning briefing / content drafts / experiment proposal
              ↓
          Human approval queue
              ↓
       Official platform publishing APIs
```

The agent runner can use the OpenAI Agents SDK or the Responses API with application-defined function tools. Function tools allow the model to request a defined action, while the application runs it and returns a result. OpenAI’s guidance describes this as a multi-step loop: provide tools, receive a call, execute it on the application side, return the output, and receive the next response. [Function calling guide](https://developers.openai.com/api/docs/guides/function-calling)

For a custom dashboard such as this one, the Agents SDK is usually the clearest fit because it keeps the agent’s tools, storage, approvals, and deployment under application control. OpenAI’s runtime comparison distinguishes this from the managed Agents API, which is aimed at longer-running tasks where OpenAI manages more of the harness. [OpenAI Agents guide](https://developers.openai.com/api/docs/guides/agents)

## First 30-day test plan

1. Connect YouTube, Instagram, Patreon, GA4, and one platform at a time. Confirm that daily snapshot numbers match native dashboards before making recommendations.
2. Create a reusable episode intake: title, transcript, guest/topic, core promise, target listener, one CTA, and available assets.
3. Approve daily Patreon and LinkedIn drafts manually for two weeks. Save edits/rejections so the agent can learn a preferred voice, but keep approval mandatory.
4. Test one funnel: short clip → full episode → Patreon member post → one specific paid offer.
5. Judge success with retained Patreon members, qualified clicks, episode completion, and email/lead conversion—not vanity reach alone.

## What is included in the current site prototype

`/social-growth-agent` is an interactive product prototype: morning briefing, metric view, trend signals, approval queue, editable state transitions, and a monetization path. Its data is intentionally sample data; it does not connect to, publish to, or scrape any social account yet.
