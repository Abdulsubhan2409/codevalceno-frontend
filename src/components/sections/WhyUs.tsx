import { Award, Globe2, Headphones } from "lucide-react";
import Reveal from "@/components/effects/Reveal";

const items = [
  {
    Icon: Award,
    title: "Premium Engineering",
    desc: "Senior-only team. Production code from day one — no juniors learning on your dime.",
  },
  {
    Icon: Globe2,
    title: "Global Delivery",
    desc: "Shipped products in 12+ countries across MENA, EU and the Americas.",
  },
  {
    Icon: Headphones,
    title: "Always-On Partnership",
    desc: "Direct Slack channel with the engineers building your product. No account managers.",
  },
];

const WhyUs = () => (
  <section className="relative py-24 md:py-32">
    <div className="container">
      <Reveal className="max-w-2xl">
        <span className="label-eyebrow">Why CodeValceno</span>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Built for teams that <span className="text-gradient">ship</span>.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {items.map(({ Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="group relative">
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:rotate-[-4deg]"
                style={{ boxShadow: "0 0 30px hsl(184 100% 50% / 0.18)" }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
