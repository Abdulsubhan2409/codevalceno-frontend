import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import WhyUs from "@/components/sections/WhyUs";
import CTABanner from "@/components/sections/CTABanner";

const Index = () => {
  return (
    <>
      {/* SEO */}
      <title>CodeValceno — Software Studio Building Digital Products That Scale</title>
      <meta
        name="description"
        content="CodeValceno is a Khobar-based software studio engineering web, mobile and cloud products for ambitious teams across the GCC and beyond."
      />
      <link rel="canonical" href="/" />

      <Hero />
      <Services />
      <Projects />
      <WhyUs />
      <CTABanner />
    </>
  );
};

export default Index;
