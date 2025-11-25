import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
    client: 'Nexus',
    desc: 'The intelligent enterprise knowledge base',
    role: 'RAG Strategy',
    year: '2024',
    challenge: 'Nexus needed to build a RAG system that could handle complex enterprise queries across thousands of internal documents while maintaining accuracy and reducing hallucinations.',
    solution: 'We designed a multi-stage retrieval pipeline with hybrid search (semantic + keyword), implemented chunking strategies optimized for technical documentation, and built evaluation frameworks using RAGAS to continuously improve the system.',
    impact: 'Achieved 85% accuracy on complex queries, reduced hallucination rate by 60%, and enabled the team to scale from 100 to 10,000+ documents without performance degradation.'
  },
  'aurora': {
    client: 'Aurora',
    desc: 'Generative design assistant for architects',
    role: 'Product Engineering',
    year: '2024',
    challenge: 'Aurora wanted to help architects generate design variations quickly while maintaining design coherence and architectural constraints.',
    solution: 'We built a fine-tuned diffusion model trained on architectural datasets, integrated constraint-based generation, and created an intuitive interface for iterative design refinement.',
    impact: 'Reduced design iteration time from days to hours, enabling architects to explore 10x more design variations in the same timeframe.'
  },
  'pilot': {
    client: 'Pilot',
    desc: 'Your AI executive co-pilot',
    role: '0→1 Build',
    year: '2023',
    challenge: 'Pilot needed to build an AI assistant that could handle executive-level tasks like email prioritization, meeting summaries, and strategic analysis.',
    solution: 'We developed a multi-agent system with specialized agents for different task types, implemented secure data handling for sensitive information, and built a natural language interface for task delegation.',
    impact: 'Saved executives an average of 8 hours per week on administrative tasks, with 90% user satisfaction rate.'
  },
  'vector': {
    client: 'Vector',
    desc: 'Autonomous supply chain logistics',
    role: 'Computer Vision',
    year: '2023',
    challenge: 'Vector needed real-time object detection and tracking for warehouse automation, handling thousands of items with varying shapes and sizes.',
    solution: 'We trained custom YOLO models on warehouse-specific datasets, implemented multi-camera tracking systems, and built robust error handling for edge cases.',
    impact: 'Achieved 98% detection accuracy, reduced picking errors by 75%, and enabled 24/7 autonomous warehouse operations.'
  },
  'tonic': {
    client: 'Tonic',
    desc: 'Private recommendation engine',
    role: 'Strategic Partner',
    year: '2023',
    challenge: 'Tonic wanted to build a recommendation system that could work entirely on-device, respecting user privacy while maintaining recommendation quality.',
    solution: 'We designed a federated learning architecture, implemented on-device model training, and created privacy-preserving aggregation mechanisms.',
    impact: 'Enabled private recommendations without data leaving user devices, while maintaining recommendation quality comparable to cloud-based systems.'
  },
  'index': {
    client: 'Index',
    desc: 'Financial forecasting agent',
    role: 'ML Ops',
    year: '2022',
    challenge: 'Index needed to deploy and maintain multiple forecasting models in production with high reliability and low latency.',
    solution: 'We built a robust ML pipeline with automated retraining, A/B testing infrastructure, and comprehensive monitoring and alerting systems.',
    impact: 'Reduced model deployment time from weeks to hours, improved forecast accuracy by 15%, and achieved 99.9% uptime.'
  }
};

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const work = slug ? workItems[slug] : null;

  if (!work) {
    return (
      <main className="pt-32 md:pt-48 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl font-medium mb-4">Work not found</h1>
        <Link to="/work" className="text-lg text-gray-600 hover:text-black">
          ← Back to work
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500">
      <section className="px-6 md:px-12 lg:px-24 mb-16">
        <Link 
          to="/work" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to work
        </Link>
        
        <Reveal>
          <div className="mb-8">
            <span className="text-sm text-gray-400">{work.year}</span>
            <span className="text-sm text-gray-400 ml-2">·</span>
            <span className="text-sm text-gray-400 ml-2">{work.role}</span>
          </div>
          <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.1] font-medium tracking-tight max-w-5xl mb-4">
            {work.client}
          </h1>
          <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl">
            {work.desc}
          </p>
        </Reveal>
      </section>

      <section className="px-6 md:px-12 lg:px-24 mb-32 max-w-3xl">
        <Reveal delay={0.2}>
          <div className="space-y-16">
            <div>
              <h2 className="text-2xl font-medium mb-4">Challenge</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {work.challenge}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium mb-4">Solution</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {work.solution}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium mb-4">Impact</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {work.impact}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

