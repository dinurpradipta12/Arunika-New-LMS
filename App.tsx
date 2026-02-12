
import React, { useState, useEffect } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate, 
  useLocation,
  Navigate
} from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  Settings, 
  Trash2, 
  LogOut, 
  Edit3, 
  ArrowLeft,
  Video,
  Layout,
  ExternalLink,
  Star,
  ArrowRight,
  Share2,
  FileText,
  Link as LinkIcon,
  Globe,
  Twitter,
  Linkedin,
  Database,
  Info,
  Copy,
  Terminal,
  Code,
  CheckCircle2
} from 'lucide-react';
import { AppState, Course, Lesson, LMSConfig, LessonType, LearningAsset, Mentor } from './types';
import { loadState, saveState } from './storage';
import { HandDrawnButton } from './components/HandDrawnButton';
import { HandDrawnCard } from './components/HandDrawnCard';
import { HandDrawnInput } from './components/HandDrawnInput';
import { RichTextEditor } from './components/RichTextEditor';

// --- Shared Layout Component ---
const LayoutWrapper: React.FC<{ children: React.ReactNode, isAdmin?: boolean, config: LMSConfig, onLogout?: () => void }> = ({ 
  children, isAdmin, config, onLogout 
}) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin/edit');

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-200/20 rounded-full blur-[120px] -z-10" />

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
                <div className="flex items-center gap-2">
                  <Link to="/admin">
                    <HandDrawnButton variant="secondary" size="sm">
                      <Layout className="w-4 h-4 mr-2" /> Dashboard
                    </HandDrawnButton>
                  </Link>
                  <HandDrawnButton onClick={onLogout} variant="ghost" size="sm" className="text-rose-500">
                    <LogOut className="w-5 h-5" />
                  </HandDrawnButton>
                </div>
              ) : (
                <Link to="/login">
                  <HandDrawnButton variant="ghost" size="sm" className="text-slate-600">Admin Login</HandDrawnButton>
                </Link>
              )}
            </nav>
          </div>
        </header>
      )}

      <main className={`max-w-7xl mx-auto px-6 pb-24 flex-1 ${isDashboard ? 'pt-8' : 'pt-10'}`}>
        {children}
      </main>
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
const CourseViewPage: React.FC<{ 
  courses: Course[], 
  isAdmin: boolean,
  onSaveMentor: (cid: string, mentor: Mentor) => void 
}> = ({ courses, isAdmin, onSaveMentor }) => {
  const { courseId } = useParams();
  const course = courseId ? courses.find(c => c.id === courseId) : courses[0];
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditingMentor, setIsEditingMentor] = useState(false);
  const [mentorDraft, setMentorDraft] = useState<Mentor | null>(null);

  useEffect(() => {
    if (course && course.lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(course.lessons[0]);
    }
  }, [course, selectedLesson]);

  if (!course) return <div className="py-20 text-center font-bold text-slate-900">Data kursus tidak ditemukan.</div>;

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
              <div className="space-y-6">
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
                {selectedLesson.description && (
                  <HandDrawnCard className="!p-10 shadow-xl border-none">
                     <div className="prose prose-slate max-w-none">
                       <h4 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
                         <Info size={16} className="text-indigo-500" /> Deskripsi Materi
                       </h4>
                       <div 
                         className="text-slate-600 leading-relaxed text-base"
                         dangerouslySetInnerHTML={{ __html: selectedLesson.description }} 
                       />
                     </div>
                  </HandDrawnCard>
                )}
              </div>
            ) : (
              <div className="space-y-6">
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
                {selectedLesson.description && (
                  <HandDrawnCard className="!p-10 shadow-xl border-none">
                     <div className="prose prose-slate max-w-none">
                       <h4 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2">
                         <Info size={16} className="text-indigo-500" /> Informasi Tambahan
                       </h4>
                       <div 
                         className="text-slate-600 leading-relaxed text-base"
                         dangerouslySetInnerHTML={{ __html: selectedLesson.description }} 
                       />
                     </div>
                  </HandDrawnCard>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold">
            Pilih materi di samping untuk mulai belajar
          </div>
        )}

        {/* Mentor Card */}
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
                    {course.mentor.socials?.twitter && <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Twitter className="w-5 h-5" /></a>}
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
                <div className="flex gap-4">
                   <HandDrawnButton className="flex-1 rounded-2xl" onClick={handleMentorSave}>Simpan</HandDrawnButton>
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
CREATE TABLE IF NOT EXISTS lms_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  logo TEXT,
  brand_name TEXT NOT NULL,
  hero_title TEXT,
  hero_subtitle TEXT,
  CONSTRAINT single_row CHECK (id = 1)
);

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
`.trim();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex items-center gap-6">
            <div className="h-20 w-20 overflow-hidden bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center">
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
              <Settings className="w-4 h-4 mr-2" /> Settings
            </HandDrawnButton>
            <HandDrawnButton onClick={() => {
                const newCourse: Course = {
                  id: `course-${Date.now()}`,
                  title: 'Judul Kursus Baru',
                  description: 'Deskripsi materi...',
                  thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
                  isPublic: true,
                  createdAt: Date.now(),
                  lessons: [],
                  assets: [],
                  mentor: { name: 'Mentor', role: 'Instruktur', bio: 'Bio...', photo: 'https://i.pravatar.cc/150', website: '', socials: {} }
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
        <HandDrawnCard className="!p-10 space-y-8 shadow-2xl animate-in slide-in-from-top-4 duration-300">
           <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-2xl font-bold">Konfigurasi LMS</h3>
              <button onClick={() => setShowConfig(false)} className="text-slate-400">Tutup</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <HandDrawnInput label="Brand Name" value={config.brandName} onChange={e => setConfig({...config, brandName: e.target.value})} />
                 <HandDrawnInput label="Hero Title" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} />
                 <HandDrawnInput label="Hero Subtitle" multiline value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} />
                 <HandDrawnInput label="Logo" type="file" onFileSelect={b => setConfig({...config, logo: b})} />
              </div>
              <div className="bg-slate-900 rounded-[2rem] p-6 text-white font-mono text-[10px] overflow-auto max-h-64">
                 <div className="flex justify-between mb-4 border-b border-white/10 pb-2">
                    <span className="font-bold text-indigo-300">SQL SETUP SCRIPT</span>
                    <button onClick={() => { navigator.clipboard.writeText(sqlScript); alert('Copied!'); }} className="text-white bg-white/10 px-2 py-1 rounded">COPY</button>
                 </div>
                 <pre>{sqlScript}</pre>
              </div>
           </div>
           <HandDrawnButton className="w-full h-14" onClick={handleUpdateConfig}>Simpan Pengaturan</HandDrawnButton>
        </HandDrawnCard>
      )}

      <div className="grid grid-cols-1 gap-6">
         {courses.map(course => (
           <HandDrawnCard key={course.id} className="group flex flex-col lg:flex-row gap-8 items-center !p-6">
              <div className="h-32 w-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 shrink-0">
                 <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
              </div>
              <div className="flex-1 space-y-2 w-full text-center lg:text-left">
                 <h3 className="text-2xl font-extrabold text-slate-900">{course.title}</h3>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-3">
                    <HandDrawnButton size="sm" variant="secondary" onClick={() => navigate(`/admin/edit/${course.id}`)}>Edit Modul</HandDrawnButton>
                    <HandDrawnButton size="sm" variant="outline" onClick={() => handleShare(course.id)}>Share Link</HandDrawnButton>
                    <HandDrawnButton size="sm" variant="ghost" className="text-rose-500" onClick={() => {
                        if(confirm('Hapus kursus?')) {
                          const updated = courses.filter(c => c.id !== course.id);
                          setCourses(updated);
                          onSave({...state, courses: updated});
                        }
                    }}><Trash2 className="w-4 h-4" /></HandDrawnButton>
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

  if (!course) return null;

  const saveLocal = (updated: Course) => {
    setCourse(updated);
    onSave({...state, courses: state.courses.map(c => c.id === courseId ? updated : c)});
  };

  const addLesson = (type: LessonType) => {
    const newLesson: Lesson = { 
      id: `l-${Date.now()}`, 
      title: 'Pelajaran Baru', 
      type, 
      content: 'Tulis isi materi...', 
      description: '',
      order: course.lessons.length, 
      videoUrl: type === 'video' ? 'https://www.youtube.com/embed/qz0aGYrrlhU' : '' 
    };
    saveLocal({...course, lessons: [...course.lessons, newLesson]});
    setShowAddMenu(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
         <HandDrawnButton variant="outline" size="sm" className="rounded-2xl" onClick={() => navigate('/admin')}>
           <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
         </HandDrawnButton>
         <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{course.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-4 space-y-6">
            <HandDrawnCard className="space-y-6 !p-8 shadow-xl border-none">
               <h3 className="font-bold border-b pb-2">Informasi Kursus</h3>
               <HandDrawnInput label="Thumbnail" type="file" onFileSelect={b => saveLocal({...course, thumbnail: b})} />
               <HandDrawnInput label="Judul" value={course.title} onChange={e => saveLocal({...course, title: e.target.value})} />
               <HandDrawnInput label="Deskripsi" multiline value={course.description} onChange={e => saveLocal({...course, description: e.target.value})} />
            </HandDrawnCard>
         </div>

         <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-bold">Daftar Modul</h3>
               <div className="relative">
                  <HandDrawnButton size="sm" onClick={() => setShowAddMenu(!showAddMenu)}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Materi
                  </HandDrawnButton>
                  {showAddMenu && (
                    <div className="absolute top-full right-0 mt-3 bg-white shadow-2xl rounded-2xl p-2 z-50 border border-slate-100 min-w-[160px]">
                       <button onClick={() => addLesson('text')} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl text-sm font-bold flex items-center gap-2">
                         <FileText className="w-4 h-4" /> Text Page
                       </button>
                       <button onClick={() => addLesson('video')} className="w-full text-left p-3 hover:bg-slate-50 rounded-xl text-sm font-bold flex items-center gap-2">
                         <Video className="w-4 h-4" /> Video Link
                       </button>
                    </div>
                  )}
               </div>
            </div>

            <div className="space-y-6">
               {course.lessons.map((lesson, idx) => (
                 <HandDrawnCard key={lesson.id} className="!p-0 border-slate-200 overflow-hidden group">
                    <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
                       <div className="flex items-center gap-4">
                          <span className="h-8 w-8 bg-indigo-600 text-white rounded-lg text-xs font-black flex items-center justify-center">{idx + 1}</span> 
                          <span className="font-bold">{lesson.title}</span>
                       </div>
                       <button onClick={() => saveLocal({...course, lessons: course.lessons.filter(l => l.id !== lesson.id)})} className="text-rose-500">
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                    <div className="p-8 space-y-6">
                       <HandDrawnInput label="Judul Materi" value={lesson.title} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, title: e.target.value} : l)})} />
                       {lesson.type === 'video' && (
                         <HandDrawnInput label="YouTube Embed URL" value={lesson.videoUrl} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, videoUrl: e.target.value} : l)})} />
                       )}
                       <HandDrawnInput label="Ringkasan / Isi Singkat" multiline value={lesson.content} onChange={e => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, content: e.target.value} : l)})} />
                       <RichTextEditor label="Deskripsi Detail (Rich Text)" value={lesson.description} onChange={val => saveLocal({...course, lessons: course.lessons.map(l => l.id === lesson.id ? {...l, description: val} : l)})} />
                    </div>
                 </HandDrawnCard>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Login Page ---
const LoginPage: React.FC<{ onLogin: (u: string, p: string) => boolean }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto py-24 px-4 animate-in zoom-in-95 duration-500">
       <div className="text-center mb-10 space-y-4">
          <div className="h-20 w-20 bg-gradient-primary rounded-[2rem] flex items-center justify-center text-white text-4xl font-bold mx-auto shadow-2xl">☀️</div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Area</h2>
       </div>
       <HandDrawnCard className="!p-12 border-none shadow-2xl">
          <form onSubmit={e => { e.preventDefault(); if(onLogin(username, password)) navigate('/admin'); }} className="space-y-6">
             <HandDrawnInput label="Username" value={username} onChange={e => setUsername(e.target.value)} />
             <HandDrawnInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
             <HandDrawnButton type="submit" className="w-full h-16 rounded-2xl text-lg font-bold">Sign In</HandDrawnButton>
          </form>
       </HandDrawnCard>
    </div>
  );
}

// --- Main App Component ---
const App: React.FC = () => {
  const [state, setState] = useState<AppState | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setIsReady(true);
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
      courses: state.courses.map(c => c.id === cid ? { ...c, mentor } : c)
    };
    handleSaveState(updated);
  };

  if (!isReady || !state) return null;

  return (
    <Router>
      <LayoutWrapper isAdmin={isAdmin} config={state.config} onLogout={() => setIsAdmin(false)}>
        <Routes>
          <Route path="/" element={<HomePage courses={state.courses} config={state.config} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/course/:courseId" element={<CourseViewPage courses={state.courses} isAdmin={isAdmin} onSaveMentor={handleSaveMentor} />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard state={state} onSave={handleSaveState} onLogout={() => setIsAdmin(false)} /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/admin/edit/:courseId" element={isAdmin ? <CourseEditor state={state} onSave={handleSaveState} /> : <LoginPage onLogin={handleLogin} />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

export default App;
