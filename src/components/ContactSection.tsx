import { motion } from "framer-motion";

// Keep contact email configurable so we don't hard-code addresses in the repo.
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

const baseLinks = [
  { label: "GitHub", href: "https://github.com/aliasist" },
  { label: "aliasist.com", href: "https://www.aliasist.com" },
];

const links = contactEmail
  ? [...baseLinks, { label: "Email Me Here", href: `mailto:${contactEmail}` }]
  : baseLinks;

const ContactSection = () => {
  return (
    <section id="contact" className="py-28 px-6 bg-foreground text-background">
      <div className="max-w-5xl mx-auto">
        <div className="classified-divider mb-16 [&>span]:text-background/40 before:bg-background/10 after:bg-background/10">
          <span>Channel Open // Contact</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-electric mb-6">
  <span className="w-2 h-2 bg-electric rounded-full animate-pulse" />
  Get in touch.
</div>  {/* ← add this */}              
              <h2 className="text-3xl sm:text-4xl font-bold text-background mb-6 tracking-tight">
                Make contact.
              </h2>

              <p className="text-base text-background/60 leading-relaxed mb-10">
                <strong className="text-background font-semibold">
                  Open to collaborations, internships, and interesting problems in the field. 
                </strong>{" "}
                  I will keep this website updates as much as possible during my schedule. Mods reach out! reach out!
              </p>

              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-block px-8 py-3.5 bg-electric text-foreground font-mono text-xs uppercase tracking-[0.1em] rounded-sm hover:bg-electric/85 transition-all hover:-translate-y-0.5"
                >
                  Send a message ↗
                </a>
              ) : (
                <span className="inline-block px-8 py-3.5 bg-electric/10 text-electric/70 font-mono text-xs uppercase tracking-[0.1em] rounded-sm">
                  Email not configured
                </span>
              )}
            </div>

            {/* Right — links */}
            <div className="flex flex-col gap-0.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-6 py-5 bg-background/5 border border-background/10 hover:bg-electric/10 hover:border-electric/20 hover:text-electric transition-all font-mono text-sm text-background/70"
                >
                  <span>{link.label}</span>
                  <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
