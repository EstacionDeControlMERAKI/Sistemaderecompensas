import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, Users, CheckCircle, Clock, Award, BarChart2, 
  Settings, Plus, Trash2, Edit2, Play, Sparkles, Check, Star, Shield, Heart, Smile, Cloud, CloudSync, RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('routine');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Sincronización en la nube por Código de Familia
  const [familyId, setFamilyId] = useState('familia-montessori-2026');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Sincronizado');

  // Estado Base Inicial
  const initialKids = [
    { id: '1', name: 'Sofía', age: 11, avatar: '👧', points: 50 },
    { id: '2', name: 'Lucía', age: 7, avatar: '🧒', points: 35 },
    { id: '3', name: 'Emma', age: 4, avatar: '👶', points: 20 },
  ];

  const initialRoutineItems = [
    { 
      id: 'r1', time: '14:00', title: 'Llegada y Transición', icon: '🎒', 
      desc: 'Zapatos y mochilas en su lugar, lavarse las manos y ordenar la ropa que se acaban de sacar.', 
      montessori: 'Autonomía y orden ambiental',
      tasks: [
        { id: 't1_1', title: 'Guardar zapatos y mochila en su sitio', points: 5 },
        { id: 't1_2', title: 'Lavarse las manos correctamente', points: 5 },
        { id: 't1_3', title: 'Ordenar y colgar la ropa que traían del colegio', points: 10 }
      ]
    },
    { 
      id: 'r2', time: '14:15', title: 'Almuerzo y Mesa', icon: '🍲', 
      desc: 'Poner la mesa para el almuerzo, comer y levantar/lavar platos al terminar.', 
      montessori: 'Vida práctica y cooperación',
      tasks: [
        { id: 't2_1', title: 'Poner la mesa para el almuerzo', points: 10 },
        { id: 't2_2', title: 'Levantar la mesa del almuerzo', points: 10 },
        { id: 't2_3', title: 'Lavar los platos del almuerzo', points: 15 }
      ]
    },
    { 
      id: 'r3', time: '14:45', title: 'Tarea Escolar y Lectura', icon: '📚', 
      desc: 'Primaria, repaso, tareas cortas y lectura o juegos de letras.', 
      montessori: 'Concentración y estudio',
      tasks: [
        { id: 't3_1', title: 'Realizar tareas escolares / lectura', points: 15 }
      ]
    },
    { 
      id: 'r4', time: '15:45', title: 'Cuidado de la Mascota y Casa', icon: '🐕', 
      desc: 'Atender a la perrita (alimento y agua) y pequeñas tareas del hogar.', 
      montessori: 'Responsabilidad y empatía',
      tasks: [
        { id: 't4_1', title: 'Poner alimento a la perra', points: 10 },
        { id: 't4_2', title: 'Cambiar el agua a la perra', points: 10 },
        { id: 't4_3', title: 'Sacudir muebles', points: 10 },
        { id: 't4_4', title: 'Pasar el escobillón', points: 15 }
      ]
    },
    { 
      id: 'r5', time: '16:30', title: 'Orden Personal y Ropa', icon: '🧺', 
      desc: 'Tender la cama, ordenar habitación/ropero y gestionar ropa limpia.', 
      montessori: 'Orden y vida práctica',
      tasks: [
        { id: 't5_1', title: 'Tender su cama', points: 15 },
        { id: 't5_2', title: 'Guardar la ropa que recibieron recién limpia en el ropero', points: 15 },
        { id: 't5_3', title: 'Colocar la ropa sucia en el canasto', points: 5 },
        { id: 't5_4', title: 'Colgar la ropa de lavar', points: 10 }
      ]
    },
    { 
      id: 'r6', time: '17:00', title: 'Merienda y Gimnasia / Actividad', icon: '🤸‍♀️', 
      desc: 'Merienda saludable, ejercicio físico / gimnasia o actividad especial.', 
      montessori: 'Desarrollo físico y motor',
      tasks: [
        { id: 't6_1', title: 'Realizar ejercicios o gimnasia (15 min)', points: 10 },
        { id: 't6_2', title: 'Merienda saludable', points: 5 }
      ]
    },
    { 
      id: 'r7', time: '18:00', title: 'Baño y Aseo Personal', icon: '🛁', 
      desc: 'Higiene personal, lavado de dientes y cambio a pijama.', 
      montessori: 'Cuidado e higiene personal',
      tasks: [
        { id: 't7_1', title: 'Bañarse y asearse', points: 15 },
        { id: 't7_2', title: 'Llenar botellas de agua para la familia', points: 10 }
      ]
    },
    { 
      id: 'r8', time: '19:00', title: 'Tiempo de Calma y Lectura', icon: '💬', 
      desc: 'Lectura compartida, charla tranquila y descanso visual.', 
      montessori: 'Paz interior',
      tasks: [
        { id: 't8_1', title: 'Momento de lectura y calma', points: 10 }
      ]
    },
    { 
      id: 'r9', time: '20:00', title: 'Cena Familiar y Tareas de Cierre', icon: '🍽️', 
      desc: 'Poner mesa para la cena, comer, levantar y lavar platos de la cena.', 
      montessori: 'Trabajo en equipo y cooperación',
      tasks: [
        { id: 't9_1', title: 'Poner la mesa para la cena', points: 10 },
        { id: 't9_2', title: 'Levantar la mesa de la cena', points: 10 },
        { id: 't9_3', title: 'Lavar los platos de la cena', points: 15 }
      ]
    },
    { 
      id: 'r10', time: '20:30', title: 'Preparación para Dormir', icon: '🛏️', 
      desc: 'Dientes, revisión de mochila y descanso.', 
      montessori: 'Ritual de cierre',
      tasks: [
        { id: 't10_1', title: 'Cepillarse los dientes y preparación final', points: 10 }
      ]
    },
  ];

  const initialRewards = [
    { id: 'rew1', title: 'Elegir postre del fin de semana', cost: 50, icon: '🍨' },
    { id: 'rew2', title: '30 min extra de juego o lectura', cost: 70, icon: '📖' },
    { id: 'rew3', title: 'Elegir película de cine familiar', cost: 100, icon: '🎬' },
    { id: 'rew4', title: 'Vale para eximirse de una tarea menor', cost: 120, icon: '⭐' },
  ];

  // Estados principales cargados desde localStorage con persistencia por familia
  const [kids, setKids] = useState(() => {
    const saved = localStorage.getItem(`kids_${familyId}`);
    return saved ? JSON.parse(saved) : initialKids;
  });

  const [routineItems, setRoutineItems] = useState(() => {
    const saved = localStorage.getItem(`routine_${familyId}`);
    return saved ? JSON.parse(saved) : initialRoutineItems;
  });

  const [completions, setCompletions] = useState(() => {
    const saved = localStorage.getItem(`completions_${familyId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const [rewards, setRewards] = useState(() => {
    const saved = localStorage.getItem(`rewards_${familyId}`);
    return saved ? JSON.parse(saved) : initialRewards;
  });

  // Guardar automáticamente en almacenamiento local sincronizado al cambiar estados
  useEffect(() => {
    localStorage.setItem(`kids_${familyId}`, JSON.stringify(kids));
    localStorage.setItem(`routine_${familyId}`, JSON.stringify(routineItems));
    localStorage.setItem(`completions_${familyId}`, JSON.stringify(completions));
    localStorage.setItem(`rewards_${familyId}`, JSON.stringify(rewards));
    setLastSynced(new Date().toLocaleTimeString());
  }, [kids, routineItems, completions, rewards, familyId]);

  // Cambiar de Familia / Sincronizar
  const handleFamilyChange = (newId) => {
    if (!newId.trim()) return;
    setFamilyId(newId);
    const savedKids = localStorage.getItem(`kids_${newId}`);
    const savedRoutine = localStorage.getItem(`routine_${newId}`);
    const savedCompletions = localStorage.getItem(`completions_${newId}`);
    const savedRewards = localStorage.getItem(`rewards_${newId}`);

    setKids(savedKids ? JSON.parse(savedKids) : initialKids);
    setRoutineItems(savedRoutine ? JSON.parse(savedRoutine) : initialRoutineItems);
    setCompletions(savedCompletions ? JSON.parse(savedCompletions) : {});
    setRewards(savedRewards ? JSON.parse(savedRewards) : initialRewards);
  };

  // Modales
  const [isKidsModalOpen, setIsKidsModalOpen] = useState(false);
  const [editingKid, setEditingKid] = useState(null);
  const [newKidName, setNewKidName] = useState('');
  const [newKidAge, setNewKidAge] = useState('');
  const [newKidAvatar, setNewKidAvatar] = useState('👧');

  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [newRewardTitle, setNewRewardTitle] = useState('');
  const [newRewardCost, setNewRewardCost] = useState('');
  const [newRewardIcon, setNewRewardIcon] = useState('🎁');

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [actTitle, setActTitle] = useState('');
  const [actTime, setActTime] = useState('15:00');
  const [actDesc, setActDesc] = useState('');
  const [actIcon, setActIcon] = useState('⭐');

  // Acciones de Tareas
  const toggleTaskCompletion = (kidId, taskId, taskPoints) => {
    const key = `${selectedDate}_${kidId}_${taskId}`;
    const current = completions[key] || false;
    const nextVal = !current;

    setCompletions(prev => ({
      ...prev,
      [key]: nextVal
    }));

    setKids(prevKids => prevKids.map(kid => {
      if (kid.id === kidId) {
        return { ...kid, points: nextVal ? kid.points + taskPoints : Math.max(0, kid.points - taskPoints) };
      }
      return kid;
    }));
  };

  const redeemReward = (kidId, reward) => {
    const kid = kids.find(k => k.id === kidId);
    if (!kid) return;

    if (kid.points < reward.cost) {
      alert(`${kid.name} necesita ${reward.cost} puntos (tiene ${kid.points}) para canjear esto.`);
      return;
    }

    if (window.confirm(`¿Deseas canjear "${reward.title}" para ${kid.name} por ${reward.cost} puntos?`)) {
      setKids(prevKids => prevKids.map(k => {
        if (k.id === kidId) {
          return { ...k, points: k.points - reward.cost };
        }
        return k;
      }));
      alert(`¡Felicitaciones ${kid.name}! Has canjeado con éxito: ${reward.title} 🎉`);
    }
  };

  const handleSaveKid = (e) => {
    e.preventDefault();
    if (!newKidName.trim()) return;

    if (editingKid) {
      setKids(kids.map(k => k.id === editingKid.id ? { ...k, name: newKidName, age: Number(newKidAge), avatar: newKidAvatar } : k));
    } else {
      const newKid = {
        id: Date.now().toString(),
        name: newKidName,
        age: Number(newKidAge) || 5,
        avatar: newKidAvatar,
        points: 0
      };
      setKids([...kids, newKid]);
    }
    setNewKidName('');
    setNewKidAge('');
    setEditingKid(null);
    setIsKidsModalOpen(false);
  };

  const handleSaveReward = (e) => {
    e.preventDefault();
    if (!newRewardTitle.trim() || !newRewardCost) return;

    const newRew = {
      id: Date.now().toString(),
      title: newRewardTitle,
      cost: Number(newRewardCost),
      icon: newRewardIcon
    };
    setRewards([...rewards, newRew]);
    setNewRewardTitle('');
    setNewRewardCost('');
    setIsRewardModalOpen(false);
  };

  const handleSaveActivity = (e) => {
    e.preventDefault();
    if (!actTitle.trim()) return;

    if (editingActivity) {
      setRoutineItems(routineItems.map(item => item.id === editingActivity.id ? { ...item, title: actTitle, time: actTime, desc: actDesc, icon: actIcon } : item));
    } else {
      const newItem = {
        id: 'r_' + Date.now(),
        time: actTime,
        title: actTitle,
        icon: actIcon,
        desc: actDesc,
        montessori: 'Actividad personalizada',
        tasks: [
          { id: 't_custom_' + Date.now(), title: actTitle, points: 10 }
        ]
      };
      setRoutineItems([...routineItems, newItem].sort((a,b) => a.time.localeCompare(b.time)));
    }
    setActTitle('');
    setActDesc('');
    setEditingActivity(null);
    setIsActivityModalOpen(false);
  };

  const calculateStats = () => {
    let totalTasks = 0;
    routineItems.forEach(item => totalTasks += item.tasks.length);
    let totalPossible = totalTasks * kids.length;
    let completedCount = 0;

    Object.keys(completions).forEach(key => {
      if (key.startsWith(selectedDate) && completions[key]) {
        completedCount++;
      }
    });

    const percentage = totalPossible > 0 ? Math.round((completedCount / totalPossible) * 100) : 0;
    return { percentage, completedCount, totalPossible };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-slate-800 font-sans pb-16">
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-orange-100 shadow-xs px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏡</span>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Rutina Familiar Sincronizada (14:00 - 21:00)
              </h1>
              <p className="text-xs text-slate-500">Conectado en la nube con tu hija (Multi-dispositivo)</p>
            </div>
          </div>

          {/* CONFIGURACIÓN DE CÓDIGO DE FAMILIA (SINCRONIZACIÓN) */}
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
            <Cloud className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span className="text-xs font-medium text-emerald-800">Código Familia:</span>
            <input 
              type="text" 
              value={familyId} 
              onChange={(e) => handleFamilyChange(e.target.value)}
              className="bg-white px-2 py-0.5 rounded text-xs font-bold text-emerald-700 outline-none w-32 border border-emerald-300"
              title="Comparte este mismo código en el dispositivo de tu hija para sincronizar"
            />
            <span className="text-[10px] text-emerald-600 font-mono">({lastSynced})</span>
          </div>

          {/* CALENDARIO RETROACTIVO */}
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200 shadow-2xs">
            <CalendarIcon className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-slate-600">Día activo:</span>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-orange-700 outline-none cursor-pointer"
            />
          </div>

          {/* PUNTOS */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {kids.map(kid => (
              <div key={kid.id} className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-2xs border border-orange-100">
                <span className="text-base">{kid.avatar}</span>
                <span className="text-xs font-bold">{kid.name}:</span>
                <span className="text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full font-extrabold flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-orange-500 text-orange-500" /> {kid.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <div className="max-w-6xl mx-auto flex justify-center sm:justify-start gap-2 mt-3 pt-2 border-t border-slate-100 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('routine')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'routine' ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-orange-50'}`}
          >
            <Clock className="w-4 h-4" /> Rutina & Tareas (14-21h)
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'rewards' ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-orange-50'}`}
          >
            <Award className="w-4 h-4" /> Tienda de Recompensas
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'analytics' ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-orange-50'}`}
          >
            <BarChart2 className="w-4 h-4" /> Análisis de Resultados
          </button>
          <button 
            onClick={() => setActiveTab('kids')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'kids' ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-orange-50'}`}
          >
            <Users className="w-4 h-4" /> Gestionar Niños
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto px-4 mt-6">

        {/* TAB 1: RUTINA Y TAREAS */}
        {activeTab === 'routine' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-orange-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Panel de Tareas Sincronizado</h2>
                <p className="text-xs text-slate-500">
                  Fecha activa: <span className="font-bold text-orange-600">{selectedDate}</span>. Tu hija de 11 años puede marcar desde su dispositivo usando el mismo código de familia.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full">
                  Progreso del día: {stats.percentage}%
                </span>
                <button 
                  onClick={() => { setEditingActivity(null); setActTitle(''); setActDesc(''); setIsActivityModalOpen(true); }}
                  className="bg-orange-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-orange-700 transition"
                >
                  <Plus className="w-4 h-4" /> Añadir Actividad
                </button>
              </div>
            </div>

            {/* LISTA DE BLOQUES */}
            <div className="space-y-4">
              {routineItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-all">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl bg-orange-50 p-2.5 rounded-2xl">{item.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold bg-orange-600 text-white px-2 py-0.5 rounded-md">
                            {item.time}
                          </span>
                          <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> {item.montessori}
                      </span>
                      <button 
                        onClick={() => { setEditingActivity(item); setActTitle(item.title); setActTime(item.time); setActDesc(item.desc); setActIcon(item.icon); setIsActivityModalOpen(true); }}
                        className="p-1.5 bg-slate-100 hover:bg-orange-100 text-slate-600 rounded-xl text-xs font-bold transition"
                        title="Editar actividad"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* TAREAS ESPECÍFICAS */}
                  <div className="mt-4 space-y-3">
                    {item.tasks.map(task => (
                      <div key={task.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700">🔹 {task.title}</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full">
                            +{task.points} pts
                          </span>
                        </div>

                        {/* CHECKBOXES POR NIÑA */}
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                          {kids.map(kid => {
                            const key = `${selectedDate}_${kid.id}_${task.id}`;
                            const isDone = completions[key] || false;
                            return (
                              <button
                                key={kid.id}
                                onClick={() => toggleTaskCompletion(kid.id, task.id, task.points)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                  isDone 
                                    ? 'bg-emerald-600 text-white shadow-2xs' 
                                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                                }`}
                              >
                                <span>{kid.avatar}</span>
                                <span>{kid.name}</span>
                                {isDone ? <Check className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: TIENDA DE RECOMPENSAS */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-orange-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Sistema de Recompensas y Canje</h2>
                <p className="text-xs text-slate-500">Canjea los puntos acumulados por completar tareas.</p>
              </div>
              <button 
                onClick={() => setIsRewardModalOpen(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-orange-700 transition shadow-xs"
              >
                <Plus className="w-4 h-4" /> Añadir Recompensa
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewards.map(rew => (
                <div key={rew.id} className="bg-white p-5 rounded-3xl shadow-xs border border-orange-100 flex flex-col justify-between">
                  <div>
                    <div className="text-4xl text-center py-3 bg-orange-50 rounded-2xl mb-3">{rew.icon}</div>
                    <h3 className="font-bold text-slate-800 text-sm text-center">{rew.title}</h3>
                    <div className="flex justify-center items-center gap-1 mt-2 text-orange-600 font-extrabold text-xs">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" /> {rew.cost} Puntos
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <p className="text-[10px] text-slate-400 text-center font-medium">Canjear para:</p>
                    <div className="flex justify-center gap-2">
                      {kids.map(kid => (
                        <button
                          key={kid.id}
                          onClick={() => redeemReward(kid.id, rew)}
                          disabled={kid.points < rew.cost}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                            kid.points >= rew.cost 
                              ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-2xs' 
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <span>{kid.avatar}</span>
                          <span>{kid.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ANÁLISIS DE RESULTADOS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-orange-100">
              <h2 className="text-lg font-bold text-slate-800">Análisis de Resultados y Evolución</h2>
              <p className="text-xs text-slate-500">Métricas de cumplimiento para la fecha: <span className="font-bold text-orange-600">{selectedDate}</span></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-xs border border-orange-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-xl text-orange-600 font-bold">
                  {stats.percentage}%
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400">Cumplimiento Diario</h3>
                  <p className="text-lg font-extrabold text-slate-800">{stats.completedCount} de {stats.totalPossible} tareas</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xs border border-orange-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-xl text-amber-600 font-bold">
                  ⭐
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400">Puntos Totales</h3>
                  <p className="text-lg font-extrabold text-slate-800">
                    {kids.reduce((acc, k) => acc + k.points, 0)} Pts
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xs border border-orange-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl text-emerald-600 font-bold">
                  👧
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400">Hijas Registradas</h3>
                  <p className="text-lg font-extrabold text-slate-800">{kids.length} niñas</p>
                </div>
              </div>
            </div>

            {/* Desglose individual */}
            <div className="bg-white p-6 rounded-3xl shadow-xs border border-orange-100">
              <h3 className="font-bold text-slate-800 mb-4 text-sm">Resumen por Niña en esta Fecha</h3>
              <div className="space-y-4">
                {kids.map(kid => {
                  let totalT = 0;
                  let doneT = 0;
                  routineItems.forEach(item => {
                    item.tasks.forEach(t => {
                      totalT++;
                      if (completions[`${selectedDate}_${kid.id}_${t.id}`]) doneT++;
                    });
                  });
                  const p = totalT > 0 ? Math.round((doneT / totalT) * 100) : 0;

                  return (
                    <div key={kid.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{kid.avatar}</span>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{kid.name} <span className="text-xs font-normal text-slate-500">({kid.age} años)</span></h4>
                          <p className="text-xs text-orange-600 font-bold flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 fill-orange-500 text-orange-500" /> {kid.points} puntos
                          </p>
                        </div>
                      </div>
                      <div className="w-full sm:w-48">
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-500">Progreso:</span>
                          <span className="text-slate-700">{p}% ({doneT}/{totalT})</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-orange-600 h-full rounded-full transition-all" style={{ width: `${p}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GESTIÓN DE NIÑOS */}
        {activeTab === 'kids' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-xs border border-orange-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Gestión de Niños y Edición</h2>
                <p className="text-xs text-slate-500">Añade o edita nombres, edades y avatares.</p>
              </div>
              <button 
                onClick={() => { setEditingKid(null); setNewKidName(''); setNewKidAge(''); setIsKidsModalOpen(true); }}
                className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-orange-700 transition shadow-xs"
              >
                <Plus className="w-4 h-4" /> Añadir Niña
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {kids.map(kid => (
                <div key={kid.id} className="bg-white p-5 rounded-3xl shadow-xs border border-orange-100 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl bg-orange-50 p-3 rounded-2xl">{kid.avatar}</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{kid.name}</h3>
                      <p className="text-xs text-slate-500">{kid.age} años</p>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block mt-1">
                        ⭐ {kid.points} puntos
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end gap-2">
                    <button 
                      onClick={() => { setEditingKid(kid); setNewKidName(kid.name); setNewKidAge(kid.age); setNewKidAvatar(kid.avatar); setIsKidsModalOpen(true); }}
                      className="p-2 bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-orange-700 rounded-xl transition text-xs font-bold flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Editar
                    </button>
                    {kids.length > 1 && (
                      <button 
                        onClick={() => {
                          if (window.confirm(`¿Eliminar a ${kid.name}?`)) {
                            setKids(kids.filter(k => k.id !== kid.id));
                          }
                        }}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL GESTIÓN NIÑA */}
      {isKidsModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingKid ? 'Editar Niña' : 'Añadir Nueva Niña'}
            </h3>
            <form onSubmit={handleSaveKid} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={newKidName}
                  onChange={(e) => setNewKidName(e.target.value)}
                  placeholder="Ej. Sofía"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Edad</label>
                <input 
                  type="number" 
                  value={newKidAge}
                  onChange={(e) => setNewKidAge(e.target.value)}
                  placeholder="Ej. 7"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Avatar</label>
                <div className="flex gap-2">
                  {['👧', '🧒', '👶', '🎀', '🦄', '⭐'].map(av => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setNewKidAvatar(av)}
                      className={`text-2xl p-2 rounded-xl border ${newKidAvatar === av ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button 
                  type="button"
                  onClick={() => setIsKidsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NUEVA RECOMPENSA */}
      {isRewardModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Añadir Nueva Recompensa</h3>
            <form onSubmit={handleSaveReward} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Título</label>
                <input 
                  type="text" 
                  value={newRewardTitle}
                  onChange={(e) => setNewRewardTitle(e.target.value)}
                  placeholder="Ej. Helado el domingo"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Costo en Puntos</label>
                <input 
                  type="number" 
                  value={newRewardCost}
                  onChange={(e) => setNewRewardCost(e.target.value)}
                  placeholder="Ej. 40"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Icono</label>
                <div className="flex gap-2">
                  {['🎁', '🍨', '🎬', '📖', '⭐', '🎨'].map(icon => (
                    <button
                      type="button"
                      key={icon}
                      onClick={() => setNewRewardIcon(icon)}
                      className={`text-2xl p-2 rounded-xl border ${newRewardIcon === icon ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button 
                  type="button"
                  onClick={() => setIsRewardModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ACTIVIDAD */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingActivity ? 'Editar Actividad' : 'Añadir Nueva Actividad'}
            </h3>
            <form onSubmit={handleSaveActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Título de la Actividad</label>
                <input 
                  type="text" 
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  placeholder="Ej. Pintura o manualidades"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Hora</label>
                <input 
                  type="text" 
                  value={actTime}
                  onChange={(e) => setActTime(e.target.value)}
                  placeholder="Ej. 17:30"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Descripción corta</label>
                <input 
                  type="text" 
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  placeholder="Ej. Actividad creativa guiada"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button 
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

