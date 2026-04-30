import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SNIPPETS = [
  `// codevalceno.ts
import { build } from '@valceno/core';

export const product = build({
  stack: ['React', 'Node', 'Flutter'],
  region: 'KSA + GCC',
  scale: 'global',
});

product.deploy().then(() =>
  console.log('🚀 shipped'));`,
  `// scaling.ts
const ship = async (idea: Idea) => {
  const design = await craft(idea);
  const code   = await build(design);
  const cloud  = await deploy(code);
  return cloud.url; // live in 24h
};

await ship({ name: 'your-product' });`,
];

const tokenize = (line: string): { text: string; cls: string }[] => {
  const tokens: { text: string; cls: string }[] = [];
  // very small tokenizer for demo highlighting
  const re = /(\/\/.*$)|('[^']*'|"[^"]*"|`[^`]*`)|\b(import|export|const|let|return|async|await|from|then|console|log)\b|\b([A-Za-z_][A-Za-z0-9_]*)(?=\()|(\{|\}|\[|\]|\(|\)|;|,|\.|=>|=)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m.index > last) tokens.push({ text: line.slice(last, m.index), cls: "text-foreground/85" });
    if (m[1]) tokens.push({ text: m[1], cls: "text-muted-foreground italic" });
    else if (m[2]) tokens.push({ text: m[2], cls: "text-tertiary" });
    else if (m[3]) tokens.push({ text: m[3], cls: "text-secondary font-medium" });
    else if (m[4]) tokens.push({ text: m[4], cls: "text-primary" });
    else if (m[5]) tokens.push({ text: m[5], cls: "text-muted-foreground" });
    last = re.lastIndex;
  }
  if (last < line.length) tokens.push({ text: line.slice(last), cls: "text-foreground/85" });
  return tokens;
};

const TypingCodeCard = () => {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  const snippet = SNIPPETS[snippetIdx];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (charIdx < snippet.length) {
        timeout = setTimeout(() => setCharIdx((c) => c + 1), 22 + Math.random() * 30);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 2400);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 1400);
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx((c) => c - 4), 18);
      } else {
        setSnippetIdx((i) => (i + 1) % SNIPPETS.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, phase, snippet]);

  const visible = snippet.slice(0, Math.max(0, charIdx));
  const lines = visible.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative w-full"
      style={{ perspective: 1200 }}
    >
      {/* Glow behind card */}
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl opacity-60 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="relative rounded-2xl border border-border bg-surface/90 backdrop-blur-xl shadow-card overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-elevated/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-destructive/80" />
          <span className="h-3 w-3 rounded-full bg-tertiary/80" />
          <span className="h-3 w-3 rounded-full bg-primary/80 shadow-[0_0_10px_hsl(184_100%_50%/0.6)]" />
          <span className="ml-3 text-xs font-mono text-muted-foreground">~/codevalceno/build.ts</span>
          <span className="ml-auto label-eyebrow text-[10px]">live</span>
        </div>

        {/* Code area */}
        <div className="relative px-5 py-5 font-mono text-[13px] leading-relaxed min-h-[300px]">
          {/* Line numbers */}
          <pre className="m-0 whitespace-pre">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground/40">
                  {i + 1}
                </span>
                <span className="flex-1">
                  {tokenize(line).map((tok, j) => (
                    <span key={j} className={tok.cls}>
                      {tok.text}
                    </span>
                  ))}
                  {i === lines.length - 1 && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary align-middle animate-blink" />
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingCodeCard;
