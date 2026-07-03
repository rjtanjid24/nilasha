/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Issue, BoardMember, SubmissionGuideline, CallForSubmission, ContactInfo } from './types';

export const magazineAbout = {
  title: "নীলাশা",
  subtitle: "স্বপ্নে রঙ, ভাবনায় আকাশ",
  foundedDate: "মার্চ ২০২৫",
  description: "নীলাশা একটি সৃজনশীল সাহিত্য ত্রৈমাসিক ই-ম্যাগাজিন। তরুণ লেখক, ভাবুক ও কবিদের প্রতিভাকে বিশ্বদরবারে তুলে ধরার প্রয়াস নিয়ে ২০২৫ সালের মার্চ মাসে আমাদের পথচলা শুরু হয়। আমরা বিশ্বাস করি, সাহিত্যের কোনো ভৌগোলিক সীমানা নেই। আর তাই তথ্যপ্রযুক্তির এই যুগে বাংলা সাহিত্যকে বিশ্বব্যাপী ছড়িয়ে দিতে আমরা সম্পূর্ণ ডিজিটাল ফরম্যাটে প্রকাশিত হচ্ছি। বাংলাদেশ, ভারত, আমেরিকা, মালয়েশিয়া, ওমানসহ বিশ্বের বিভিন্ন প্রান্তে ছড়িয়ে থাকা বাংলা ভাষাভাষী লেখক ও পাঠকদের মেলবন্ধনে মুখরিত আমাদের এই সাহিত্য প্রয়াস।",
  mission: "আমাদের মূল উদ্দেশ্য হলো তরুণ লেখকদেরকে অনুপ্রাণিত করা, তাদের মৌলিক রচনা প্রকাশে সর্বোচ্চ সহায়তা দেওয়া এবং রুচিশীল ও সুস্থ চিন্তার বিকাশ ঘটানো। সামাজিক যোগাযোগ মাধ্যম ও আমাদের প্ল্যাটফর্মের মাধ্যমে প্রতিটি প্রকাশনা পাঠকের হাতের মুঠোয় পৌঁছে দেওয়াই আমাদের লক্ষ্য।",
  keyMetrics: [
    { label: "প্রতিষ্ঠাকাল", value: "মার্চ ২০২৫" },
    { label: "প্রকাশিত সংখ্যা", value: "৭টি (৫টি নিয়মিত ও ২টি বিশেষ সংখ্যা)" },
    { label: "ফেসবুক পাঠক ও ফলোয়ার", value: "৬,২০০+ শুভাকাঙ্ক্ষী" },
    { label: "গ্লোবাল নেটওয়ার্ক", value: "বাংলাদেশ, ভারত, আমেরিকা, মালয়েশিয়া ও ওমানসহ ১০+ দেশ" }
  ]
};

export const editorialBoard: BoardMember[] = [
  {
    id: "board-1",
    name: "সাদমান ত্বকী",
    role: "সম্পাদক",
    roleEn: "Editor",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    isInstitution: false
  },
  {
    id: "board-2",
    name: "এম জে এ এনামুল",
    role: "সহকারী সম্পাদক",
    roleEn: "Assistant Editor",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    isInstitution: false
  },
  {
    id: "board-3",
    name: "সাইমা শুভ্র",
    role: "প্রচ্ছদ অলংকরণ",
    roleEn: "Cover Designer",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    isInstitution: false
  },
  {
    id: "board-4",
    name: "RST Multimedia",
    role: "গ্রাফিক্স ও অঙ্গসজ্জা (প্রতিষ্ঠান)",
    roleEn: "Graphics & Design Studio",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    isInstitution: true
  },
  {
    id: "board-5",
    name: "আস্থা কম্পিউটার",
    role: "কম্পোজ ও টাইপোগ্রাফি (প্রতিষ্ঠান)",
    roleEn: "Typography & Page Setup",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    isInstitution: true
  }
];

export const submissionGuidelines: SubmissionGuideline[] = [
  {
    id: "guide-1",
    text: "লেখা শুধুমাত্র নির্দিষ্ট সংখ্যা আহ্বানের পর ইমেইলের (hellonilasha@gmail.com) মাধ্যমে গ্রহণ করা হয়। অন্যথায় কোনো লেখা গ্রহণ করা হয় না বা সংরক্ষণ করা সম্ভব হয় না।"
  },
  {
    id: "guide-2",
    text: "সম্পূর্ণ মৌলিক এবং পূর্বে কোনো মাধ্যমেই (যেমন: ফেসবুক, ব্যক্তিগত ব্লগ বা অন্য কোনো ম্যাগাজিন) অপ্রকাশিত লেখা হতে হবে।"
  },
  {
    id: "guide-3",
    text: "কবিতার ক্ষেত্রে দৈর্ঘ্য ১২ থেকে ১৬ লাইনের মধ্যে হতে হবে। ছড়া অনূর্ধ্ব ২০ লাইন (সর্বোচ্চ ২টি)।"
  },
  {
    id: "guide-4",
    text: "গল্পের ক্ষেত্রে শব্দসীমা ৮০০ থেকে ১০০০ শব্দ এবং মননশীল প্রবন্ধের ক্ষেত্রে ১২০০ থেকে ১৫০০ শব্দের মধ্যে হতে হবে।"
  },
  {
    id: "guide-5",
    text: "কোনো প্রকার সাহিত্য চুরি, অনুবাদ (অনুমতি ছাড়া) বা হুবহু নকল লেখা সম্পূর্ণভাবে বর্জনীয়। ইউনিকোড বাংলা ফন্টে অভ্র বা সমমানের সফটওয়্যার দিয়ে টাইপকৃত লেখা পাঠাতে হবে।"
  },
  {
    id: "guide-6",
    text: "লেখার শুরুতে একটি উপযুক্ত শিরোনাম থাকতে হবে এবং লেখার শেষে লেখকের সংক্ষিপ্ত পরিচিতি (২-৩ বাক্য), স্থায়ী ঠিকানা ও সচল মোবাইল নম্বর যুক্ত করা আবশ্যক।"
  }
];

export const currentCall: CallForSubmission = {
  title: "বর্ষা ও শরৎ সংখ্যা ২০২৬ (নীলাম্বরী)",
  theme: "বর্ষা ও শরতের সজল-শুভ্র মেলবন্ধন (কদম, বৃষ্টি, শিউলি ও কাশফুল)",
  deadline: "১৫ আগস্ট, ২০২৬",
  status: "OPEN",
  requirements: [
    "কবিতা: বর্ষা ও শরতের থিমভিত্তিক বা উন্মুক্ত ছন্দের কবিতা, দৈর্ঘ্য ১২ থেকে ১৬ লাইনের মধ্যে হতে হবে (সর্বোচ্চ ৩টি)।",
    "গল্প: ঋতুভিত্তিক বা যেকোনো সুন্দর ভাবনার চমৎকার ছোটগল্প (সর্বোচ্চ ৮০০-১০০০ শব্দ)।",
    "প্রবন্ধ: বর্ষা ও শরৎ ঋতু বৈচিত্র্য, বাংলার মেলা, উৎসব বা সমসাময়িক সাহিত্য ভাবনা নিয়ে প্রবন্ধ (সর্বোচ্চ ১২০০-১৫০০ শব্দ)।",
    "ছড়া: শিশুতোষ বা যেকোনো বিষয়ের ছড়া (অনূর্ধ্ব ২০ লাইন, সর্বোচ্চ ২টি)।"
  ],
  submissionEmail: "hellonilasha@gmail.com",
  submissionPhone: "+8809696403683",
  detailsLink: "https://www.facebook.com/nilasha.net"
};

export const publishedIssues: Issue[] = [
  {
    id: "issue-5",
    issueNo: "২য় বর্ষ, ১ম সংখ্যা",
    title: "ঈদ সংখ্যা ২০২৬",
    publishDate: "এপ্রিল ২০২৬",
    description: "পবিত্র ঈদুল ফিতরের আনন্দকে রাঙাতে প্রকাশিত আমাদের নতুন সংকলন। এতে স্থান পেয়েছে ঈদ আনন্দ, উৎসব নস্টালজিয়া এবং গভীর ভালোবাসার মননশীল সাহিত্য রকমারি।",
    coverUrl: "assets/covers/eid_2026.jpg",
    pdfUrl: "https://drive.google.com/file/d/1_yO8Yk_example_latest_pdf/view?usp=sharing",
    facebookUrl: "https://www.facebook.com/nilasha.net",
    featured: true,
    isSpecial: false
  },
  {
    id: "issue-4",
    issueNo: "১ম বর্ষ, ৪র্থ সংখ্যা",
    title: "হেমন্ত সংখ্যা",
    publishDate: "নভেম্বর ২০২৫",
    description: "নবান্নের সুবাস আর কুয়াশা জড়ানো সকালের আমেজে সমৃদ্ধ হেমন্ত সংখ্যা। সোনালী ধান কাটার গান আর গ্রামীণ বাংলার ঐতিহ্যঘেঁষা চমৎকার সব গল্প ও কবিতার সংকলন।",
    coverUrl: "assets/covers/hemonto.jpg",
    pdfUrl: "https://drive.google.com/file/d/1_yO8Yk_example_latest_pdf/view?usp=sharing",
    facebookUrl: "https://www.facebook.com/nilasha.net",
    featured: false,
    isSpecial: false
  },
  {
    id: "issue-3",
    issueNo: "১ম বর্ষ, ৩য় সংখ্যা",
    title: "ত্যাগের উৎসব",
    publishDate: "জুন ২০২৫",
    description: "পবিত্র ঈদুল আজহার ত্যাগের মহিমা ও সম্প্রীতির বার্তা ছড়িয়ে দিতে প্রকাশিত বিশেষ সংকলন। আধ্যাত্মিক মনস্তত্ত্ব, আত্মত্যাগ ও উৎসবের আনন্দকে ঘিরে চমৎকার সৃষ্টিশীলতায় ভরপুর।",
    coverUrl: "assets/covers/tyager_utsob.jpg",
    pdfUrl: "https://drive.google.com/file/d/1_yO8Yk_example_autumn_pdf/view?usp=sharing",
    facebookUrl: "https://www.facebook.com/nilasha.net",
    featured: false,
    isSpecial: false
  },
  {
    id: "issue-2",
    issueNo: "১ম বর্ষ, ২য় সংখ্যা",
    title: "নববর্ষ সংখ্যা ২০২৫",
    publishDate: "এপ্রিল ২০২৫",
    description: "শুভ নববর্ষ ১৪৩২ বঙ্গাব্দের নবীন আবাহন নিয়ে প্রকাশিত প্রথম বর্ষের অনন্য বৈশাখী সংকলন। নতুনের কেতন উড়িয়ে বাঙালির চিরায়ত মেলা, হালখাতা ও লোকসংস্কৃতির বৈচিত্র্যময় উপস্থাপন।",
    coverUrl: "assets/covers/noboborsho_2025.jpg",
    pdfUrl: "https://drive.google.com/file/d/1_yO8Yk_example_summer_pdf/view?usp=sharing",
    facebookUrl: "https://www.facebook.com/nilasha.net",
    featured: false,
    isSpecial: false
  },
  {
    id: "issue-1",
    issueNo: "১ম বর্ষ, ১ম সংখ্যা",
    title: "ঈদ সংখ্যা ২০২৫",
    publishDate: "মার্চ ২০২৫",
    description: "নীলাশার গৌরবময় অভিষেক বা উদ্বোধনী প্রকাশনা। উৎসবের আমেজ ও তারুণ্যের উদ্দীপনায় ভরপুর প্রথম সাহিত্য সংকলন যা অগণিত পাঠকের ভালোবাসা অর্জন করেছে।",
    coverUrl: "assets/covers/eid_2025.jpg",
    pdfUrl: "https://drive.google.com/file/d/1_yO8Yk_example_spring_pdf/view?usp=sharing",
    facebookUrl: "https://www.facebook.com/nilasha.net",
    featured: false,
    isSpecial: false
  },
  // Special Issues (সীমিত)
  {
    id: "special-1",
    issueNo: "বিশেষ সংখ্যা (সীমিত)",
    title: "অমর একুশে",
    publishDate: "ফেব্রুয়ারি ২০২৬",
    description: "মহান ভাষা শহীদদের স্মরণে ও বাংলা ভাষার অধিকার আদায়ের ত্যাগকে শ্রদ্ধা জানিয়ে প্রকাশিত অমর একুশে বিশেষ সংকলন। ভাষা আন্দোলনের স্মৃতিকথা এবং দেশাত্মবোধের দারুণ প্রকাশ।",
    coverUrl: "assets/special/ekushey.jpg",
    pdfUrl: "",
    facebookUrl: "https://www.facebook.com/nilasha.net",
    featured: false,
    isSpecial: true
  },
  {
    id: "special-2",
    issueNo: "বিশেষ সংখ্যা (সীমিত)",
    title: "বৈশাখী বিশেষ সংখ্যা",
    publishDate: "এপ্রিল ২০২৬",
    description: "বাঙালির প্রাণের উৎসব পহেলা বৈশাখ ঘিরে লোকজ গান, আলপনা, ঐতিহ্যবাহী মেলা ও সাংস্কৃতিক উৎসবকে কেন্দ্র করে প্রকাশিত অত্যন্ত সীমিত ও চমৎকার রঙিন একটি সংখ্যা।",
    coverUrl: "assets/special/boishakhi.jpg",
    pdfUrl: "",
    facebookUrl: "https://www.facebook.com/nilasha.net",
    featured: false,
    isSpecial: true
  }
];

export const contactInfo: ContactInfo = {
  editorName: "সাদমান ত্বকী",
  magazineName: "নীলাশা",
  location: "পল্লবী, মিরপুর, ঢাকা-১২১৬",
  phone: "+8809696403683",
  email: "hellonilasha@gmail.com",
  facebookUsername: "@nilasha.net",
  facebookUrl: "https://www.facebook.com/nilasha.net"
};

export const galleryImages = [
  {
    id: "g-5",
    title: "ঈদ সংখ্যা ২০২৬ প্রচ্ছদ",
    url: "assets/covers/eid_2026.jpg"
  },
  {
    id: "g-4",
    title: "হেমন্ত সংখ্যা প্রচ্ছদ",
    url: "assets/covers/hemonto.jpg"
  },
  {
    id: "g-3",
    title: "ত্যাগের উৎসব প্রচ্ছদ",
    url: "assets/covers/tyager_utsob.jpg"
  },
  {
    id: "g-2",
    title: "নববর্ষ সংখ্যা ২০২৫ প্রচ্ছদ",
    url: "assets/covers/noboborsho_2025.jpg"
  },
  {
    id: "g-1",
    title: "ঈদ সংখ্যা ২০২৫ প্রচ্ছদ",
    url: "assets/covers/eid_2025.jpg"
  },
  {
    id: "g-s1",
    title: "অমর একুশে বিশেষ প্রচ্ছদ",
    url: "assets/special/ekushey.jpg"
  },
  {
    id: "g-s2",
    title: "বৈশাখী বিশেষ সংখ্যা প্রচ্ছদ",
    url: "assets/special/boishakhi.jpg"
  }
];

// Helper guide indicating EXACT paths to be uploaded on GitHub
export const githubAssetGuide = {
  logo: {
    folder: "assets/",
    filename: "logo.png",
    description: "ম্যাগাজিনের মূল লোগো"
  },
  covers: [
    { name: "ঈদ সংখ্যা ২০২৬", folder: "assets/covers/", filename: "eid_2026.jpg" },
    { name: "হেমন্ত সংখ্যা", folder: "assets/covers/", filename: "hemonto.jpg" },
    { name: "ত্যাগের উৎসব", folder: "assets/covers/", filename: "tyager_utsob.jpg" },
    { name: "নববর্ষ সংখ্যা ২০২৫", folder: "assets/covers/", filename: "noboborsho_2025.jpg" },
    { name: "ঈদ সংখ্যা ২০২৫", folder: "assets/covers/", filename: "eid_2025.jpg" }
  ],
  specialCovers: [
    { name: "অমর একুশে বিশেষ সংখ্যা", folder: "assets/special/", filename: "ekushey.jpg" },
    { name: "বৈশাখী বিশেষ সংখ্যা", folder: "assets/special/", filename: "boishakhi.jpg" }
  ],
  upcomingCovers: [
    { name: "বর্ষা সংখ্যা ২০২৬ (মেঘমল্লার)", folder: "assets/upcoming/", filename: "meghmollar.jpg" },
    { name: "শরৎ সংখ্যা ২০২৬ (নীলাম্বরী)", folder: "assets/upcoming/", filename: "nilambori.jpg" }
  ]
};
