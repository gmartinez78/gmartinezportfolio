import { NextResponse } from "next/server";

const GITHUB_USERNAME = "gmartinez78";
const GITHUB_EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

type GitHubEvent = {
  type: string;
  repo?: {
    name?: string;
  };
  created_at?: string;
  payload?: {
    commits?: Array<{ sha?: string; message?: string }>;
    ref_type?: string;
    action?: string;
    pull_request?: {
      title?: string;
    };
    issue?: {
      title?: string;
    };
  };
};

type ActivityItem = {
  id: string;
  kind: "commit" | "pull_request" | "issue" | "release" | "repo" | "star";
  title: string;
  detail: string;
  repo: string;
  timestamp: string | null;
  url: string;
};

function mapEventToActivity(event: GitHubEvent, index: number): ActivityItem | null {
  const repo = event.repo?.name ?? GITHUB_USERNAME;
  const repoUrl = `https://github.com/${repo}`;
  const timestamp = event.created_at ?? null;

  if (event.type === "PushEvent") {
    const commit = event.payload?.commits?.[0];
    if (!commit?.message) {
      return null;
    }

    return {
      id: `${event.type}-${commit.sha ?? index}`,
      kind: "commit",
      title: commit.message,
      detail:
        event.payload?.commits && event.payload.commits.length > 1
          ? `${event.payload.commits.length} commits pushed`
          : "Pushed a commit",
      repo,
      timestamp,
      url: commit.sha ? `${repoUrl}/commit/${commit.sha}` : repoUrl,
    };
  }

  if (event.type === "PullRequestEvent") {
    const action = event.payload?.action ?? "Updated";
    const title = event.payload?.pull_request?.title ?? "Pull request";
    return {
      id: `${event.type}-${index}`,
      kind: "pull_request",
      title,
      detail: `${action.charAt(0).toUpperCase()}${action.slice(1)} a pull request`,
      repo,
      timestamp,
      url: repoUrl,
    };
  }

  if (event.type === "IssuesEvent") {
    const action = event.payload?.action ?? "Updated";
    const title = event.payload?.issue?.title ?? "Issue";
    return {
      id: `${event.type}-${index}`,
      kind: "issue",
      title,
      detail: `${action.charAt(0).toUpperCase()}${action.slice(1)} an issue`,
      repo,
      timestamp,
      url: repoUrl,
    };
  }

  if (event.type === "CreateEvent") {
    const refType = event.payload?.ref_type ?? "repository";
    return {
      id: `${event.type}-${index}`,
      kind: refType === "repository" ? "repo" : "release",
      title: `Created ${refType}`,
      detail: `New ${refType} activity on GitHub`,
      repo,
      timestamp,
      url: repoUrl,
    };
  }

  if (event.type === "WatchEvent") {
    return {
      id: `${event.type}-${index}`,
      kind: "star",
      title: "Starred a repository",
      detail: "Saved a repo for follow-up",
      repo,
      timestamp,
      url: repoUrl,
    };
  }

  return null;
}

export async function GET() {
  try {
    const response = await fetch(GITHUB_EVENTS_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "gmartinezportfolio",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return NextResponse.json({ items: [], username: GITHUB_USERNAME }, { status: 200 });
    }

    const events = (await response.json()) as GitHubEvent[];
    const items = events
      .map((event, index) => mapEventToActivity(event, index))
      .filter((item): item is ActivityItem => Boolean(item))
      .slice(0, 6);

    return NextResponse.json({
      items,
      username: GITHUB_USERNAME,
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
    });
  } catch {
    return NextResponse.json({
      items: [],
      username: GITHUB_USERNAME,
      profileUrl: `https://github.com/${GITHUB_USERNAME}`,
    });
  }
}
