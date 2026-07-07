/**
 * Estimate reading time for mixed Chinese/English markdown/MDX content.
 *
 * Chinese/CJK: ~350 chars/min (technical content reads slower than fiction)
 * English words: ~200 wpm
 * Code blocks: counted at ~100 tokens/min (slower to parse)
 *
 * Returns minutes (minimum 1).
 */
export function getReadingTime(content: string): number {
  if (!content) return 1;

  // Extract code blocks and count them separately
  const codeBlocks: string[] = [];
  const withoutCode = content.replace(
    /```[\s\S]*?```/g,
    match => {
      codeBlocks.push(match);
      return "";
    }
  );

  // Count CJK characters (Chinese, Japanese, Korean)
  const cjkMatch = withoutCode.match(
    /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uf900-\ufaff\uac00-\ud7af]/g
  );
  const cjkChars = cjkMatch ? cjkMatch.length : 0;

  // Count English words (sequences of latin letters, possibly with apostrophes/hyphens)
  const wordMatch = withoutCode.match(/[a-zA-Z]+(?:['-][a-zA-Z]+)*/g);
  const englishWords = wordMatch ? wordMatch.length : 0;

  // Count code: count meaningful tokens in code (words/identifiers/numbers)
  let codeTokens = 0;
  for (const block of codeBlocks) {
    const codeTokensMatch = block.match(/[a-zA-Z_][a-zA-Z0-9_]*|\d+/g);
    codeTokens += codeTokensMatch ? codeTokensMatch.length : 0;
  }

  // Calculate minutes
  const cjkMinutes = cjkChars / 350;
  const englishMinutes = englishWords / 200;
  const codeMinutes = codeTokens / 100;

  const totalMinutes = cjkMinutes + englishMinutes + codeMinutes;
  return Math.max(1, Math.round(totalMinutes));
}

/**
 * Format reading time for display in Chinese.
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "不到 1 分钟";
  if (minutes === 1) return "约 1 分钟";
  return `约 ${minutes} 分钟`;
}
