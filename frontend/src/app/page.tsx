import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Parallax3DCard, DepthLayer } from '@/components/ui/Parallax3DCard';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import { ProjectTabs } from '@/components/projects/ProjectTabs';
import { TerminalSection, TerminalPrompt } from '@/components/ui/TerminalSection';
import Beams from '@/components/Beams';
import {
  MapPin, GraduationCap, Cpu, ShieldCheck,
  GitCommit, FileBadge, Terminal, Globe,
  LayoutGrid, User, Mail, Github, Linkedin, Facebook,
  ArrowRight
} from 'lucide-react';

// Import data from JSON files
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import certificationsData from '@/data/certifications.json';
import organizationsData from '@/data/organizations.json';
import interestsData from '@/data/interests.json';
import techStackData from '@/data/tech_stack.json';
import socialLinksData from '@/data/social_links.json';
import galleryData from '@/data/gallery.json';
import { mockProjects } from '@/data/projects/mock-projects';


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">

      {/* ----------------------------------------------------
          SECTION 1: HERO
          Modern Terminal-Inspired Hero
      ----------------------------------------------------- */}
      <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 overflow-hidden bg-black">
        {/* Beams Background */}
        <div className="absolute inset-0 w-full h-full z-0 blur-[2px]">
          <Beams
            beamWidth={1}
            beamHeight={18}
            beamNumber={27}
            lightColor="#ffffff"
            speed={0.8}
            noiseIntensity={3}
            scale={0.2}
            rotation={0}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          {/* Main Content Card */}
          <div className="glass-panel p-8 md:p-16 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
            {/* Terminal Hint - Subtle */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-zinc-600 ml-2">~/portfolio</span>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-mono text-zinc-400">{profileData.location}</span>
              </div>

              {/* Name - Big and Bold */}
              <div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none">
                  {profileData.name}
                </h1>
              </div>

              {/* Role */}
              <div>
                <p className="text-2xl md:text-4xl text-zinc-400 font-light">
                  {profileData.role}
                </p>
              </div>

              {/* Education & Status Row */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-black/40">
                  <GraduationCap className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-mono text-zinc-300">{profileData.education}</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-green-500/30 bg-green-500/10">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-sm font-mono text-green-400">{profileData.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ----------------------------------------------------
          SECTION 2: ABOUT ME
          Terminal-styled with 60/40 Layout
      ----------------------------------------------------- */}
      <section id="about" className="py-24 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="w-6 h-6 text-zinc-400" />
          <h2 className="text-3xl font-bold tracking-tight">~/about-me</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* LEFT COLUMN: 60% */}
          <div className="w-full md:w-[60%] space-y-10">
            {/* Bio in Terminal Style */}
            <TerminalSection title="about.txt" command="cat about.txt">
              <div className="space-y-6 text-zinc-300 leading-relaxed">
                <p className="text-white font-medium text-lg">
                  &gt; I code systems that think and scale.
                </p>
                <p>
                  {profileData.bio}
                </p>
                <p>
                  Currently, I am serving as the <span className="text-green-400 font-semibold">{profileData.current_position}</span> at <span className="text-orange-400 font-semibold">{profileData.current_company}</span>,
                  where we build AWS ready website to represent the skills of Organization.
                </p>
              </div>
            </TerminalSection>

            {/* Interests & Org Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interests */}
              <TerminalSection title="interests.json" variant="compact">
                <TerminalPrompt command="cat interests.json" color="green" />
                <div className="flex flex-wrap gap-2">
                  {interestsData.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-md text-xs font-mono border border-white/10 bg-black/20 text-zinc-400 hover:text-white transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </TerminalSection>

              {/* Organizations */}
              <TerminalSection title="organizations.log" variant="compact">
                <TerminalPrompt command="tail organizations.log" color="orange" />
                <ul className="space-y-3 font-mono text-sm">
                  {organizationsData.map((org, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={idx === 0 ? "text-green-400" : "text-orange-400"}>✓</span>
                      <div>
                        <span className="block text-zinc-200">{org.name}</span>
                        <span className="text-xs text-zinc-500">{org.role}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </TerminalSection>
            </div>
          </div>

          {/* RIGHT COLUMN: 40% */}
          <div className="w-full md:w-[40%] flex justify-center md:justify-end">
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              {/* Profile Photo */}
              <Image
                src={profileData['profile-photo']}
                alt={profileData.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                priority
              />

              {/* Overlay for aesthetic and readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Unique Feature 1: Live Status Badge */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20 bg-black/80 backdrop-blur-xl shadow-lg">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-green-400 uppercase tracking-wider">Online</span>
                </div>
                <div className="px-3 py-1.5 rounded-full border border-white/20 bg-black/80 backdrop-blur-xl shadow-lg">
                  <span className="text-[10px] font-mono text-zinc-300">MNL • 03:30 PM</span>
                </div>
              </div>

              {/* Unique Feature 2: 'Tech DNA' Terminal Overlay */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="p-4 rounded-xl border border-white/20 bg-black/85 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-1.5 mb-3 opacity-50">
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                  </div>
                  <div className="font-mono text-xs text-zinc-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Role</span>
                      <span className="text-white font-medium">{profileData.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Focus</span>
                      <span className="text-white font-medium">Scalability & Innovation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Status</span>
                      <span className="text-green-400 font-medium">{profileData.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ----------------------------------------------------
          SECTION 3: PROJECTS
          Terminal/IDE Tabs
      ----------------------------------------------------- */}
      <section id="work" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="w-6 h-6 text-zinc-400" />
          <h2 className="text-3xl font-bold tracking-tight">~/projects</h2>
        </div>
        <ProjectTabs
          projects={mockProjects.map(project => ({
            slug: project.slug,
            title: project.title,
            tagline: project.tagline,
            description: project.description,
            category: project.category,
            tech: project.techStack.flatMap(cat => cat.technologies.map(t => t.name)).slice(0, 6),
            codePreview: project.codeExamples[0]?.code
          }))}
        />
      </section>


      {/* ----------------------------------------------------
          SECTION 3.5: EXPERIENCE & CERTIFICATIONS
          50/50 Split
      ----------------------------------------------------- */}
      <section id="experience" className="py-24 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <Terminal className="w-6 h-6 text-zinc-400" />
          <h2 className="text-3xl font-bold tracking-tight uppercase">~/history</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

          {/* LEFT: EXPERIENCE (Timeline) */}
          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-zinc-400" /> Professional Journey
            </h3>

            <div className="relative border-l border-white/10 hover:border-green-500/30 ml-3 space-y-12 transition-colors duration-300">
              {experienceData.map((role, idx) => (
                <div key={idx} className="relative pl-8 group cursor-pointer">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-green-500 group-hover:border-green-400 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-300" />
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-sm font-mono text-zinc-400 group-hover:text-green-400 transition-colors">{role.period}</span>
                    <h4 className="text-lg font-bold text-zinc-100 group-hover:text-green-400 transition-colors">{role.title}</h4>
                    <span className="text-sm text-zinc-500">{role.company}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>


          {/* RIGHT: CERTIFICATIONS (Grid) */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-2">
              <FileBadge className="w-5 h-5 text-zinc-400" /> Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((cert) => (
                <div key={cert.name} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300 group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-1.5 rounded-lg bg-black/50 border border-white/5 group-hover:border-green-500/30 transition-colors">
                      <div className="w-4 h-4 rounded-full bg-zinc-500 opacity-75 group-hover:bg-green-500 transition-colors" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-green-400 transition-colors">{cert.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-200 group-hover:text-green-400 transition-colors">{cert.name}</h4>
                  <span className="text-xs text-zinc-500">{cert.org}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ----------------------------------------------------
          SECTION 4: TECH STACK
          Categorized Cards
      ----------------------------------------------------- */}
      <section id="stack" className="py-24 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-zinc-400" />
            <h2 className="text-3xl font-bold tracking-tight">~/tech-stack</h2>
          </div>
          <Link href="/tech-stack" className="text-sm font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">
            View Deep Dive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStackData.map((stack, idx) => {
            const icons = {
              'frontend': LayoutGrid,
              'backend': Terminal,
              'AI/ML': Cpu,
              'Cloud/DevOps': Globe
            };
            const Icon = icons[stack.key as keyof typeof icons] || Terminal;

            return (
              <Card key={idx} className="h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon className="w-5 h-5 text-zinc-400" /> {stack.key}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 font-mono text-sm text-zinc-300">
                    {stack.value.split(', ').map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>


      {/* ----------------------------------------------------
          SECTION 5: GALLERY
          Events & Impact
      ----------------------------------------------------- */}
      <section id="gallery" className="py-24 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-zinc-400" />
              <h2 className="text-3xl font-bold tracking-tight">~/gallery</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl pl-9">
              A visual log of hackathons, conferences, and community events I've attended and contributed to.
            </p>
          </div>
          <Link href="/gallery" className="text-sm font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">
            View More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <GalleryGrid limit={3} />
      </section>


      {/* ----------------------------------------------------
          SECTION 6: CONTACT
          60/40 Split
      ----------------------------------------------------- */}
      <section id="contact" className="py-24 px-4 md:px-8 max-w-5xl mx-auto w-full mb-20">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="w-6 h-6 text-zinc-400" />
          <h2 className="text-3xl font-bold tracking-tight">~/send-message</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left 60%: Contact Form */}
          <div className="md:w-[60%] glass-panel p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400">NAME</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-green-500 outline-none text-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400">EMAIL</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-green-500 outline-none text-white" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400">MESSAGE</label>
                <textarea rows={5} className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-green-500 outline-none text-white" placeholder="Details about your inquiry..."></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-zinc-200 transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Right 40%: Socials */}
          <div className="md:w-[40%] flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Let's Build Something</h3>
                <div className="flex flex-col gap-4 font-mono text-sm">
                  {socialLinksData.map((link) => {
                    const icons = {
                      github: Github,
                      linkedin: Linkedin,
                      facebook: Facebook,
                      email: Mail
                    };
                    const Icon = icons[link.key as keyof typeof icons];
                    const href = link.key === 'email' ? `mailto:${link.value}` : link.value;
                    const label = link.key.charAt(0).toUpperCase() + link.key.slice(1);

                    return Icon ? (
                      <a key={link.key} href={href} target={link.key !== 'email' ? '_blank' : undefined} rel={link.key !== 'email' ? 'noopener noreferrer' : undefined} className="flex items-center gap-3 hover:text-zinc-200 transition-colors">
                        <Icon className="w-5 h-5 text-zinc-400" /> {label}
                      </a>
                    ) : null;
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">Resume</h3>
                <a href="#" className="inline-block border border-white/20 hover:border-white px-6 py-3 rounded-full transition-all hover:bg-white/5">
                  Download Resume
                </a>
              </div>
            </div>

            <div className="text-xs text-zinc-600 mt-12">
              © 2026 Rivera, Miggy. All rights reserved.
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}