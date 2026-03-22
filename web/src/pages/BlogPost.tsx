import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogPostBySlug } from "@/content/blogPosts";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background pt-28 px-6 pb-20"
    >
      <article className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/blog"
            className="font-mono text-xs uppercase tracking-[0.1em] text-electric hover:text-electric/70 transition-colors"
          >
            Back to blog
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            {post.readTime}
          </span>
        </div>

        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-electric">
              {post.freq}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground border border-border px-2 py-0.5">
              {post.tag}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {post.dateLabel}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-base text-foreground/70 leading-relaxed">
            {post.excerpt}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="space-y-10"
        >
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] text-foreground/75 leading-7"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </article>
    </motion.main>
  );
};

export default BlogPost;
