export type BlogPost = {
  slug: string;
  freq: string;
  tag: string;
  dateLabel: string;
  readTime: string;
  title: string;
  excerpt: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "aisec-debugging-ai",
    freq: "FREQ-001",
    tag: "AiSec",
    dateLabel: "Coming Soon",
    readTime: "6 min read",
    title: "AiSec, Debugging AI",
    excerpt:
      "The threat landscape is shifting. AI systems are not just targets anymore -- they are attack surfaces and amplification points.",
    sections: [
      {
        heading: "Why this matters now",
        body: [
          "A lot of teams still treat AI as a pure productivity layer. In practice, model behavior, prompt flow, and tool integrations can introduce entirely new failure modes.",
          "My focus is learning where reliability, security, and adversarial behavior intersect so systems fail safely instead of unpredictably.",
        ],
      },
      {
        heading: "Current learning goals",
        body: [
          "I am actively building small tools to test model boundaries, evaluate prompt resilience, and document defensive patterns.",
          "The aim is not hype. The aim is repeatable engineering habits for AI-enabled systems.",
        ],
      },
    ],
  },
  {
    slug: "building-for-uncertain-ai-future",
    freq: "FREQ-002",
    tag: "Projects",
    dateLabel: "Coming Soon",
    readTime: "4 min read",
    title: "Building for an uncertain AI future",
    excerpt:
      "If the platform shifts every quarter, the best strategy is resilient architecture and fast iteration.",
    sections: [
      {
        heading: "Design for change",
        body: [
          "Instead of overfitting to one model or one provider, I prefer modular components with clear interfaces and testable fallback behavior.",
          "That keeps projects adaptable when APIs, pricing, latency, or model quality changes.",
        ],
      },
      {
        heading: "Shipping as a learning loop",
        body: [
          "Small releases with measurable outcomes are more useful than giant rewrites.",
          "Each release should improve one concrete thing: reliability, UX, observability, or security posture.",
        ],
      },
    ],
  },
  {
    slug: "self-taught-to-cs-gap",
    freq: "FREQ-003",
    tag: "Career",
    dateLabel: "Coming Soon",
    readTime: "5 min read",
    title: "Self-taught to CS degree: the real gap",
    excerpt:
      "The gap is less about syntax and more about systems thinking, trade-offs, and formal problem framing.",
    sections: [
      {
        heading: "What changed for me",
        body: [
          "Early on, I optimized for getting features working. Formal study pushed me to reason about correctness, complexity, and maintainability.",
          "That shift improved both my debugging speed and my architectural decisions.",
        ],
      },
      {
        heading: "What I am optimizing next",
        body: [
          "I want portfolio projects that show depth: clear decisions, measurable outcomes, and security-aware implementation details.",
          "The long-term target remains AiSec-oriented engineering work.",
        ],
      },
    ],
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
