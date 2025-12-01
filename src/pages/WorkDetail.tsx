import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const workItems: Record<string, {
  client: string;
  desc: string;
  role: string;
  year: string;
  challenge: string;
  solution: string;
  impact: string;
}> = {
  'nexus': {
    client: 'NEXUS',
    desc: 'Enterprise Knowledge Base',
    role: 'RAG Strategy',
    year: '2024',
    challenge: 'NEXUS needed to build a RAG system that could handle complex enterprise queries across thousands of internal documents while maintaining accuracy and reducing hallucinations.',
    solution: 'We designed a multi-stage retrieval pipeline with hybrid search (semantic + keyword), implemented chunking strategies optimized for technical documentation, and built evaluation frameworks using RAGAS to continuously improve the system.',
    impact: 'Achieved 85% accuracy on complex queries, reduced hallucination rate by 60%, and enabled the team to scale from 100 to 10,000+ documents without performance degradation.'
  },
  'aurora': {
    client: 'AURORA',
    desc: 'Generative Architecture',
    role: 'Product Engineering',
    year: '2024',
    challenge: 'AURORA wanted to help architects generate design variations quickly while maintaining design coherence and architectural constraints.',
    solution: 'We built a fine-tuned diffusion model trained on architectural datasets, integrated constraint-based generation, and created an intuitive interface for iterative design refinement.',
    impact: 'Reduced design iteration time from days to hours, enabling architects to explore 10x more design variations in the same timeframe.'
  },
  'pilot': {
    client: 'PILOT',
    desc: 'Executive AI Co-pilot',
    role: '0→1 Build',
    year: '2023',
    challenge: 'PILOT needed to build an AI assistant that could handle executive-level tasks like email prioritization, meeting summaries, and strategic analysis.',
    solution: 'We developed a multi-agent system with specialized agents for different task types, implemented secure data handling for sensitive information, and built a natural language interface for task delegation.',
    impact: 'Saved executives an average of 8 hours per week on administrative tasks, with 90% user satisfaction rate.'
  },
  'vector': {
    client: 'VECTOR',
    desc: 'Autonomous Logistics',
    role: 'Computer Vision',
    year: '2023',
    challenge: 'VECTOR needed real-time object detection and tracking for warehouse automation, handling thousands of items with varying shapes and sizes.',
    solution: 'We trained custom YOLO models on warehouse-specific datasets, implemented multi-camera tracking systems, and built robust error handling for edge cases.',
    impact: 'Achieved 98% detection accuracy, reduced picking errors by 75%, and enabled 24/7 autonomous warehouse operations.'
  },
};

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const work = slug ? workItems[slug] : null;

  if (!work) {
    return (
      <main className="pt-[170px] md:pt-[145px] px-6 md:px-12">
        <h1 className="text-4xl serif font-bold mb-4">Work not found</h1>
        <Link to="/work" className="text-lg font-mono hover:underline">
          ← Back to work
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-[170px] md:pt-[145px] min-h-screen bg-white"> 
      <div className="grain"></div>
      
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 border-x-2 border-black border-b-2">
        <Link 
            to="/work" 
            className="flex items-center text-sm font-mono uppercase tracking-widest text-gray-500 hover:text-black mb-6 transition-colors"
        >
            <ArrowRight size={14} className="transform rotate-180 mr-2" /> Back to Work
        </Link>
        
        <Reveal>
          <span className="inline-block px-3 py-1 border border-black text-xs font-bold uppercase tracking-widest w-max bg-black text-white mb-4">
            Case Study: {work.role}
          </span>
          <h1 className="text-5xl md:text-7xl serif font-black mb-4 leading-tight">{work.client}</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-8 border-b pb-4">
            {work.year} • {work.role} • {work.desc}
          </p>
        </Reveal>

        <div className="prose lg:prose-lg font-serif leading-loose">
          <Reveal delay={0.2}>
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl serif font-bold mb-4">Challenge</h2>
                <p className="text-lg font-mono leading-relaxed">
                  {work.challenge}
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl serif font-bold mb-4">Solution</h2>
                <p className="text-lg font-mono leading-relaxed">
                  {work.solution}
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl serif font-bold mb-4">Impact</h2>
                <p className="text-lg font-mono leading-relaxed">
                  {work.impact}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
