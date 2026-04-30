import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const cols = [
  {
    title: "Services",
    links: [
      { to: "/services", label: "Web Development" },
      { to: "/services", label: "Mobile Apps" },
      { to: "/services", label: "UI / UX Design" },
      { to: "/services", label: "Cloud & DevOps" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/projects", label: "Projects" },
      { to: "/contact", label: "Contact" },
      { to: "/services", label: "Pricing" },
    ],
  },
];

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/966564005383",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Gmail",
    href: "mailto:codevalceno@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="relative border-t border-border bg-surface">
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px"
      style={{ background: "linear-gradient(90deg, transparent, hsl(184 100% 50% / 0.6), transparent)" }}
    />
    <div className="container grid gap-12 py-16 md:grid-cols-4">
      <div className="md:col-span-2">
        <Link to="/" className="font-display text-2xl font-bold">
          <span>Code</span>
          <span className="text-primary" style={{ textShadow: "0 0 12px hsl(184 100% 50% / 0.6)" }}>
            Valceno
          </span>
        </Link>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          A boutique software studio building production-grade digital products for ambitious teams across
          the GCC and beyond.
        </p>
        <div className="mt-6 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Al Khobar, Saudi Arabia
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            codevalceno@gmail.com
          </div>
        </div>
      </div>

      {cols.map((col) => (
        <div key={col.title}>
          <h4 className="label-eyebrow mb-4">{col.title}</h4>
          <ul className="space-y-3">
            {col.links.map((l, i) => (
              <li key={i}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CodeValceno. Crafted with intention.
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/60 hover:text-primary hover:shadow-glow"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
