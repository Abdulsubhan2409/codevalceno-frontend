import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  CloudCog,
  Brain,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const services = [
  {
    Icon: Code2,
    title: "Web Development",
    desc: "Performant React, Next-class SPAs and SSR platforms engineered for SEO and conversion.",
    details:
      "We build production-grade web platforms using React, Next.js, TypeScript and modern edge runtimes. From marketing sites with perfect Core Web Vitals to complex SaaS dashboards with real-time data, every project is engineered for speed, SEO and conversion.",
    features: [
      "React, Next.js & TypeScript",
      "SSR, SSG & edge rendering",
      "Core Web Vitals optimization",
      "Headless CMS integration",
      "SEO & analytics built-in",
    ],
  },
  {
    Icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform Flutter and React Native apps that ship native performance to iOS and Android.",
    details:
      "Ship one codebase to iOS and Android without compromise. We use Flutter and React Native with native modules where it matters, plus full CI/CD pipelines for TestFlight and Play Store delivery.",
    features: [
      "Flutter & React Native",
      "Native iOS / Android modules",
      "Push notifications & deep links",
      "Offline-first architecture",
      "App Store & Play Store delivery",
    ],
  },
  {
    Icon: Palette,
    title: "UI / UX Design",
    desc: "Editorial product design systems with motion, accessibility and brand-grade polish.",
    details:
      "Design systems that scale with your product. We craft interfaces that feel editorial, perform on every device, meet WCAG accessibility standards and ship with motion that delights without distracting.",
    features: [
      "Design systems in Figma",
      "Brand identity & visual language",
      "Motion & micro-interactions",
      "WCAG accessibility audits",
      "User research & usability testing",
    ],
  },
  {
    Icon: CloudCog,
    title: "Cloud & DevOps",
    desc: "AWS, GCP and edge runtimes with CI/CD, observability and zero-downtime deploys.",
    details:
      "Production infrastructure that scales with confidence. We architect on AWS, GCP and edge platforms with infrastructure-as-code, automated CI/CD, monitoring and zero-downtime deployments built in.",
    features: [
      "AWS, GCP & Vercel/Cloudflare edge",
      "Terraform & infrastructure-as-code",
      "CI/CD pipelines (GitHub Actions)",
      "Observability & alerting",
      "Cost optimization & autoscaling",
    ],
  },
  {
    Icon: Brain,
    title: "AI Integration",
    desc: "Embed LLMs, RAG and agent workflows into your product with measurable ROI.",
    details:
      "Move beyond demos. We integrate LLMs, RAG pipelines and agent workflows into real products with evaluation, guardrails and cost controls — so AI features ship reliably and deliver measurable value.",
    features: [
      "GPT, Claude & Gemini integration",
      "RAG with vector databases",
      "Agent workflows & tool use",
      "Prompt evaluation & guardrails",
      "Cost & latency optimization",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Maintenance & Support",
    desc: "Long-term partnership: monitoring, security patches, A/B tests and continuous improvement.",
    details:
      "Launch is the start. Our retainer engagements cover proactive monitoring, security patches, performance tuning, A/B testing and a continuous roadmap of improvements driven by real user data.",
    features: [
      "24/7 uptime monitoring",
      "Security patches & dependency updates",
      "A/B testing & experimentation",
      "Performance tuning",
      "Quarterly roadmap reviews",
    ],
  },
];

const Services = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? services[openIdx] : null;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container">
        <Reveal className="max-w-2xl">
          <span className="label-eyebrow">What we do</span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Services engineered for{" "}
            <span className="text-gradient">production teams</span>.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Six core capabilities, one senior team. Every engagement ships with senior engineers,
            design partners and a roadmap.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", damping: 18, stiffness: 220 }}
                onClick={() => setOpenIdx(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenIdx(i);
                  }
                }}
                className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all hover:border-primary/50 focus:outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40"
                style={{ transition: "border-color .3s, box-shadow .3s" }}
              >
                {/* Top accent bar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px scale-x-0 bg-primary opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 20px hsl(184 100% 50% / 0.7)" }}
                />
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, hsl(184 100% 50% / 0.18), transparent 70%)" }}
                />

                <div className="relative">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all group-hover:scale-110"
                    style={{ boxShadow: "0 0 24px hsl(184 100% 50% / 0.18)" }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary opacity-70 transition-all group-hover:opacity-100">
                    Learn more
                    <span aria-hidden>→</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
          <DialogContent className="max-w-lg border-border bg-surface">
            {active && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary"
                      style={{ boxShadow: "0 0 24px hsl(184 100% 50% / 0.25)" }}
                    >
                      <active.Icon className="h-5 w-5" />
                    </div>
                    <DialogTitle className="font-display text-2xl">
                      {active.title}
                    </DialogTitle>
                  </div>
                  <DialogDescription className="pt-3 text-base leading-relaxed text-muted-foreground">
                    {active.details}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-2">
                  <div className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">
                    What's included
                  </div>
                  <ul className="space-y-2.5">
                    {active.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          style={{ boxShadow: "0 0 8px hsl(184 100% 50% / 0.8)" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Services;
