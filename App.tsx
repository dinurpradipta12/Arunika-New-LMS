
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
  Terminal
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
  const isDashboard = location.pathname === '/admin';

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-200/20 rounded-full blur-[120px] -z-10" />

      {/* Conditional Header: Hide on Admin Dashboard */}
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

      <footer className="bg-slate-900 py-16 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <img src={config.logo} className="h-8 w-8 rounded bg-white/20" alt="Logo" />
              <h4 className="text-xl font-bold">{config.brandName}</h4>
            </div>
            <p className="text-slate-400 max-w-xs">Profesionalisme dalam setiap kurikulum pendidikan digital.</p>
          </div>
          <div className="max-w-7xl text-center text-slate-500">
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
            <span>Platform Belajar Terintegrasi</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
             {config.heroTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <HandDrawnButton size="lg" className="rounded-full shadow-xl">
              Mulai Eksplorasi <ArrowRight className="ml-2 w-5 h-5" />
            </HandDrawnButton>
          </div>
        </div>
        <div className="lg:w-1/2 perspective-2000">
           <img 
             src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
             className="isometric-card rounded-3xl shadow-2xl w-full object-cover h-[450px]" 
             alt="Hero"
           />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <HandDrawnCard key={course.id} className="group !p-0 overflow-hidden">
             <div className="h-56 relative">
               <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
             </div>
             <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                <Link to={`/course/${course.id}`} className="block">
                  <HandDrawnButton variant="primary" className="w-full rounded-xl">Buka Kursus</HandDrawnButton>
                </Link>
             </div>
          </HandDrawnCard>
        ))}
      </section>
    </div>
  );
};

// --- Course View Page ---
const CourseViewPage: React.FC<{ courses: Course[], isAdmin: boolean, onSaveMentor: (cid: string, mentor: Mentor) => void }> = ({ courses, isAdmin, onSaveMentor }) => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === courseId);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [editingMentor, setEditingMentor] = useState(false);
  const [mentorDraft, setMentorDraft] = useState<Mentor | null>(null);

  useEffect(() => {
    if (course && course.lessons.length > 0 && !activeLesson) {
      setActiveLesson(course.lessons[0]);
    }
    if (course) setMentorDraft(course.mentor);
  }, [course]);

  if (!course) return <div className="py-20 text-center">Course Not Found</div>;

  const handleMentorUpdate = () => {
    if (mentorDraft) {
      onSaveMentor(course.id, mentorDraft);
      setEditingMentor(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8">
        {/* Lesson View */}
        <div className="rounded-3xl shadow-2xl border border-slate-200 overflow-hidden bg-slate-900">
           {activeLesson?.type === 'video' ? (
             <iframe src={activeLesson.videoUrl} className="w-full aspect-video" allowFullScreen />
           ) : (
             <div className="w-full aspect-video bg-white p-12 overflow-y-auto text-slate-900">
                <h3 className="text-3xl font-extrabold mb-6 text-gradient">{activeLesson?.title}</h3>
                <div className="prose prose-lg prose-indigo max-w-none whitespace-pre-wrap">{activeLesson?.content}</div>
             </div>
           )}
        </div>
        
        <div className="space-y-4">
           <h2 className="text-3xl font-extrabold">{activeLesson?.title}</h2>
           <p className="text-slate-600 text-lg leading-relaxed">{activeLesson?.content}</p>
        </div>

        {/* Assets Section */}
        {course.assets.length > 0 && (
          <HandDrawnCard className="space-y-4">
             <h3 className="text-xl font-bold flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-indigo-500" /> Asset Belajar
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.assets.map(asset => (
                  <a key={asset.id} href={asset.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all group">
                     {asset.type === 'file' ? <FileText className="w-5 h-5 text-indigo-600" /> : <LinkIcon className="w-5 h-5 text-indigo-600" />}
                     <span className="font-bold text-slate-700 truncate">{asset.name}</span>
                     <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
             </div>
          </HandDrawnCard>
        )}
      </div>

      <div className="lg:col-span-4 space-y-6">
        {/* Curriculum */}
        <HandDrawnCard className="!p-0 border-none shadow-xl overflow-hidden">
           <div className="bg-slate-900 p-6 text-white"><h3 className="font-bold">Kurikulum</h3></div>
           <div className="p-2">
              {course.lessons.map((lesson, idx) => (
                <div key={lesson.id} onClick={() => setActiveLesson(lesson)} className={`p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 ${activeLesson?.id === lesson.id ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50'}`}>
                   <div className={`h-8 w-8 flex items-center justify-center rounded-lg font-bold text-xs ${activeLesson?.id === lesson.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{idx + 1}</div>
                   <div className="flex-1 text-sm font-bold truncate">{lesson.title}</div>
                   {lesson.type === 'video' ? <Video className="w-4 h-4 opacity-50" /> : <FileText className="w-4 h-4 opacity-50" />}
                </div>
              ))}
           </div>
        </HandDrawnCard>

        {/* Mentor Section */}
        <HandDrawnCard className="relative overflow-hidden group">
           {isAdmin && (
             <button onClick={() => setEditingMentor(!editingMentor)} className="absolute top-4 right-4 h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20">
                <Edit3 className="w-4 h-4" />
             </button>
           )}
           
           {editingMentor ? (
             <div className="space-y-4 pt-8">
                <HandDrawnInput label="Mentor Photo (Base64)" onFileSelect={b => setMentorDraft({...mentorDraft!, photo: b})} type="file" />
                <HandDrawnInput label="Nama" value={mentorDraft?.name} onChange={e => setMentorDraft({...mentorDraft!, name: e.target.value})} />
                <HandDrawnInput label="Role" value={mentorDraft?.role} onChange={e => setMentorDraft({...mentorDraft!, role: e.target.value})} />
                <HandDrawnInput label="Bio" multiline value={mentorDraft?.bio} onChange={e => setMentorDraft({...mentorDraft!, bio: e.target.value})} />
                <HandDrawnButton size="sm" variant="primary" className="w-full" onClick={handleMentorUpdate}>Simpan Mentor</HandDrawnButton>
             </div>
           ) : (
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <img src={course.mentor.photo} className="h-16 w-16 rounded-2xl border-2 border-white shadow-lg object-cover" alt="Mentor" />
                   <div>
                      <h4 className="font-bold text-lg">{course.mentor.name}</h4>
                      <p className="text-indigo-600 text-sm font-bold">{course.mentor.role}</p>
                   </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{course.mentor.bio}</p>
                <div className="flex gap-3 pt-2">
                   {course.mentor.website && <a href={course.mentor.website} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"><Globe className="w-4 h-4" /></a>}
                   {course.mentor.socials.twitter && <a href={`https://twitter.com/${course.mentor.socials.twitter}`} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"><Twitter className="w-4 h-4" /></a>}
                   {course.mentor.socials.linkedin && <a href={`https://linkedin.com/in/${course.mentor.socials.linkedin}`} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"><Linkedin className="w-4 h-4" /></a>}
                </div>
             </div>
           )}
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
    alert('Public link copied to clipboard!');
  };

  const handleUpdateConfig = () => {
    onSave({...state, config});
    setShowConfig(false);
  };

  const sqlScript = `
-- 1. Create LMS Config Table
CREATE TABLE IF NOT EXISTS lms_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo TEXT,
  brand_name TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 2. Create Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  lessons JSONB DEFAULT '[]',
  assets JSONB DEFAULT '[]',
  mentor JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Realtime
-- Go to Database -> Replication -> Enable for 'courses' and 'lms_config'
  `.trim();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('SQL script copied!');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden bg-slate-100 rounded-2xl shadow-lg">
              <img src={config.logo} className="w-full h-full object-cover" />
            </div>
            <div>
               <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Dashboard</h2>
               <p className="text-slate-500 font-bold">Halo, {state.config.brandName}</p>
            </div>
         </div>
         <div className="flex gap-3">
            <HandDrawnButton variant="outline" onClick={() => setShowConfig(!showConfig)}>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </HandDrawnButton>
            <HandDrawnButton onClick={() => {
                const newCourse: Course = {
                  id: `course-${Date.now()}`,
                  title: 'Kursus Baru',
                  description: 'Deskripsi singkat...',
                  thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
                  isPublic: true,
                  createdAt: Date.now(),
                  lessons: [],
                  assets: [],
                  mentor: { name: 'New Mentor', role: 'Instructor', bio: 'Bio here...', photo: 'https://i.pravatar.cc/150', website: '', socials: {} }
                };
                onSave({...state, courses: [newCourse, ...state.courses]});
                setCourses([newCourse, ...state.courses]);
            }}>
              <Plus className="w-4 h-4 mr-2" /> Kursus Baru
            </HandDrawnButton>
            <HandDrawnButton variant="ghost" className="text-rose-500" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </HandDrawnButton>
         </div>
      </div>

      {showConfig && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-8">
          <HandDrawnCard className="space-y-8 !p-8 border-none shadow-2xl">
             <div className="flex items-center gap-3 border-b pb-4">
                <Settings className="text-indigo-500" /> 
                <h3 className="text-xl font-bold text-slate-900">Konfigurasi LMS</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h4 className="font-bold flex items-center gap-2 text-slate-800">
                     <Layout className="w-4 h-4 text-indigo-500" /> Branding Visual
                   </h4>
                   <HandDrawnInput label="Logo Platform (Upload PNG)" type="file" onFileSelect={b => setConfig({...config, logo: b})} />
                   <HandDrawnInput label="Nama Platform" value={config.brandName} onChange={e => setConfig({...config, brandName: e.target.value})} />
                   <HandDrawnInput label="Hero Title" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} />
                   <HandDrawnInput label="Hero Subtitle" multiline value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} />
                </div>
                <div className="space-y-6">
                   <h4 className="font-bold flex items-center gap-2 text-indigo-600">
                     <Database className="w-4 h-4" /> Integrasi Supabase Realtime
                   </h4>
                   <HandDrawnInput label="Supabase URL" value={config.supabaseUrl} onChange={e => setConfig({...config, supabaseUrl: e.target.value})} placeholder="https://xxx.supabase.co" />
                   <HandDrawnInput label="Supabase Service Key (anon)" value={config.supabaseKey} onChange={e => setConfig({...config, supabaseKey: e.target.value})} placeholder="Public API Key" />
                   <div className="p-5 bg-indigo-50/50 rounded-2xl text-xs text-indigo-700 flex gap-3 border border-indigo-100">
                      <Info className="w-5 h-5 shrink-0" />
                      <div className="space-y-2">
                        <p className="font-bold">Cara Menghubungkan:</p>
                        <p>1. Masukkan URL dan Key dari proyek Supabase Anda.</p>
                        <p>2. Jalankan script SQL di bawah ini pada SQL Editor Supabase.</p>
                        <p>3. Aktifkan 'Realtime' pada tabel yang dibuat untuk update instan.</p>
                      </div>
                   </div>
                </div>
             </div>
             <HandDrawnButton className="w-full rounded-2xl h-14" onClick={handleUpdateConfig}>
               Simpan Semua Perubahan
             </HandDrawnButton>
          </HandDrawnCard>

          {/* SQL Setup Guide Card */}
          <HandDrawnCard className="space-y-6 !p-8 border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Terminal className="w-32 h-32" />
             </div>
             <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Database className="w-5 h-5" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold">SQL Database Setup Guide</h3>
                      <p className="text-slate-400 text-xs">Jalankan script ini di Dashboard Supabase</p>
                   </div>
                </div>
                <button 
                   onClick={() => copyToClipboard(sqlScript)}
                   className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-bold border border-white/10"
                >
                   <Copy className="w-4 h-4" /> Copy SQL Script
                </button>
             </div>
             
             <div className="relative z-10 bg-black/40 rounded-2xl p-6 border border-white/5 font-mono text-xs overflow-x-auto">
                <pre className="text-indigo-300">
                   {sqlScript}
                </pre>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 relative z-10">
                {[
                  { icon: <Database className="w-4 h-4" />, text: "Automated Tables" },
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Security Rules" },
                  { icon: <Play className="w-4 h-4" />, text: "Realtime Ready" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 text-slate-300">
                     <div className="text-indigo-400">{item.icon}</div>
                     <span className="text-xs font-medium">{item.text}</span>
                  </div>
                ))}
             </div>
          </HandDrawnCard>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
         {courses.map(course => (
           <HandDrawnCard key={course.id} className="group flex flex-col md:flex-row gap-6 items-center">
              <img src={course.thumbnail} className="h-32 w-48 rounded-2xl object-cover shadow-md" />
              <div className="flex-1 space-y-2 w-full text-center md:text-left">
                 <h3 className="text-2xl font-bold text-slate-900">{course.title}</h3>
                 <p className="text-slate-500 text-sm font-medium">
                   {course.lessons.length} Pelajaran • {course.assets.length} Assets Belajar
                 </p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                    <HandDrawnButton size="sm" variant="secondary" onClick={() => navigate(`/admin/edit/${course.id}`)}>
                      <Edit3 className="w-4 h-4 mr-2" /> Edit Materi
                    </HandDrawnButton>
                    <HandDrawnButton size="sm" variant="outline" onClick={() => handleShare(course.id)}>
                      <Share2 className="w-4 h-4 mr-2" /> Share Public Page
                    </HandDrawnButton>
                 </div>
              </div>
           </HandDrawnCard>
         ))}
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

  if (!course) return <div>Course not found</div>;

  const saveLocal = (updated: Course) => {
    setCourse(updated);
    onSave({...state, courses: state.courses.map(c => c.id === courseId ? updated : c)});
  };

  const addLesson = (type: LessonType) => {
    const newLesson: Lesson = { id: `l-${Date.now()}`, title: 'Judul Pelajaran Baru', type, content: 'Isi materi...', order: course.lessons.length, videoUrl: '' };
    saveLocal({...course, lessons: [...course.lessons, newLesson]});
    setShowAddMenu(false);
  };

  const addAsset = () => {
    const newAsset: LearningAsset = { id: `a-${Date.now()}`, name: 'Asset Baru', type: 'link', url: '#' };
    saveLocal({...course, assets: [...course.assets, newAsset]});
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
         <HandDrawnButton variant="outline" size="sm" className="rounded-xl" onClick={() => navigate('/admin')}>
           <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Dashboard
         </HandDrawnButton>
         <h2 className="text-2xl font-bold text-slate-900">Kurikulum & Resource</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="space-y-6">
            <HandDrawnCard className="space-y-4 !p-8">
               <h3 className="font-bold border-b pb-2 text-slate-800">Informasi Dasar</h3>
               <HandDrawnInput label="Thumbnail Kursus" type="file" onFileSelect={b => saveLocal({...course, thumbnail: b})} />
               <HandDrawnInput label="Judul Kursus" value={course.title} onChange={e => saveLocal({...course, title: e.target.value})} />
               <HandDrawnInput label="Deskripsi Singkat" multiline value={course.description} onChange={e => saveLocal({...course, description: e.target.value})} />
            </HandDrawnCard>

            <HandDrawnCard className="space-y-4 !p-8">
               <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">Assets Pendukung</h3>
                  <HandDrawnButton size="sm" variant="ghost" className="rounded-full" onClick={addAsset}>
                    <Plus className="w-4 h-4" />
                  </HandDrawnButton>
               </div>
               {course.assets.map(asset => (
                 <div key={asset.id} className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100 relative group">
                    <input className="font-bold text-sm bg-transparent outline-none w-full pr-8" value={asset.name} onChange={e => saveLocal({...course, assets: course.assets.map(a => a.id === asset.id ? {...a, name: e.target.value} : a)})} />
                    <input className="text-xs text-indigo-500 bg-transparent outline-none w-full" value={asset.url} onChange={e => saveLocal({...course, assets: course.assets.map(a => a.id === asset.id ? {...a, url: e.target.value} : a)})} />
                    <button onClick={() => saveLocal({...course, assets: course.assets.filter(a => a.id !== asset.id)})} className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3" />
                    </button>
                 </div>
               ))}
               {course.assets.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">Belum ada asset</p>}
            </HandDrawnCard>
         </div>

         <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-bold text-slate-900">Modul Pembelajaran</h3>
               <div className="relative">
                  <HandDrawnButton variant="primary" size="sm" className="rounded-full shadow-lg" onClick={() => setShowAddMenu(!showAddMenu)}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Modul
                  </HandDrawnButton>
                  {showAddMenu && (
                    <div className="absolute top-full right-0 mt-3 bg-white shadow-2xl rounded-2xl p-2 z-50 border border-slate-100 min-w-[220px] animate-in fade-in zoom-in-95 duration-200">
                       <button onClick={() => addLesson('text')} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 font-bold text-sm transition-colors text-slate-700">
                         <FileText className="w-4 h-4 text-indigo-400" /> Materi Text / Artikel
                       </button>
                       <button onClick={() => addLesson('video')} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 font-bold text-sm transition-colors text-slate-700">
                         <Video className="w-4 h-4 text-indigo-400" /> Video Pembelajaran
                       </button>
                    </div>
                  )}
               </div>
            </div>

            <div className="space-y-6">
               {course.lessons.map((lesson, idx) => (
                 <HandDrawnCard key={lesson.id} className="!p-0 border-slate-200 shadow-sm overflow-hidden group">
                    <div className="bg-slate-50 p-5 border-b flex justify-between items-center">
                       <div className="flex items-center gap-4">
                          <span className="h-8 w-8 bg-indigo-600 text-white rounded-lg text-xs font-black flex items-center justify-center shadow-lg">
                            {idx + 1}
                          </span> 
                          <span className="font-bold text-slate-800">{lesson.title}</span>
                          <span className="text-[10px] uppercase font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                             {lesson.type}
                          </span>
                       </div>
                       <button onClick={() => saveLocal({...course, lessons: course.lessons.filter(l => l.id !== lesson.id)})} className="text-slate-400 hover:text-rose-500 transition-colors">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                    <div className="p-8 space-y-6">
                       <HandDrawnInput label="Judul Materi" value={lesson.title} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, title: e.target.value} : l)})} />
                       {lesson.type === 'video' && (
                         <HandDrawnInput label="URL Video (YouTube Embed)" value={lesson.videoUrl} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, videoUrl: e.target.value} : l)})} placeholder="https://www.youtube.com/embed/..." />
                       )}
                       <HandDrawnInput label="Materi / Konten" multiline value={lesson.content} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, content: e.target.value} : l)})} />
                    </div>
                 </HandDrawnCard>
               ))}
               {course.lessons.length === 0 && (
                 <div className="py-24 text-center border-4 border-dashed border-slate-200 rounded-[2.5rem] bg-white">
                    <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">Belum ada modul. Tambahkan materi pertama Anda!</p>
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

      if (!loaded || !loaded.courses || !loaded.config) {
        throw new Error("Invalid state structure");
      }

      setState(loaded);
    } catch (err) {
      console.error("State load error:", err);

      // Hard fallback supaya tidak blank
      setState({
        config: {
          logo: 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png',
          brandName: 'Arunika Academy',
          heroTitle: 'Belajar Kreatif Tanpa Batas',
          heroSubtitle: 'Platform LMS profesional modern'
        },
        courses: []
      });
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

if (!isReady) {
  return (
    <div className="h-screen flex items-center justify-center text-slate-400">
      Initializing...
    </div>
  );
}

if (!state) {
  return (
    <div className="h-screen flex items-center justify-center text-red-500">
      Failed to load application state.
    </div>
  );
}

  return (
    <Router>
      <LayoutWrapper
        isAdmin={isAdmin}
        config={state.config}
        onLogout={() => setIsAdmin(false)}
      >
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

export default App;