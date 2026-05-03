import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import WhyUs from "@/components/sections/WhyUs";
import CTABanner from "@/components/sections/CTABanner";

const Index = () => {
  return (
    <>
      <Helmet>
       
        <title>CodeValceno — Software Studio Building Digital Products That Scale</title>
        <meta name="description" content="CodeValceno is a Khobar-based software studio engineering web, mobile and cloud products for ambitious teams across the GCC and beyond." />
        <link rel="canonical" href="https://codevalceno.com/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="CodeValceno — Software Studio Building Digital Products That Scale" />
        <meta property="og:description" content="CodeValceno is a Khobar-based software studio engineering web, mobile and cloud products for ambitious teams across the GCC and beyond." />
        <meta property="og:url" content="https://codevalceno.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codevalceno.com/og-image.png" />
        <meta property="og:site_name" content="CodeValceno" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CodeValceno — Software Studio Building Digital Products That Scale" />
        <meta name="twitter:description" content="CodeValceno is a Khobar-based software studio engineering web, mobile and cloud products for ambitious teams across the GCC and beyond." />
        <meta name="twitter:image" content="https://codevalceno.com/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CodeValceno",
            "url": "https://codevalceno.com",
            "logo": "https://codevalceno.com/favicon.svg",
            "description": "A senior software studio engineering web, mobile and cloud products for ambitious teams worldwide.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Al Khobar",
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

      <Hero />
      <Services />
      <Projects />
      <WhyUs />
      <CTABanner />
    </>
  );
};

export default Index;