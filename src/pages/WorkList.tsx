import { Link } from 'react-router-dom';

const workCases = [
    { id: 'nexus', client: "NEXUS", desc: "Enterprise Knowledge Base", role: "RAG Strategy", details: { 
        title: "NEXUS: RAG Strategy & Optimization", summary: "Developed a highly accurate, proprietary RAG architecture for a global consulting firm, reducing hallucination rates by 40%. Implemented custom indexing pipelines and multi-hop reasoning agents.", type: "Strategy" 
    }},
    { id: 'aurora', client: "AURORA", desc: "Generative Architecture", role: "Product Eng.", details: { 
        title: "AURORA: 0→1 Generative Architecture", summary: "Built the foundation for a new creative generative platform, focusing on fast inference and model fine-tuning for specialized output quality. The core engine supports dynamic content creation.", type: "Engineering" 
    }},
    { id: 'pilot', client: "PILOT", desc: "Executive AI Co-pilot", role: "0→1 Build", details: { 
        title: "PILOT: Executive Co-pilot Development", summary: "Designed and launched an AI co-pilot for C-suite operations, integrating calendar, email, and internal docs via a secure, self-hosted LLM solution. Focus on security and latency.", type: "Full Stack" 
    }},
    { id: 'vector', client: "VECTOR", desc: "Autonomous Logistics", role: "Computer Vision", details: { 
        title: "VECTOR: CV for Logistics Automation", summary: "Integrated real-time computer vision models (YOLO variants) into warehouse robotics for autonomous inventory sorting and quality control, leading to a 20% efficiency gain.", type: "Vision" 
    }},
];

const experienceLog = [
    { company: "Backspace", role: "Founder", year: "Present", details: "Leading the strategic AI collective, focused on venture-backed startups." },
    { company: "DeepMind", role: "Rsch Eng", year: "2020-23", details: "Senior Research Engineer contributing to large-scale multimodal models." },
    { company: "OpenAI", role: "Tech Staff", year: "2018-20", details: "Early team member, focusing on safety and alignment experiments for GPT-2." },
    { company: "Google", role: "Designer", year: "2015-18", details: "UX Designer for Google Cloud AI services, bridging engineering and product." },
];

export default function WorkList() {
  return (
    <main className="pt-[170px] md:pt-[145px] min-h-screen"> 
      <div className="grain"></div>
      
      {/* Work/Portfolio Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-black">
        
        {/* Left Column: Case Studies List */}
        <div className="md:col-span-4 border-r-2 border-black">
            <div className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm font-bold border-b border-white/20 sticky top-[145px] z-10">
              Case Study Selector
            </div>
            
            <div className="max-h-[75vh] overflow-y-auto">
                {workCases.map((item) => (
                <Link
                    key={item.id} 
                    to={`/work/${item.id}`}
                    className="grid grid-cols-12 group border-b border-black last:border-b-0 cursor-pointer transition-colors min-h-[100px] hover:bg-[#EAEAE5]"
                >
                    <div className="col-span-2 md:col-span-3 p-4 md:p-6 font-mono text-xs opacity-50 flex items-start">
                        {item.id.toUpperCase()}
                    </div>
                    <div className="col-span-10 md:col-span-9 p-4 md:p-6 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-bold serif mb-1">{item.client}</h3>
                        <p className="text-sm font-mono opacity-80">{item.desc}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>

        {/* Right Column: Work Details / Experience Log */}
        <div className="md:col-span-8">
            {/* Top Row: Overview */}
            <div className="p-8 md:p-12 border-b-2 border-black min-h-[40vh] bg-white">
                <span className="inline-block px-3 py-1 border border-black text-xs font-bold uppercase tracking-widest w-max bg-black text-white mb-4">
                    Case Study: Overview
                </span>
                
                <h1 className="text-4xl md:text-6xl font-black serif leading-none tracking-tighter mb-6">
                    Backspace Strategy Overview
                </h1>
                
                <p className="text-lg md:text-2xl font-medium serif leading-snug">
                    Select a case study on the left to see the technical deep dive, or review our collective experience below.
                </p>
            </div>
            
            {/* Bottom Row: Experience Log */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-black">
                <div className="col-span-4 bg-black text-white px-6 py-3 uppercase tracking-widest text-sm font-bold border-b border-white/20">
                    Experience Log (Collective History)
                </div>
                {experienceLog.map((job, i) => (
                    <div key={i} className="p-4 md:p-6 border-r border-black last:border-r-0 border-b border-black bg-[#F5F5F0] hover:bg-white transition-colors cursor-pointer">
                        <h4 className="serif font-bold text-xl mb-1">{job.company}</h4>
                        <p className="font-mono text-xs opacity-60">{job.role}</p>
                        <span className="font-mono text-xs mt-2 block border-t pt-2">{job.year}</span>
                    </div>
                ))}
            </div>
            
            {/* Final CTA in Work View */}
            <div className="p-12 text-center bg-[#F5F5F0]">
                <a href="mailto:hello@backspace.company" className="inline-block bg-black text-white px-8 py-3 text-sm font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all">
                    Ready to Start Your Project?
                </a>
            </div>
        </div>
      </section>
    </main>
  );
}
