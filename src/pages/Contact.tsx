import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import MeshBackground from "@/components/effects/MeshBackground";
import Reveal from "@/components/effects/Reveal";
import { useToast } from "@/hooks/use-toast";

const API = "https://admin.codevalceno.com/api";

const projectTypes = ["Web Application", "Mobile App", "UI / UX Design", "Cloud & DevOps", "AI Integration", "Other"] as const;
const budgets = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k – $150k", "$150k+"] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  project_type: z.enum(projectTypes, { required_error: "Pick a project type" }),
  budget_range: z.enum(budgets, { required_error: "Pick a budget" }),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(4000),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-glow";

const ContactPage = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: "", email: "", company: "", phone: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`${API}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: values.full_name,
          email: values.email,
          company: values.company || "",
          phone: values.phone || "",
          project_type: values.project_type,
          budget_range: values.budget_range,
          message: values.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Couldn't send your message",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setSubmitted(true);
      reset();
      toast({
        title: "Message sent",
        description: "We'll get back to you within 24 hours.",
      });
    } catch {
      toast({
        title: "Connection error",
        description: "Could not reach the server. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40">
        <MeshBackground withGrid={false} />
        <div className="container relative z-10 max-w-3xl">
          <Reveal>
            <span className="label-eyebrow">Get in touch</span>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-hero md:text-6xl">
              {"Let's build something "}
              <span className="text-gradient">great</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Every great product starts with one conversation. Tell us where you are headed — we will engineer the way there.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="relative py-16 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_1fr]">

          {/* FORM */}
          <Reveal>
            <div className="relative rounded-2xl border border-border bg-surface p-8 md:p-10">
              <div
                aria-hidden
                className="absolute -inset-px rounded-2xl opacity-30"
                style={{
                  background: "linear-gradient(135deg, hsl(184 100% 50% / 0.4), transparent 40%, hsl(262 83% 58% / 0.3))",
                  filter: "blur(12px)",
                  zIndex: -1,
                }}
              />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary shadow-glow">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">Message received</h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Thanks for reaching out. A senior engineer will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-full border border-primary/40 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/10"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="label-eyebrow mb-2 block text-[11px]">Full name</label>
                      <input className={fieldClass} placeholder="Sara Al-Otaibi" {...register("full_name")} />
                      {errors.full_name && <p className="mt-1.5 text-xs text-destructive">{errors.full_name.message}</p>}
                    </div>
                    <div>
                      <label className="label-eyebrow mb-2 block text-[11px]">Email</label>
                      <input type="email" className={fieldClass} placeholder="you@company.com" {...register("email")} />
                      {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="label-eyebrow mb-2 block text-[11px]">Company (optional)</label>
                      <input className={fieldClass} placeholder="Acme Inc." {...register("company")} />
                    </div>
                    <div>
                      <label className="label-eyebrow mb-2 block text-[11px]">Phone (optional)</label>
                      <input className={fieldClass} placeholder="+966 5x xxx xxxx" {...register("phone")} />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="label-eyebrow mb-2 block text-[11px]">Project type</label>
                      <select className={fieldClass} defaultValue="" {...register("project_type")}>
                        <option value="" disabled>Select…</option>
                        {projectTypes.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.project_type && <p className="mt-1.5 text-xs text-destructive">{errors.project_type.message as string}</p>}
                    </div>
                    <div>
                      <label className="label-eyebrow mb-2 block text-[11px]">Budget range</label>
                      <select className={fieldClass} defaultValue="" {...register("budget_range")}>
                        <option value="" disabled>Select…</option>
                        {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.budget_range && <p className="mt-1.5 text-xs text-destructive">{errors.budget_range.message as string}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="label-eyebrow mb-2 block text-[11px]">Project details</label>
                    <textarea
                      rows={6}
                      className={fieldClass}
                      placeholder="Tell us about your product, goals, timeline…"
                      {...register("message")}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
                    style={{ boxShadow: "0 0 30px hsl(184 100% 50% / 0.4)" }}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                      <>Send message <Send className="h-4 w-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* INFO + MAP */}
          <Reveal delay={0.15}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-7">
                <h3 className="font-display text-2xl font-semibold">Visit our studio</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on the Eastern coast of Saudi Arabia.
                </p>

                <ul className="mt-6 space-y-1 text-sm">

                  <li className="flex items-start gap-3 rounded-xl px-2 py-2.5">
                    <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Al Khobar, Saudi Arabia</div>
                      <div className="text-muted-foreground">King Fahd Rd, Al Khobar 34429</div>
                    </div>
                  </li>

                  <li>
                    <a
                      href="mailto:codevalceno@gmail.com"
                      className="group flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-primary/5"
                    >
                      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium text-foreground group-hover:text-primary">
                          codevalceno@gmail.com
                          <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-medium text-red-400">
                            Gmail
                          </span>
                        </div>
                        <div className="text-muted-foreground">For project inquiries · click to email</div>
                      </div>
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">↗</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://wa.me/966564005383"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-primary/5"
                    >
                      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium text-foreground group-hover:text-primary">
                          +966 56 400 5383
                          <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-400">
                            WhatsApp
                          </span>
                        </div>
                        <div className="text-muted-foreground">Mon – Thu · click to chat</div>
                      </div>
                      <span className="mt-1 text-xs text-muted-foreground group-hover:text-primary">↗</span>
                    </a>
                  </li>

                  <li className="flex items-start gap-3 rounded-xl px-2 py-2.5">
                    <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">9:00 — 6:00 AST</div>
                      <div className="text-muted-foreground">Working hours (UTC+3)</div>
                    </div>
                  </li>

                </ul>
              </div>

              {/* MAP */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(184 100% 50%), transparent)" }}
                />
                <div className="aspect-[4/3] w-full">
                  <iframe
                    title="CodeValceno location — Al Khobar, Saudi Arabia"
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3577.3870024721436!2d50.20963667541786!3d26.281551377029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDE2JzUzLjYiTiA1MMKwMTInNDQuMCJF!5e0!3m2!1sen!2s!4v1777455631817!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.95)" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between border-t border-border px-5 py-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Live · Al Khobar
                  </div>
                  <a
                    href="https://maps.app.goo.gl/2c3JZc8efzQoLQNKA"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
