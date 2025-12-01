import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, X, Menu, Globe, Calendar, Mail, MapPin } from 'lucide-react';
import logo from '../media/backspace-logo.svg';
import { Reveal } from './components/Reveal';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import WorkList from './pages/WorkList';
import WorkDetail from './pages/WorkDetail';

// --- Styles for Newspaper/Editorial Layout ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
    
    :root {
      --bg-paper: #F5F5F0;
      --text-ink: #111111;
      --border-ink: #111111;
      --color-cream: #F5F5E0;
      --color-gold-tan: #D4A017;
    }

    body {
      font-family: 'Space Mono', monospace;
      background-color: var(--bg-paper);
      color: var(--text-ink);
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6, .serif {
      font-family: 'Playfair Display', serif;
    }

    .border-ink {
      border-color: var(--border-ink);
    }
    
    .bg-ink {
      background-color: var(--text-ink);
      color: var(--bg-paper);
    }

    .hover-invert {
      transition: all 0.2s ease;
    }
    .hover-invert:hover {
      background-color: var(--text-ink);
      color: var(--bg-paper);
    }

    /* Grain Texture Overlay */
    .grain {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
  `}</style>
);

// --- Components ---
const Logo = ({ className = "" }: { className?: string }) => (
  <img 
    src={logo} 
    alt="Backspace Logo" 
    className={className}
  />
);

// Masthead / Navigation
const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const navItems = ['Work', 'Blog', 'About', 'Contact'];

  const getActiveView = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/work')) return 'work';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const handleNavClick = (item: string) => {
    if (item === 'Contact') {
      navigate('/contact');
    } else {
      navigate(`/${item.toLowerCase()}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0] border-b-2 border-black transition-all duration-300">
      
      {/* 1. Top Bar Info (Date/Edition) - Black background with white text */}
      <div className="flex justify-between items-center px-4 py-1 border-b border-white/20 text-xs uppercase tracking-widest bg-black text-white">
        <div className="flex items-center gap-2">
          <Globe size={12} className="text-white"/>
          <span>Global Edition</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Calendar size={12} className="text-white"/>
          <span>{date}</span>
        </div>
        <div>Vol. 25 • Issue 04</div>
      </div>

      {/* LINE 1: Logo (Left) and Title (Right) */}
      <div className="relative flex justify-between items-center px-6 py-6 md:py-4 border-b md:border-b-0 border-black">
          
          {/* 1. Logo (Left) */}
          <div 
              className="cursor-pointer flex items-center" 
              onClick={() => navigate('/')}
          >
              <Logo className="w-16 h-16 md:w-20 md:h-20 brightness-0" />
          </div>

          {/* 2. Title (Right) */}
          <div 
              className="flex items-center justify-end cursor-pointer hover:text-gray-600 transition-colors"
              onClick={() => navigate('/')}
          >
             <h1 className="text-3xl md:text-5xl font-black tracking-tighter serif text-right leading-none">
               BACKSPACE<br/>
               <span className="text-lg md:text-2xl font-normal italic block mt-0 font-sans tracking-normal opacity-80">. Company</span>
             </h1>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden absolute top-1/2 right-4 transform -translate-y-1/2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
      </div>

      {/* 2. LINE 2: Navigation Links (Skinny Row) - Black background with white text */}
      <nav className="hidden md:flex justify-around items-stretch bg-black border-y border-white/20">
          {navItems.map((item) => (
              <button 
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`flex-1 px-4 py-2 flex items-center justify-center text-xs font-bold uppercase tracking-widest border-r border-white/20 last:border-r-0 transition-colors 
                      ${getActiveView() === item.toLowerCase() 
                        ? 'bg-[#333333] text-[#F5F5E0]'
                        : 'bg-black text-white hover:bg-[#1e1e1e]'
                      }`
                  }
              >
                  {item}
              </button>
          ))}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[120px] bg-[#F5F5F0] z-40 border-t-2 border-black p-6 flex flex-col gap-4 animate-in slide-in-from-top-10">
          {navItems.map((item) => (
             <button 
               key={item}
               onClick={() => handleNavClick(item)}
               className={`text-4xl serif font-bold hover:underline text-left ${
                 getActiveView() === item.toLowerCase() ? 'text-[#D4A017]' : 'text-black'
               }`}
             >
               {item}
             </button>
          ))}
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="border-t-4 border-black bg-black text-[#F5F5F0] px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-4xl serif font-bold mb-6">Backspace .</h2>
        <p className="text-sm max-w-md opacity-80">
          A strategic AI research collective helping early-stage founders build the future. 
          Est. 2024. Barcelona, Spain.
        </p>
      </div>
      <div>
        <h3 className="uppercase tracking-widest text-xs font-bold mb-4 border-b border-white/20 pb-2">Connect</h3>
        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="hover:underline">Twitter / X</a>
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Substack</a>
          <a href="#" className="hover:underline">GitHub</a>
        </div>
      </div>
      <div>
        <h3 className="uppercase tracking-widest text-xs font-bold mb-4 border-b border-white/20 pb-2">Legal</h3>
        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <span>© 2025 Backspace</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Views ---

// 1. HOME VIEW (Marketing Landing Page)
const HomeView = () => {
  const navigate = useNavigate();
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <main className="pt-[170px] md:pt-[145px] min-h-screen"> 
      <div className="grain"></div>
      
      {/* Hero Headline */}
      <section className="px-6 md:px-12 pb-12 border-b-2 border-black pt-6">
        <Reveal>
          <div className="flex flex-col gap-6">
             <span className="inline-block px-3 py-1 border border-black text-xs font-bold uppercase tracking-widest w-max bg-black text-white">Breaking News</span>
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black serif leading-[0.9] tracking-tighter uppercase mb-6">
              Strategic AI <br/>
              <span className="italic font-light">Partner.</span>
            </h1>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-black pt-8 mt-4">
          <div className="md:col-span-4 border-r border-black pr-8 hidden md:block">
            <p className="text-xs uppercase tracking-widest mb-2 font-bold">Editorial</p>
            <p className="text-sm leading-relaxed">
              In an era of noise, we provide the signal. Backspace partners with visionary founders to navigate the complexities of modern Artificial Intelligence.
            </p>
          </div>
          <div className="md:col-span-8">
             <p className="text-xl md:text-3xl font-medium serif leading-tight">
               We help ambitious startups integrate Artificial Intelligence fast without compromising quality. From 0→1 prototypes to scalable neural architectures.
             </p>
          </div>
        </div>
      </section>

      {/* Services / Approach Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-black">
          <span className="text-xs font-bold uppercase tracking-widest mb-6 block border-b-2 border-black pb-2 w-max">The Philosophy</span>
          <h2 className="text-4xl serif font-bold mb-6">We bridge the gap between research papers and production code.</h2>
          <div className="prose font-serif">
            <p className="text-lg leading-relaxed mb-6">
              <span className="text-5xl float-left mr-3 mt-[-10px] font-bold">W</span>e've spent the last decade building complex systems for top tech companies. Today, we partner with founders to bring their AI-driven ideas to life.
            </p>
            <button onClick={() => navigate('/about')} className="text-sm font-bold uppercase tracking-widest border-b border-black hover:bg-black hover:text-white transition-all pb-1">
              Read Full Manifesto
            </button>
          </div>
        </div>

        <div className="grid grid-rows-3">
          {[
            { title: "Data Sovereignty", text: "We prioritize your proprietary data. We don't just train models; we build secure data moats." },
            { title: "High Velocity", text: "From hypothesis to inference API in weeks. We zoom through explorations until we find the signal." },
            { title: "Systems Thinking", text: "Small prompt chains to agent swarms. We create reusable components and evaluation frameworks." }
          ].map((feature, i) => (
            <div key={i} className="p-8 border-b border-black last:border-b-0 flex flex-col justify-center hover:bg-[#EAEAE5] transition-colors">
              <h3 className="serif text-2xl font-bold mb-2 flex items-center gap-3">
                <span className="font-mono text-xs border border-black rounded-full w-6 h-6 flex items-center justify-center bg-black text-white">{i+1}</span>
                {feature.title}
              </h3>
              <p className="font-mono text-xs md:text-sm leading-relaxed max-w-md ml-9">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-24 bg-white border-b-2 border-black">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-4xl serif font-bold mb-16 underline decoration-4 underline-offset-8">Frequently Asked Questions</h2>
            <div className="border-2 border-black">
              {[
                { q: "What is fractional AI leadership?", a: "It's having a senior AI leader on your team for a fraction of the cost of a full-time hire. We embed with your team to lead strategy and execution." },
                { q: "Why not hire a full-time ML Engineer?", a: "Senior talent is scarce and expensive. We provide immediate impact and help you hire the right full-time team when you're ready." },
                { q: "What is your pricing structure?", a: "We work on a monthly retainer or project basis. Contact us for details." }
              ].map((faq, i) => (
                <div key={i} className="border-b-2 border-black last:border-b-0">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-[#F5F5F0] transition-colors"
                  >
                    <span className="text-lg font-bold serif pr-8">{faq.q}</span>
                    <Plus size={20} className={`transform transition-transform duration-300 ${openAccordion === i ? "rotate-45" : "rotate-0"}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#F5F5F0] ${openAccordion === i ? 'max-h-48 border-t border-black' : 'max-h-0'}`}>
                    <p className="p-6 text-sm font-mono leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 px-6 text-center bg-[#F5F5F0]">
        <Reveal>
          <div className="inline-block border-2 border-black p-2 mb-8 rotate-3">
             <div className="border border-black px-6 py-2 bg-white font-mono text-xs font-bold uppercase tracking-widest">
               Open for Partners
             </div>
          </div>
          <h2 className="text-6xl md:text-9xl serif font-black mb-12 tracking-tighter">
            Let's Build.
          </h2>
          <button onClick={() => navigate('/contact')} className="inline-block bg-black text-white px-12 py-4 text-lg font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Start the Conversation
          </button>
          <p className="mt-8 font-mono text-xs opacity-60">Currently prioritizing projects in FinTech & GenAI.</p>
        </Reveal>
      </section>
    </main>
  );
};

// 3. ABOUT VIEW (Manifesto and Contact sidebar section)
const AboutView = () => {
  return (
    <main className="pt-[170px] md:pt-[145px] min-h-screen bg-[#F5F5F0]">
      <div className="grain"></div>

      <section className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black min-h-[80vh]">
        {/* Sidebar */}
        <div className="lg:col-span-3 border-r-2 border-black p-8 hidden lg:block">
           <div className="sticky top-[145px]"> 
             <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" 
                alt="Founder Profile"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = "https://placehold.co/800x800/222/FFF?text=Portrait"
                }}
                className="w-full grayscale border-2 border-black mb-4 p-1 bg-white" 
             />
             <div className="font-mono text-xs border-t border-black pt-4">
                <p className="mb-2"><strong>FOUNDER:</strong> Backspace</p>
                <p className="mb-2"><strong>LOCATION:</strong> Barcelona</p>
                <p className="mb-4"><strong>FOCUS:</strong> 0 → 1 AI Products</p>
             </div>

             {/* CONTACT SECTION */}
             <div className="mt-8 border-t border-black pt-4">
                 <h4 className="uppercase tracking-widest font-bold text-sm mb-3">Contact</h4>
                 <p className="mb-1">hello@backspace.company</p>
                 <p className="text-gray-600">Available UTC+1 to UTC+3</p>
             </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6 p-8 md:p-16 border-r-2 border-black bg-white">
           <h1 className="text-5xl md:text-7xl serif font-black mb-8 leading-none">The Backspace<br/>Manifesto.</h1>
           <div className="prose font-serif text-lg leading-loose">
             <p className="mb-6 first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
               We started Backspace with a simple premise: AI is moving too fast for traditional agencies. The old model of "discovery phases" and "waterfall delivery" is dead.
             </p>
             <p className="mb-6">
               We operate as a high-velocity research collective. We don't just build software; we build intelligence. Our approach is rooted in academic rigor but executed with startup speed.
             </p>
             <h3 className="text-2xl font-bold mt-12 mb-4 font-mono uppercase tracking-widest border-b border-black inline-block">Core Beliefs</h3>
             <ul className="list-disc pl-5 space-y-4 font-mono text-sm mt-4">
               <li><strong>Start with the Problem:</strong> Don't use LLMs just because you can.</li>
               <li><strong>Data is the Moat:</strong> Models are commodities; your data is the asset.</li>
               <li><strong>Eval Driven:</strong> You can't improve what you don't measure.</li>
             </ul>
           </div>
        </div>

        {/* Right Sidebar / Company Values */}
        <div className="lg:col-span-3 bg-[#EAEAE5]">
           <div className="p-4 border-b border-black font-bold uppercase tracking-widest text-xs bg-black text-white text-center">
             Company Values
           </div>
           {[
             { title: "Velocity", desc: "Speed and iteration trump perfection." },
             { title: "Rigour", desc: "Scientific method applied to production." },
             { title: "Ownership", desc: "We treat your project as our own." },
             { title: "Transparency", desc: "Always candid, always clear." },
           ].map((value, i) => (
             <div key={i} className="p-6 border-b border-black hover:bg-white transition-colors cursor-default">
               <h4 className="serif font-bold text-xl">{value.title}</h4>
               <p className="font-mono text-xs mt-1 opacity-80">{value.desc}</p>
             </div>
           ))}
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="p-12 text-center">
         <p className="font-mono text-xs mb-4">END OF ISSUE</p>
         <div className="w-16 h-1 bg-black mx-auto"></div>
      </section>
    </main>
  );
};

// 4. CONTACT VIEW (New Dedicated Page)
const ContactView = () => {
    return (
        <main className="pt-[170px] md:pt-[145px] min-h-screen"> 
            <div className="grain"></div>
            
            <section className="px-6 md:px-12 py-16 border-b-2 border-black bg-white">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black serif leading-[0.9] tracking-tighter uppercase mb-4">
                    Get in Touch.
                </h1>
                <p className="text-xl md:text-3xl font-medium serif leading-tight max-w-4xl opacity-80 border-b border-black pb-8">
                    Let's discuss your next breakthrough AI product or research collaboration.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-black bg-[#F5F5F0]">
                
                {/* Contact Details */}
                <div className="p-8 md:p-12 border-b-2 border-black md:border-b-0 md:border-r-2 md:col-span-1">
                    <h2 className="uppercase tracking-widest text-sm font-bold mb-6 border-b border-black pb-2">Information Desk</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail size={20} className="mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold font-mono text-sm uppercase">Primary Contact</h3>
                                <a href="mailto:hello@backspace.company" className="text-xl serif underline hover:text-gray-700 transition-colors">hello@backspace.company</a>
                                <p className="font-mono text-xs mt-1 text-gray-600">For all new project inquiries and partnerships.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin size={20} className="mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold font-mono text-sm uppercase">Global HQ</h3>
                                <p className="text-xl serif">Barcelona, Spain (UTC+1)</p>
                                <p className="font-mono text-xs mt-1 text-gray-600">Serving clients globally with primary focus on EU/US timezones.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Direct CTA */}
                <div className="p-8 md:p-12 md:col-span-2 border-b-2 border-black md:border-b-0">
                    <h2 className="uppercase tracking-widest text-sm font-bold mb-6 border-b border-black pb-2">Start a New Project</h2>
                    <p className="text-lg font-serif mb-8">
                        The fastest way to start is to send us a concise email outlining your problem, current team, and key technical constraints. We typically respond within 24 hours.
                    </p>
                    <a href="mailto:hello@backspace.company?subject=New%20Project%20Inquiry%20from%20Website" 
                       className="inline-flex items-center bg-black text-white px-8 py-3 text-sm font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all">
                        Email Us Directly <ArrowRight size={16} className="ml-3"/>
                    </a>
                </div>

            </section>
             {/* Follow Us / Social */}
            <section className="p-12 text-center">
                <h3 className="uppercase tracking-widest text-xs font-bold mb-4 border-b border-black pb-2 w-max mx-auto">Follow Our Research</h3>
                <div className="flex justify-center gap-8 font-mono text-sm">
                    <a href="#" className="hover:underline">Twitter / X</a>
                    <a href="#" className="hover:underline">LinkedIn</a>
                    <a href="#" className="hover:underline">Substack</a>
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
    <div className="selection:bg-black selection:text-[#F5F5F0]">
      <GlobalStyles />
      <Nav />
      
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/work" element={<WorkList />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/contact" element={<ContactView />} />
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
