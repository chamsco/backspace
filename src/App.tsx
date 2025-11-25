import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Plus, X, Menu } from 'lucide-react';
import logo from '../media/backspace-logo.svg';
import { Reveal } from './components/Reveal';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import WorkList from './pages/WorkList';
import WorkDetail from './pages/WorkDetail';

// --- Styles for Font and Layout ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: white;
      color: black;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      background: #e5e7eb;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #d1d5db;
    }
  `}</style>
);

// --- Components ---
// Logo Component
const Logo = ({ className = "" }: { className?: string }) => (
  <img 
    src={logo} 
    alt="Backspace Logo" 
    className={className}
  />
);


const Nav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-white/95 backdrop-blur-sm transition-all duration-300">
      <Link 
        to="/"
        className="flex items-center gap-2 cursor-pointer z-50 hover:opacity-60 transition-opacity"
      >
        <Logo className="w-10 h-10 md:w-12 md:h-12" />
        <span className="text-lg font-semibold tracking-tight hidden md:block">Backspace .</span>
      </Link>
      
      <nav className="hidden md:flex space-x-10 text-[15px] font-medium text-gray-600">
        <Link to="/work" className={`hover:text-black transition-colors ${isActive('/work') ? 'text-black' : ''}`}>Work</Link>
        <Link to="/blog" className={`hover:text-black transition-colors ${isActive('/blog') ? 'text-black' : ''}`}>Blog</Link>
        <Link to="/about" className={`hover:text-black transition-colors ${isActive('/about') ? 'text-black' : ''}`}>About</Link>
        <a href="mailto:hello@backspace.company" className="hover:text-black transition-colors">Contact</a>
      </nav>
      <button className="md:hidden z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center space-y-8 text-3xl font-medium z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Link to="/work" onClick={() => setIsMobileMenuOpen(false)} className="hover:scale-105 transition-transform">Work</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:scale-105 transition-transform">Blog</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:scale-105 transition-transform">About</Link>
          <a href="mailto:hello@backspace.company" className="hover:scale-105 transition-transform">Contact</a>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-500 gap-6">
    <div className="flex gap-6">
      <a href="#" className="hover:text-black transition-colors">Twitter</a>
      <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
      <a href="#" className="hover:text-black transition-colors">Substack</a>
      <a href="#" className="hover:text-black transition-colors">GitHub</a>
    </div>
    <div className="flex gap-6">
      <span>© Copyright 2025</span>
    </div>
  </footer>
);

// --- Views ---
const HomeView = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const work = [
    { id: 'nexus', client: "Nexus", desc: "The intelligent enterprise knowledge base", role: "RAG Strategy" },
    { id: 'aurora', client: "Aurora", desc: "Generative design assistant for architects", role: "Product Engineering" },
    { id: 'pilot', client: "Pilot", desc: "Your AI executive co-pilot", role: "0→1 Build" },
    { id: 'vector', client: "Vector", desc: "Autonomous supply chain logistics", role: "Computer Vision" },
    { id: 'tonic', client: "Tonic", desc: "Private recommendation engine", role: "Strategic Partner" },
    { id: 'index', client: "Index", desc: "Financial forecasting agent", role: "ML Ops" },
  ];

  const approach = [
    { num: "01", title: "Data Sovereignty", text: "Whether we work independently or integrate with your team, we prioritize your proprietary data. We don't just train models; we build secure data moats." },
    { num: "02", title: "High Velocity", text: "We work fast, like really fast. We move from hypothesis to inference API in weeks, zooming through explorations until we find the signal." },
    { num: "03", title: "Show and Tell", text: "We frequently share work in progress, usually in the form of live Streamlit demos or interactive prototypes. No lengthy PDFs." },
    { num: "04", title: "Bias for Action", text: "We prefer creating tangible artifacts to visualize the team's ideas over abstract strategy documents that often go ignored." },
    { num: "05", title: "Systems Thinking", text: "Whether it's a small prompt chain or an entire agent swarm, we create reusable components and evaluation frameworks." },
    { num: "06", title: "Model Agnostic", text: "We aren't married to OpenAI or Anthropic. We select the best architecture for the specific task, optimizing for cost and latency." },
  ];

  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <Reveal>
          <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.1] font-medium tracking-tight max-w-5xl">
            Strategic AI Partner for <br />
            <span className="text-gray-400">Early-Stage Teams.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 text-lg font-medium">
              Nexus
            </div>
            <div className="md:col-span-8">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                We help ambitious startups integrate Artificial Intelligence fast without compromising quality. From 0→1 prototypes to scalable neural architectures.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Work List */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="flex justify-between items-baseline mb-12 border-b border-gray-200 pb-4">
          <span className="text-sm font-medium text-gray-500">Selected Work</span>
        </div>
        <div className="space-y-0">
          {work.map((item) => (
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
        <div className="mt-8 text-right">
          <Link to="/work" className="inline-flex items-center text-sm font-medium hover:opacity-60">View all projects <ArrowRight size={14} className="ml-2"/></Link>
        </div>
      </section>

      {/* About Teaser */}
      <section className="px-6 md:px-12 lg:px-24 mb-32 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <span className="text-sm font-medium text-gray-500">About</span>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <p className="text-2xl md:text-3xl leading-snug font-medium mb-8">
              We help early-stage startups ship AI fast.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              We've spent the last decade building 0→1 products for the world's top tech companies. Today, we partner with founders to bring their ideas to life. As a fractional AI partner, we will help you shape your product strategy, validate technical feasibility, and build a culture of experimentation.
            </p>
            <Link to="/about" className="text-lg font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-black transition-all">
              Read more about our philosophy
            </Link>
          </Reveal>
          <div className="mt-24 grid grid-cols-2 gap-8">
            <div>
              <span className="block text-sm text-gray-500 mb-4">Capabilities</span>
              <ul className="space-y-2 text-lg font-medium">
                <li>AI Strategy</li>
                <li>LLM Integration</li>
                <li>RAG Systems</li>
                <li>Computer Vision</li>
              </ul>
            </div>
            <div>
              <span className="block text-sm text-gray-500 mb-4">&nbsp;</span>
              <ul className="space-y-2 text-lg font-medium">
                <li>0→1 Projects</li>
                <li>Team Building</li>
                <li>Technical Due Diligence</li>
                <li>Prototyping</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="mb-16 border-b border-gray-200 pb-4">
          <span className="text-sm font-medium text-gray-500">Approach</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {approach.map((step, i) => (
            <Reveal key={i} delay={i * 0.1} className="group">
              <span className="text-xs font-mono text-gray-400 mb-4 block">{step.num}</span>
              <h3 className="text-xl font-medium mb-4 group-hover:opacity-70 transition-opacity">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 lg:px-24 mb-32 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <span className="text-sm font-medium text-gray-500">FAQ</span>
        </div>
        <div className="md:col-span-8">
          {[
            { q: "What is fractional AI leadership?", a: "It's having a senior AI leader on your team for a fraction of the cost of a full-time hire. We embed with your team to lead strategy and execution." },
            { q: "Why not hire a full-time ML Engineer?", a: "Senior talent is scarce and expensive. We provide immediate impact and help you hire the right full-time team when you're ready." },
            { q: "What is your pricing structure?", a: "We work on a monthly retainer or project basis. Contact us for details." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 last:border-0">
              <button 
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                className="flex justify-between items-center w-full py-6 text-left text-xl font-medium hover:text-gray-600 transition-colors"
              >
                {faq.q}
                <span className={`transform transition-transform duration-300 ${openAccordion === i ? "rotate-45" : "rotate-0"}`}>
                  <Plus size={20} />
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="pb-6 text-gray-600 leading-relaxed text-lg max-w-2xl">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 md:px-12 lg:px-24 mb-24 pt-24 border-t border-gray-200">
        <Reveal>
          <h2 className="text-[3rem] md:text-[5rem] font-medium leading-none mb-8 tracking-tight">
            Need an AI Partner?
          </h2>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <p className="text-xl text-gray-600 mb-12 max-w-xl">
                We are currently prioritizing projects in FinTech, Healthcare, and Generative Media. Available in Q3 2025.
              </p>
              <a href="mailto:hello@backspace.company" className="text-2xl font-medium underline decoration-gray-300 underline-offset-8 hover:decoration-black transition-all">
                hello@backspace.company
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

const AboutView = () => {
  const playbook = [
    { title: "Start with the Problem, Not the Model", text: "Too many companies start with 'We need to use GPT-4'. We start with 'What user problem are we solving?' and work backwards to the technology. Sometimes, a simple regression is better than a Transformer." },
    { title: "Data is the Moat", text: "Models are becoming commodities. Your competitive advantage lies in your proprietary data and how you structure it. We help you build data pipelines that turn raw interactions into gold." },
    { title: "Evaluation Driven Development", text: "You can't improve what you don't measure. We implement rigorous evaluation frameworks (LLM-as-a-Judge, RAGAS) early in the process to ensure reliability and reduce hallucinations." },
    { title: "Human in the Loop", text: "AI is probabilistic, not deterministic. We design interfaces that empower humans to correct and refine model outputs, creating a flywheel of continuous improvement." }
  ];

  const experience = [
    { company: "Backspace", role: "Founder", year: "Present", desc: "Strategic AI Partner for early-stage startups." },
    { company: "DeepMind", role: "Research Engineer", year: "2020-2023", desc: "Worked on reinforcement learning for robotics." },
    { company: "OpenAI", role: "Technical Staff", year: "2018-2020", desc: "Contributed to early GPT infrastructure." },
    { company: "Google Brain", role: "Interaction Designer", year: "2015-2018", desc: "Visualizing neural network internals." },
  ];

  return (
    <main className="pt-32 md:pt-48 animate-in fade-in duration-500 bg-white min-h-screen">
      {/* About Hero */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <Reveal>
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.2] font-medium tracking-tight max-w-4xl text-gray-900 mb-12">
            I'm Backspace, an AI research collective helping founders build the future.
          </h1>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Previously, I helped build the foundations of generative media at <span className="text-black font-medium">DeepMind</span> and <span className="text-black font-medium">OpenAI</span>. I've launched products used by millions and published research at NeurIPS.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Now, I leverage that experience to help early-stage companies navigate the noise of the AI boom. I bridge the gap between academic research and shipping production code.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-4">
            <div className="w-full h-64 bg-gray-200 rounded-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" 
                alt="Abstract AI Art" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <span className="text-xs text-gray-400 mt-2 block">Latent space visualization, 2024</span>
          </div>
        </div>
      </section>

      {/* Playbook */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-sm font-medium text-gray-500 mb-16 uppercase tracking-wide">The Backspace Playbook</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-12">
            {playbook.map((item, i) => (
              <Reveal key={i} className="md:col-span-6">
                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-sm font-medium text-gray-500 mb-12 uppercase tracking-wide">Experience</h2>
          <div className="space-y-0">
            {experience.map((job, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-start py-8 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="md:w-1/4 text-xl font-medium">{job.company}</div>
                <div className="md:w-1/2">
                  <div className="text-xl text-gray-900 mb-2">{job.role}</div>
                  <p className="text-gray-500 text-lg">{job.desc}</p>
                </div>
                <div className="md:w-1/4 text-right text-gray-400 mt-4 md:mt-0">{job.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Bottom */}
      <section className="px-6 md:px-12 lg:px-24 mb-24">
        <div className="bg-gray-50 p-12 md:p-24 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to build?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">We only take on 3 partners a year to ensure deep focus and impact.</p>
          <a href="mailto:hello@backspace.company" className="inline-block border border-black px-8 py-4 text-lg font-medium hover:bg-black hover:text-white transition-all">
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
};

// --- Main App Wrapper ---
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      <GlobalStyles />
      <Nav />
      
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/work" element={<WorkList />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default function BackspacePortfolio() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
