import { motion } from "framer-motion";

const skills = [
  "Python", "JavaScript", "HTML / CSS",
  "UI Design", "CLI Tools", "File Automation",
  "Security Research", "AiSec (Learning)",
];

const stats = [
  { num: "10+", label: "Years coding since childhood" },
  { num: "2×", label: "Languages — Python & JS" },
  { num: "1→", label: "Clear target: AiSec" },
  { num: "∞", label: "Problems left to solve" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="classified-divider mb-16">
          <span>Dossier // About</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 tracking-tight">
              Origin file.
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-foreground/70">
              <p>
                I've been poking at code since I was a kid —{" "}
                <strong className="text-foreground font-semibold">HTML, CSS</strong>, It's always been a passion of mine. It's been interesting with the advent of AI to see where the new wave of tech is heading. It's something I want to be a part of, and learn more about.  
              </p>
              <p>
                Now I'm studying{" "}
                <strong className="text-foreground font-semibold">Computer Information Systems</strong>{" "}
                Focusing on trending software. and developments. " "
                <strong className="text-foreground font-semibold">
                  Scripts and Tools for AI Development coming soon... 
                </strong>
                . Aliasist is where I build, experiment, and ship real tools while I
                work toward that.
              </p>
              <p>
                Python, JavaScript, CSS, and HTML.{" "}
                <strong className="text-foreground font-semibold">The obsession isn't.</strong>
              </p>
            </div>

            {/* Path badge */}
            <div className="mt-8 inline-flex items-center gap-2 bg-foreground text-electric font-mono text-xs px-4 py-2 tracking-[0.1em] uppercase">
              ◈ Path: CIS → CS → AiSec
            </div>

            {/* Skills */}
            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                // skill_set
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono bg-background text-foreground/70 border border-border rounded-sm hover:border-electric/40 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-0.5"
          >
            {stats.map((s) => (
              <div
                key={s.num}
                className="group bg-background border-l-2 border-transparent hover:border-electric px-8 py-7 transition-all hover:bg-card"
              >
                <div className="text-5xl font-bold tracking-tight text-foreground mb-1">
                  {s.num.includes("+") || s.num.includes("×") || s.num.includes("→") ? (
                    <>
                      {s.num.replace(/[+×→∞]/, "")}
                      <span className="text-electric">{s.num.match(/[+×→∞]/)?.[0]}</span>
                    </>
                  ) : (
                    <span>{s.num}</span>
                  )}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
