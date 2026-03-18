import { motion } from "framer-motion";

const posts = [
  {
    freq: "FREQ-001",
    tag: "AiSec",
    date: "Coming Soon",
    title: "What adversarial AI actually means — and why it matters now",
    excerpt:
      "The threat landscape is shifting. AI systems aren't just targets anymore — they're vectors. Here's what I'm learning about the field I'm building toward.",
  },
  {
    freq: "FREQ-002",
    tag: "Projects",
    date: "Coming Soon",
    title: "Building Aliaist-Files-Abductor: why I made a tool nobody asked for",
    excerpt:
      "The best projects start with personal problems. Here's how a messy downloads folder turned into a CLI tool with an alien obsession.",
  },
  {
    freq: "FREQ-003",
    tag: "Career",
    date: "Coming Soon",
    title: "Self-taught to CS degree: what nobody tells you about the gap",
    excerpt:
      "The jump from teaching yourself to formal computer science isn't just about syntax. It's about unlearning some things and doubling down on others.",
  },
];

const TransmissionsSection = () => {
  return (
    <section id="transmissions" className="py-28 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="classified-divider mb-16">
          <span>Intercepts // Transmissions</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 tracking-tight">
            Transmissions.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {posts.map((post) => (
              <div
                key={post.title}
                className="group bg-background border border-border p-7 hover:border-electric/30 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-electric">
                    {post.freq}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {post.date}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground border border-border px-2 py-0.5">
                    {post.tag}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-foreground/55 leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-electric flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read transmission ↗
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransmissionsSection;
