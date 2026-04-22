import type { PortfolioContent } from "../types";

export const portfolioContent: PortfolioContent = {
  profile: {
    name: "ehzawad",
    role: "AI Engineer — Bengali language systems and agent tooling",
    location: "Dhaka",
    company: "Synesis IT",
    bio: "I build grounded AI systems: B2B chatbots with deterministic and generative paths, Bengali speech and retrieval pipelines, computer vision services, GPU model optimization, and developer tooling for agent workflows.",
    avatarUrl: "https://github.com/ehzawad.png",
    links: [
      { label: "GitHub", href: "https://github.com/ehzawad" },
      { label: "Site", href: "https://ehza.me" },
      { label: "Source", href: "https://github.com/ehzawad/portfolio" },
    ],
  },
  focusAreas: [
    "LLM application systems",
    "Bengali NLP and speech",
    "Computer vision and OCR",
    "Agent workflow tooling",
    "GPU and model optimization",
  ],
  categories: [
    {
      id: "agentic",
      label: "Applied Agents and RAG",
      shortLabel: "Agents",
      summary:
        "Domain-grounded assistants, deterministic retrieval, FAISS-backed search, and B2B chatbot architectures.",
    },
    {
      id: "tooling",
      label: "AI Dev Tooling",
      shortLabel: "Tooling",
      summary:
        "Codex and Claude Code collaboration skills, persistent session memory, and developer workflow utilities.",
    },
    {
      id: "language",
      label: "Bengali Language and Audio",
      shortLabel: "Language",
      summary:
        "Bengali Whisper conversion, SLM reranking benchmarks, and embedding fine-tuning for Bengali NLP.",
    },
    {
      id: "vision",
      label: "Computer Vision and OCR",
      shortLabel: "Vision",
      summary:
        "OCR APIs, Google Cloud Vision services, and jersey-number recognition with uncertainty estimation.",
    },
    {
      id: "systems",
      label: "GPU and ML Systems",
      shortLabel: "Systems",
      summary:
        "Whisper deployment, faster-whisper / CTranslate2, and low-level model optimization work.",
    },
    {
      id: "products",
      label: "Product Systems",
      shortLabel: "Product",
      summary:
        "Production-shaped applications for resumes, media, and everyday workflow.",
    },
  ],
  projects: [
    {
      id: "agentic-bank",
      title: "Agentic Bank",
      repo: "agentic-bank",
      url: "https://github.com/ehzawad/agentic-bank",
      category: "agentic",
      language: "Python",
      year: "2026",
      description:
        "Production-grade agentic chatbot for B2B customer service. Domain-agnostic core with a banking reference implementation.",
      tags: ["agentic chatbot", "B2B", "banking", "Python"],
    },
    {
      id: "deterministic-b2b",
      title: "Deterministic + Non-Deterministic B2B Chatbot",
      repo: "deterministic-non-deterministic-LLAMA-faiss-qwen-b2b-chatbot-for-any-domain",
      url: "https://github.com/ehzawad/deterministic-non-deterministic-LLAMA-faiss-qwen-b2b-chatbot-for-any-domain",
      category: "agentic",
      language: "Python",
      year: "2026",
      description:
        "Dual-model B2B pipeline: Qwen3-4B for intent routing, Llama 3.1 8B for naturalization. FAISS-backed FAQ retrieval and guardrails against hallucination and unchecked hedging.",
      tags: ["LLAMA", "Qwen", "FAISS", "guardrails"],
    },
    {
      id: "mini-agentic-rag",
      title: "Mini Agentic RAG",
      repo: "mini-agentic-RAG-domainkownledge-QA",
      url: "https://github.com/ehzawad/mini-agentic-RAG-domainkownledge-QA",
      category: "agentic",
      language: "Python",
      year: "2025",
      description:
        "Compact agentic RAG over NIST security PDFs. GPT-4o with a self-critic loop on top of FAISS similarity search and Azure OpenAI embeddings.",
      tags: ["RAG", "GPT-4o", "FAISS", "critic loop"],
    },
    {
      id: "slim-langgraph",
      title: "Slim LangGraph",
      repo: "slim-langgraph",
      url: "https://github.com/ehzawad/slim-langgraph",
      category: "agentic",
      language: "Python",
      year: "2025",
      description:
        "Trimmed LangGraph reading with a long-form technical report on typed channels, update strategies, and merging concurrent node state.",
      tags: ["LangGraph", "state machines", "architecture notes"],
    },
    {
      id: "claude-opinion",
      title: "Claude Opinion",
      repo: "claude-opinion",
      url: "https://github.com/ehzawad/claude-opinion",
      category: "tooling",
      language: "Python",
      year: "2026",
      description:
        "Codex CLI skill that pipes the current session to Claude Code for a read-only second opinion before shipping a change.",
      tags: ["Codex CLI", "Claude Code", "skill", "review"],
    },
    {
      id: "codex-opinion",
      title: "Codex Opinion",
      repo: "codex-opinion",
      url: "https://github.com/ehzawad/codex-opinion",
      category: "tooling",
      language: "Python",
      year: "2026",
      description:
        "Claude Code skill for the opposite direction — hand context to OpenAI Codex for a read-only review without changing the working tree.",
      tags: ["Claude Code", "Codex", "skill", "review"],
    },
    {
      id: "claudetalktoclaude",
      title: "Decision Chronicle",
      repo: "claudetalktoclaude",
      url: "https://github.com/ehzawad/claudetalktoclaude",
      category: "tooling",
      language: "Python",
      year: "2026",
      description:
        "Records the reasoning behind coding sessions — planning, trade-offs, rejected approaches — as durable searchable markdown. Foreground-first, zero passive token burn until you ask for a summary.",
      tags: ["Claude Code", "session memory", "CLI", "hooks"],
    },
    {
      id: "bengali-whisper",
      title: "Bengali Whisper",
      repo: "bengali-whisper",
      url: "https://github.com/ehzawad/bengali-whisper",
      category: "language",
      language: "Python",
      year: "2026",
      description:
        "Convert a Bengali Whisper Medium HF checkpoint (Kaggle or Hugging Face) into CTranslate2 format so faster-whisper can serve it.",
      tags: ["Bengali", "Whisper", "CTranslate2", "ASR"],
    },
    {
      id: "ec-faq-benchmark",
      title: "SLM Reranker Benchmark",
      repo: "ec-faq-bot-benchmark",
      url: "https://github.com/ehzawad/ec-faq-bot-benchmark",
      category: "language",
      language: "Benchmark",
      year: "2026",
      description:
        "Seven small-language-model rerankers compared across 1,128 Bengali FAQ questions on a single T4, with throughput and accuracy trade-offs spelled out.",
      tags: ["Bengali FAQ", "reranking", "T4", "SLM"],
    },
    {
      id: "fine-tune-gemma",
      title: "EmbeddingGemma Fine-Tune",
      repo: "fine-tune-triplets-gemma-embedding",
      url: "https://github.com/ehzawad/fine-tune-triplets-gemma-embedding",
      category: "language",
      language: "Python",
      year: "2025",
      description:
        "Fine-tuning EmbeddingGemma-300M with SBERT TripletLoss for Bengali land-service classification. 99.87% accuracy on four in-domain categories.",
      tags: ["EmbeddingGemma", "triplet loss", "Bengali", "embeddings"],
    },
    {
      id: "flexbone",
      title: "Flexbone OCR API",
      repo: "flexbone",
      url: "https://github.com/ehzawad/flexbone",
      category: "vision",
      language: "Python",
      year: "2025",
      description:
        "OCR service on top of Google Cloud Vision with batch processing and request-level caching for stable production throughput.",
      tags: ["OCR", "Google Cloud Vision", "batching", "cache"],
    },
    {
      id: "uncertainty-jnr",
      title: "Uncertainty JNR",
      repo: "uncertainty-jnr",
      url: "https://github.com/ehzawad/uncertainty-jnr",
      category: "vision",
      language: "Python",
      year: "2026",
      description:
        "Jersey number recognition in sports video with explicit uncertainty estimation, so low-confidence frames can be flagged rather than silently guessed.",
      tags: ["computer vision", "uncertainty", "sports video"],
    },
    {
      id: "whisper-optimization",
      title: "Whisper Model Optimization",
      repo: "whisper-model-optimization",
      url: "https://github.com/ehzawad/whisper-model-optimization",
      category: "systems",
      language: "Python",
      year: "2026",
      description:
        "Fine-tuned Whisper Medium for Bengali, converted to CTranslate2 and served through faster-whisper with configurable compute types, beam size, and VAD filtering.",
      tags: ["Whisper", "faster-whisper", "Bengali", "deployment"],
    },
    {
      id: "teamagents",
      title: "Teamagents",
      repo: "teamagents",
      url: "https://github.com/ehzawad/teamagents",
      category: "products",
      language: "TypeScript",
      year: "2026",
      description:
        "Full-stack task manager on Bun + React + SQLite with JWT auth — a deliberate exercise in shipping a complete vertical slice outside the AI stack.",
      tags: ["Bun", "React", "SQLite", "JWT"],
    },
    {
      id: "resume-pick",
      title: "Resume Sorting Agent System",
      repo: "resume-pick",
      url: "https://github.com/ehzawad/resume-pick",
      category: "products",
      language: "Python",
      year: "2025",
      description:
        "RSAS — full agentic resume pipeline on the OpenAI Responses API: PDF parsing, matching, scoring, bias checks, and a Chroma-backed candidate knowledge base.",
      tags: ["OpenAI Responses", "ranking", "Chroma", "Typer CLI"],
    },
    {
      id: "tahoe-player",
      title: "Tahoe Player",
      repo: "tahoe-player",
      url: "https://github.com/ehzawad/tahoe-player",
      category: "products",
      language: "Swift",
      year: "2026",
      description:
        "SwiftUI macOS media player for local video files — built to stay out of the way while watching.",
      tags: ["SwiftUI", "macOS", "media"],
    },
  ],
};
