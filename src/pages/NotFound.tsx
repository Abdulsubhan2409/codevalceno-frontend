import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MeshBackground from "@/components/effects/MeshBackground";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | CodeValceno</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
        <MeshBackground />
        <div className="container relative z-10 text-center">
          <div className="font-display text-[120px] font-bold leading-none md:text-[200px]">
            <span className="text-gradient-shimmer">404</span>
          </div>
          <p className="mt-2 font-display text-2xl font-semibold md:text-3xl">Page lost in the mesh</p>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The page you're looking for has drifted off the grid.
          </p>
          <Link
            to="/"
            className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            style={{ boxShadow: "0 0 30px hsl(184 100% 50% / 0.4)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;