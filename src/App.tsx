/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Book, 
  FileText, 
  CheckCircle, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Share2, 
  Copy, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUp, 
  Search, 
  Sparkles, 
  Download, 
  ChevronRight, 
  Image, 
  Heart,
  ExternalLink,
  Check,
  PenTool,
  Building,
  Laptop,
  Layers,
  Send,
  Info,
  Feather,
  Palette
} from 'lucide-react';
import { 
  magazineAbout, 
  editorialBoard, 
  submissionGuidelines, 
  currentCall, 
  publishedIssues, 
  contactInfo,
  galleryImages
} from './data';
import { Issue } from './types';

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Search State for published issues
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Scroll & Reading Progress State
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Copy Link State
  const [copied, setCopied] = useState<boolean>(false);

  // Gallery Modal State
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  // Contact Form States
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // References for sections to track active state on scroll
  const sectionsRef = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    board: useRef<HTMLElement>(null),
    submissions: useRef<HTMLElement>(null),
    currentCall: useRef<HTMLElement>(null),
    issues: useRef<HTMLElement>(null),
    gallery: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Synchronize Dark Mode Class on HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle Scroll Progress, Navbar background, and Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading Progress Bar
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }

      // 2. Back to Top Button visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // 3. Highlight active navigation section
      const scrollPosition = window.scrollY + 120; // offset for sticky navbar
      
      Object.entries(sectionsRef).forEach(([key, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (sectionId: keyof typeof sectionsRef) => {
    setMobileMenuOpen(false);
    const element = sectionsRef[sectionId].current;
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Copy website link to clipboard
  const copyWebsiteLink = () => {
    const siteUrl = 'https://nilasha.pro.bd';
    navigator.clipboard.writeText(siteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Filter Issues
  const filteredIssues = publishedIssues.filter(issue => 
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.issueNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.publishDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const regularIssues = filteredIssues.filter(issue => !issue.isSpecial);
  const specialIssues = filteredIssues.filter(issue => issue.isSpecial);

  const latestIssue = publishedIssues.find(i => i.featured) || publishedIssues[0];

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 selection:bg-teal-600 selection:text-white">
      
      {/* 1. Reading Progress Bar */}
      <div 
        id="reading-progress-bar"
        className="fixed top-0 left-0 h-[4px] bg-[#00897B] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 3. Sticky Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-shadow duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 h-16 flex justify-between items-center">
          
          {/* Logo / Title */}
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="assets/logo.png" 
              alt="নীলাশা লোগো" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const sibling = e.currentTarget.nextElementSibling;
                if (sibling) sibling.classList.remove('hidden');
              }}
              className="h-10 sm:h-12 w-auto object-contain"
            />
            
            {/* Fallback Logo if image not found */}
            <div className="hidden flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-tr from-[#1F4E79] to-[#00897B] flex items-center justify-center rounded-xl shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-lg">নী</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-[#1F4E79] dark:text-white font-sans">নীলাশা</span>
                <span className="text-[9px] tracking-wider text-[#00897B] dark:text-teal-400 font-semibold font-sans">স্বপ্নে রঙ, ভাবনায় আকাশ</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: 'home', label: 'হোম' },
              { id: 'about', label: 'পরিচিতি' },
              { id: 'board', label: 'সম্পাদনা পরিষদ' },
              { id: 'submissions', label: 'নির্দেশনাবলী' },
              { id: 'currentCall', label: 'লেখা আহ্বান' },
              { id: 'issues', label: 'প্রকাশনাসমূহ' },
              { id: 'gallery', label: 'গ্যালারি' },
              { id: 'contact', label: 'যোগাযোগ' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id as keyof typeof sectionsRef)}
                className={`px-3 py-2 text-xs font-bold transition-all duration-200 border-b-2 ${
                  activeSection === item.id 
                    ? 'text-[#1F4E79] dark:text-[#F4B400] border-[#F4B400]' 
                    : 'text-gray-500 hover:text-[#1F4E79] dark:text-slate-400 dark:hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Area: Dark Mode + Share + Mobile Hambuger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Read Latest Action Button */}
            <button 
              onClick={() => scrollToSection('issues')}
              className="bg-[#1F4E79] text-white px-5 py-2 rounded-full text-xs font-bold transition hover:bg-opacity-90 shadow-md hidden md:inline-block cursor-pointer"
            >
              সর্বশেষ সংখ্যা পড়ুন
            </button>

            {/* Share Trigger */}
            <button 
              onClick={copyWebsiteLink}
              title="লিংক কপি করুন"
              className="p-2.5 text-slate-500 hover:text-[#1F4E79] dark:text-slate-400 dark:hover:text-[#F4B400] rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
              {copied && (
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-lg">
                  লিংক কপিড!
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'লাইট মোড অন করুন' : 'ডার্ক মোড অন করুন'}
              className="p-2.5 text-slate-500 hover:text-[#1F4E79] dark:text-slate-400 dark:hover:text-[#F4B400] rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {darkMode ? <Sun className="w-5 h-5 text-[#F4B400] animate-spin-slow" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 lg:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-sm">
          <div className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <img 
                    src="assets/logo.png" 
                    alt="নীলাশা লোগো" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const sibling = e.currentTarget.nextElementSibling;
                      if (sibling) sibling.classList.remove('hidden');
                    }}
                    className="h-8 w-auto object-contain"
                  />
                  
                  {/* Fallback Logo if image not found */}
                  <div className="hidden flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1F4E79] rounded-lg flex items-center justify-center text-white">
                      <span className="font-serif font-bold text-sm">ন</span>
                    </div>
                    <span className="font-bold text-lg text-[#1F4E79] dark:text-amber-400 font-sans">নীলাশা</span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: 'home', label: 'হোম' },
                  { id: 'about', label: 'পরিচিতি' },
                  { id: 'board', label: 'সম্পাদনা পরিষদ' },
                  { id: 'submissions', label: 'নির্দেশনাবলী' },
                  { id: 'currentCall', label: 'লেখা আহ্বান' },
                  { id: 'issues', label: 'প্রকাশনাসমূহ' },
                  { id: 'gallery', label: 'গ্যালারি' },
                  { id: 'contact', label: 'যোগাযোগ' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id as keyof typeof sectionsRef)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition ${
                      activeSection === item.id 
                        ? 'bg-primary/5 text-primary dark:bg-slate-800 dark:text-amber-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-center text-slate-400 dark:text-slate-500 font-mono">
                nilasha.pro.bd © 2026
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Hero Section (Split Layout) */}
      <section 
        id="home"
        ref={sectionsRef.home}
        className="relative overflow-hidden border-b border-gray-100 dark:border-slate-800 bg-[#F8F9FA] dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[600px] lg:min-h-[640px]">
          
          {/* Left Content Column */}
          <div className="w-full lg:w-[55%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#F8F9FA] dark:bg-slate-900/40">
            <div>
              <div className="inline-block px-3.5 py-1.5 bg-[#F4B400] text-[#1F4E79] text-[11px] font-bold uppercase tracking-widest rounded-md mb-6 shadow-sm">
                Digital Literary Space • Since 2025
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1F4E79] dark:text-white leading-[1.15] mb-6 font-sans tracking-tight">
                শব্দের ভাঁজে <br />
                <span className="text-[#00897B] dark:text-teal-400">সৃজনশীলতার</span> জয়গান।
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 dark:text-slate-350 max-w-xl leading-relaxed mb-8">
                {magazineAbout.subtitle}। আমরা বিশ্বাস করি সৃষ্টির কোনো শেষ নেই, আর তাই তরুণ মননশীল লেখকদের সাহিত্য ভাবনাকে পাঠকের হাতের মুঠোয় পৌঁছে দিতে আমাদের এই ধারাবাহিক পথচলা।
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => scrollToSection('issues')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#1F4E79] text-white font-bold rounded-lg shadow-lg hover:-translate-y-0.5 transition duration-300 flex items-center justify-center gap-2 group text-sm uppercase tracking-wider dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-500"
                >
                  <BookOpen className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  <span>সংখ্যাসমূহ পড়ুন</span>
                </button>

                <button
                  onClick={() => scrollToSection('submissions')}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-[#1F4E79] text-[#1F4E79] font-bold rounded-lg hover:bg-[#1F4E79] hover:text-white transition duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-slate-950"
                >
                  <FileText className="w-5 h-5" />
                  <span>লেখা পাঠানোর নিয়মাবলী</span>
                </button>
              </div>

              {/* Minimal Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 max-w-xl">
                <div>
                  <h3 className="text-3xl font-extrabold text-[#1F4E79] dark:text-[#F4B400] font-serif">২০২৫</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">প্রতিষ্ঠাকাল</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-[#1F4E79] dark:text-[#F4B400] font-serif">১০০%</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">মৌলিক সাহিত্য</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-[#1F4E79] dark:text-[#F4B400] font-serif">৭টি</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">প্রকাশিত সংখ্যা</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-[#1F4E79] dark:text-[#F4B400] font-serif">৬,২০০+</h3>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">শুভাকাঙ্ক্ষী পাঠক</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Column (Magazine Showcase Layout) */}
          <div className="w-full lg:w-[45%] bg-white dark:bg-slate-950 relative flex items-center justify-center p-8 sm:p-12">
            <div className="absolute inset-0 opacity-5 pointer-events-none dark:opacity-10">
              <div className="grid grid-cols-10 gap-2 p-4">
                 <div className="w-1 h-1 bg-[#1F4E79] rounded-full"></div>
                 <div className="w-1 h-1 bg-[#1F4E79] rounded-full"></div>
                 <div className="w-1 h-1 bg-[#1F4E79] rounded-full"></div>
              </div>
            </div>
            
            <div className="relative group w-full max-w-[340px]">
              {/* Glowing gradient back element */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#1F4E79] to-[#00897B] rounded-[40px] blur-2xl opacity-20 pointer-events-none"></div>
              
              {/* Cover Mockup Container */}
              <div className="relative w-full aspect-[3/4.2] bg-[#1F4E79] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 flex flex-col group">
                
                {/* Magazine Cover Mockup (Top 2/3) */}
                <div className="h-[65%] relative overflow-hidden bg-gradient-to-b from-gray-700 to-gray-900 p-4">
                  <div className="border-2 border-white/20 w-full h-full rounded-xl overflow-hidden relative flex flex-col items-center justify-center p-6">
                    <img 
                      src={latestIssue.coverUrl} 
                      alt={latestIssue.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-2 tracking-wide font-sans text-shadow">নীলাশা</h2>
                      <span className="text-white/80 text-xs tracking-[0.3em] uppercase bg-slate-950/40 px-3 py-1 rounded-md">{latestIssue.issueNo}</span>
                    </div>
                  </div>
                </div>
                
                {/* Info Block (Bottom 1/3) */}
                <div className="h-[35%] bg-white dark:bg-slate-800 p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#00897B] dark:text-teal-400 mb-1 tracking-tighter">Featured Issue • সর্বশেষ সংখ্যা</p>
                    <h3 className="text-base sm:text-lg font-bold leading-tight text-slate-900 dark:text-white line-clamp-2">{latestIssue.title}</h3>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 dark:border-slate-700/60 pt-3">
                    <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-400">{latestIssue.publishDate}</span>
                    <a 
                      href={latestIssue.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[11px] font-bold text-[#1F4E79] dark:text-amber-400 hover:underline uppercase tracking-wider"
                    >
                      READ ISSUE →
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. About Section */}
      <section 
        id="about"
        ref={sectionsRef.about}
        className="py-20 bg-white dark:bg-slate-950 scroll-mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-3">আমাদের কথা</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#1F4E79] dark:text-white mb-4">নীলাশা সাহিত্য পত্রিকার পরিচিতি</p>
            <div className="h-1 w-20 bg-[#F4B400] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[#F4B400] rounded-tl-xl pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-[#00897B] rounded-br-xl pointer-events-none" />
                
                {/* Main Illustration Styled Card */}
                <div className="p-8 sm:p-10 bg-[#F8F9FA] dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1F4E79]/5 rounded-full blur-2xl" />
                  <div className="text-6xl text-[#F4B400] font-serif leading-none mb-6">“</div>
                  <blockquote className="text-lg text-slate-700 dark:text-slate-300 font-serif italic leading-relaxed mb-6">
                    সাহিত্য মানুষের জীবনকে সুন্দর ও পরিশীলিত করে। নতুন দিনের সাহিত্য ভাবনায় তরুণেরাই হোক প্রধান চালিকাশক্তি।
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1F4E79] flex items-center justify-center text-white font-bold">ন</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">নীলাশা সম্পাদকীয় দল</p>
                      <p className="text-xs text-slate-400">সাহিত্য ত্রৈমাসিক</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy Column */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold text-[#1F4E79] dark:text-white mb-6">
                তারুণ্যের কলমে বাংলা সাহিত্যের নব দিগন্ত
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-base mb-6 leading-relaxed">
                {magazineAbout.description}
              </p>

              <p className="text-slate-600 dark:text-slate-400 text-base mb-8 leading-relaxed">
                {magazineAbout.mission}
              </p>

              {/* Grid of details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {magazineAbout.keyMetrics.map((metric, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800/80 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition"
                  >
                    <CheckCircle className="w-5 h-5 text-[#00897B] dark:text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#1F4E79] dark:text-white mb-1">{metric.label}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slogan Banner Block */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1F4E79] to-[#00897B] text-white text-center relative overflow-hidden shadow-lg group">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Elegant Calligraphic Corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg pointer-events-none" />
            
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest block mb-3 font-sans">নীলাশা সাহিত্য স্লোগান</span>
            <h3 className="text-2xl sm:text-4xl font-black mb-4 font-sans tracking-wide drop-shadow-sm">
              “স্বপ্নে রঙ, ভাবনায় আকাশ”
            </h3>
            <div className="h-0.5 w-16 bg-[#F4B400] mx-auto rounded-full mb-4" />
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed font-serif">
              কল্পনার অসীম আকাশে স্বপ্নের ডানা মেলুক প্রতিটি শব্দ, তরুণ প্রাণের ভাবনার আলো ছড়িয়ে পড়ুক সারা বিশ্বে।
            </p>
          </div>

        </div>
      </section>

      {/* 6. Editorial Board Section */}
      <section 
        id="board"
        ref={sectionsRef.board}
        className="py-20 bg-[#F8F9FA] dark:bg-slate-900 scroll-mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-3">পরিষদ</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#1F4E79] dark:text-white mb-4">আমাদের সম্পাদনা পরিষদ</p>
            <div className="h-1 w-20 bg-[#F4B400] mx-auto rounded-full" />
            <p className="text-sm text-slate-500 mt-4 font-sans">
              যাদের নিরলস প্রচেষ্টা ও শিল্প ভাবনায় নীলাশা পত্রিকা পাঠকদের মাঝে পরিচিতি লাভ করছে।
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {editorialBoard.map((member) => (
              <div 
                key={member.id}
                className="w-full sm:w-[280px] bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700/60 p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition duration-300 relative overflow-hidden group"
              >
                {/* Decorative badge design element */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1F4E79] to-[#00897B]" />

                {/* Institution Tag Overlay */}
                {member.isInstitution && (
                  <span className="absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-widest bg-teal-50 dark:bg-teal-950/40 text-[#00897B] dark:text-teal-400 px-2.5 py-1 rounded-md border border-teal-100 dark:border-teal-900/40 select-none font-sans">
                    সহযোগী প্রতিষ্ঠান
                  </span>
                )}

                {/* Profile Avatar */}
                <div className="relative w-24 h-24 mb-4 mt-2">
                  <div className="absolute inset-0 bg-[#1F4E79]/10 rounded-full scale-105 group-hover:scale-110 transition duration-300" />
                  
                  {member.isInstitution ? (
                    <div className="w-full h-full rounded-full border-2 border-white dark:border-slate-800 shadow relative z-10 bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-[#1F4E79] dark:text-amber-400">
                      {member.id === "board-4" ? (
                        <Layers className="w-10 h-10" />
                      ) : (
                        <Laptop className="w-10 h-10" />
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full border-2 border-white dark:border-slate-800 shadow relative z-10 bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
                      {member.id === "board-1" ? (
                        <PenTool className="w-10 h-10 text-[#1F4E79] dark:text-amber-400" />
                      ) : member.id === "board-2" ? (
                        <Feather className="w-10 h-10 text-[#00897B] dark:text-teal-400" />
                      ) : (
                        <Palette className="w-10 h-10 text-amber-500 dark:text-amber-300" />
                      )}
                    </div>
                  )}

                  {/* Pen Nib / Building Icon Badge Overlay on Avatar */}
                  <div className="absolute bottom-0 right-0 z-20 w-7 h-7 bg-[#F4B400] text-[#1F4E79] rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-md group-hover:rotate-12 transition duration-300">
                    {member.isInstitution ? (
                      <Building className="w-3.5 h-3.5" />
                    ) : (
                      <PenTool className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#1F4E79] dark:group-hover:text-[#F4B400] transition-colors">
                  {member.name}
                </h3>
                
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 mb-2">
                  {member.role}
                </span>

                <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-serif font-semibold mt-1">
                  {member.roleEn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Submission Guidelines Section */}
      <section 
        id="submissions"
        ref={sectionsRef.submissions}
        className="py-20 bg-white dark:bg-slate-950 scroll-mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-3">নিয়মাবলী</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#1F4E79] dark:text-white mb-4">লেখা পাঠানোর নির্দেশিকা</p>
            <div className="h-1 w-20 bg-[#F4B400] mx-auto rounded-full" />
            <p className="text-sm text-slate-500 mt-4">
              নীলাশা পত্রিকায় আপনার মূল্যবান লেখাটি পাঠানোর পূর্বে নিম্নলিখিত নিয়মনীতিসমূহ সতর্কতার সাথে পড়ে নিন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Visual Guidelines Panel */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#1F4E79] to-[#153856] text-slate-100 p-8 rounded-3xl shadow-lg relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  <h3 className="text-2xl font-bold font-sans text-white mb-4">কেন নীলাশায় লিখবেন?</h3>
                  <p className="text-sm text-slate-200/90 leading-relaxed mb-6 font-sans">
                    আমরা তরুণ লেখকদের লেখার প্রতি সর্বোচ্চ যত্নশীল। আপনার প্রতিটি সৃষ্টিকে নান্দনিক অঙ্গসজ্জা এবং প্রচ্ছদ দিয়ে সাজিয়ে হাজারো পাঠকের মাঝে ছড়িয়ে দেওয়াই আমাদের ব্রত।
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F4B400]">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">সাহিত্য ত্রৈমাসিক</p>
                      <p className="text-xs text-slate-300">একটি সৃজনশীল পথচলা</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Beautiful Checklist */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {submissionGuidelines.map((item, index) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-5 rounded-2xl bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800/80 hover:border-[#00897B]/30 hover:shadow-md transition group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1F4E79]/5 dark:bg-slate-800 text-[#1F4E79] dark:text-[#F4B400] flex items-center justify-center shrink-0 font-bold font-serif group-hover:scale-105 transition-transform">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 8. Current Call for Submissions Section */}
      <section 
        id="currentCall"
        ref={sectionsRef.currentCall}
        className="py-20 bg-[#F8F9FA] dark:bg-slate-900 scroll-mt-10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12">
            
            {/* Call Status Badge */}
            <div className="absolute top-0 right-0">
              <span className={`inline-block px-8 py-2.5 font-sans font-bold text-sm text-center uppercase tracking-wider shadow-sm transform rotate-45 translate-x-8 translate-y-4 ${
                currentCall.status === 'OPEN' 
                  ? 'bg-[#00897B] text-white' 
                  : 'bg-rose-500 text-white'
              }`}>
                {currentCall.status === 'OPEN' ? 'লেখা চলছে' : 'বন্ধ রয়েছে'}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-[#F4B400] text-[#1F4E79] rounded-xl shadow-sm">
                <Calendar className="w-5 h-5" />
              </span>
              <h2 className="text-xs font-extrabold text-[#1F4E79] dark:text-[#F4B400] uppercase tracking-widest leading-none">ঘোষণা</h2>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F4E79] dark:text-white mb-2">
              লেখা আহ্বান: {currentCall.title}
            </h3>

            <p className="text-sm font-semibold text-[#00897B] dark:text-teal-400 mb-6 bg-[#00897B]/5 dark:bg-teal-950/20 px-3 py-1.5 rounded-lg inline-block">
              সংখ্যা থিম: {currentCall.theme}
            </p>

            <div className="mb-8 pt-6 border-t border-gray-100 dark:border-slate-700/60">
              <h4 className="text-base font-bold text-[#1F4E79] dark:text-white mb-4">যেসব বিভাগে লেখা পাঠাতে পারেন:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentCall.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-[#00897B] mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-amber-50 dark:bg-[#1F4E79]/10 border border-[#F4B400]/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <p className="text-xs text-[#00897B] dark:text-amber-400 font-semibold mb-0.5 uppercase tracking-wide">লেখা পাঠানোর শেষ সময়</p>
                <p className="text-lg font-bold text-[#1F4E79] dark:text-amber-300">{currentCall.deadline}</p>
              </div>
              <a 
                href={`mailto:${currentCall.submissionEmail}`}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1F4E79] hover:bg-opacity-95 text-white font-bold text-sm text-center shadow-md transition dark:bg-[#F4B400] dark:text-[#1F4E79] dark:hover:bg-opacity-90 cursor-pointer"
              >
                ইমেইল পাঠান
              </a>
            </div>

            <div className="text-xs text-slate-400 text-center flex flex-wrap justify-center items-center gap-4">
              <span>ফেসবুক পেজ: <a href={currentCall.detailsLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#1F4E79] dark:hover:text-[#F4B400] underline">{contactInfo.facebookUsername}</a></span>
              <span className="hidden sm:inline">•</span>
              <span>মোবাইল: {currentCall.submissionPhone}</span>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Published Issues Section */}
      <section 
        id="issues"
        ref={sectionsRef.issues}
        className="py-20 bg-white dark:bg-slate-950 scroll-mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-3">সংগ্রহশালা</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#1F4E79] dark:text-white mb-2">প্রকাশিত সংখ্যাসমূহ</p>
              <div className="h-1 w-20 bg-[#F4B400] rounded-full" />
              <p className="text-sm text-slate-500 mt-4">
                নীলাশার প্রথম প্রকাশ থেকে শুরু করে সর্বশেষ প্রকাশিত সকল সংখ্যা খুঁজে পাবেন এখানে। সরাসরি পিডিএফ পড়তে বা ফেসবুক পোস্ট দেখতে নির্দিষ্ট বাটনে ক্লিক করুন।
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সংখ্যা বা শিরোনাম দিয়ে খুঁজুন..."
                className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4E79] dark:focus:ring-amber-400 dark:text-white transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-600"
                >
                  ক্লিয়ার
                </button>
              )}
            </div>
          </div>

          {/* Grid Layout */}
          {filteredIssues.length > 0 ? (
            <div className="space-y-16">
              
              {/* 1. Regular Issues */}
              {regularIssues.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-6 w-1.5 bg-[#1F4E79] rounded-full" />
                    <h3 className="text-xl font-extrabold text-[#1F4E79] dark:text-white font-sans">প্রকাশিত নিয়মিত সংখ্যাসমূহ</h3>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-mono">{regularIssues.length}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {regularIssues.map((issue) => (
                      <article 
                        key={issue.id}
                        className="bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800/80 rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition duration-300 relative group"
                      >
                        {/* Image Container with Cover ratio (3:4) */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-850">
                          <img 
                            src={issue.coverUrl} 
                            alt={issue.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          
                          {/* Floating Info Overlays */}
                          <div className="absolute top-4 left-4 bg-slate-950/75 backdrop-blur text-white text-[11px] font-medium font-sans px-2.5 py-1 rounded-md">
                            {issue.issueNo}
                          </div>

                          {issue.featured && (
                            <div className="absolute top-4 right-4 bg-[#F4B400] text-[#1F4E79] text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow uppercase tracking-wide select-none">
                              নতুন সংখ্যা
                            </div>
                          )}
                        </div>

                        {/* Body Text */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{issue.publishDate}</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2 group-hover:text-[#1F4E79] dark:group-hover:text-amber-400 transition-colors">
                              {issue.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                              {issue.description}
                            </p>
                          </div>

                          {/* Footer Buttons */}
                          <div className={`grid ${issue.pdfUrl ? 'grid-cols-2' : 'grid-cols-1'} gap-3 pt-4 border-t border-gray-100 dark:border-slate-800`}>
                            {issue.pdfUrl && (
                              <a 
                                href={issue.pdfUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex justify-center items-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1F4E79] text-white hover:bg-opacity-95 text-xs font-semibold shadow-sm transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>পিডিএফ</span>
                              </a>
                            )}
                            <a 
                              href={issue.facebookUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`inline-flex justify-center items-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#00897B] hover:bg-opacity-95 text-white text-xs font-semibold shadow-sm transition ${
                                !issue.pdfUrl ? 'w-full' : ''
                              }`}
                            >
                              <Facebook className="w-3.5 h-3.5" />
                              <span>ফেসবুক</span>
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Special Issues */}
              {specialIssues.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-6 w-1.5 bg-[#F4B400] rounded-full" />
                    <h3 className="text-xl font-extrabold text-[#1F4E79] dark:text-white font-sans">বিশেষ সংখ্যা (সীমিত)</h3>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full font-mono">{specialIssues.length}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {specialIssues.map((issue) => (
                      <article 
                        key={issue.id}
                        className="bg-amber-50/10 dark:bg-slate-900/40 border border-amber-100/50 dark:border-amber-900/20 rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition duration-300 relative group"
                      >
                        {/* Image Container with Cover ratio (3:4) */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-850">
                          <img 
                            src={issue.coverUrl} 
                            alt={issue.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          
                          {/* Floating Info Overlays */}
                          <div className="absolute top-4 left-4 bg-amber-500 text-white text-[11px] font-extrabold font-sans px-2.5 py-1 rounded-md">
                            {issue.issueNo}
                          </div>

                          <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow uppercase tracking-wide select-none">
                            সীমিত সংখ্যা
                          </div>
                        </div>

                        {/* Body Text */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{issue.publishDate}</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {issue.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                              {issue.description}
                            </p>
                          </div>

                          {/* Footer Buttons */}
                          <div className={`grid ${issue.pdfUrl ? 'grid-cols-2' : 'grid-cols-1'} gap-3 pt-4 border-t border-amber-100/40 dark:border-slate-800`}>
                            {issue.pdfUrl && (
                              <a 
                                href={issue.pdfUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex justify-center items-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1F4E79] text-white hover:bg-opacity-95 text-xs font-semibold shadow-sm transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>পিডিএফ</span>
                              </a>
                            )}
                            <a 
                              href={issue.facebookUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`inline-flex justify-center items-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-opacity-95 text-white text-xs font-semibold shadow-sm transition ${
                                !issue.pdfUrl ? 'w-full bg-[#00897B] hover:bg-opacity-95' : ''
                              }`}
                            >
                              <Facebook className="w-3.5 h-3.5" />
                              <span>ফেসবুক পোস্ট</span>
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-16 bg-[#F8F9FA] dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl">
              <p className="text-slate-500">আপনার অনুসন্ধান করা সংখ্যার সাথে কোনো মিল পাওয়া যায়নি। দয়া করে অন্য কোনো শিরোনাম দিয়ে চেষ্টা করুন।</p>
            </div>
          )}

        </div>
      </section>

      {/* 10. Gallery Section */}
      <section 
        id="gallery"
        ref={sectionsRef.gallery}
        className="py-20 bg-[#F8F9FA] dark:bg-slate-900 scroll-mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-3">চিত্রশালা</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#1F4E79] dark:text-white mb-4">সংখ্যা প্রচ্ছদ গ্যালারি</p>
            <div className="h-1 w-20 bg-[#F4B400] mx-auto rounded-full" />
            <p className="text-sm text-slate-500 mt-4">
              নীলাশার প্রতিটি সংখ্যার নান্দনিকভাবে ডিজাইনকৃত প্রচ্ছদসমূহ একনজরে দেখুন। প্রচ্ছদের উপর ক্লিক করে বড় আকারে প্রচ্ছদটি দেখার সুযোগ রয়েছে।
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <div 
                key={image.id}
                onClick={() => setSelectedImage({ url: image.url, title: image.title })}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer group border border-slate-200 dark:border-slate-800"
              >
                <img 
                  src={image.url} 
                  alt={image.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 bg-white/20 backdrop-blur rounded-full text-white">
                    <Image className="w-6 h-6" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-950/70 to-transparent">
                  <p className="text-xs font-semibold text-white truncate">{image.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-lg w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-4 border border-slate-800">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 bg-slate-850 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden border border-slate-800">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-bold text-center text-slate-300 mt-4 font-sans">{selectedImage.title}</p>
          </div>
        </div>
      )}

      {/* 11. Contact Section */}
      <section 
        id="contact"
        ref={sectionsRef.contact}
        className="py-20 bg-white dark:bg-slate-950 scroll-mt-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title & intro */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-xs font-bold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-3 font-sans">যোগাযোগ</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#1F4E79] dark:text-white mb-4">আমাদের দপ্তরে যোগাযোগ করুন</p>
            <div className="h-1 w-20 bg-[#F4B400] mx-auto rounded-full mb-4" />
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              নীলাশা সাহিত্য পত্রিকার যেকোনো বিষয়ে তথ্যাদি বা মতামতের জন্য সরাসরি যোগাযোগ করুন অথবা আপনার বার্তা আমাদের পাঠিয়ে দিন।
            </p>
          </div>

          {/* 1 Row of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Card 1: দপ্তর */}
            <div className="bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition duration-300">
              <div className="w-11 h-11 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 rounded-xl text-[#1F4E79] dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-1 font-sans">দপ্তর</h4>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal break-words">{contactInfo.location}</p>
              </div>
            </div>

            {/* Card 2: কথোপকথন */}
            <div className="bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition duration-300">
              <div className="w-11 h-11 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 rounded-xl text-[#1F4E79] dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-1 font-sans">কথোপকথন</h4>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal font-sans">
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-[#1F4E79] dark:hover:text-amber-400 transition break-all block">{contactInfo.phone}</a>
                </p>
              </div>
            </div>

            {/* Card 3: ইমেইল ঠিকানা */}
            <div className="bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition duration-300">
              <div className="w-11 h-11 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 rounded-xl text-[#1F4E79] dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-1 font-sans">ইমেইল ঠিকানা</h4>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal font-sans">
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-[#1F4E79] dark:hover:text-amber-400 transition break-all block">{contactInfo.email}</a>
                </p>
              </div>
            </div>

            {/* Card 4: ফেসবুক পেজ */}
            <div className="bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition duration-300">
              <div className="w-11 h-11 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 rounded-xl text-[#1F4E79] dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-[#00897B] dark:text-teal-400 uppercase tracking-widest mb-1 font-sans">ফেসবুক পেজ</h4>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-normal font-sans">
                  <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#1F4E79] dark:hover:text-amber-400 transition break-all block underline">{contactInfo.facebookUsername}</a>
                </p>
              </div>
            </div>

          </div>

          {/* Message Form Box */}
          <div className="max-w-3xl mx-auto bg-[#F8F9FA] dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-md">
            
            {formSubmitted ? (
              <div className="text-center py-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#00897B]/10 dark:bg-teal-400/10 text-[#00897B] dark:text-teal-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F4E79] dark:text-white mb-2">বার্তাটি সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                  প্রিয় <strong>{contactName}</strong>, নীলাশা পত্রিকার সম্পাদকীয় বা কারিগরি প্যানেলে আপনার মতামত জানানোর জন্য আন্তরিক ধন্যবাদ। শীঘ্রই আমরা মেইলে আপনার সাথে যোগাযোগ করব।
                </p>
                
                {/* Submitted Content Summary */}
                <div className="w-full max-w-md bg-white dark:bg-slate-850 border border-gray-100 dark:border-slate-750 rounded-2xl p-5 mb-8 text-left shadow-inner">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-slate-700/60 mb-3 text-[#1F4E79] dark:text-amber-400 font-bold text-sm">
                    <Send className="w-4 h-4" />
                    <span>পাঠানো বার্তার অনুলিপি:</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="text-slate-500 dark:text-slate-400"><span className="font-semibold text-slate-700 dark:text-slate-300">নাম:</span> {contactName}</p>
                    <p className="text-slate-500 dark:text-slate-400"><span className="font-semibold text-slate-700 dark:text-slate-300">যোগাযোগ:</span> {contactPhone} | {contactEmail}</p>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed"><span className="font-semibold text-slate-700 dark:text-slate-300">বার্তা:</span> "{contactMessage}"</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setContactName('');
                    setContactPhone('');
                    setContactEmail('');
                    setContactMessage('');
                    setFormSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#1F4E79] hover:bg-opacity-95 text-white dark:bg-[#F4B400] dark:text-slate-950 dark:hover:bg-amber-500 font-bold text-xs shadow transition cursor-pointer font-sans"
                >
                  নতুন বার্তা লিখুন
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-[#1F4E79] dark:text-white mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F4B400]" />
                  <span>বার্তা পাঠান (যোগাযোগ বা প্রতিক্রিয়া)</span>
                </h3>
                
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    setFormSubmitted(true); 
                  }} 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 font-sans">আপনার নাম</label>
                    <input 
                      type="text" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="নাম লিখুন"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4E79] dark:focus:ring-amber-400 dark:text-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 font-sans">আপনার ফোন নম্বর</label>
                    <input 
                      type="tel" 
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="০১৭XXXXXXXX"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4E79] dark:focus:ring-amber-400 dark:text-white transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 font-sans">ইমেইল ঠিকানা</label>
                    <input 
                      type="email" 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4E79] dark:focus:ring-amber-400 dark:text-white transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 font-sans">বার্তার বিবরণ</label>
                    <textarea 
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="নীলাশা সম্পর্কে আপনার বার্তা বা মতামত লিখুন..."
                      className="w-full px-4 py-3 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4E79] dark:focus:ring-amber-400 dark:text-white transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button 
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#1F4E79] hover:bg-opacity-95 dark:bg-[#F4B400] dark:text-slate-950 dark:hover:bg-amber-500 text-white font-bold text-sm text-center shadow-md transition cursor-pointer font-sans"
                    >
                      বার্তা সাবমিট করুন
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-[#1F4E79] dark:bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-[#153856] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Logo Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#F4B400] rounded-lg flex items-center justify-center text-[#1F4E79] font-serif font-bold">ন</div>
                <span className="text-xl font-bold text-white b-label">নীলাশা</span>
              </div>
              <p className="text-xs text-slate-200/80 leading-relaxed mb-4">
                তরুণ প্রতিভার উন্মেষ ও সৃজনশীলতার একটি অনন্য ডিজিটাল সাহিত্য ই-ম্যাগাজিন প্ল্যাটফর্ম।
              </p>
              <div className="flex items-center gap-3">
                <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#153856] dark:bg-slate-800 hover:bg-opacity-95 text-white rounded-lg transition" title="ফেসবুক পেজ">
                  <Facebook className="w-4 h-4" />
                </a>
                <button onClick={copyWebsiteLink} className="p-2 bg-[#153856] dark:bg-slate-800 hover:bg-opacity-95 text-white rounded-lg transition" title="লিংক কপি করুন">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">ম্যাগাজিন লিংক</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-200/80">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-[#F4B400] transition text-left">হোম পেজ</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-[#F4B400] transition text-left">পত্রিকা পরিচিতি</button></li>
                <li><button onClick={() => scrollToSection('board')} className="hover:text-[#F4B400] transition text-left">সম্পাদনা পরিষদ</button></li>
                <li><button onClick={() => scrollToSection('submissions')} className="hover:text-[#F4B400] transition text-left">লেখা পাঠানোর নিয়ম</button></li>
              </ul>
            </div>

            {/* Quick Actions Column */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">অন্যান্য লিংক</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-200/80">
                <li><button onClick={() => scrollToSection('currentCall')} className="hover:text-[#F4B400] transition text-left">লেখা আহবান নোটিশ</button></li>
                <li><button onClick={() => scrollToSection('issues')} className="hover:text-[#F4B400] transition text-left">প্রকাশিত ই-বুক সংখ্যা</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="hover:text-[#F4B400] transition text-left">প্রচ্ছদ চিত্রশালা</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#F4B400] transition text-left">কার্যালয় যোগাযোগ</button></li>
              </ul>
            </div>

            {/* Visitor Counter Column */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">ভিজিটর পরিসংখ্যান</h4>
              <p className="text-xs text-slate-200/70 leading-relaxed mb-4">
                আমাদের সাহিত্য প্ল্যাটফর্মে ভিজিটরের রিয়েল-টাইম কাউন্টার:
              </p>
              
              {/* Privacy Friendly Busuanzi Static Integration */}
              <div className="inline-flex flex-col bg-[#153856] dark:bg-slate-850 p-4 rounded-xl border border-[#1a4469] shadow-inner w-full">
                <span className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-200/80">মোট ভিজিটর:</span>
                  {/* Busuanzi site PV element */}
                  <span id="busuanzi_container_site_pv" className="font-mono font-bold text-[#F4B400] bg-[#122e47] px-2.5 py-0.5 rounded-md min-w-[50px] text-center">
                    <span id="busuanzi_value_site_pv">৯,৪১২</span>
                  </span>
                </span>
                <span className="flex items-center justify-between text-xs">
                  <span className="text-slate-200/80">মোট পাঠক সংখ্যা:</span>
                  {/* Busuanzi site UV element */}
                  <span id="busuanzi_container_site_uv" className="font-mono font-bold text-teal-300 bg-[#122e47] px-2.5 py-0.5 rounded-md min-w-[50px] text-center">
                    <span id="busuanzi_value_site_uv">৩,২৭৪</span>
                  </span>
                </span>
                
                {/* Fallback counter trigger widget for offline or non-loading states */}
                <div className="text-[10px] text-slate-400 font-mono text-center mt-2 pt-2 border-t border-[#1a4469]">
                  <span>Powered by Busuanzi Security</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom copyright and developer credits */}
          <div className="pt-8 border-t border-[#153856] text-xs flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-200/70 select-none">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} নীলাশা (Nilasha). সর্বস্বত্ব সংরক্ষিত। 
              <span className="ml-1 text-[10px] bg-[#153856] px-2 py-0.5 rounded text-slate-300">GitHub Pages Ready</span>
            </p>
            <p className="flex items-center gap-1.5 justify-center">
              <span>কারিগরি সহায়তায় ও ডেভেলপমেন্টে:</span>
              <a 
                href="https://www.facebook.com/nilasha.net" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-white hover:text-[#F4B400] transition"
              >
                RST Multimedia
              </a>
              <span>•</span>
              <span className="flex items-center text-rose-400">
                <Heart className="w-3 h-3 fill-current" />
              </span>
            </p>
          </div>

        </div>
      </footer>

      {/* 13. Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-[#1F4E79] dark:bg-amber-400 hover:bg-[#153856] dark:hover:bg-amber-500 text-white dark:text-slate-950 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-30 cursor-pointer animate-bounce"
          title="উপরে যান"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
