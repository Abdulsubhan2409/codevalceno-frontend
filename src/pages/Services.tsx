import { Helmet } from "react-helmet-async";
import ServicesSection from "@/components/sections/Services";
import CTABanner from "@/components/sections/CTABanner";
import MeshBackground from "@/components/effects/MeshBackground";
import Reveal from "@/components/effects/Reveal";

const ServicesPage = () => (
  <>
    <Helmet>
      <title>Services — CodeValceno</title>
      <meta name="description" content="Web, mobile, design, cloud, AI and ongoing support — CodeValceno's full service stack for ambitious teams." />
      <link rel="canonical" href="https://codevalceno.com/services" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Services — CodeValceno" />
      <meta property="og:description" content="Web, mobile, design, cloud, AI and ongoing support — CodeValceno's full service stack for ambitious teams." />
      <meta property="og:url" content="https://codevalceno.com/services" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://codevalceno.com/og-image.png" />
      <meta property="og:site_name" content="CodeValceno" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Services — CodeValceno" />
      <meta name="twitter:description" content="Web, mobile, design, cloud, AI and ongoing support — CodeValceno's full service stack for ambitious teams." />
      <meta name="twitter:image" content="https://codevalceno.com/og-image.png" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Software Development",
          "provider": {
            "@type": "Organization",
            "name": "CodeValceno",
            "url": "https://codevalceno.com"
          },
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Software Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Application Development" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI / UX Design" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud & DevOps" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Integration" } }
            ]
          }
        })}
      </script>
    </Helmet>

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