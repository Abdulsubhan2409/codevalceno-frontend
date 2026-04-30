import ServicesSection from "@/components/sections/Services";
import CTABanner from "@/components/sections/CTABanner";
import MeshBackground from "@/components/effects/MeshBackground";
import Reveal from "@/components/effects/Reveal";

const ServicesPage = () => (
  <>
    <title>Services — CodeValceno</title>
    <meta name="description" content="Web, mobile, design, cloud, AI and ongoing support — CodeValceno's full service stack." />

    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40">
      <MeshBackground withGrid={false} />
      <div className="container relative z-10">
        <Reveal>
          <span className="label-eyebrow">Capabilities</span>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-hero md:text-6xl">
            Engineering as a <span className="text-gradient">strategic partner</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            We design, build, and scale digital products — from web platforms to mobile apps and AI integrations. Senior-level execution from day one, with long-term support after every launch.
          </p>
        </Reveal>
      </div>
    </section>

    <ServicesSection />
    <CTABanner />
  </>
);

export default ServicesPage;
