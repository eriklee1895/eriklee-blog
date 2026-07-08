/**
 * Slugify a string for URLs (Chinese posts keep their characters; latin gets slugified).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Estimate reading time for mixed Chinese/English content.
 * CJK: ~380 chars/min, English: ~220 wpm, code: ~120 tokens/min.
 */
export function getReadingTime(content: string): number {
  if (!content) return 1;

  const codeBlocks: string[] = [];
  const withoutCode = content.replace(/```[\s\S]*?```/g, m => {
    codeBlocks.push(m);
    return "";
  });

  const cjk = withoutCode.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g)?.length ?? 0;
  const en = withoutCode.match(/[a-zA-Z]+(?:['-][a-zA-Z]+)*/g)?.length ?? 0;

  let codeTokens = 0;
  for (const block of codeBlocks) {
    codeTokens += block.match(/[a-zA-Z_][a-zA-Z0-9_]*|\d+/g)?.length ?? 0;
  }

  const minutes = cjk / 380 + en / 220 + codeTokens / 120;
  return Math.max(1, Math.round(minutes));
}

export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? "1 分钟阅读" : `${minutes} 分钟阅读`;
}

/**
 * Format a date in Chinese locale.
 */
export function formatDate(date: Date, locale = "zh-CN"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  });
}

/**
 * Taxonomy label translations.
 */
const TAXONOMY_LABELS: Record<string, Record<string, string>> = {
  category: {
    "AI Engineering": "AI 工程",
    "AI Frontier": "AI 前沿",
    "Web & AI Tooling": "Web 与 AI 工具链",
    "Culture & Media": "文化与媒介",
    "Writing System": "写作系统",
  },
  series: {
    "Claude Code Notes": "Claude Code 笔记",
    "Codex Notes": "Codex 笔记",
    "CopilotKit Notes": "CopilotKit 笔记",
    "Hermes Notes": "Hermes 笔记",
    "TanStack Notes": "TanStack 笔记",
  },
};

export function taxonomyLabel(kind: "category" | "series", value: string): string {
  return TAXONOMY_LABELS[kind]?.[value] ?? value;
}
