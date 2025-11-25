import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

export const blogPosts = [
  { 
    id: 'building-rag-systems',
    title: 'Building Production RAG Systems',
    excerpt: 'Lessons learned from deploying retrieval-augmented generation at scale.',
    date: '2024-12-15',
    category: 'Engineering',
    author: 'Alex Chen'
  },
  { 
    id: 'ai-strategy-early-stage',
    title: 'AI Strategy for Early-Stage Startups',
    excerpt: 'How to think about AI integration when you have limited resources.',
    date: '2024-11-20',
    category: 'Strategy',
    author: 'Sarah Jones'
  },
  { 
    id: 'evaluation-frameworks',
    title: 'Evaluation Frameworks for LLM Applications',
    excerpt: 'Measuring what matters in production AI systems.',
    date: '2024-10-10',
    category: 'Engineering',
    author: 'Michael Ross'
  },
];

export default function BlogList() {
  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500">
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <Reveal>
          <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.1] font-medium tracking-tight max-w-5xl mb-8">
            Blog
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            Thoughts on AI, engineering, and building products that matter.
          </p>
        </Reveal>
      </section>

      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="space-y-0">
          {blogPosts.map((post) => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block py-8 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                <div className="md:w-1/4">
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <span className="text-sm text-gray-400 ml-2">·</span>
                  <span className="text-sm text-gray-400 ml-2">{post.category}</span>
                </div>
                <div className="md:w-3/4">
                  <h2 className="text-2xl font-medium mb-2 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-sm text-gray-400">
                    by {post.author}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
