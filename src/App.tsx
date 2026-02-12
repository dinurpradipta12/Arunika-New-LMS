
import React, { useState, useEffect, useCallback } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  Settings, 
  Trash2, 
  LogOut, 
  ChevronRight, 
  Play, 
  Edit3, 
  MoveUp, 
  MoveDown,
  ArrowLeft,
  Home,
  CheckCircle2,
  Video,
  Layout,
  ExternalLink,
  Users,
  Star,
  ArrowRight,
  ShieldCheck,
  Share2,
  FileText,
  Link as LinkIcon,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Database,
  Info,
  Copy,
  Terminal,
  Code
} from 'lucide-react';
import { AppState, Course, Lesson, LMSConfig, LessonType, LearningAsset, Mentor } from './types';
import { loadState, saveState } from './services/storage';
import { HandDrawnButton } from './components/HandDrawnButton';
import { HandDrawnCard } from './components/HandDrawnCard';
import { HandDrawnInput } from './components/HandDrawnInput';

// --- Shared Layout Component ---
const LayoutWrapper: React.FC<{ children: React.ReactNode, isAdmin?: boolean, config: LMSConfig, onLogout?: () => void }> = ({ 
  children, isAdmin, config, onLogout 
}) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/admin' || location.pathname.startsWith('/admin/edit');

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-200/20 rounded-full blur-[120px] -z-10" />

      {/* Conditional Header: Hide on Admin Pages */}
      {!isDashboard && (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 overflow-hidden bg-slate-100 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <img src={config.logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
                {config.brandName}
              </h1>
            </Link>
            <nav className="flex items-center gap-4">
              {isAdmin ? (
                <>
                  <Link to="/admin">
                    <HandDrawnButton variant="secondary" size="sm">
                      <Layout className="w-4 h-4 mr-2" />
                      Dashboard
                    </HandDrawnButton>
                  </Link>
                  <HandDrawnButton onClick={onLogout} variant="ghost" size="sm" className="text-rose-500">
                    <LogOut className="w-5 h-5" />
                  </HandDrawnButton>
                </>
              ) : (
                <Link to="/login">
                  <HandDrawnButton variant="ghost" size="sm" className="text-slate-600">Admin Login</HandDrawnButton>
                </Link>
              )}
            </nav>
          </div>
        </header>
      )}

      <main className={`max-w-7xl mx-auto px-6 pb-24 ${isDashboard ? 'pt-8' : 'pt-10'}`}>
        {children}
      </main>

      <footer className="bg-slate-900 py-16 text-white overflow-hidden relative mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <img src={config.logo} className="h-8 w-8 rounded bg-white/20" alt="Logo" />
              <h4 className="text-xl font-bold">{config.brandName}</h4>
            </div>
            <p className="text-slate-400 max-w-xs">Profesionalisme dalam setiap kurikulum pendidikan digital.</p>
          </div>
          <div className="max-w-7xl text-center text-slate-500 text-sm font-medium">
            <p>&copy; 2024 {config.brandName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Home Page ---
const HomePage: React.FC<{ courses: Course[], config: LMSConfig }> = ({ courses, config }) => {
  return (
    <div className="space-y-24">
      <section className="flex flex-col lg:flex-row items-center gap-16 py-12">
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold">
            <Star className="w-4 h-4 fill-indigo-600" />
            <span>Platform Belajar Terpercaya</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
             {config.heroTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <HandDrawnButton size="lg" className="rounded-full shadow-xl px-10">
              Mulai Belajar <ArrowRight className="ml-2 w-5 h-5" />
            </HandDrawnButton>
          </div>
        </div>
        <div className="lg:w-1/2 perspective-2000">
           <img 
             src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
             className="isometric-card rounded-3xl shadow-2xl w-full object-cover h-[450px] border border-slate-200" 
             alt="Hero"
           />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <HandDrawnCard key={course.id} className="group !p-0 overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
             <div className="h-56 relative overflow-hidden">
               <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-indigo-600 tracking-wider">
                  Course
               </div>
             </div>
             <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{course.description}</p>
                <Link to={`/course/${course.id}`} className="block pt-2">
                  <HandDrawnButton variant="primary" className="w-full rounded-2xl h-12">Buka Materi</HandDrawnButton>
                </Link>
             </div>
          </HandDrawnCard>
        ))}
      </section>
    </div>
  );
};

// --- Course View Page ---
// Component to display the course details and its modular lessons
const CourseViewPage: React.FC<{ 
  courses: Course[], 
  isAdmin: boolean,
  onSaveMentor: (cid: string, mentor: Mentor) => void 
}> = ({ courses, isAdmin, onSaveMentor }) => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditingMentor, setIsEditingMentor] = useState(false);
  const [mentorDraft, setMentorDraft] = useState<Mentor | null>(null);

  useEffect(() => {
    if (course && course.lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(course.lessons[0]);
    }
  }, [course, selectedLesson]);

  if (!course) return <div className="py-20 text-center font-bold">Data kursus tidak ditemukan.</div>;

  const handleMentorSave = () => {
    if (mentorDraft) {
      onSaveMentor(course.id, mentorDraft);
      setIsEditingMentor(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Katalog
          </Link>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">{course.title}</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{course.description}</p>
        </div>

        {selectedLesson ? (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {selectedLesson.type === 'video' ? (
              <div className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <iframe 
                  src={selectedLesson.videoUrl} 
                  className="w-full h-full" 
                  title={selectedLesson.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            ) : (
              <HandDrawnCard className="!p-12 shadow-2xl border-none">
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <FileText className="text-indigo-500" /> {selectedLesson.title}
                  </h3>
                  <div className="whitespace-pre-wrap text-slate-600 leading-relaxed text-lg">
                    {selectedLesson.content}
                  </div>
                </div>
              </HandDrawnCard>
            )}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold">
            Pilih materi di samping untuk mulai belajar
          </div>
        )}

        <HandDrawnCard className="!p-10 border-none shadow-xl bg-slate-50/50">
           <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0 relative group">
                 <div className="h-32 w-32 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                    <img src={course.mentor.photo} alt={course.mentor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 {isAdmin && (
                   <button 
                    onClick={() => { setMentorDraft({...course.mentor}); setIsEditingMentor(true); }} 
                    className="absolute -bottom-2 -right-2 h-10 w-10 bg-indigo-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                   >
                      <Edit3 className="w-4 h-4" />
                   </button>
                 )}
              </div>
              <div className="flex-1 space-y-4">
                 <div>
                    <h5 className="text-2xl font-black text-slate-900">{course.mentor.name}</h5>
                    <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest">{course.mentor.role}</p>
                 </div>
                 <p className="text-slate-500 text-sm leading-relaxed">{course.mentor.bio}</p>
                 <div className="flex gap-4">
                    {course.mentor.website && <a href={course.mentor.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors"><Globe className="w-5 h-5" /></a>}
                    {course.mentor.socials.twitter && <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Twitter className="w-5 h-5" /></a>}
                 </div>
              </div>
           </div>

           {isEditingMentor && mentorDraft && (
             <div className="mt-8 pt-8 border-t border-slate-200 space-y-6 animate-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <HandDrawnInput label="Nama Mentor" value={mentorDraft.name} onChange={e => setMentorDraft({...mentorDraft, name: e.target.value})} />
                   <HandDrawnInput label="Role" value={mentorDraft.role} onChange={e => setMentorDraft({...mentorDraft, role: e.target.value})} />
                </div>
                <HandDrawnInput label="Bio" multiline value={mentorDraft.bio} onChange={e => setMentorDraft({...mentorDraft, bio: e.target.value})} />
                <HandDrawnInput label="Photo" type="file" onFileSelect={b => setMentorDraft({...mentorDraft, photo: b})} />
                <div className="flex gap-4">
                   <HandDrawnButton className="flex-1 rounded-2xl" onClick={handleMentorSave}>Simpan Perubahan</HandDrawnButton>
                   <HandDrawnButton variant="outline" className="rounded-2xl" onClick={() => setIsEditingMentor(false)}>Batal</HandDrawnButton>
                </div>
             </div>
           )}
        </HandDrawnCard>
      </div>

      <div className="lg:col-span-4 space-y-6">
         <HandDrawnCard className="!p-8 shadow-xl border-none space-y-6 sticky top-28">
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Kurikulum</h4>
            <div className="space-y-3">
               {course.lessons.map((lesson, idx) => (
                 <button 
                   key={lesson.id}
                   onClick={() => setSelectedLesson(lesson)}
                   className={`
                     w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group
                     ${selectedLesson?.id === lesson.id 
                       ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                       : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-indigo-100'}
                   `}
                 >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${selectedLesson?.id === lesson.id ? 'bg-white/20' : 'bg-black/5'}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="font-bold text-sm truncate">{lesson.title}</p>
                       <p className={`text-[9px] font-black uppercase tracking-widest ${selectedLesson?.id === lesson.id ? 'text-white/70' : 'opacity-60'}`}>{lesson.type}</p>
                    </div>
                    {selectedLesson?.id === lesson.id && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                 </button>
               ))}
               {course.lessons.length === 0 && <p className="text-xs text-slate-400 text-center py-4">Belum ada modul.</p>}
            </div>
         </HandDrawnCard>

         <HandDrawnCard className="!p-8 shadow-xl border-none space-y-4">
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Resource Belajar</h4>
            <div className="space-y-3">
              {course.assets.map(asset => (
                <a key={asset.id} href={asset.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-white transition-all border border-transparent hover:border-indigo-100 group">
                  <div className="h-8 w-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                    {asset.type === 'file' ? <FileText className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  </div>
                  <span className="text-sm font-bold text-slate-700 truncate">{asset.name}</span>
                </a>
              ))}
              {course.assets.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-2">Tidak ada resource tambahan.</p>
              )}
            </div>
         </HandDrawnCard>
      </div>
    </div>
  );
};

// --- Admin Dashboard ---
const AdminDashboard: React.FC<{ state: AppState, onSave: (s: AppState) => void, onLogout: () => void }> = ({ state, onSave, onLogout }) => {
  const [courses, setCourses] = useState(state.courses);
  const [config, setConfig] = useState(state.config);
  const [showConfig, setShowConfig] = useState(false);
  const navigate = useNavigate();

  const handleShare = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#/course/${id}`;
    navigator.clipboard.writeText(url);
    alert('Public view link berhasil disalin!');
  };

  const handleUpdateConfig = () => {
    onSave({...state, config});
    setShowConfig(false);
  };

  const sqlScript = `
-- PANDUAN SQL SUPABASE ARUNIKA LMS

-- 1. Tabel Konfigurasi Branding
CREATE TABLE IF NOT EXISTS lms_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo TEXT, -- Base64 atau URL Image
  brand_name TEXT NOT NULL,
  hero_title TEXT,
  hero_subtitle TEXT,
  supabase_url TEXT,
  supabase_key TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 2. Tabel Kursus Utama
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT, -- Base64 PNG/JPG
  lessons JSONB DEFAULT '[]', -- Menyimpan array materi (text/video)
  assets JSONB DEFAULT '[]',  -- Menyimpan array resource (link/file)
  mentor JSONB DEFAULT '{}',  -- Menyimpan data profil mentor
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TIPS: Aktifkan REALTIME di dashboard Supabase:
-- Database -> Replication -> Enable Realtime pada tabel 'courses' dan 'lms_config'
`.trim();

  const copySQL = () => {
    navigator.clipboard.writeText(sqlScript);
    alert('SQL script berhasil disalin!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex items-center gap-6">
            <div className="h-20 w-20 overflow-hidden bg-slate-50 border border-slate-100 rounded-3xl shadow-inner flex items-center justify-center">
              <img src={config.logo} className="max-w-full max-h-full object-contain" alt="Branding" />
            </div>
            <div className="space-y-1">
               <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Arunika Admin</h2>
               <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-full w-fit">
                  <Layout className="w-3.5 h-3.5" /> Dashboard LMS
               </div>
            </div>
         </div>
         <div className="flex flex-wrap justify-center gap-3">
            <HandDrawnButton variant="outline" onClick={() => setShowConfig(!showConfig)} className="rounded-2xl h-14 px-6">
              <Settings className="w-4 h-4 mr-2" /> Konfigurasi
            </HandDrawnButton>
            <HandDrawnButton onClick={() => {
                const newCourse: Course = {
                  id: `course-${Date.now()}`,
                  title: 'Judul Kursus Baru',
                  description: 'Deskripsi singkat materi pembelajaran...',
                  thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
                  isPublic: true,
                  createdAt: Date.now(),
                  lessons: [],
                  assets: [],
                  mentor: { name: 'Mentor Baru', role: 'Instruktur', bio: 'Bio mentor di sini...', photo: 'https://i.pravatar.cc/150', website: '', socials: {} }
                };
                onSave({...state, courses: [newCourse, ...state.courses]});
                setCourses([newCourse, ...state.courses]);
            }} className="rounded-2xl h-14 px-8 shadow-indigo-100">
              <Plus className="w-4 h-4 mr-2" /> Tambah Kursus
            </HandDrawnButton>
            <HandDrawnButton variant="ghost" className="text-rose-500 h-14 w-14 rounded-2xl" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </HandDrawnButton>
         </div>
      </div>

      {showConfig && (
        <div className="space-y-8 animate-in slide-in-from-top-4 duration-300">
          <HandDrawnCard className="space-y-8 !p-10 border-none shadow-2xl">
             <div className="flex items-center justify-between border-b pb-6 border-slate-100">
                <div className="flex items-center gap-3">
                   <Settings className="text-indigo-500 h-6 w-6" /> 
                   <h3 className="text-2xl font-bold text-slate-900">Pengaturan Platform</h3>
                </div>
                <HandDrawnButton variant="ghost" size="sm" onClick={() => setShowConfig(false)}>Tutup</HandDrawnButton>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">
                      <Star className="w-4 h-4" /> Branding & Visual
                   </div>
                   <HandDrawnInput label="Logo Platform (Upload PNG)" type="file" onFileSelect={b => setConfig({...config, logo: b})} />
                   <HandDrawnInput label="Nama Brand" value={config.brandName} onChange={e => setConfig({...config, brandName: e.target.value})} />
                   <HandDrawnInput label="Tagline / Hero Title" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} />
                   <HandDrawnInput label="Sub-tagline" multiline value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} />
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">
                      <Database className="w-4 h-4" /> Database Supabase Realtime
                   </div>
                   <HandDrawnInput label="Supabase URL" value={config.supabaseUrl} onChange={e => setConfig({...config, supabaseUrl: e.target.value})} placeholder="https://xxx.supabase.co" />
                   <HandDrawnInput label="Anon Key / Public Key" value={config.supabaseKey} onChange={e => setConfig({...config, supabaseKey: e.target.value})} placeholder="Public API Key" />
                   <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-500"><Code className="w-20 h-20" /></div>
                      <div className="flex items-center justify-between relative z-10">
                         <h5 className="font-bold flex items-center gap-2"><Terminal className="w-4 h-4" /> SQL Table Script</h5>
                         <button onClick={copySQL} className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all border border-white/10">
                            <Copy className="w-3 h-3" /> Copy Script
                         </button>
                      </div>
                      <div className="bg-black/40 rounded-xl p-4 font-mono text-[10px] text-indigo-300 max-h-40 overflow-y-auto relative z-10 scrollbar-hide border border-white/5">
                         <pre>{sqlScript}</pre>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed relative z-10">
                         *Gunakan script ini di <b>Supabase SQL Editor</b> untuk menginisialisasi database yang kompatibel dengan fitur realtime preview aplikasi ini.
                      </p>
                   </div>
                </div>
             </div>
             <HandDrawnButton className="w-full rounded-2xl h-16 text-lg font-bold" onClick={handleUpdateConfig}>
               Simpan Pengaturan Platform
             </HandDrawnButton>
          </HandDrawnCard>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
         {courses.map(course => (
           <HandDrawnCard key={course.id} className="group flex flex-col lg:flex-row gap-8 items-center !p-6 hover:border-indigo-200 transition-all">
              <div className="h-32 w-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 shrink-0">
                 <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
              </div>
              <div className="flex-1 space-y-2 w-full text-center lg:text-left">
                 <h3 className="text-2xl font-extrabold text-slate-900 line-clamp-1">{course.title}</h3>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                       <BookOpen className="w-3.5 h-3.5" /> {course.lessons.length} Materi
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                       <LinkIcon className="w-3.5 h-3.5" /> {course.assets.length} Resource
                    </span>
                 </div>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-3">
                    <HandDrawnButton size="sm" variant="secondary" onClick={() => navigate(`/admin/edit/${course.id}`)} className="rounded-xl px-5">
                      <Edit3 className="w-4 h-4 mr-2" /> Edit Modul
                    </HandDrawnButton>
                    <HandDrawnButton size="sm" variant="outline" onClick={() => handleShare(course.id)} className="rounded-xl px-5 group/share">
                      <Share2 className="w-4 h-4 mr-2 group-hover/share:rotate-12 transition-transform" /> Share Link Public
                    </HandDrawnButton>
                    <HandDrawnButton size="sm" variant="ghost" className="text-rose-500 hover:bg-rose-50 rounded-xl" onClick={() => {
                        if(confirm('Hapus kursus ini?')) {
                          const updated = courses.filter(c => c.id !== course.id);
                          setCourses(updated);
                          onSave({...state, courses: updated});
                        }
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </HandDrawnButton>
                 </div>
              </div>
              <div className="h-20 w-px bg-slate-100 hidden lg:block" />
              <div className="flex flex-col items-center gap-2">
                 <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={course.mentor.photo} className="w-full h-full object-cover" />
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-400">Mentor: {course.mentor.name.split(' ')[0]}</span>
              </div>
           </HandDrawnCard>
         ))}
         {courses.length === 0 && (
           <div className="py-32 text-center space-y-6">
              <div className="h-24 w-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200">
                 <BookOpen className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-2xl font-bold text-slate-400">Belum Ada Kursus</h4>
                 <p className="text-slate-300">Klik "Tambah Kursus" untuk memulai publikasi materi Anda.</p>
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

// --- Course Editor ---
const CourseEditor: React.FC<{ state: AppState, onSave: (s: AppState) => void }> = ({ state, onSave }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | undefined>(state.courses.find(c => c.id === courseId));
  const [showAddMenu, setShowAddMenu] = useState(false);

  if (!course) return <div className="py-20 text-center font-bold">Data kursus tidak ditemukan.</div>;

  const saveLocal = (updated: Course) => {
    setCourse(updated);
    onSave({...state, courses: state.courses.map(c => c.id === courseId ? updated : c)});
  };

  const addLesson = (type: LessonType) => {
    const newLesson: Lesson = { 
      id: `l-${Date.now()}`, 
      title: type === 'video' ? 'Video Materi Baru' : 'Halaman Materi Baru', 
      type, 
      content: 'Tuliskan detail materi di sini...', 
      order: course.lessons.length, 
      videoUrl: type === 'video' ? 'https://www.youtube.com/embed/qz0aGYrrlhU' : '' 
    };
    saveLocal({...course, lessons: [...course.lessons, newLesson]});
    setShowAddMenu(false);
  };

  const addAsset = () => {
    const newAsset: LearningAsset = { id: `a-${Date.now()}`, name: 'Resource Baru', type: 'link', url: '#' };
    saveLocal({...course, assets: [...course.assets, newAsset]});
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
         <HandDrawnButton variant="outline" size="sm" className="rounded-2xl" onClick={() => navigate('/admin')}>
           <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
         </HandDrawnButton>
         <div className="text-right">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manajemen Kurikulum</h2>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{course.title}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
         {/* Sidebar Controls */}
         <div className="lg:col-span-4 space-y-6">
            <HandDrawnCard className="space-y-6 !p-8 shadow-xl border-none">
               <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                  <Star className="w-3.5 h-3.5" /> Informasi Dasar
               </div>
               <HandDrawnInput label="Thumbnail Utama" type="file" onFileSelect={b => saveLocal({...course, thumbnail: b})} />
               <HandDrawnInput label="Judul Kursus" value={course.title} onChange={e => saveLocal({...course, title: e.target.value})} />
               <HandDrawnInput label="Deskripsi Singkat" multiline value={course.description} onChange={e => saveLocal({...course, description: e.target.value})} />
            </HandDrawnCard>

            <HandDrawnCard className="space-y-6 !p-8 shadow-xl border-none">
               <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em]">
                     <LinkIcon className="w-3.5 h-3.5" /> Resource Belajar
                  </div>
                  <HandDrawnButton size="sm" variant="ghost" className="h-8 w-8 rounded-lg" onClick={addAsset}>
                    <Plus className="w-4 h-4" />
                  </HandDrawnButton>
               </div>
               <div className="space-y-3">
                  {course.assets.map(asset => (
                    <div key={asset.id} className="p-4 bg-slate-50 rounded-2xl space-y-3 border border-slate-100 relative group animate-in zoom-in-95 duration-200">
                       <input className="font-bold text-sm bg-transparent outline-none w-full pr-8 text-slate-700" value={asset.name} onChange={e => saveLocal({...course, assets: course.assets.map(a => a.id === asset.id ? {...a, name: e.target.value} : a)})} placeholder="Nama Resource" />
                       <div className="flex items-center gap-2">
                          <select className="text-[10px] font-black uppercase bg-white border border-slate-200 rounded px-1.5 py-1 outline-none" value={asset.type} onChange={e => saveLocal({...course, assets: course.assets.map(a => a.id === asset.id ? {...a, type: e.target.value as any} : a)})}>
                             <option value="link">LINK</option>
                             <option value="file">FILE</option>
                          </select>
                          <input className="text-[10px] text-indigo-500 bg-transparent outline-none w-full font-mono" value={asset.url} onChange={e => saveLocal({...course, assets: course.assets.map(a => a.id === asset.id ? {...a, url: e.target.value} : a)})} placeholder="https://..." />
                       </div>
                       <button onClick={() => saveLocal({...course, assets: course.assets.filter(a => a.id !== asset.id)})} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  ))}
                  {course.assets.length === 0 && <p className="text-[10px] text-slate-400 italic text-center py-4">Belum ada asset tambahan.</p>}
               </div>
            </HandDrawnCard>
         </div>

         {/* Main Curriculum Editor */}
         <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  Modul Pembelajaran
                  <span className="text-sm bg-slate-100 text-slate-400 px-3 py-1 rounded-full font-bold">{course.lessons.length}</span>
               </h3>
               <div className="relative">
                  <HandDrawnButton variant="primary" size="sm" className="rounded-full shadow-lg px-8 h-12" onClick={() => setShowAddMenu(!showAddMenu)}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Materi
                  </HandDrawnButton>
                  {showAddMenu && (
                    <div className="absolute top-full right-0 mt-3 bg-white shadow-2xl rounded-[1.5rem] p-3 z-50 border border-slate-100 min-w-[240px] animate-in fade-in zoom-in-95 duration-200">
                       <button onClick={() => addLesson('text')} className="w-full text-left p-4 hover:bg-indigo-50 rounded-xl flex items-center gap-4 group transition-colors">
                         <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><FileText className="w-5 h-5" /></div>
                         <div>
                            <p className="font-bold text-sm text-slate-700">Page Text Only</p>
                            <p className="text-[10px] text-slate-400">Materi artikel atau teks bacaan</p>
                         </div>
                       </button>
                       <button onClick={() => addLesson('video')} className="w-full text-left p-4 hover:bg-rose-50 rounded-xl flex items-center gap-4 group transition-colors mt-2">
                         <div className="h-10 w-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><Video className="w-5 h-5" /></div>
                         <div>
                            <p className="font-bold text-sm text-slate-700">Video Link</p>
                            <p className="text-[10px] text-slate-400">Materi berbasis video (YouTube/Vimeo)</p>
                         </div>
                       </button>
                    </div>
                  )}
               </div>
            </div>

            <div className="space-y-6">
               {course.lessons.map((lesson, idx) => (
                 <HandDrawnCard key={lesson.id} className="!p-0 border-slate-200 shadow-sm overflow-hidden group animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-slate-50 p-6 border-b flex justify-between items-center group-hover:bg-indigo-50/30 transition-colors">
                       <div className="flex items-center gap-5">
                          <div className="h-10 w-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center shadow-md font-black text-sm border border-slate-100">
                            {idx + 1}
                          </div>
                          <div className="space-y-0.5">
                             <span className="font-bold text-slate-900 block">{lesson.title}</span>
                             <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${lesson.type === 'video' ? 'text-rose-500 bg-rose-50 border-rose-100' : 'text-indigo-500 bg-indigo-50 border-indigo-100'}`}>
                                {lesson.type}
                             </span>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <button onClick={() => saveLocal({...course, lessons: course.lessons.filter(l => l.id !== lesson.id)})} className="h-10 w-10 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                    <div className="p-10 space-y-8">
                       <HandDrawnInput label="Judul Materi" value={lesson.title} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, title: e.target.value} : l)})} />
                       {lesson.type === 'video' && (
                         <HandDrawnInput label="YouTube Embed URL" value={lesson.videoUrl} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, videoUrl: e.target.value} : l)})} placeholder="https://www.youtube.com/embed/..." />
                       )}
                       <HandDrawnInput label="Detail Materi" multiline value={lesson.content} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, content: e.target.value} : l)})} />
                    </div>
                 </HandDrawnCard>
               ))}
               {course.lessons.length === 0 && (
                 <div className="py-24 text-center border-4 border-dashed border-slate-100 rounded-[3rem] bg-white/50">
                    <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                       <FileText className="w-10 h-10" />
                    </div>
                    <p className="text-slate-400 font-bold">Modul belum ditambahkan.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Main App ---
const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const loaded = loadState();
        setState(loaded);
      } catch (err) {
        console.error("State load error:", err);
      } finally {
        setIsReady(true);
      }
    };
    init();
  }, []);

  const handleLogin = (u: string, p: string) => {
    if (u === 'arunika' && p === 'ar4925') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleSaveState = (newState: AppState) => {
    setState(newState);
    saveState(newState);
  };

  const handleSaveMentor = (cid: string, mentor: Mentor) => {
    if (!state) return;
    const updated = {
      ...state,
      courses: state.courses.map(c =>
        c.id === cid ? { ...c, mentor } : c
      )
    };
    handleSaveState(updated);
  };

  if (!isReady || !state) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-slate-400 space-y-4">
        <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="font-bold tracking-widest text-xs uppercase">Initializing Arunika LMS...</span>
      </div>
    );
  }

  return (
    <Router>
      <LayoutWrapper isAdmin={isAdmin} config={state.config} onLogout={() => setIsAdmin(false)}>
        <Routes>
          <Route path="/" element={<HomePage courses={state.courses} config={state.config} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/course/:courseId" element={<CourseViewPage courses={state.courses} isAdmin={isAdmin} onSaveMentor={handleSaveMentor} />} />
          <Route path="/admin" element={
            isAdmin
              ? <AdminDashboard state={state} onSave={handleSaveState} onLogout={() => setIsAdmin(false)} />
              : <LoginPage onLogin={handleLogin} />
          } />
          <Route path="/admin/edit/:courseId" element={
            isAdmin
              ? <CourseEditor state={state} onSave={handleSaveState} />
              : <LoginPage onLogin={handleLogin} />
          } />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

const LoginPage: React.FC<{ onLogin: (u: string, p: string) => boolean }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto py-24 px-4 animate-in zoom-in-95 duration-500">
       <div className="text-center mb-10 space-y-4">
          <div className="h-20 w-20 bg-gradient-primary rounded-[2rem] flex items-center justify-center text-white text-4xl font-bold mx-auto shadow-2xl animate-pulse">☀️</div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Area</h2>
          <p className="text-slate-500 font-medium">LMS Management System v2.0</p>
       </div>
       <HandDrawnCard className="!p-12 border-none shadow-2xl">
          <form onSubmit={e => { e.preventDefault(); if(onLogin(username, password)) navigate('/admin'); }} className="space-y-6">
             <HandDrawnInput label="Username" value={username} onChange={e => setUsername(e.target.value)} placeholder="arunika" />
             <HandDrawnInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
             <HandDrawnButton type="submit" className="w-full h-16 rounded-2xl shadow-indigo-100 text-lg font-bold">Sign In to Dashboard</HandDrawnButton>
          </form>
          <div className="mt-10 pt-8 border-t border-slate-100 text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
             Authorized Access Only
          </div>
       </HandDrawnCard>
    </div>
  );
}

export default App;
