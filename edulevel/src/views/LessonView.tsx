import { useState, useEffect, useRef } from 'react';
import { Lesson, UserProgress } from '../../types';
import { supabase } from '../../lib/supabase';
import { PROGRESSION_CONFIG } from '../utils/progression';

interface LessonViewProps {
    lesson: Lesson;
    progress?: UserProgress | null;
    onActivity: () => void;
    onBack: () => void;
}

type VideoResource = {
    id: string;
    title: string;
    duration?: string;
};

export function LessonView({ lesson, progress: dbProgress, onActivity, onBack }: LessonViewProps) {
    const [videoWatched, setVideoWatched] = useState(false);
    const [practiceComplete, setPracticeComplete] = useState(false);
    const [watchPct, setWatchPct] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const playerRef = useRef<any>(null);

    // VIDEO PLAYLIST OVERRIDES (Multi-video support)
    const VIDEO_OVERRIDES: Record<string, VideoResource[]> = {
        // --- MATEMÁTICAS ---
        "Conjunto Z (Números Enteros)": [
            { id: "g6bG6NjsDT4", title: "Introducción a los Números Enteros" },
            { id: "HCygvhYT1lL", title: "Clase Completa: Enteros 7° Básico" }
        ],
        "Valor Absoluto": [
            { id: "I1-d9I72PUI", title: "Valor Absoluto Explicado" }
        ],
        "Orden en Z (Mayor y Menor)": [
            { id: "D9l0yG-U_S0", title: "Comparación de Enteros" }
        ],
        "El Plano Cartesiano": [
            { id: "kzOzYY-n-wQ", title: "El Plano Cartesiano y sus Partes" },
            { id: "FKze-a_N6Ws", title: "Coordenadas Cartesianas (Ejemplo Divertido)" },
            { id: "G6S53330P2Q", title: "Pares Ordenados en 5 Minutos" }
        ],
        "Suma (Igual Signo)": [
            { id: "aGJ00fU5Csw", title: "Suma de Enteros (Mismo Signo)" }
        ],
        "Suma (Diferente signo)": [
            { id: "2AFZpUbG7HQ", title: "Suma de Enteros (Signo Diferente)" },
            { id: "EhJTYVR0LZd", title: "Repaso Suma y Resta (Agrupación)" }
        ],
        "Resta de Enteros": [
            { id: "8U9T8_gU55o", title: "Resta de Enteros Súper Fácil" }
        ],
        "Multiplicación": [
            { id: "ryXzNxvw31o", title: "Multiplicación de Enteros" }
        ],
        "División Exacta": [
            { id: "g25yIskh1VE", title: "División Exacta de Enteros" }
        ],
        "Polinomios Aritméticos": [
            { id: "cbOQh-6uV9M", title: "Polinomios Aritméticos" },
            { id: "GGafo6tVtVr", title: "Potenciación de Enteros" }
        ],

        // --- MATEMÁTICAS UNIDAD 3 (RACIONALES) ---
        "Fracciones": [
            { id: "TV55A0C888M", title: "Concepto de Fracción" }
        ],
        "Equivalentes": [
            { id: "osePKL39EBo", title: "Fracciones Equivalentes" }
        ],
        "Fracción a Decimal": [
            { id: "pOm1azhMuYM", title: "Convertir Fracción a Decimal" }
        ],
        "Orden en Q": [
            { id: "B-K0u78zmpk", title: "Orden en Racionales" }
        ],
        "Suma Homogénea": [
            { id: "antZqj9ePys", title: "Suma de Fracciones Homogéneas" }
        ],
        "Suma Heterogénea": [
            { id: "LgMptyzudXU", title: "Suma Heterogénea (Carita Feliz)" }
        ],
        "Multiplicación Q": [
            { id: "VDTZxc1eHZC", title: "Multiplicación de Fracciones" }
        ],
        "División Q": [
            { id: "RNtvQitNbLk", title: "División de Fracciones" }
        ],
        "Ecuaciones Aditivas": [
            { id: "D6_w37c7D0Q", title: "Ecuaciones Aditivas Simples" }
        ],
        "PROYECTO FINAL": [
            { id: "mB50d68rN8U", title: "Ejemplo de Proyecto Final" }
        ],


        // --- ESPAÑOL ---
        "Elementos Comunicación": [
            { id: "rDk-XMg9B9w", title: "Elementos de la Comunicación" }
        ],
        "Funciones Lenguaje": [
            { id: "pDJ300rA0jc", title: "Funciones del Lenguaje" }
        ],
        "Signo Lingüístico": [
            { id: "5238L7LrfiO", title: "Significado y Significante" }
        ],
        "Variedades Lingüísticas": [{ id: "Gp4A8E8ueVL", title: "Variedades Lingüísticas" }],
        "Resumen y Síntesis": [{ id: "GPY8KF8eitA", title: "Cómo hacer un Resumen" }],
        "Género Narrativo": [{ id: "HOHGC_xnrmK", title: "El Género Narrativo" }],
        "El Cuento": [{ id: "TyUjJg4jP7I", title: "El Cuento y sus Partes" }],
        "Tipos de Narrador": [{ id: "XbL-kvrrQ6Y", title: "Tipos de Narrador" }],
        "Tiempo y Espacio": [{ id: "H6TaHYKzx_Y", title: "Tiempo y Espacio en la Narración" }],
        "Leyenda y Mito": [{ id: "FBJiFxiVORr", title: "Mito y Leyenda" }],
        "Género Lírico": [{ id: "C93LrRH9T0h", title: "Género Lírico" }],
        "Verso y Estrofa": [{ id: "0NO3UvcX1MR", title: "Verso, Estrofa y Rima" }],
        "La Rima": [{ id: "dpjlpRn8SVO", title: "La Rima Explicada" }],
        "Figuras Literarias I": [{ id: "3M4pNpL-xCs", title: "Figuras Literarias Parte 1" }],
        "Figuras Literarias II": [{ id: "GyPJRQRrPQI", title: "Figuras Literarias Parte 2" }],
        "Sustantivo y Adjetivo": [{ id: "tnR9BY3RBoc", title: "El Sustantivo y el Adjetivo" }],
        "El Verbo": [{ id: "EkPr9yIJlf3", title: "El Verbo" }],
        "Ortografía: Acentuación": [{ id: "12WZMgeARfz", title: "Reglas de Acentuación" }],
        "Signos de Puntuación": [{ id: "0CsmK8E94GK", title: "Signos de Puntuación" }],

        // --- CIENCIAS NATURALES ---
        "Teoría Celular": [
            { id: "aoj9oGmGGgQ", title: "La Célula (Happy Learning)" },
            { id: "ECX3k-rLnP", title: "La Célula y sus Partes (Niños)" },
            { id: "QHUXNSPqh0E", title: "La Célula: Partes y Funciones (6to y 7mo)" }
        ],
        "Procariota vs Eucariota": [
            { id: "5Y3qM4Z8k5I", title: "Células Procariotas y Eucariotas" }
        ],
        "Organelos Celulares": [
            { id: "Hdnr6xOd0E-", title: "Organelos Celulares Explicados" },
            { id: "QHmjrrsBLC3", title: "Definición y Clasificación de la Célula" }
        ],
        "Transporte Celular": [
            { id: "kY41yS5x-4U", title: "Transporte Celular (Khan Academy)" }
        ],
        "Sistema Digestivo": [
            { id: "5DUIc9BchOk", title: "El Sistema Digestivo" },
            { id: "Gg3eJOBXNp", title: "Función y Componentes Digestivos" },
            { id: "GsyNIcS4DTd", title: "Cómo funciona tu sistema digestivo (Emma Bryce)" }
        ],
        "Respiración y Circulación": [
            { id: "Wq_7cZc7h2s", title: "Sistema Respiratorio y Circulatorio" }
        ],
        "Propiedades de la Materia": [
            { id: "swcjamDFsn0", title: "La Materia y sus Propiedades" }
        ],
        "Estados de la Materia": [{ id: "c4n-yD1sZ5s", title: "Estados de la Materia" }],
        "Cambios de Estado": [{ id: "xZlp4Y291M4", title: "Cambios de Estado" }],
        "Átomo (Intro)": [{ id: "D0V-N3TrIkY", title: "Introducción al Átomo" }],
        "Tabla Periódica (Intro)": [{ id: "PsW0sGF5EBE", title: "La Tabla Periódica" }],
        "Ecosistemas": [{ id: "XKSgZ0QdgAc", title: "Los Ecosistemas" }],


        // --- CIENCIAS SOCIALES ---
        "Caída del Imperio Romano": [
            { id: "UF_yHrFP1Ls", title: "Caída del Imperio Romano (Happy Learning)" },
            { id: "FdczHhFpktD", title: "¿Por qué cayó Roma? (Resumen 12 min)" },
            { id: "ExRk_LtPk5A", title: "Imperio Romano en 10 minutos" }
        ],
        "Invasiones Bárbaras": [
            { id: "P-e2f4J0aYc", title: "Las Invasiones Bárbaras" }
        ],
        "Imperio Bizantino": [
            { id: "GjEnSgnlD8Q", title: "El Imperio Bizantino" }
        ],
        "Introducción Edad Media": [
            { id: "0CnXN8_z-bU", title: "La Edad Media (Happy Learning)" }
        ],
        "El Sistema Feudal": [
            { id: "Vy_CyG1aWno", title: "El Feudalismo en 5 minutos" }
        ],
        "Continentes y Océanos": [
            { id: "mnR2MTjOBG4", title: "Continentes y Océanos (Happy Learning)" }
        ],
        "Derechos Humanos": [{ id: "PPe5H81Xf2E", title: "Derechos Humanos" }],
        "La Democracia": [{ id: "B9d1u_D7I-Y", title: "La Democracia" }],


        // --- INGLÉS ---
        "Personal Pronouns & To Be": [
            { id: "Z-mX4c3K3gA", title: "Personal Pronouns & Verb To Be" },
            { id: "HSf2MmAxI2w", title: "Verb To Be: Day 2 Plan" },
            { id: "Fcn6hf-Pou", title: "Verb To Be Negative Form" }
        ],
        "Greetings & Farewells": [
            { id: "Fw0rdSHZ6yY", title: "Greetings & Farewells Vocabulary" }
        ],
        "The Alphabet & Spelling": [
            { id: "75p-N9YKqNo", title: "ABC Song & Spelling" }
        ],
        "Numbers 1-100": [
            { id: "e0dJWfQHF8Y", title: "Numbers 1-100 Pronunciation" }
        ],
        "Countries & Nationalities": [
            { id: "l6A2EFkjXq4", title: "Countries & Nationalities" }
        ],
        "Simple Present (Affirmative)": [
            { id: "L9OAbtSTPRg", title: "Simple Present Tense" },
            { id: "FG5YSHxWN09", title: "Day 6: Simple Present Rules" }
        ],
        "Daily Routine Verbs": [
            { id: "M4FMEmlOqTM", title: "Daily Routine Vocabulary" }
        ],
        "The Time": [{ id: "fq2tRfHu5s8", title: "Telling Time" }],

        // --- TECNOLOGÍA ---
        "Historia del Computador": [
            { id: "_v7U_I0W7c8", title: "Historia de las Computadoras" },
            { id: "FaxbsIH2Hq", title: "Evolución de la Computadora" }
        ],
        "Hardware y Software": [
            { id: "n_69cZzAbM8", title: "Hardware y Software para Niños" },
            { id: "HTe7tfD6Qo", title: "Diferencias Hardware y Software" }
        ],
        "¿Cómo funciona Internet?": [
            { id: "iC40s9-tOQo", title: "¿Cómo funciona Internet?" }
        ],
        "Seguridad Digital": [
            { id: "9-z75_kXQyA", title: "Seguridad en Internet" },
            { id: "FLprsAIQjH", title: "Ciberseguridad para Niños" }
        ]
    };

    // Calculate playlist
    const playlist: VideoResource[] = VIDEO_OVERRIDES[lesson.title]
        ? VIDEO_OVERRIDES[lesson.title]
        : (lesson.content.concept?.youtube_id
            ? [{ id: lesson.content.concept.youtube_id, title: "Lección Principal" }]
            : []);

    // Current video ID based on index
    const videoId = playlist.length > 0 ? playlist[currentVideoIndex].id : null;
    const isVideoPending = !videoId && (lesson.content.concept?.video_pending);

    // Update current video index if playlist matches but index is out of bounds (safety)
    useEffect(() => {
        if (currentVideoIndex >= playlist.length && playlist.length > 0) {
            setCurrentVideoIndex(0);
        }
    }, [playlist, currentVideoIndex]);

    // Track YouTube Progress
    useEffect(() => {
        if (isVideoPending) {
            setVideoWatched(true);
            setWatchPct(100);
            updateDatabaseProgress({ video_watched_pct: 100 });
            return;
        }

        // Load YouTube API
        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const interval = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                const current = playerRef.current.getCurrentTime();
                const total = playerRef.current.getDuration();
                if (total > 0) {
                    const pct = Math.round((current / total) * 100);
                    // Only update watch percentage for the *first* video to count as "watching the lesson"
                    // Or we could average it. For now, let's keep it simple: watching the main video is enough.
                    if (currentVideoIndex === 0) {
                        setWatchPct(prev => Math.max(prev, pct));
                        if (pct >= PROGRESSION_CONFIG.VIDEO_REQUIREMENT) {
                            setVideoWatched(true);
                            updateDatabaseProgress({ video_watched_pct: pct });
                        }
                    }
                }
            }
        }, 3000);

        (window as any).onYouTubeIframeAPIReady = () => {
            loadPlayer();
        };

        // If API is already ready (navigated back and forth)
        if ((window as any).YT && (window as any).YT.Player) {
            loadPlayer();
        }

        function loadPlayer() {
            // Destroy existing if any to avoid conflicts
            // if (playerRef.current && playerRef.current.destroy) {
            //    playerRef.current.destroy();
            // }

            new (window as any).YT.Player(`yt-player-${lesson.id}`, {
                events: {
                    onReady: (event: any) => {
                        playerRef.current = event.target;
                    },
                    onStateChange: (event: any) => {
                        // 0 = Ended
                        if (event.data === 0) {
                            if (currentVideoIndex < playlist.length - 1) {
                                // Auto-advance
                                setCurrentVideoIndex(prev => prev + 1);
                            }
                        }
                    }
                }
            });
        }

        return () => clearInterval(interval);
    }, [lesson.id, isVideoPending, currentVideoIndex, playlist.length]);

    const updateDatabaseProgress = async (data: any) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            await supabase.from('user_progress').upsert({
                user_id: user.id,
                lesson_id: lesson.id,
                ...data,
                updated_at: new Date().toISOString()
            });
        } catch (e) {
            console.error("Non-blocking lesson progress save error:", e);
        }
    };

    const progress = Math.min(100, (watchPct * 0.5) + (practiceComplete ? 50 : 0));

    return (
        <div className="bg-[#f8f9fa] min-h-screen font-sans text-slate-900">
            {/* Header 'Clase Digital' */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
                        <div className="w-8 h-8 bg-[#7c5dfa] rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[20px]">school</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">Clase Digital</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-9 h-9 rounded-full bg-[#f1f5f9] flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                    <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Student" alt="User" />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 px-2">
                    <span onClick={onBack} className="hover:text-[#7c5dfa] cursor-pointer">Cursos</span>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span>Lección Actual</span>
                </div>

                {/* Title Section */}
                <div className="mb-8 px-2">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-[#eef2ff] text-[#7c5dfa] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border border-indigo-100">
                            Unidad {lesson.unit || 1}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                            <span className="material-symbols-outlined text-[16px]">bolt</span>
                            <span>{lesson.xp} XP</span>
                        </div>
                        {playlist.length > 1 && (
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">playlist_play</span>
                                Playlist: {playlist.length} videos
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">{lesson.title}</h1>
                    <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">{lesson.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Video & Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Video Player */}
                        <div className="aspect-video bg-black rounded-[24px] overflow-hidden relative shadow-xl group border-4 border-white ring-1 ring-slate-100">
                            {videoId ? (
                                <iframe
                                    id={`yt-player-${lesson.id}`}
                                    key={`iframe-${videoId}`} // Force re-render on video change
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&rel=0`}
                                    title={lesson.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <>
                                    <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Video placeholder" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-[#7c5dfa]/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-2xl">
                                            <span className="material-symbols-outlined text-white text-5xl">play_arrow</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* PLAYLIST CONTROL (If multiple videos) */}
                        {playlist.length > 1 && (
                            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-500">queue_music</span>
                                    Contenido de la Lección ({currentVideoIndex + 1}/{playlist.length})
                                </h4>
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                    {playlist.map((video, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentVideoIndex(idx)}
                                            className={`flex-shrink-0 w-64 p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${currentVideoIndex === idx
                                                    ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500/20'
                                                    : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 relative z-10">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${currentVideoIndex === idx ? 'bg-[#7c5dfa] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                                    }`}>
                                                    {statusIcon(idx)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`text-xs font-bold truncate ${currentVideoIndex === idx ? 'text-indigo-900' : 'text-slate-600'}`}>
                                                        {video.title}
                                                    </div>
                                                    <div className="text-[10px] text-slate-400">
                                                        {currentVideoIndex === idx ? 'Reproduciendo...' : `${video.duration || 'Ver video'}`}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Progress bar background for current video (simulated) */}
                                            {currentVideoIndex === idx && (
                                                <div className="absolute bottom-0 left-0 h-1 bg-indigo-200 w-full">
                                                    <div className="h-full bg-indigo-500 animate-pulse" style={{ width: '100%' }}></div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Lesson Summary */}
                        <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#7c5dfa]">description</span> Resumen de la lección
                            </h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                <div className="space-y-4">
                                    {(lesson.content.explanation || "").split('\n').map((line, i) => (
                                        <p key={i} className={line.startsWith('•') ? 'ml-4 flex items-start gap-2' : ''}>
                                            {line.startsWith('•') && <span className="text-[#7c5dfa] font-bold">•</span>}
                                            {line.replace('•', '')}
                                        </p>
                                    ))}
                                </div>

                                <div className="bg-[#f8fafc] p-6 rounded-2xl border-l-4 border-[#7c5dfa] mt-8">
                                    <h4 className="font-bold text-slate-900 mb-2 italic">Aprenderás hoy:</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>✅ Conceptos básicos y vocabulario.</li>
                                        <li>✅ Aplicación práctica inmediata.</li>
                                        <li>✅ Reto final de evaluación.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* CTA Button */}
                        <button
                            onClick={onActivity}
                            className="w-full py-4 bg-[#7c5dfa] hover:bg-[#6a4df0] text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 transform active:scale-95 group"
                        >
                            <span className="material-symbols-outlined group-hover:animate-bounce">play_circle</span> Comenzar práctica
                        </button>

                        {/* Teacher Note */}
                        <div className="bg-[#f3f0ff] p-6 rounded-3xl border border-indigo-100 relative">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-white p-1 shadow-sm shrink-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" className="w-full h-full rounded-full" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-[#7c5dfa] tracking-widest mb-1">NOTA DE LA PROFE</p>
                                    <p className="text-slate-700 italic text-sm font-medium leading-relaxed">
                                        "{lesson.content.transfer}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-4">Tu Progreso</h4>
                            <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                                <span>Completado</span>
                                <span className="text-slate-900 font-bold">{progress}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-[#7c5dfa]" style={{ width: `${progress}%` }} />
                            </div>
                            <p className="text-xs text-slate-400 text-center">
                                {progress < 100 ? 'Te faltan ver el video y completar el quiz.' : '¡Has completado esta lección!'}
                            </p>
                        </div>

                        {/* Resources */}
                        {lesson.content.resources && lesson.content.resources.length > 0 && (
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <h4 className="font-bold text-slate-900 mb-4">Material Complementario</h4>
                                <div className="space-y-3">
                                    {lesson.content.resources.map((r, i) => (
                                        <div key={i} className="group p-3 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-[#f8fafc] transition-all cursor-pointer flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${r.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                                <span className="material-symbols-outlined">{r.type === 'pdf' ? 'picture_as_pdf' : 'link'}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-700 text-sm truncate">{r.title}</p>
                                                <p className="text-xs text-slate-400">{r.size || 'Recurso externo'}</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-[#7c5dfa]">download</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );

    function statusIcon(idx: number) {
        if (currentVideoIndex === idx) return 'play_arrow';
        if (currentVideoIndex > idx) return 'check';
        return idx + 1;
    }
}
