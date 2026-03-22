import { motion } from "framer-motion";
import appPreview from "@/assets/app.png";
const releaseTag = "%23v2.7.0";
const releaseBaseUrl = `https://github.com/aliasist/aliasistabductor/releases/download/${releaseTag}`;

const appImageFile = "Aliasist.Files.Abductor-2.7.0.AppImage";
const snapFile = "aliasist-files-abductor_2.7.0_amd64.snap";
const windowsExeFile = "Aliasist.Files.Abductor.Setup.2.7.0.exe";



const downloadLinks = {
  appImage: `${releaseBaseUrl}/${encodeURIComponent(appImageFile)}`,
  snap: `${releaseBaseUrl}/${snapFile}`,
  windowsExe: `${releaseBaseUrl}/${encodeURIComponent(windowsExeFile)}`,
};

const projects = [
  {
    name: "Aliaist-Files-Abductor",
    description:
      "A file organization and automation tool that abducts your messy directories and deposits them exactly where they belong. Built with a clean CLI interface and an alien theme that doesn't apologize for itself. Does the work. No questions asked.",
    tech: ["Python", "TypeScript", "MachineLearning", "File Automation"],
    github: `https://github.com/aliasist/aliasistabductor/releases/tag/${releaseTag}`,
    downloads: [
      { label: "AppImage", href: downloadLinks.appImage },
      { label: "snap", href: downloadLinks.snap },
      { label: "Windows EXE", href: downloadLinks.windowsExe },
    ],
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
<div className="mb-8 overflow-visible">
  <motion.img
    whileHover={{ scale: 1.02, rotate: -1 }}
    transition={{ type: "spring", stiffness: 300 }}
    src={appPreview}
    alt={`${project.name} preview`}
    className="w-full max-w-3xl rounded-md border border-background/10 shadow-lg cursor-pointer"
    loading="lazy"
  />
</div>

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

                <div className="flex gap-3 flex-wrap mt-6">
                  {project.downloads.map((d) => (
                    <a
                      key={d.label}
                      href={d.href}
                      className="font-mono text-xs uppercase tracking-[0.1em] text-electric hover:text-electric/70 transition-colors flex items-center gap-1.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download {d.label} ↧
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Placeholders */}
            <div className="grid sm:grid-cols-2 gap-0.5">
              <div className="border border-dashed border-border p-10 flex flex-col items-center justify-center min-h-[160px] bg-card">
                <p className="font-mono text-xs text-muted-foreground tracking-[0.1em]">
                  // projects_are_coming_soon
                </p>
              </div>
              <div className="border border-dashed border-border p-10 flex flex-col items-center justify-center min-h-[160px] bg-card">
                <p className="font-mono text-xs text-muted-foreground tracking-[0.1em]">
                  // they_will_be_deployed_here_and_on_GitHub
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
