import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const blogPosts: Record<string, {
  title: string;
  date: string;
  category: string;
  author: string;
  content: string;
}> = {
  'building-rag-systems': {
    title: 'Building Production RAG Systems',
    date: 'Oct 25, 2025',
    category: 'Engineering',
    author: 'Alex Chen',
    content: `
      <p class="text-lg leading-relaxed mb-6 first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
        Retrieval-Augmented Generation (RAG) has become the de facto standard for building AI applications that need access to private or domain-specific knowledge. But building RAG systems that work reliably in production is harder than it looks.
      </p>
      
      <h2 class="text-3xl serif font-bold mt-12 mb-4">The Foundation: Data Quality</h2>
      <p class="text-lg font-mono leading-relaxed mb-6">
        The most common mistake teams make is underestimating the importance of data quality. Your RAG system is only as good as your retrieval pipeline. We've seen teams spend weeks fine-tuning embeddings and prompt engineering, only to realize their source documents were poorly structured or incomplete.
      </p>
      
      <h2 class="text-3xl serif font-bold mt-12 mb-4">Chunking Strategy Matters</h2>
      <p class="text-lg font-mono leading-relaxed mb-6">
        There's no one-size-fits-all chunking strategy. Technical documentation benefits from larger chunks (512-1024 tokens), while conversational data works better with smaller, overlapping chunks. Always test your chunking strategy with real queries.
      </p>
      
      <h2 class="text-3xl serif font-bold mt-12 mb-4">Evaluation is Non-Negotiable</h2>
      <p class="text-lg font-mono leading-relaxed mb-6">
        You can't improve what you don't measure. We use a combination of RAGAS metrics, human evaluation, and A/B testing to continuously improve our systems. Set up evaluation early, not as an afterthought.
      </p>
      
      <p class="mt-8 italic text-gray-700 border-l-4 border-black pl-4 font-serif">
        "The shift from experimental AI to production-ready AI requires a fundamental change in engineering discipline—a change we specialize in delivering."
      </p>
    `
  },
  'ai-strategy-early-stage': {
    title: 'The Generative AI Value Trap',
    date: 'Sep 10, 2025',
    category: 'Strategy',
    author: 'Sarah Jones',
    content: `
      <p class="text-lg leading-relaxed mb-6 first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
        Every startup wants to be "AI-first" these days. But what does that actually mean when you're resource-constrained and need to ship fast?
      </p>
      
      <h2 class="text-3xl serif font-bold mt-12 mb-4">Start with the Problem, Not the Model</h2>
      <p class="text-lg font-mono leading-relaxed mb-6">
        Too many founders start with "We need to use GPT-4" instead of "What user problem are we solving?" Sometimes a simple rule-based system or fine-tuned small model is the right answer. Don't over-engineer.
      </p>
      
      <h2 class="text-3xl serif font-bold mt-12 mb-4">Build Data Moats Early</h2>
      <p class="text-lg font-mono leading-relaxed mb-6">
        Models are becoming commodities. Your competitive advantage lies in your proprietary data and how you structure it. Start collecting and organizing data from day one, even if you're not using it yet.
      </p>
    `
  },
  'evaluation-frameworks': {
    title: 'Building Autonomous Agents with LLMs',
    date: 'Aug 1, 2025',
    category: 'Engineering',
    author: 'Michael Ross',
    content: `
      <p class="text-lg leading-relaxed mb-6 first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
        Evaluating LLM applications is fundamentally different from traditional software. You're dealing with probabilistic outputs, not deterministic results.
      </p>
      
      <h2 class="text-3xl serif font-bold mt-12 mb-4">LLM-as-a-Judge</h2>
      <p class="text-lg font-mono leading-relaxed mb-6">
        Using a more powerful LLM to evaluate outputs from a smaller model is surprisingly effective. We use GPT-4 to evaluate GPT-3.5 outputs, which gives us consistent, scalable evaluation at a fraction of the cost of human evaluation.
      </p>
      
      <h2 class="text-3xl serif font-bold mt-12 mb-4">RAGAS for RAG Systems</h2>
      <p class="text-lg font-mono leading-relaxed mb-6">
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
      <main className="pt-[170px] md:pt-[145px] px-6 md:px-12">
        <h1 className="text-4xl serif font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-lg font-mono hover:underline">
          ← Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-[170px] md:pt-[145px] min-h-screen bg-white"> 
      <div className="grain"></div>
      
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 border-x-2 border-black border-b-2">
        <Link 
            to="/blog" 
            className="flex items-center text-sm font-mono uppercase tracking-widest text-gray-500 hover:text-black mb-6 transition-colors"
        >
            <ArrowRight size={14} className="transform rotate-180 mr-2" /> Back to Blog
        </Link>

        <h1 className="text-5xl md:text-7xl serif font-black mb-4 leading-tight">{post.title}</h1>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-8 border-b pb-4">
            Published: {post.date} • {post.category} • by {post.author}
        </p>

        <div className="prose lg:prose-lg font-serif leading-loose">
            <div 
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
      </section>
    </main>
  );
}
