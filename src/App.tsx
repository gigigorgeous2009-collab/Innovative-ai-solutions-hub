/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Cpu, Bot, Database, Sparkles, MessageSquare, Image as ImageIcon, 
  ChevronRight, ArrowRight, CheckCircle2, Shield, Zap, Globe, 
  Send, X, Menu, Settings, User, LogOut, RefreshCw, Layers, Sliders, Play, Award, Compass, BarChart3
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase Client
const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);
const googleProvider = new GoogleAuthProvider();

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    { role: 'model', content: "Hello! I'm your AI Lead Architect at Innovative AI Solutions in Toronto. How can we help your business automate operations or deploy custom AI agents today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // ROI Estimator State
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('FinTech & Financial Services');
  const [challenge, setChallenge] = useState('High volume of customer support inquiries and manual underwriting overhead.');
  const [targetGoal, setTargetGoal] = useState('Automate 80% of tier-1 support and accelerate loan decisions.');
  const [estimateResult, setEstimateResult] = useState<string | null>(null);
  const [estimateLoading, setEstimateLoading] = useState(false);

  // AI Image Studio State
  const [imagePrompt, setImagePrompt] = useState('Futuristic autonomous AI operations control center in downtown Toronto with glowing neon neural networks');
  const [imageRes, setImageRes] = useState('2K');
  const [imageAspect, setImageAspect] = useState('16:9');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactService, setContactService] = useState('Custom AI Agents');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Three.js Controls State
  const [coreSpeed, setCoreSpeed] = useState(1.0);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);

  // Three.js Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Three.js 3D Neural Scene Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    // Dynamically load Three.js & RoomEnvironment if needed or use global THREE
    const THREE = (window as any).THREE;
    if (!THREE) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.035);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 8);

    // Lighting (Warm Key + Cool Fill + Hemisphere)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x22e6ff, 3.0);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x8b5cf6, 2.0);
    fillLight.position.set(-5, -3, -5);
    scene.add(fillLight);

    // Composite 3-12 Part Procedural Model: Neural Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Part 1: Central Dodecahedron Crystal Core
    const coreGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x22e6ff,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      thickness: 1.2,
      wireframe: wireframeMode,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Part 2: Inner Ring
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.06, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.2, metalness: 0.8 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Part 3: Outer Orbital Ring
    const ring2Geo = new THREE.TorusGeometry(3.2, 0.04, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0xf472d0, roughness: 0.3, metalness: 0.7 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // Parts 4-11: Orbiting Energy Nodes (InstancedMesh or Group nodes)
    const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x22e6ff, emissiveIntensity: 0.8 });
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / 8) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 2.6, Math.sin(angle) * 1.2, Math.sin(angle) * 2.6);
      coreGroup.add(node);
      nodes.push(node);
    }

    // Part 12: Ground Contact Platform
    const platformGeo = new THREE.CylinderGeometry(4.5, 5.0, 0.3, 32);
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x090d1a, roughness: 0.5, metalness: 0.9 });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -2.2;
    scene.add(platform);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      coreGroup.rotation.y += 0.4 * coreSpeed * delta;
      coreGroup.rotation.x = Math.sin(time * 0.5) * 0.2;
      
      ring1.rotation.z += 0.6 * coreSpeed * delta;
      ring2.rotation.z -= 0.5 * coreSpeed * delta;

      // Update wireframe mode
      coreMat.wireframe = wireframeMode;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [wireframeMode, coreSpeed]);

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Chat Submission Handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    const newMessages = [...chatMessages, { role: 'user' as const, content: userMsg }];
    setChatMessages(newMessages);
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setChatMessages([...newMessages, { role: 'model', content: data.text }]);
    } catch (err: any) {
      setChatMessages([...newMessages, { role: 'model', content: 'Sorry, I encountered an error connecting to the AI agent. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  // ROI Estimator Submission
  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstimateLoading(true);
    setEstimateResult(null);

    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, industry, currentChallenge: challenge, targetGoal }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setEstimateResult(data.analysis);
    } catch (err: any) {
      setEstimateResult('Failed to generate estimate. Please check your inputs and try again.');
    } finally {
      setEstimateLoading(false);
    }
  };

  // Image Generation Submission
  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim() || imageLoading) return;

    setImageLoading(true);
    setGeneratedImageUrl(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt, resolution: imageRes, aspectRatio: imageAspect }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGeneratedImageUrl(data.url);
    } catch (err: any) {
      console.error(err);
      alert('Image generation failed. Ensure your Gemini API key has access to image models.');
    } finally {
      setImageLoading(false);
    }
  };

  // Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setContactSubmitting(true);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, company: contactCompany, service: contactService, message: contactMessage }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactCompany('');
      setContactMessage('');
    } catch (err: any) {
      alert('Failed to send message: ' + (err.message || 'Unknown error'));
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-[#eaf0ff] font-['Inter',sans-serif] selection:bg-[#8b5cf6] selection:text-white relative overflow-x-hidden">
      
      {/* Background Three.js Canvas */}
      <canvas ref={canvasRef} id="webgl" className="fixed inset-0 z-0 pointer-events-none" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#05070f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 font-['Space_Grotesk'] font-bold text-xl tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#22e6ff] to-[#8b5cf6] flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.6)]">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            Innovative<span className="bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] bg-clip-text text-transparent">&nbsp;AI</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8b96b3]">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#estimator" className="hover:text-white transition">ROI Estimator</a>
            <a href="#studio" className="hover:text-white transition">AI Studio</a>
            <a href="#process" className="hover:text-white transition">Process</a>
            <a href="#results" className="hover:text-white transition">Results</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <span className="text-xs text-[#22e6ff] font-mono">{user.displayName || user.email}</span>
                <button onClick={handleLogout} className="text-[#8b96b3] hover:text-white transition" title="Sign out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGoogleLogin} 
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-sm font-semibold hover:border-[#22e6ff] transition">
                <User className="w-4 h-4 text-[#22e6ff]" /> Sign In
              </button>
            )}

            <a href="#contact" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:scale-105 transition">
              Book Call
            </a>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#05070f]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 text-lg">
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#estimator" onClick={() => setMobileMenuOpen(false)}>ROI Estimator</a>
            <a href="#studio" onClick={() => setMobileMenuOpen(false)}>AI Studio</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a>
            <a href="#results" onClick={() => setMobileMenuOpen(false)}>Results</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs tracking-wider uppercase text-[#8b96b3] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22e6ff]" /> AI Studio — Toronto, ON
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-['Space_Grotesk'] tracking-tight leading-[1.1] mb-6">
              Intelligent agents that <br />
              <span className="bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] bg-clip-text text-transparent">work while you sleep.</span>
            </h1>
            <p className="text-lg text-[#8b96b3] mb-8 max-w-xl">
              Innovative AI Solutions designs, builds, and deploys custom AI agents, machine learning systems, and enterprise automation pipelines that cut operational costs and grow revenue 24/7.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#estimator" className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] text-white font-semibold shadow-[0_8px_30px_rgba(139,92,246,0.4)] hover:scale-105 transition flex items-center gap-2">
                Calculate AI ROI <ArrowRight className="w-4 h-4" />
              </a>
              <button onClick={() => setChatOpen(true)} className="px-7 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-semibold hover:border-[#22e6ff] transition flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#22e6ff]" /> Chat with AI Architect
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#22e6ff] to-[#8b5cf6] bg-clip-text text-transparent font-['Space_Grotesk']">40+</h3>
                <p className="text-xs text-[#8b96b3] mt-1">AI systems shipped</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#22e6ff] to-[#8b5cf6] bg-clip-text text-transparent font-['Space_Grotesk']">98%</h3>
                <p className="text-xs text-[#8b96b3] mt-1">Client retention</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#22e6ff] to-[#8b5cf6] bg-clip-text text-transparent font-['Space_Grotesk']">12 wks</h3>
                <p className="text-xs text-[#8b96b3] mt-1">Average to full ROI</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative h-[500px]">
            {/* 3D Interactive Visualizer Callout & HUD */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#05070f]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-[#22e6ff] flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" /> 3D Neural Core Telemetry
                </span>
                <button onClick={() => setControlsCollapsed(!controlsCollapsed)} className="text-xs text-[#8b96b3] hover:text-white">
                  {controlsCollapsed ? '▴ Expand' : '▾ Collapse'}
                </button>
              </div>

              {!controlsCollapsed && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-[#8b96b3] mb-1">
                      <span>Core Rotation Speed</span>
                      <span className="font-mono text-white">{coreSpeed.toFixed(1)}x</span>
                    </div>
                    <input 
                      type="range" min="0.2" max="3.0" step="0.2" value={coreSpeed} 
                      onChange={(e) => setCoreSpeed(parseFloat(e.target.value))}
                      className="w-full accent-[#22e6ff] bg-white/10 rounded-lg h-2 cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-[#8b96b3]">Wireframe Structural Mode</span>
                    <button 
                      onClick={() => setWireframeMode(!wireframeMode)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition ${wireframeMode ? 'bg-[#22e6ff] text-black font-bold' : 'bg-white/10 text-white'}`}>
                      {wireframeMode ? 'ACTIVE' : 'OFF'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="py-6 border-y border-white/10 bg-white/[0.015] relative z-10 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite] text-sm text-[#8b96b3] font-mono">
          <span>◆ Custom AI Agents</span>
          <span>◆ Machine Learning Models</span>
          <span>◆ Workflow Automation</span>
          <span>◆ Conversational AI</span>
          <span>◆ Predictive Analytics</span>
          <span>◆ LLM & RAG Integration</span>
          <span>◆ Computer Vision</span>
          <span>◆ Enterprise Data Engineering</span>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-mono uppercase text-[#22e6ff] tracking-widest">// What we build</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk'] mt-3 mb-4">
            Agentic AI, engineered for <br />
            <span className="bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] bg-clip-text text-transparent">real business outcomes</span>
          </h2>
          <p className="text-[#8b96b3] max-w-2xl mb-16 text-lg">
            From architecture to production, we ship intelligent systems that perform reliably under enterprise load.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Bot, title: 'Autonomous AI Agents', desc: 'Autonomous agents that research, decide, and execute across your software tools — handling operations, sales, and support end-to-end.' },
              { icon: Cpu, title: 'Machine Learning Models', desc: 'Custom predictive models trained on your proprietary data for demand forecasting, lead scoring, and automated risk analysis.' },
              { icon: Zap, title: 'Workflow Automation', desc: 'Connecting your CRM, ERP, and communication stacks into self-driving pipelines that eliminate manual administrative busywork.' },
              { icon: MessageSquare, title: 'Conversational AI', desc: 'Advanced voice and text chatbots grounded in your knowledge base to resolve inquiries and book appointments 24/7.' },
              { icon: Database, title: 'Data & Analytics', desc: 'Transform raw enterprise data into actionable decision engines, real-time dashboards, and automated insight layers.' },
              { icon: Sparkles, title: 'AI Strategy & Audits', desc: 'Executive roadmaps, feasibility audits, and build-vs-buy guidance to ensure your AI investments deliver maximum measurable ROI.' }
            ].map((s, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#8b5cf6]/60 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22e6ff]/20 to-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center mb-6 text-[#22e6ff]">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-3">{s.title}</h3>
                <p className="text-[#8b96b3] text-sm leading-relaxed mb-6">{s.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#22e6ff] group-hover:gap-3 transition-all">
                  Get started <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ROI Estimator Section (Gemini-4-Carbon with High Thinking) */}
      <section id="estimator" className="py-28 relative z-10 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-[#22e6ff] tracking-widest">// AI Intelligence & ROI Analysis</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] mt-3 mb-4">
              Instant AI Project Scope & <span className="bg-gradient-to-r from-[#22e6ff] to-[#f472d0] bg-clip-text text-transparent">ROI Estimator</span>
            </h2>
            <p className="text-[#8b96b3]">
              Powered by Gemini 4 Carbon deep reasoning engine. Input your business challenge below to generate a tailored AI architecture and ROI roadmap instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <form onSubmit={handleEstimateSubmit} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Company Name</label>
                <input 
                  type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} 
                  placeholder="Acme Corp" 
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Industry Sector</label>
                <select 
                  value={industry} onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none transition">
                  <option>FinTech & Financial Services</option>
                  <option>Logistics & Supply Chain</option>
                  <option>Healthcare & Biotech</option>
                  <option>Retail & E-Commerce</option>
                  <option>SaaS & Technology</option>
                  <option>Professional Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Primary Operational Bottleneck</label>
                <textarea 
                  value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none transition resize-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Target Outcome</label>
                <input 
                  type="text" value={targetGoal} onChange={(e) => setTargetGoal(e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none transition" 
                />
              </div>

              <button 
                type="submit" disabled={estimateLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] text-white font-bold shadow-[0_10px_30px_rgba(139,92,246,0.5)] hover:scale-[1.02] transition flex items-center justify-center gap-2">
                {estimateLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {estimateLoading ? 'Generating Deep Analysis (High Thinking)...' : 'Generate AI Architecture & ROI'}
              </button>
            </form>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl min-h-[480px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <span className="text-xs font-mono text-[#22e6ff] uppercase flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Gemini 4 Carbon Reasoning Engine
                  </span>
                  <span className="text-xs font-mono bg-[#8b5cf6]/20 text-[#8b5cf6] px-2.5 py-1 rounded-full">ThinkingLevel: HIGH</span>
                </div>

                {estimateResult ? (
                  <div className="prose prose-invert text-sm text-[#8b96b3] space-y-4 max-h-[380px] overflow-y-auto pr-2">
                    <div className="whitespace-pre-wrap leading-relaxed">{estimateResult}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-[#8b96b3]">
                    <BarChart3 className="w-12 h-12 text-[#8b5cf6] mb-4 opacity-50" />
                    <p className="text-sm">Complete the form on the left and click generate to receive your customized AI strategy report.</p>
                  </div>
                )}
              </div>

              {estimateResult && (
                <div className="pt-6 border-t border-white/10 mt-6 flex justify-end">
                  <a href="#contact" className="px-6 py-3 rounded-xl bg-[#22e6ff] text-black font-bold text-sm hover:bg-[#8b5cf6] hover:text-white transition">
                    Book Discovery Call on this Plan →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AI Image Studio Section (Gemini-3-Pro-Image-Preview) */}
      <section id="studio" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-[#22e6ff] tracking-widest">// Generative Assets</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] mt-3 mb-4">
              AI Concept <span className="bg-gradient-to-r from-[#22e6ff] to-[#f472d0] bg-clip-text text-transparent">Studio</span>
            </h2>
            <p className="text-[#8b96b3]">
              Generate high-resolution 1K, 2K, and 4K concept art, agent visualizations, and product mockups instantly using Gemini 3 Pro Image Preview.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <form onSubmit={handleGenerateImage} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Image Prompt</label>
                <textarea 
                  value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none transition resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Resolution</label>
                  <select 
                    value={imageRes} onChange={(e) => setImageRes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none">
                    <option value="1K">1K High Definition</option>
                    <option value="2K">2K Ultra HD</option>
                    <option value="4K">4K Cinematic Masterpiece</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Aspect Ratio</label>
                  <select 
                    value={imageAspect} onChange={(e) => setImageAspect(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none">
                    <option value="16:9">16:9 Landscape</option>
                    <option value="1:1">1:1 Square</option>
                    <option value="9:16">9:16 Portrait</option>
                    <option value="4:3">4:3 Standard</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" disabled={imageLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] text-white font-bold shadow-[0_10px_30px_rgba(34,230,255,0.3)] hover:scale-[1.02] transition flex items-center justify-center gap-2">
                {imageLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                {imageLoading ? `Generating ${imageRes} Asset...` : 'Generate AI Image Asset'}
              </button>
            </form>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 min-h-[380px] flex items-center justify-center relative overflow-hidden">
              {imageLoading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 text-[#22e6ff] animate-spin" />
                  <p className="text-xs font-mono text-[#8b96b3]">Synthesizing {imageRes} neural asset...</p>
                </div>
              )}
              {generatedImageUrl ? (
                <img src={generatedImageUrl} alt="Generated AI Asset" className="w-full h-auto rounded-2xl shadow-2xl object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="text-center text-[#8b96b3]">
                  <ImageIcon className="w-16 h-16 text-[#8b5cf6] mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Generated high-res asset will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-28 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-mono uppercase text-[#22e6ff] tracking-widest">// Delivery Framework</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk'] mt-3 mb-4">
            From idea to autonomous <br />
            <span className="bg-gradient-to-r from-[#22e6ff] to-[#8b5cf6] bg-clip-text text-transparent">in four moves</span>
          </h2>
          <p className="text-[#8b96b3] max-w-xl mb-16">
            A proven, transparent engineering methodology refined across dozens of enterprise deployments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Discover & Audit', desc: 'We map your workflows, data silos, and bottlenecks — ranking AI opportunities by speed to ROI.' },
              { num: '02', title: 'Prototype & Validate', desc: 'A working proof-of-concept in weeks, tested on your real data with rigorous success criteria.' },
              { num: '03', title: 'Build & Integrate', desc: 'Production-grade engineering integrated with your existing software stack — secure and monitored.' },
              { num: '04', title: 'Deploy & Scale', desc: 'We ship, measure ROI, and iterate. Your AI agents get smarter every sprint.' }
            ].map((p, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#22e6ff] transition group">
                <span className="text-4xl font-extrabold font-['Space_Grotesk'] bg-gradient-to-r from-[#22e6ff] to-[#8b5cf6] bg-clip-text text-transparent block mb-4">{p.num}</span>
                <h4 className="text-lg font-bold mb-2">{p.title}</h4>
                <p className="text-sm text-[#8b96b3]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Proof Section */}
      <section id="results" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#22e6ff]/10 via-[#8b5cf6]/15 to-[#f472d0]/10 border border-[#8b5cf6]/40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase text-[#22e6ff] tracking-widest">// Proven Metrics</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] mt-3 mb-4">
                Proof, not <span className="bg-gradient-to-r from-[#22e6ff] to-[#f472d0] bg-clip-text text-transparent">promises</span>
              </h2>
              <p className="text-[#8b96b3] mb-8 leading-relaxed">
                Every client engagement is fully instrumented. Here is what our partners experience on average within the first quarter after deployment.
              </p>
              <a href="#contact" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#22e6ff] to-[#8b5cf6] text-white font-bold text-sm shadow-[0_8px_30px_rgba(139,92,246,0.4)] hover:scale-105 transition inline-flex items-center gap-2">
                Get Your Free AI Audit <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '63%', label: 'Average cost reduction' },
                { stat: '5x', label: 'Faster response times' },
                { stat: '27%', label: 'Revenue lift reported' },
                { stat: '24/7', label: 'Autonomous operation' }
              ].map((r, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#05070f]/70 border border-white/10 text-center">
                  <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#22e6ff] to-[#f472d0] bg-clip-text text-transparent font-['Space_Grotesk'] mb-1">{r.stat}</h3>
                  <p className="text-xs text-[#8b96b3]">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Consultation Booking */}
      <section id="contact" className="py-28 relative z-10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-mono uppercase text-[#22e6ff] tracking-widest">// Let's Talk</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-['Space_Grotesk'] mt-3 mb-6">
              Ready to put AI to <br />
              <span className="bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] bg-clip-text text-transparent">work for you?</span>
            </h2>
            <p className="text-[#8b96b3] mb-8 leading-relaxed">
              Book a free 30-minute AI readiness consultation with our Toronto engineering team. No pitch decks — just a practical look at where AI can move your metrics.
            </p>

            <div className="space-y-4 text-sm text-[#8b96b3]">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#22e6ff]" />
                <div><strong className="text-white">Innovative AI Solutions</strong> — Toronto, ON, Canada</div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#8b5cf6]" />
                <div><strong className="text-white">Email:</strong> hello@innovativeaisolutions.ca</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-6">
            {contactSuccess && (
              <div className="p-4 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#22c55e] text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thanks! Your consultation request has been saved to Firestore. We will reach out within one business day.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Name</label>
                <input 
                  type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Jane Doe" required 
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Email</label>
                <input 
                  type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="jane@company.com" required 
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Company</label>
                <input 
                  type="text" value={contactCompany} onChange={(e) => setContactCompany(e.target.value)} placeholder="Company Inc." 
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Service Interest</label>
                <select 
                  value={contactService} onChange={(e) => setContactService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none">
                  <option>Custom AI Agents</option>
                  <option>Machine Learning Models</option>
                  <option>Workflow Automation</option>
                  <option>Conversational AI Chatbots</option>
                  <option>Strategy & AI Audit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#8b96b3] mb-2">Project Details</label>
              <textarea 
                value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} rows={4} placeholder="Tell us about the operational challenge you want to solve..." required 
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:border-[#22e6ff] outline-none resize-none" 
              />
            </div>

            <button 
              type="submit" disabled={contactSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#22e6ff] via-[#8b5cf6] to-[#f472d0] text-white font-bold shadow-[0_10px_30px_rgba(139,92,246,0.4)] hover:scale-[1.02] transition flex items-center justify-center gap-2">
              {contactSubmitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {contactSubmitting ? 'Saving to Firestore...' : 'Book Consultation Call →'}
            </button>
          </form>
        </div>
      </section>

      {/* Floating AI Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#22e6ff] to-[#8b5cf6] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(139,92,246,0.6)] hover:scale-110 transition">
            <Bot className="w-7 h-7" />
          </button>
        ) : (
          <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl bg-[#090d1a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#22e6ff] to-[#8b5cf6] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-['Space_Grotesk']">Innovative AI Architect</h4>
                  <span className="text-[10px] text-[#22e6ff] font-mono flex items-center gap-1">● Online (Gemini 4 Hydrogen)</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-[#8b96b3] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl ${m.role === 'user' ? 'bg-[#8b5cf6] text-white rounded-br-none' : 'bg-white/10 text-[#eaf0ff] rounded-bl-none'}`}>
                    <p className="whitespace-pre-wrap text-xs leading-relaxed">{m.content}</p>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="p-3 bg-white/10 rounded-2xl rounded-bl-none text-xs text-[#8b96b3] flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#22e6ff]" /> AI Architect is typing...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input 
                type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about AI agents, ML models..." 
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:border-[#22e6ff] outline-none" 
              />
              <button type="submit" className="p-2.5 rounded-xl bg-gradient-to-tr from-[#22e6ff] to-[#8b5cf6] text-white hover:scale-105 transition">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 font-['Space_Grotesk'] font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#22e6ff] to-[#8b5cf6] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              Innovative<span className="text-[#22e6ff]">&nbsp;AI</span>
            </div>
            <p className="text-xs text-[#8b96b3] leading-relaxed">
              We build intelligent systems for ambitious businesses. Toronto-based, globally deployed.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold font-['Space_Grotesk'] mb-4">Services</h4>
            <div className="space-y-2 text-xs text-[#8b96b3]">
              <a href="#services" className="block hover:text-white transition">Custom AI Agents</a>
              <a href="#services" className="block hover:text-white transition">Machine Learning</a>
              <a href="#services" className="block hover:text-white transition">Workflow Automation</a>
              <a href="#services" className="block hover:text-white transition">Conversational AI</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold font-['Space_Grotesk'] mb-4">Intelligence</h4>
            <div className="space-y-2 text-xs text-[#8b96b3]">
              <a href="#estimator" className="block hover:text-white transition">AI ROI Estimator</a>
              <a href="#studio" className="block hover:text-white transition">AI Image Studio</a>
              <a href="#process" className="block hover:text-white transition">Delivery Framework</a>
              <a href="#results" className="block hover:text-white transition">Case Studies</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold font-['Space_Grotesk'] mb-4">Connect</h4>
            <div className="space-y-2 text-xs text-[#8b96b3]">
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="block hover:text-white transition">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener" className="block hover:text-white transition">X / Twitter</a>
              <a href="mailto:hello@innovativeaisolutions.ca" className="block hover:text-white transition">hello@innovativeaisolutions.ca</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#8b96b3]">
          <span>© 2026 Innovative AI Solutions. All rights reserved.</span>
          <span>Engineered with Gemini AI & Three.js in Toronto, ON</span>
        </div>
      </footer>

    </div>
  );
}
