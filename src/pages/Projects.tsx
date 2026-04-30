import ProjectsSection from "@/components/sections/Projects";
import CTABanner from "@/components/sections/CTABanner";
import MeshBackground from "@/components/effects/MeshBackground";
import Reveal from "@/components/effects/Reveal";

const ProjectsPage = () => (
  <>
    <title>Projects — CodeValceno</title>
    <meta name="description" content="Selected work from CodeValceno across fintech, health, logistics, commerce and more." />

    <section className="relative overflow-hidden pt-32 pb-12 md:pt-40">
      <MeshBackground withGrid={false} />
      <div className="container relative z-10">
        <Reveal>
          <span className="label-eyebrow">Case studies</span>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-hero md:text-6xl">
            Built to <span className="text-gradient">ship.</span> Engineered to scale.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
           "Not concepts. Not mockups. Products that are live, growing, and trusted by real users."
          </p>
        </Reveal>
      </div>
    </section>

    <ProjectsSection />
    <CTABanner />
  </>
);

export default ProjectsPage;
