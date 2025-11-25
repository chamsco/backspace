import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const blogPosts: Record<string, {
  title: string;
  date: string;
  category: string;
  content: string;
}> = {
  'building-rag-systems': {
    title: 'Building Production RAG Systems',
    date: '2024-12-15',
    category: 'Engineering',
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-8">
        Retrieval-Augmented Generation (RAG) has become the de facto standard for building AI applications that need access to private or domain-specific knowledge. But building RAG systems that work reliably in production is harder than it looks.
      </p>
      
      <h2 class="text-3xl font-medium mb-6 mt-12">The Foundation: Data Quality</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-6">
        The most common mistake teams make is underestimating the importance of data quality. Your RAG system is only as good as your retrieval pipeline. We've seen teams spend weeks fine-tuning embeddings and prompt engineering, only to realize their source documents were poorly structured or incomplete.
      </p>
      
      <h2 class="text-3xl font-medium mb-6 mt-12">Chunking Strategy Matters</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-6">
        There's no one-size-fits-all chunking strategy. Technical documentation benefits from larger chunks (512-1024 tokens), while conversational data works better with smaller, overlapping chunks. Always test your chunking strategy with real queries.
      </p>
      
      <h2 class="text-3xl font-medium mb-6 mt-12">Evaluation is Non-Negotiable</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-6">
        You can't improve what you don't measure. We use a combination of RAGAS metrics, human evaluation, and A/B testing to continuously improve our systems. Set up evaluation early, not as an afterthought.
      </p>
    `
  },
  'ai-strategy-early-stage': {
    title: 'AI Strategy for Early-Stage Startups',
    date: '2024-11-20',
    category: 'Strategy',
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-8">
        Every startup wants to be "AI-first" these days. But what does that actually mean when you're resource-constrained and need to ship fast?
      </p>
      
      <h2 class="text-3xl font-medium mb-6 mt-12">Start with the Problem, Not the Model</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-6">
        Too many founders start with "We need to use GPT-4" instead of "What user problem are we solving?" Sometimes a simple rule-based system or fine-tuned small model is the right answer. Don't over-engineer.
      </p>
      
      <h2 class="text-3xl font-medium mb-6 mt-12">Build Data Moats Early</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-6">
        Models are becoming commodities. Your competitive advantage lies in your proprietary data and how you structure it. Start collecting and organizing data from day one, even if you're not using it yet.
      </p>
    `
  },
  'evaluation-frameworks': {
    title: 'Evaluation Frameworks for LLM Applications',
    date: '2024-10-10',
    category: 'Engineering',
    content: `
      <p class="text-xl text-gray-600 leading-relaxed mb-8">
        Evaluating LLM applications is fundamentally different from traditional software. You're dealing with probabilistic outputs, not deterministic results.
      </p>
      
      <h2 class="text-3xl font-medium mb-6 mt-12">LLM-as-a-Judge</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-6">
        Using a more powerful LLM to evaluate outputs from a smaller model is surprisingly effective. We use GPT-4 to evaluate GPT-3.5 outputs, which gives us consistent, scalable evaluation at a fraction of the cost of human evaluation.
      </p>
      
      <h2 class="text-3xl font-medium mb-6 mt-12">RAGAS for RAG Systems</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-6">
        RAGAS provides automated metrics for RAG systems: faithfulness, answer relevancy, context precision, and context recall. These metrics help you identify whether issues are in retrieval, generation, or both.
      </p>
    `
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <main className="pt-32 md:pt-48 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl font-medium mb-4">Post not found</h1>
        <Link to="/blog" className="text-lg text-gray-600 hover:text-black">
          ← Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500">
      <section className="px-6 md:px-12 lg:px-24 mb-16">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to blog
        </Link>
        
        <Reveal>
          <div className="mb-8">
            <span className="text-sm text-gray-400">{post.date}</span>
            <span className="text-sm text-gray-400 ml-2">·</span>
            <span className="text-sm text-gray-400 ml-2">{post.category}</span>
          </div>
          <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.1] font-medium tracking-tight max-w-5xl mb-8">
            {post.title}
          </h1>
        </Reveal>
      </section>

      <article className="px-6 md:px-12 lg:px-24 mb-32 max-w-3xl">
        <Reveal delay={0.2}>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Reveal>
      </article>
    </main>
  );
}

