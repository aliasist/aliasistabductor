import { motion } from "framer-motion";

const projects = [
  {
    name: "Aliaist-Files-Abductor",
    description:
      "A file organization and automation tool that abducts your messy directories and deposits them exactly where they belong. Built with a clean CLI interface and an alien theme that doesn't apologize for itself. Does the work. No questions asked.",
    tech: ["Python", "CLI", "File Automation"],
    github: "#",
    featured: true,
    status: "Active",
    icon: "🛸",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="classified-divider mb-16">
          <span>Artifacts // Projects</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 tracking-tight">
            Deployed tools.
          </h2>

          <div className="grid gap-0.5">
            {/* Featured project */}
            {projects.map((project) => (
              <div
                key={project.name}
                className="relative bg-foreground text-background p-8 sm:p-12 overflow-hidden group"
              >
                {/* Background icon */}
                <div className="absolute top-8 right-10 text-6xl opacity-10 select-none">
                  {project.icon}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-electric">
                    ● {project.status}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-background/30">
                    — Featured
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-background mb-4 font-mono tracking-tight">
                  {project.name}
                </h3>

                <p className="text-sm text-background/60 leading-relaxed mb-8 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-[11px] font-mono bg-background/10 text-background/70 border border-background/10 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    className="font-mono text-xs uppercase tracking-[0.1em] text-electric hover:text-electric/70 transition-colors flex items-center gap-1.5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub ↗
                  </a>
                </div>
              </div>
            ))}

            {/* Placeholders */}
            <div className="grid sm:grid-cols-2 gap-0.5">
              <div className="border border-dashed border-border p-10 flex flex-col items-center justify-center min-h-[160px] bg-card">
                <p className="font-mono text-xs text-muted-foreground tracking-[0.1em]">
                  // next_transmission_incoming
                </p>
              </div>
              <div className="border border-dashed border-border p-10 flex flex-col items-center justify-center min-h-[160px] bg-card">
                <p className="font-mono text-xs text-muted-foreground tracking-[0.1em]">
                  // signal_not_yet_acquired
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
