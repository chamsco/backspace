import { Link } from 'react-router-dom';
import { ArrowRight, Rss } from 'lucide-react';

export const blogPosts = [
  { 
    id: 'building-rag-systems',
    title: 'Building Production RAG Systems',
    excerpt: 'Lessons learned from deploying retrieval-augmented generation at scale.',
    date: 'Oct 25, 2025',
    category: 'Engineering',
    author: 'Alex Chen'
  },
  { 
    id: 'ai-strategy-early-stage',
    title: 'The Generative AI Value Trap',
    excerpt: 'Analyzing why many early GenAI projects fail to deliver ROI and how to avoid common pitfalls.',
    date: 'Sep 10, 2025',
    category: 'Strategy',
    author: 'Sarah Jones'
  },
  { 
    id: 'evaluation-frameworks',
    title: 'Building Autonomous Agents with LLMs',
    excerpt: 'A tutorial on constructing reliable, multi-step agents for complex financial tasks.',
    date: 'Aug 1, 2025',
    category: 'Engineering',
    author: 'Michael Ross'
  },
];

export default function BlogList() {
  return (
    <main className="pt-[170px] md:pt-[145px] min-h-screen"> 
      <div className="grain"></div>
      
      <section className="px-6 md:px-12 py-16 border-b-2 border-black">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black serif leading-[0.9] tracking-tighter uppercase mb-4">
            The Wire.
          </h1>
          <p className="text-xl md:text-3xl font-medium serif leading-tight max-w-4xl opacity-80 border-b border-black pb-8">
            Insights and technical deep dives from the Backspace Research Collective.
          </p>
      </section>

      {/* Article List */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-black">
          {blogPosts.map((article, i) => (
              <div 
                  key={article.id} 
                  className={`p-8 border-b-2 border-black md:border-b-0 ${i < 2 ? 'md:border-r-2' : ''} transition-all duration-300 hover:bg-[#EAEAE5] cursor-pointer`}
              >
                  <Link to={`/blog/${article.id}`} className="block">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 block mb-2">{article.date}</span>
                    <h2 className="text-3xl serif font-bold mb-3 leading-tight">{article.title}</h2>
                    <p className="font-mono text-sm mb-4 opacity-80">{article.excerpt}</p>
                    <div className="flex items-center text-xs font-bold uppercase tracking-widest border-b border-black w-max pb-1">
                        Read Article <ArrowRight size={14} className="ml-2" />
                    </div>
                  </Link>
              </div>
          ))}
      </section>

      {/* CTA */}
      <section className="p-12 text-center">
         <div className="flex items-center justify-center font-mono text-sm uppercase tracking-widest text-gray-600">
             <Rss size={16} className="mr-2"/> Subscribe to our Feed
         </div>
      </section>
    </main>
  );
}
