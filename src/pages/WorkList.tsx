import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';

const workItems = [
  { 
    id: 'nexus',
    client: "Nexus", 
    desc: "The intelligent enterprise knowledge base", 
    role: "RAG Strategy",
    year: "2024"
  },
  { 
    id: 'aurora',
    client: "Aurora", 
    desc: "Generative design assistant for architects", 
    role: "Product Engineering",
    year: "2024"
  },
  { 
    id: 'pilot',
    client: "Pilot", 
    desc: "Your AI executive co-pilot", 
    role: "0→1 Build",
    year: "2023"
  },
  { 
    id: 'vector',
    client: "Vector", 
    desc: "Autonomous supply chain logistics", 
    role: "Computer Vision",
    year: "2023"
  },
  { 
    id: 'tonic',
    client: "Tonic", 
    desc: "Private recommendation engine", 
    role: "Strategic Partner",
    year: "2023"
  },
  { 
    id: 'index',
    client: "Index", 
    desc: "Financial forecasting agent", 
    role: "ML Ops",
    year: "2022"
  },
];

export default function WorkList() {
  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500">
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <Reveal>
          <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.1] font-medium tracking-tight max-w-5xl mb-8">
            Selected Work
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            A selection of projects we've worked on with early-stage teams.
          </p>
        </Reveal>
      </section>

      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="flex justify-between items-baseline mb-12 border-b border-gray-200 pb-4">
          <span className="text-sm font-medium text-gray-500">Projects</span>
        </div>
        <div className="space-y-0">
          {workItems.map((item) => (
            <Link
              key={item.id}
              to={`/work/${item.id}`}
              className="group flex flex-col md:flex-row md:items-baseline py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="md:w-1/4 text-xl font-medium group-hover:translate-x-2 transition-transform duration-300">{item.client}</div>
              <div className="md:w-1/2 text-lg text-gray-500 mt-1 md:mt-0">{item.desc}</div>
              <div className="md:w-1/4 text-sm text-gray-400 text-right mt-2 md:mt-0">{item.role}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

