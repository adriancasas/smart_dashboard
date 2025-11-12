'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp } from 'lucide-react';
import { askChatbot } from '@/ai/flows/chatbot-flow';
import { type ChatMessage } from '@/ai/flows/chatbot-types';
import { type MessageData } from 'genkit';
import { Card, CardContent } from '@/components/ui/card';

const icebreakers = [
  {
    title: 'Saber más sobre planes y precios adaptados',
    prompt: 'Planes y precios',
  },
  {
    title: 'Conocer el resto de IA Agents disponibles',
    prompt: 'IA Agents disponibles',
  },
];


export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    inputRef.current?.focus();

    setIsAiTyping(true);
    setTimeout(() => {
      setMessages([{ id: 'initial-message-1', text: 'Hola! Todo bien? 👋', sender: 'ai' }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { id: 'initial-message-2', text: 'Supongo que ya has probado el Youtuber Opt y quieres más potencia. Me equivoco?! 😉', sender: 'ai' }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: 'initial-message-3', text: 'Si es así no perdamos el tiempo. ¿Quieres que empecemos con el análisis en profundidad de tu canal? Estoy aquí para guiarte paso a paso en todo el proceso', sender: 'ai' }]);
            setIsAiTyping(false);
        }, 1500);
      }, 1500);
    }, 1000);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiTyping]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (textToSend.trim() && !isLoading) {
      const userMessage: ChatMessage = { id: Date.now().toString(), text: textToSend, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      if (!messageText) {
        setInput('');
      }
      setIsLoading(true);
      setIsAiTyping(true);

      try {
        const history: MessageData[] = messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: [{ text: m.text }],
        }));
        
        const response = await askChatbot({ history, message: textToSend });

        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'ai',
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I couldn't get a response. Please try again.",
            sender: 'ai',
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        setIsAiTyping(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to the Agent Store
        </h1>
        <div className="flex flex-col rounded-lg border bg-card shadow-lg max-h-[80vh]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'justify-end' : ''
                  }`}
                >
                  <div
                    className={`max-w-md rounded-xl p-3 text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
               {(isLoading || isAiTyping) && (
                <div className="flex items-start gap-3">
                  <div className="max-w-xs rounded-xl p-3 text-sm bg-muted">
                    <p>...</p>
                  </div>
                </div>
              )}
              <div ref={scrollAreaRef} />
            </div>
          </ScrollArea>
          
          <div className="border-t p-4 bg-card">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
                disabled={isLoading || isAiTyping}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="rounded-full bg-muted hover:bg-accent"
                onClick={() => handleSend()}
                disabled={isLoading || isAiTyping}
              >
                <ArrowUp className="h-5 w-5" />
                <span className="sr-only">Enviar</span>
              </Button>
            </div>
          </div>
        </div>

        {messages.length === 3 && !isLoading && !isAiTyping && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {icebreakers.map((icebreaker) => (
                <Card
                  key={icebreaker.title}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleSend(icebreaker.prompt)}
                >
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">{icebreaker.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
