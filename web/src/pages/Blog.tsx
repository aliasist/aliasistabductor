import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "@/content/blogPosts";

const Blog = () => {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background pt-28 px-6 pb-20"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Blog // Transmissions
          </h1>
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.1em] text-electric hover:text-electric/70 transition-colors"
          >
            Back to site
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0.5"
        >
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className="group bg-card border border-border p-7 hover:border-electric/30 transition-all hover:-translate-y-0.5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-electric">
                  {post.freq}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {post.dateLabel}
                </span>
              </div>

              <div className="mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground border border-border px-2 py-0.5">
                  {post.tag}
                </span>
              </div>

              <h2 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {post.readTime}
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-electric hover:text-electric/70 transition-colors"
                >
                  Read article ↗
                </Link>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
};

export default Blog;
