import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

type Cat = "All" | "Web" | "Mobile" | "International" | "AI" | "Design";

interface Project {
  title: string;
  category: Exclude<Cat, "All">[];
  scope: string;
  desc: string;
  tags: string[];
  region: string;
}

const PROJECTS: Project[] = [
  {
    title: "GraceHold International",
    category: ["Web", "International"],
    scope: "Full Platform",
    desc: "Delivered a complete web solution for Grace Hold Consultancy, designed to present their advisory services to a global audience. The project included responsive UI design, structured service pages, and integrated contact forms — focused on credibility, clarity, and converting international visitors into clients.",
    tags: ["React", "Node.js", "MySQL"],
    region: "USA",
  },
  {
    title: "Kachehri Platform",
    category: ["Web"],
    scope: "Full Platform",
    desc: "A comprehensive legal information website connected to the Kachehri application, providing structured access to court-related resources and legal services. Built with a responsive, user-friendly interface to improve digital accessibility to legal awareness for both mobile and desktop users.",
    tags: ["React", "Node.js", "MySQL"],
    region: "Pakistan",
  },
  {
    title: "App 360",
    category: ["Mobile", "International"],
    scope: "iOS · Android",
    desc: "A feature-rich 360 photo booth app for iOS & Android that lets guests record and share slow-motion videos at live events. Supports 120fps/240fps recording, custom overlays, animated effects, branded music, and multi-device sync — compatible with any 360 spinner or rotating video booth platform.",
    tags: ["React Native", "FFmpeg", "Rest API"],
    region: "UK",
  },
  {
    title: "Math Fun",
    category: ["Mobile", "International"],
    scope: "iOS",
    desc: "Math Fun App is an exciting and interactive learning app for kids. It helps children practice time tables, multiplication, addition, subtraction, and other basic math questions in a fun way. The app also includes small games and quizzes to make learning enjoyable and improve problem-solving skills quickly.",
    tags: ["React Native", "Rest API"],
    region: "UK",
  },
  {
    title: "Share To Wear",
    category: ["Web"],
    scope: "Full Platform",
    desc: "Share to Wear is a trendy fashion e-commerce platform that offers a wide range of clothing and accessories. The website features a user-friendly interface, allowing customers to easily browse and purchase the latest fashion items. With secure payment options and efficient order processing, Share to Wear provides a seamless shopping experience for fashion enthusiasts.",
    tags: ["React", "Node.js", "MySQL"],
    region: "Pakistan",
  },
  {
    title: "CashBack Store",
    category: ["Web"],
    scope: "Full Platform",
    desc: "A full-featured cashback e-commerce platform where users earn rewards on every purchase. Built with a modern UI, product listings, user dashboard, and automated cashback tracking system.",
    tags: ["React", "Node.js", "Firebase"],
    region: "Pakistan",
  },
  {
    title: "Time Tables",
    category: ["Mobile", "International"],
    scope: "iOS",
    desc: "The Times Table Learning App makes learning multiplication simple and enjoyable. It's designed to help students strengthen their math skills, while giving parents and teachers a fun way to support learning through clear explanations and engaging practice activities.",
    tags: ["React Native", "Rest API"],
    region: "UK",
  },
  {
    title: "CloudSore Solutions",
    category: ["Web", "International"],
    scope: "Full Platform",
    desc: "A professional corporate technology website for a company offering accounting, IT, and software development services. Features dedicated service pages, TallyPrime sales and implementation information, and a structured layout designed to showcase expertise and attract new business clients seeking digital transformation.",
    tags: ["React", "Node.js", "MySQL"],
    region: "UAE",
  },
  {
    title: "Aqualux Land Dewatering",
    category: ["Web", "International"],
    scope: "Full Platform",
    desc: "A professional multi-page business website for a UAE-based dewatering and pump rental company. Built to present industrial services and equipment solutions to international clients, featuring WhatsApp integration for quick communication, contact forms for inquiries, and a fully responsive mobile-friendly design.",
    tags: ["React", "Node.js", "MySQL"],
    region: "UAE",
  },
  {
    title: "OCR Chat Assistant",
    category: ["Web", "AI"],
    scope: "Full Platform",
    desc: "An AI-powered OCR chat assistant that extracts text from chat screenshots and generates smart, emotion-based reply suggestions. Features 11 emotion tones (happy, formal, angry, witty & more), sentiment analysis, and Gemini API integration — with a clean frontend for editable extracted text and AI-generated replies.",
    tags: ["Python", "Tesseract OCR", "Gemini API", "Sentiment Analysis"],
    region: "Pakistan",
  },
  {
    title: "Rox AI Chatbot",
    category: ["Web", "AI"],
    scope: "Full Platform",
    desc: "An AI-powered chatbot built for Rox Jazz to handle customer queries around internet packages, pricing, and support services. Combines Flask, JavaScript, and AI integration to deliver a real-time, user-friendly conversational experience for telecom users.",
    tags: ["Flask", "JavaScript", "AI Integration"],
    region: "Pakistan",
  },
  {
    title: "Dental AI",
    category: ["Web", "AI"],
    scope: "Full Platform",
    desc: "A YOLOv8-powered dental disease detection system that identifies caries, cavities, and cracks from dental images. Features automated diagnosis reports with view, download, and delete options, full patient history analysis, and an integrated AI chatbot for a smooth and user-friendly clinical experience.",
    tags: ["YOLOv8", "Python", "AI", "Computer Vision"],
    region: "Pakistan",
  },
  {
    title: "Vilora AI",
    category: ["Web", "AI"],
    scope: "Full Platform",
    desc: "An intelligent personal assistant platform built to automate and simplify everyday workflows. Capable of scheduling, rescheduling, and managing meetings via natural language commands, along with trip planning and flight booking. Includes a smart email inbox, alarm system, reminder manager, finance tracker, and document organizer — all in one unified AI-powered interface.",
    tags: ["AI Integration", "React", "Node.js", "NLP"],
    region: "Pakistan",
  },
  {
    title: "Ask Islam",
    category: ["Mobile", "Design"],
    scope: "UI · UX Design",
    desc: "A comprehensive Islamic lifestyle app UI/UX design featuring Ayah of the Day, Quran reader, Qiblah compass, Namaz tracker, Tasbeeh counter, AI-powered Islamic Q&A, and Daily Inspiration — wrapped in a modern elegant interface with soul progress tracking and streak motivation system.",
    tags: ["Figma", "UI Design", "UX Design", "Prototyping"],
    region: "Pakistan",
  },
  {
  title: "IMS Dashboard",
  category: ["Web", "Design"],
  scope: "UI · UX Design",
  desc: "A comprehensive Inventory Management System UI/UX design featuring a real-time analytics dashboard, vendor performance tracking, stock depletion timeline, item category health metrics, purchase request & approval forms, and an item master list. Designed with a clean professional interface for seamless inventory monitoring and business operations.",
  tags: ["Figma", "UI Design", "UX Design", "Dashboard", "Prototyping"],
  region: "Pakistan",
},
{
  title: "HRMS System",
  category: ["Web", "Design"],
  scope: "UI · UX Design",
  desc: "A full-featured Human Resource Management System UI/UX design covering employee management, attendance & leave tracking, procurement approval workflows, and operational reporting. Built with a structured, data-driven interface to streamline HR operations and improve internal business efficiency.",
  tags: ["Figma", "UI Design", "UX Design", "Dashboard", "Prototyping"],
  region: "Pakistan",
},
];

const tabs: Cat[] = ["All", "Web", "Mobile", "International", "AI", "Design"];

const Projects = () => {
  const [active, setActive] = useState<Cat>("All");

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.includes(active));

  return (
    <section id="projects" className="relative bg-surface py-24 md:py-32">
      <div className="container">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="label-eyebrow">Selected work</span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Projects we're <span className="text-gradient">proud of</span>.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A selection of recent engagements — from regional fintechs to global logistics platforms.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  active === t
                    ? "border-primary bg-primary/10 text-primary shadow-glow"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all hover:border-primary/50 hover:shadow-glow"
              >
                {/* Left accent bar */}
                <span
                  aria-hidden
                  className="absolute inset-y-6 left-0 w-1 origin-bottom scale-y-50 rounded-full bg-gradient-to-b from-primary to-secondary opacity-60 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 18px hsl(184 100% 50% / 0.6)" }}
                />

                <div className="flex flex-wrap items-center gap-2">
                  {p.category.map((cat) => (
                    <span
                      key={cat}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                        cat === "AI"
                          ? "border-purple-400/40 bg-purple-400/10 text-purple-400"
                          : cat === "Design"
                          ? "border-pink-400/40 bg-pink-400/10 text-pink-400"
                          : "border-primary/40 bg-primary/10 text-primary"
                      )}
                    >
                      {cat}
                    </span>
                  ))}
                  <span className="rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                    {p.scope}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">{p.region}</span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold transition-colors group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;