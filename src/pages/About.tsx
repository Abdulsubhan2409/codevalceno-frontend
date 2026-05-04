import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Compass, Layers, Rocket, Heart } from "lucide-react";
import MeshBackground from "@/components/effects/MeshBackground";
import Reveal from "@/components/effects/Reveal";
import CountUp from "@/components/effects/CountUp";
import CTABanner from "@/components/sections/CTABanner";

const values = [
  { Icon: Compass, title: "Direction over speed", desc: "We choose the right thing to build before we ask how fast." },
  { Icon: Layers, title: "Craft at every layer", desc: "From pixels to packets — quality is non-negotiable." },
  { Icon: Rocket, title: "Ship to learn", desc: "Real users tell better stories than any roadmap." },
  { Icon: Heart, title: "Long-term partners", desc: "We optimize for relationships, not transactions." },
];

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Us — CodeValceno</title>
      <meta name="description" content="A senior software studio building durable digital products from Al Khobar, Saudi Arabia. 50+ launches, 12+ countries, 5+ years." />
      <link rel="canonical" href="https://codevalceno.com/about" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="About Us — CodeValceno" />
      <meta property="og:description" content="A senior software studio building durable digital products from Al Khobar, Saudi Arabia. 50+ launches, 12+ countries, 5+ years." />
      <meta property="og:url" content="https://codevalceno.com/about" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://codevalceno.com/og-image.png" />
      <meta property="og:site_name" content="CodeValceno" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Us — CodeValceno" />
      <meta name="twitter:description" content="A senior software studio building durable digital products from Al Khobar, Saudi Arabia. 50+ launches, 12+ countries, 5+ years." />
      <meta name="twitter:image" content="https://codevalceno.com/og-image.png" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CodeValceno",
          "url": "https://codevalceno.com",
          "logo": "https://codevalceno.com/favicon.svg",
          "description": "A senior software studio building durable digital products from Al Khobar, Saudi Arabia.",
          "foundingDate": "2021",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "King Fahd Rd",
            "addressLocality": "Al Khobar",
            "postalCode": "34429",
            "addressCountry": "SA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966-56-400-5383",
            "contactType": "customer service",
            "availableLanguage": ["English", "Arabic"]
          }
        })}
      </script>
    </Helmet>

    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <MeshBackground />
      <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="label-eyebrow">Our story</span>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-hero md:text-6xl">
            A studio for <span className="text-gradient">enduring</span> software.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We started CodeValceno with one belief: ambitious teams deserve engineering partners who care
            as much about the product as they do. Five years and 50+ launches later, we still operate as
            a small senior team — every line of code touched by people who've done this for a decade.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Headquartered in Al Khobar, KSA — building globally.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl opacity-50 blur-3xl"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div className="relative grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-xl">
              {[
                { v: 50, suf: "+", l: "Projects" },
                { v: 6, suf: "+", l: "Countries" },
                { v: 5, suf: "+", l: "Years" },
                { v: 98, suf: "%", l: "Retention" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-border bg-background/60 p-5"
                >
                  <div className="font-display text-4xl font-bold">
                    <CountUp to={s.v} suffix={s.suf} className="text-gradient" />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="bg-surface py-24 md:py-32">
      <div className="container">
        <Reveal className="max-w-2xl">
          <span className="label-eyebrow">What we believe</span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Four principles, <span className="text-gradient">applied daily</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl border border-border bg-background p-7 transition-all hover:border-primary/50 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <CTABanner />
  </>
);

export default AboutPage;