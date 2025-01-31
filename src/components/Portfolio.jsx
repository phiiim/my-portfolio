import { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { sendEmail } from '../email';


const { Github, Linkedin, Mail, Download, ExternalLink, Menu, X } = LucideIcons;

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentProject, setCurrentProject] = useState(0);
  const projectsRef = useRef(null);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //download cv
    const handleDownload = async () => {
      try {
        const response = await fetch('/my-portfolio/cv.pdf');
        if (!response.ok) {
          throw new Error('Failed to fetch PDF');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'phichayapa-soranaraksopon-cv.pdf'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download error:', error);
        alert('Error downloading the CV');
      }
    };
    

    const NavBar = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      
      return (
        <nav className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-xl">Phichayapa Mei</span>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
    
              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-6">
                {['Home', 'About', 'Skills', 'Education', 'Projects', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`text-white hover:text-blue-400 transition-colors ${
                      activeSection === item.toLowerCase() ? 'text-blue-400' : ''
                    }`}
                    onClick={() => handleSectionChange(item.toLowerCase())}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
    
            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
                <div className="flex flex-col">
                  {['Home', 'About', 'Skills', 'Education', 'Projects', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`px-4 py-3 text-white hover:bg-slate-800 transition-colors ${
                        activeSection === item.toLowerCase() ? 'text-blue-400' : ''
                      }`}
                      onClick={() => {
                        handleSectionChange(item.toLowerCase());
                        setIsMenuOpen(false);
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      );
    };

  const scrollToProject = (index) => {
    const container = projectsRef.current;
    if (container) {
      const projectWidth = container.offsetWidth;
      container.scrollTo({
        left: projectWidth * index,
        behavior: 'smooth'
      });
      setCurrentProject(index);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <NavBar />
      
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {/* Home Section */}
        <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center bg-slate-900 text-white snap-start px-4 pt-16">
          <div className="max-w-4xl px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Hi, I&apos;m Phichayapa Soranaraksopon</h1>
            <p className="text-xl mb-6">Computer Science Student</p>
            <div className="flex gap-4 mb-8 justify-center">
              <a href="https://github.com/phiiim" className="p-2 hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/phichayapa-mei-soranaraksopon-7b5b82259/" className="p-2 hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:phi17mei@gmail.com" className="p-2 hover:text-blue-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <Download size={20} className="text-white" />
                <span className="text-white">Download CV</span>
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen w-full flex flex-col justify-center items-center bg-slate-800 text-white snap-start px-4 py-16 md:py-0">
          <div className="max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-slate-300 mb-4">
                  I&apos;m a computer science student passionate about AI, ML and data science. Currently exploring 
                  various areas of software development, from web applications to machine learning.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="font-semibold min-w-[120px]">Name:</span>
                  <span className="text-slate-300">Phichayapa Soranaraksopon</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold min-w-[120px]">Location:</span>
                  <span className="text-slate-300">Bangkok, TH | Durham, UK</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold min-w-[120px]">Email:</span>
                  <span className="text-slate-300">Phi17mei@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="h-screen w-full flex flex-col justify-center items-center bg-slate-900 text-white snap-start">
          <div className="max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Programming & Development */}
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6">Programming</h3>
                <div className="space-y-4">
                  <span className="text-slate-300 block">Python</span>
                  <span className="text-slate-300 block">C/C++</span>
                  <span className="text-slate-300 block">C#</span>
                  <span className="text-slate-300 block">HTML</span>
                  <span className="text-slate-300 block">CSS</span>
                  <span className="text-slate-300 block">JavaScript</span>
                  <span className="text-slate-300 block">VBA</span>
                  <span className="text-slate-300 block">Haskell</span>
                </div>
              </div>
              {/* Technical Tools */}
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Technical Tools</h3>
                <div className="space-y-2">
                  <span className="text-slate-300 block">Unity</span>
                  <span className="text-slate-300 block">MySQL</span>
                  <span className="text-slate-300 block">MongoDB</span>
                  <span className="text-slate-300 block">SQL</span>
                  <span className="text-slate-300 block">AI API Integration</span>
                  <span className="text-slate-300 block">Machine Learning</span>
                  <span className="text-slate-300 block">Data Science</span>
                  <span className="text-slate-300 block">Deep Learning</span>
                  <span className="text-slate-300 block">Microsoft Excel</span>
                </div>
              </div>
              {/* Languages */}
              <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Languages</h3>
              <div className="space-y-2">
                <span className="text-slate-300 block">Thai (Native)</span>
                <span className="text-slate-300 block">English (Good Conversational)</span>
                <span className="text-slate-300 block">Mandarin (Basic)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="h-screen w-full flex flex-col justify-center items-center bg-slate-800 text-white snap-start">
        <div className="max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Education</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="text-2xl font-semibold">Master of Computer Science</h3>
              <p className="text-lg text-slate-300">Durham University</p>
              <p className="text-slate-400">2022 - 2026</p>
             </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen w-full flex flex-col justify-center items-center bg-slate-900 text-white snap-start">
        <div className="w-full px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
          <div 
              ref={projectsRef}
              className="overflow-x-auto snap-x snap-mandatory"
              onScroll={(e) => {
                const container = e.target;
                const scrollPosition = container.scrollLeft;
                const projectWidth = container.offsetWidth;
                const newIndex = Math.round(scrollPosition / projectWidth);
                setCurrentProject(newIndex);
              }}
          >
            {/* Project Card 1 */}
            <div className="flex">
              <div className="snap-center w-full min-w-full p-4">
                <div className="bg-slate-800 p-6 rounded-lg max-w-4xl mx-auto mb-4">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    Game Development Project
                    <a href="https://github.com/phiiim/Bomberman-Game" className="opacity-70 hover:opacity-100 transition-opacity">
                      <ExternalLink size={20} />
                    </a>
                  </h3>
                  <div className="relative mb-4">
                    <div className="flex justify-center items-center gap-4">
                      <video className="w-full md:h-64 rounded-lg" controls>
                        <source src="/my-portfolio/Game_Design_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Developed an interactive game using Unity and C#.
                    Implemented physics-based gameplay and multiplayer features.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">Unity</span>
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">C#</span>
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">Game Design</span>
                  </div>
                </div>
              </div>
              {/* Project 2 */}
              <div className="snap-center w-full min-w-full p-4">
                <div className="bg-slate-800 p-6 rounded-lg max-w-4xl mx-auto mb-4">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    E-commerce Website
                    <a href="https://github.com/phiiim/Ecommerce-website" className="opacity-70 hover:opacity-100 transition-opacity">
                      <ExternalLink size={20} />
                    </a>
                  </h3>
                  <div className="relative mb-4">
                    <div className="flex justify-center items-center gap-4">
                      <video className="w-full md:h-64 rounded-lg" controls>
                        <source src="/my-portfolio/Ecommerce_website.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Built a e-commerce platform using HTML, Javascript and Node.js.
                    Features include adding item, payment integration, and admin dashboard.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">HTML</span>
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">Javascript</span>
                  </div>
                </div>
              </div>
              {/* Project 3 */}
              <div className="snap-center w-full min-w-full p-4">
                <div className="bg-slate-800 p-6 rounded-lg max-w-4xl mx-auto mb-4">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    Software engineering Group Project
                    <a className="opacity-70 hover:opacity-100 transition-opacity">
                    </a>
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Built a full-stack school academic tracker collaborated with peers using HTML, Javascript, and MongoDB.
                    Features include user authentication, student dashboard, and admin dashboard.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">HTML</span>
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">Javascript</span>
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">MongoDB</span>
                  </div>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg max-w-4xl mx-auto">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    Asset Management System Project
                    <a className="opacity-70 hover:opacity-100 transition-opacity">
                    </a>
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Built a full-stack IT Asset Management system (资产管理系统) using VBA.
                    Features include user authentication, adding, removing asset and admin dashboard.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">VBA</span>
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">Excel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => scrollToProject(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentProject === index 
                    ? 'bg-blue-500 scale-110' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
        
      {/* Contact Section */}
      <section id="contact" className="h-screen w-full flex flex-col justify-center items-center bg-slate-800 text-white snap-start">
        <div className="max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-slate-300 mb-6">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your team.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail size={24} className="text-blue-400" />
                    <a 
                      href="mailto:phi17mei@gmail.com" 
                      className="text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      phi17mei@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Linkedin size={24} className="text-blue-400" />
                    <a 
                      href="https://linkedin.com/in/phichayapa-mei-soranaraksopon-7b5b82259/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Github size={24} className="text-blue-400" />
                    <a 
                      href="https://github.com/phiiim" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-blue-400 transition-colors"
                    >
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
              <form className="space-y-4" onSubmit={sendEmail}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
                <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;