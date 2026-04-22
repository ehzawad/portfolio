import type { PortfolioContent } from "../types";

export const portfolioContent: PortfolioContent = {
  profile: {
    name: "ehzawad",
    role: "AI Engineer - Bengali language systems and agent tooling",
    location: "Dhaka",
    company: "Synesis IT",
    bio: "I build retrieval systems, Bengali language pipelines, computer vision services, GPU learning tracks, and practical agent tooling. This portfolio is generated from public authored GitHub work and keeps the emphasis on systems that can be inspected.",
    avatarUrl: "https://github.com/ehzawad.png",
    links: [
      { label: "GitHub", href: "https://github.com/ehzawad" },
      { label: "Site", href: "https://ehza.me" },
      { label: "Repo", href: "https://github.com/ehzawad/portfolio" },
    ],
    stats: [
      {
        label: "Public repos",
        value: "542",
        detail: "GitHub profile total",
      },
      {
        label: "Authored public",
        value: "188",
        detail: "Public, non-fork repositories",
      },
      {
        label: "Recent authored",
        value: "74",
        detail: "Updated since 2025",
      },
      {
        label: "AI-heavy repos",
        value: "49",
        detail: "LLM, agent, RAG, CV, or ML signal",
      },
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
        "Domain-grounded assistants, deterministic retrieval paths, FAISS experiments, and B2B chatbot architectures.",
    },
    {
      id: "tooling",
      label: "AI Dev Tooling",
      shortLabel: "Tooling",
      summary:
        "Codex and Claude collaboration skills, persistent session memory, prompt systems, and developer workflow utilities.",
    },
    {
      id: "language",
      label: "Bengali Language and Audio",
      shortLabel: "Language",
      summary:
        "Bengali Whisper conversion, SLM reranking benchmarks, EmbeddingGemma classifiers, ASR, and banking-domain evaluation.",
    },
    {
      id: "vision",
      label: "Computer Vision and OCR",
      shortLabel: "Vision",
      summary:
        "OCR APIs, Google Cloud Vision services, jersey-number recognition, uncertainty estimation, and visual model experiments.",
    },
    {
      id: "systems",
      label: "GPU and ML Systems",
      shortLabel: "Systems",
      summary:
        "CUDA, Triton, SLM optimization, embedding fine-tuning, and learning tracks that turn model work into repeatable systems.",
    },
    {
      id: "products",
      label: "Product Systems",
      shortLabel: "Product",
      summary:
        "Small production-shaped applications, task systems, media tools, resume processing, and practical web/API work.",
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
        "Production-grade agentic chatbot for B2B customer service with a banking reference implementation.",
      evidence:
        "Public authored repo described as a domain-agnostic core with banking implementation, pushed April 2026.",
      tags: ["agentic chatbot", "B2B", "banking", "Python"],
      impact: 96,
    },
    {
      id: "deterministic-b2b",
      title: "Deterministic / Non-Deterministic B2B Chatbot",
      repo: "deterministic-non-deterministic-LLAMA-faiss-qwen-b2b-chatbot-for-any-domain",
      url: "https://github.com/ehzawad/deterministic-non-deterministic-LLAMA-faiss-qwen-b2b-chatbot-for-any-domain",
      category: "agentic",
      language: "Python",
      year: "2026",
      description:
        "A long-form experimental stack around LLAMA, FAISS, Qwen, and domain-aware chatbot behavior.",
      evidence:
        "Public authored repo combining deterministic retrieval and generative behavior for any domain.",
      tags: ["LLAMA", "FAISS", "Qwen", "domain QA"],
      impact: 92,
    },
    {
      id: "mini-agentic-rag",
      title: "Mini Agentic RAG Domain QA",
      repo: "mini-agentic-RAG-domainkownledge-QA",
      url: "https://github.com/ehzawad/mini-agentic-RAG-domainkownledge-QA",
      category: "agentic",
      language: "Python",
      year: "2025",
      description:
        "Compact agentic RAG exploration for domain knowledge question answering.",
      evidence:
        "Public authored repo with a sizeable code footprint and recent RAG-focused naming signal.",
      tags: ["RAG", "domain knowledge", "QA", "agents"],
      impact: 86,
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
        "Lightweight LangGraph-oriented experimentation for agent flow structure.",
      evidence:
        "Public authored repo pushed December 2025, aligned with graph-based agent orchestration.",
      tags: ["LangGraph", "agent flow", "Python"],
      impact: 78,
    },
    {
      id: "codex-chronicle",
      title: "Codex Chronicle",
      repo: "codextotocodex",
      url: "https://github.com/ehzawad/codextotocodex",
      category: "tooling",
      language: "Python",
      year: "2026",
      description:
        "Persistent, searchable engineering chronicles for OpenAI Codex sessions.",
      evidence:
        "Public authored repo with Codex and GPT topics, pushed April 2026.",
      tags: ["Codex", "memory", "session history", "CLI"],
      impact: 98,
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
        "A Codex CLI skill that pipes context to Claude Code for a second opinion.",
      evidence:
        "Public authored repo with Claude Code and Codex skill topics, pushed April 2026.",
      tags: ["Claude Code", "Codex", "skills", "review"],
      impact: 94,
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
        "Claude Code skill that asks OpenAI Codex for review and delegation support.",
      evidence:
        "Public authored repo with one star and Claude/Codex skill positioning.",
      tags: ["multi-agent review", "CLI", "skills"],
      impact: 90,
    },
    {
      id: "system-prompt",
      title: "System Prompt",
      repo: "SystemPrompt",
      url: "https://github.com/ehzawad/SystemPrompt",
      category: "tooling",
      language: "Markdown",
      year: "2026",
      description:
        "Day-to-day prompt system for Claude and ChatGPT web UI workflows.",
      evidence:
        "Public authored repo updated April 2026 and used as a visible workflow artifact.",
      tags: ["prompting", "workflow", "LLM ops"],
      impact: 72,
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
        "Download and convert a Bengali Whisper Medium checkpoint to CTranslate2 for faster-whisper.",
      evidence:
        "Public authored repo specifically targeting Bengali ASR deployment efficiency.",
      tags: ["Bengali", "Whisper", "CTranslate2", "ASR"],
      impact: 95,
    },
    {
      id: "ec-faq-benchmark",
      title: "EC FAQ Bot Benchmark",
      repo: "ec-faq-bot-benchmark",
      url: "https://github.com/ehzawad/ec-faq-bot-benchmark",
      category: "language",
      language: "Benchmark",
      year: "2026",
      description:
        "SLM reranker benchmark across 7 models and 1,128 Bengali FAQ questions on a T4 GPU.",
      evidence:
        "Public authored benchmark repo with explicit model count, dataset size, and hardware signal.",
      tags: ["Bengali FAQ", "reranking", "T4", "SLM"],
      impact: 93,
    },
    {
      id: "land-service-classifier",
      title: "Land Service Classifier",
      repo: "land-service-classifier",
      url: "https://github.com/ehzawad/land-service-classifier",
      category: "language",
      language: "Python",
      year: "2025",
      description:
        "Classifier for Bengali land-service intents using EmbeddingGemma, logistic regression, and confusion-matrix utilities.",
      evidence:
        "Public authored repo with a precise description around intent classification and analysis.",
      tags: ["Bengali", "EmbeddingGemma", "classifier", "intent"],
      impact: 90,
    },
    {
      id: "fine-tune-gemma",
      title: "Gemma Embedding Triplets",
      repo: "fine-tune-triplets-gemma-embedding",
      url: "https://github.com/ehzawad/fine-tune-triplets-gemma-embedding",
      category: "language",
      language: "Python",
      year: "2025",
      description:
        "Fine-tuning experiments around triplet data for Gemma embedding models.",
      evidence:
        "Public authored repo with one star and embedding fine-tuning focus.",
      tags: ["Gemma", "embeddings", "fine-tuning"],
      impact: 84,
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
        "OCR API using Google Cloud Vision with caching and batch processing.",
      evidence:
        "Public authored repo with production-oriented OCR service description.",
      tags: ["OCR", "Google Cloud Vision", "batching", "cache"],
      impact: 89,
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
        "Jersey number recognition experiments with uncertainty estimation.",
      evidence:
        "Public authored computer vision repo pushed March 2026.",
      tags: ["computer vision", "uncertainty", "sports video"],
      impact: 86,
    },
    {
      id: "cuda-mastery",
      title: "CUDA Mastery Course",
      repo: "cuda-mastery-course",
      url: "https://github.com/ehzawad/cuda-mastery-course",
      category: "systems",
      language: "Cuda",
      year: "2026",
      description:
        "Self-contained CUDA course with 11 modules and 34 problems, from GPU basics to advanced parallel algorithms.",
      evidence:
        "Public authored course built for Tesla T4 and CUDA 12.8.",
      tags: ["CUDA", "GPU", "parallel algorithms", "T4"],
      impact: 91,
    },
    {
      id: "triton-vs-cuda",
      title: "Triton vs CUDA",
      repo: "triton-vs-cuda",
      url: "https://github.com/ehzawad/triton-vs-cuda",
      category: "systems",
      language: "Python",
      year: "2026",
      description:
        "GPU programming comparison: 30 lines of Python against 200 lines of CUDA C, with benchmarks.",
      evidence:
        "Public authored repo designed to make GPU tradeoffs concrete.",
      tags: ["Triton", "CUDA", "benchmarks", "GPU"],
      impact: 88,
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
        "Large-footprint model optimization work around Whisper performance and deployment.",
      evidence:
        "Public authored repo with a large code/data footprint and recent pushes.",
      tags: ["Whisper", "optimization", "deployment"],
      impact: 87,
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
        "Full-stack task management app built with Bun, React, SQLite, and JWT auth.",
      evidence:
        "Public authored full-stack app with a modern TypeScript and Bun stack.",
      tags: ["React", "Bun", "SQLite", "JWT"],
      impact: 80,
    },
    {
      id: "resume-pick",
      title: "Resume Pick",
      repo: "resume-pick",
      url: "https://github.com/ehzawad/resume-pick",
      category: "products",
      language: "Python",
      year: "2025",
      description:
        "Resume processing utility work, useful as a bridge between document automation and AI workflow tooling.",
      evidence:
        "Public authored Python repo with a sizeable footprint and recent update history.",
      tags: ["resume", "documents", "automation"],
      impact: 76,
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
        "SwiftUI macOS media player for local video files.",
      evidence:
        "Public authored Swift repo showing product UI work outside the AI stack.",
      tags: ["SwiftUI", "macOS", "media"],
      impact: 70,
    },
  ],
};
