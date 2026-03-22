import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, User, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const STORAGE_KEY = 'aliasist_ai_chat_history';

export default function AiChatAssistant({ isFloating = false }: { isFloating?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setInitialMessage();
      }
    } else {
      setInitialMessage();
    }
  }, []);

  const setInitialMessage = () => {
    setMessages([{
      id: '1',
      role: 'model',
      text: "Neural Link established. I am the Aliasist Assistant. How can I assist your transmission today? 🛸",
      timestamp: new Date().toISOString(),
    }]);
  };

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing from .env");

      const genAI = new GoogleGenerativeAI(apiKey);

      let history = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' as const : 'user' as const,
        parts: [{ text: msg.text }],
      }));

      const firstUserIndex = history.findIndex(msg => msg.role === 'user');
      history = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

      // Look for this block in your handleSend function and replace it:
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: `You are the Aliasist Assistant, a helpful and efficient AI for the aliasist.com platform. 
  
  CORE DIRECTIVES:
  1. BE CONCISE: Never use three sentences when one will do. 
  2. AUDIENCE: You are speaking to users of aliasist.com. Be welcoming but maintain a slightly futuristic, "high-tech" tone.
  3. CLARITY: Use clear, direct language. Avoid excessive "alien" roleplay or flowery metaphors.
  4. ALIASIST BRAND: You help users navigate the platform's tools (like the Files Abductor).`
      });


      const chat = model.startChat({ history });

      const result = await chat.sendMessage(userMessage.text);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text || "Transmission interrupted.",
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: `ERROR: NEURAL LINK FAILURE. ${error.message}`,
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    setInitialMessage();
  };

  return (
    <div className={`flex flex-col w-full bg-zinc-950 font-mono text-foreground overflow-hidden relative ${isFloating ? 'h-full' : 'h-[600px] border-2 border-electric/30 mb-10'}`}>
      {messages.length > 1 && (
        <button onClick={clearChat} className="absolute top-4 right-4 z-20 p-1.5 bg-zinc-950/80 border border-electric/20 text-white/30 hover:text-red-500 text-[8px] uppercase tracking-widest">
          Purge Log
        </button>
      )}

      <main className="flex-1 overflow-y-auto p-4 space-y-6 relative scrollbar-thin scrollbar-thumb-electric/20 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border ${msg.role === 'user' ? 'bg-electric/10 border-electric/40 text-electric' : 'bg-zinc-800 border-white/10 text-white/40'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Zap size={14} className="animate-pulse" />}
                </div>
                <div className="flex flex-col gap-1">
                  <div className={`px-3 py-2 text-[13px] relative ${msg.role === 'user' ? 'bg-electric/10 border border-electric/30 text-electric/90' : 'bg-zinc-900/50 border border-white/5 text-white/80'}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <div className="my-3 border border-white/10 overflow-hidden">
                            <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" className="!bg-zinc-950 !m-0 !p-3 !text-[12px]" {...props}>
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : <code className="bg-zinc-800 px-1 text-electric/80" {...props}>{children}</code>;
                      }
                    }}>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <Loader2 size={14} className="animate-spin text-electric" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-electric/60 animate-pulse">Decrypting transmission...</span>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </main>

      <footer className="p-4 bg-zinc-900 border-t-2 border-electric/20 relative">
        <div className="relative flex items-center gap-2">
          <span className="text-electric/50 text-xs font-bold pl-1">$</span>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="AWAITING INPUT..." className="w-full bg-transparent border-none focus:ring-0 text-[13px] text-electric" disabled={isLoading} />
          <button onClick={handleSend} disabled={!input.trim() || isLoading} className={input.trim() && !isLoading ? 'text-electric animate-pulse' : 'text-white/10'}><Send size={18} /></button>
        </div>
      </footer>
    </div>
  );
}