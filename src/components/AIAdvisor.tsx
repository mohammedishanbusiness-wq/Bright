import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Volume2, VolumeX, Mic, MicOff, Sparkles, RefreshCw, X, HelpCircle, CornerDownRight } from "lucide-react";
import { ChatMessage } from "../types";

interface AIAdvisorProps {
  onBookConsultation: () => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export default function AIAdvisor({ onBookConsultation, initialPrompt, onClearInitialPrompt }: AIAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      text: "Hello! I am your 24/7 BrightR Financial AI Assistant. I can help you evaluate mortgage borrowing capacity, explain Self-Managed Super Funds (SMSFs), map RAD vs DAP care scenarios, or help you book a formal consultation with our senior advisor Anita Fasciani in South Yarra. What can I calculate or clarify for you today?",
      timestamp: new Date(),
      suggestedActions: [
        "Explain offset savings",
        "How is aged care RAD calculated?",
        "Help me understand SMSF strategy",
        "Book consultation with Anita"
      ]
    }
  ]);
  
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false); // TTS active
  const [isListeningMic, setIsListeningMic] = useState(false); // STT active
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll chat history
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle external service prompt injection (e.g. from service landing action clicks)
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  // Speech Recognition setup (STT)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-AU"; // Aussie accent calibration!

      rec.onstart = () => {
        setIsListeningMic(true);
      };

      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
        }
      };

      rec.onerror = (err: any) => {
        console.error("Speech Recognition Error:", err);
        setIsListeningMic(false);
      };

      rec.onend = () => {
        setIsListeningMic(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Speak function (TTS helper utilizing native window speechSynthesis for zero network latency)
  const speakText = (text: string) => {
    if (!voiceActive) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Clean markdown text symbols
    const cleanText = text.replace(/[*#`_\[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Select an English sounding voice (representing friendly Aussie advisor)
    const voices = window.speechSynthesis.getVoices();
    const aussieOrEngVoice = voices.find(v => v.lang.includes("AU") || v.lang.includes("GB") || v.lang.includes("US"));
    if (aussieOrEngVoice) {
      utterance.voice = aussieOrEngVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Toggle Microphone recognition
  const toggleMicListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser version. Try using Chrome or Edge.");
      return;
    }

    if (isListeningMic) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis.cancel(); // Mute synthesized talk back while users speak
      recognitionRef.current.start();
    }
  };

  // Turn voice on/off
  const toggleVoiceMode = () => {
    if (!voiceActive) {
      setVoiceActive(true);
      // Give pleasant vocal verification
      const verifyUtterance = new SpeechSynthesisUtterance("Voice assistant enabled. I will read your answers aloud.");
      window.speechSynthesis.speak(verifyUtterance);
    } else {
      setVoiceActive(false);
      window.speechSynthesis.cancel();
    }
  };

  // Send message method (interfacing with Express server endpoint)
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    // Build user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    // Build chat history array to send to Gemini (limit to last 4 exchanges to keep payloads light & quick)
    const historyPayload = messages.slice(-8).map(m => ({
      role: m.role,
      text: m.text
    }));

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          text: data.text || "I apologize, I received an incomplete response. Please dial (03) 9826 2633 for direct human advisory.",
          timestamp: new Date(),
          suggestedActions: data.suggestedActions || ["Explain super structures", "Book consultation", "Get mortgage quotes"]
        };
        
        setMessages(prev => [...prev, assistantMsg]);
        
        // Speak response if active
        if (voiceActive) {
          speakText(assistantMsg.text);
        }
      } else {
        throw new Error(data.error || "Internal response error");
      }
    } catch (err: any) {
      console.error("AI Assistant Error:", err);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        text: "I am experiencing brief connection lag to our core South Yarra database. For immediate assistance with rates, Super guidance, or booking Anita Fasciani, please dial (03) 9826 2633 or try sending again.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-navy-100" id="ai-advisor-workspace">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left instructions list column (5 list items) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">24/7 Digital Concierge</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy-950 leading-tight">
              Meet Your 24/7 <br />
              <span className="text-gradient-navy-emerald">AI Financial Assistant</span>
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed font-light">
              We believe elite advisory shouldn't be gated behind office hours. Our custom-trained Gemini financial blueprint assist is calibrated with Australia's latest ASIC super rules, aged care fee structures, and current bank borrowing guidelines.
            </p>

            <ul className="space-y-4 pt-2">
              {[
                { title: "Super & Superannuation", desc: "Understand salary sacrifices, contribution limits, SMSF targets." },
                { title: "Mortgages & Refinancing", desc: "Compare offsets, model custom borrowing power, identify lazy bank rates." },
                { title: "Aged Care Structures", desc: "Clarify RAD vs DAP models, preserve pensions, safeguard estate equity." },
                { title: "Vocal Synthesiser Support", desc: "Toggle voice mode to hear professional spoken advisory feedback instantly." }
              ].map((feat, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] text-emerald-800 font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-navy-950">{feat.title}</h4>
                    <p className="text-[11px] text-navy-500 font-sans mt-0.5">{feat.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex gap-4 flex-wrap">
              <button
                onClick={toggleVoiceMode}
                className={`text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 cursor-pointer border transition-all ${
                  voiceActive 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300" 
                    : "bg-navy-50 text-navy-700 border-navy-200"
                }`}
                id="voice-toggle-btn"
              >
                {voiceActive ? <Volume2 className="w-4 h-4 text-emerald-850" /> : <VolumeX className="w-4 h-4 text-navy-500" />}
                <span>{voiceActive ? "Voice Synthesis On" : "Speak With AI Advisor"}</span>
              </button>
            </div>
          </div>

          {/* Right chat widget mock interface client component column (7 elements) */}
          <div className="lg:col-span-7 w-full flex justify-center">
            <div className="w-full max-w-xl bg-neutral-50/55 rounded-2xl border border-navy-150 overflow-hidden shadow-xl flex flex-col h-[520px]">
              
              {/* Chat Header Widget Block */}
              <div className="bg-navy-900 text-white px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div>
                    <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white">BrightR AI Advisor</h4>
                    <p className="text-[10px] text-navy-300 font-sans leading-none mt-0.5">Automated Guidance Assistant</p>
                  </div>
                </div>
                
                {/* Voice synthesized control indicator in header */}
                <button
                  type="button"
                  onClick={toggleVoiceMode}
                  className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    voiceActive ? "bg-emerald-800 text-emerald-200" : "hover:bg-navy-800 text-navy-300"
                  }`}
                  title="Toggle Voice Mode"
                  id="header-voice-btn"
                >
                  {voiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline font-mono text-[9px] font-bold">SPEECH {voiceActive ? "ON" : "OFF"}</span>
                </button>
              </div>

              {/* Chat Area Messages Display */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                  >
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-navy-900 text-white rounded-tr-none shadow-sm"
                          : "bg-navy-50 text-navy-900 rounded-tl-none border border-navy-100"
                      }`}
                    >
                      {/* Markdown rendering simplified and safe */}
                      <p className="whitespace-pre-line font-sans font-normal">{msg.text}</p>
                    </div>

                    {/* Meta timestamp */}
                    <span className="text-[9px] text-navy-400 mt-1 font-mono px-1">
                      {msg.role === "assistant" ? "AI Advisor" : "You"} • {msg.timestamp.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
                    </span>

                    {/* Assistant Quick Actions Options */}
                    {msg.role === "assistant" && msg.suggestedActions && (
                      <div className="flex flex-wrap gap-1.5 mt-3 self-start">
                        {msg.suggestedActions.map((action, actionIdx) => (
                          <button
                            key={actionIdx}
                            onClick={() => {
                              if (action === "Book consultation with Anita" || action === "Book consultation") {
                                onBookConsultation();
                              } else {
                                handleSendMessage(action);
                              }
                            }}
                            className="bg-navy-50 hover:bg-gold-50 hover:border-gold-300 text-navy-800 text-[10px] px-2.5 py-1.5 rounded-lg border border-navy-100 transition-all font-medium text-left cursor-pointer flex items-center gap-1"
                            id={`suggest-action-${actionIdx}`}
                          >
                            <CornerDownRight className="w-2.5 h-2.5 text-gold-500 shrink-0" />
                            <span>{action}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loader animation indicator */}
                {loading && (
                  <div className="flex items-center gap-2 self-start bg-navy-50 border border-navy-100 px-4 py-3 rounded-2xl rounded-tl-none text-xs text-navy-600 font-medium">
                    <RefreshCw className="w-3.5 h-3.5 text-navy-800 animate-spin" />
                    <span>AI Planner calculating scenarios...</span>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Chat Form Interactive Inputs Footer bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="bg-navy-50 border-t border-navy-150 p-3.5 flex items-center gap-2"
              >
                {/* Voice Input Microphone Button */}
                <button
                  type="button"
                  onClick={toggleMicListening}
                  className={`p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    isListeningMic 
                      ? "bg-red-500 border-red-500 text-white animate-pulse" 
                      : "bg-white hover:bg-neutral-50 text-navy-600 border-navy-200"
                  }`}
                  title={isListeningMic ? "Listening to voice..." : "Click to dictate text"}
                  id="voice-mic-btn"
                >
                  {isListeningMic ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                {/* Text Input area */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListeningMic ? "Speak clearly now (Aussie Local)..." : "Ask about super, offset accounts, mortgages..."}
                  className="flex-1 bg-white border border-navy-200 text-navy-950 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-gold-350 font-sans"
                  disabled={loading}
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || loading}
                  className="p-3 rounded-xl bg-navy-900 text-white hover:bg-navy-950 disabled:bg-navy-300 transition-colors cursor-pointer"
                  id="chat-send-submit"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
