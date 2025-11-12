'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { faqFlow } from '@/ai/flows/faq-flow';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Message = {
  text: string;
  isUser: boolean;
};

export default function Chatbot() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const welcomeMessage: Message = {
      text: 'Hola! 👋 Soy tu asistente. Pregúntame lo que sea sobre la Agent Store.',
      isUser: false,
    };
    setMessages([welcomeMessage]);
    
    const openGreetingTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 1000);

    const closeGreetingTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 8000); // Hide greeting after 7 seconds (1s delay + 7s visibility)

    return () => {
      clearTimeout(openGreetingTimer);
      clearTimeout(closeGreetingTimer);
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await faqFlow({ question: input });
      const botMessage: Message = { text: response.answer, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling faqFlow:', error);
      const errorMessage: Message = {
        text: 'Sorry, I had trouble connecting. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setShowGreeting(false);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <Popover open={showGreeting} onOpenChange={setShowGreeting}>
          <PopoverTrigger asChild>
            <Button
              onClick={handleOpenDialog}
              className="rounded-full w-16 h-16 shadow-lg"
              size="icon"
            >
              <MessageCircle className="h-8 w-8" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-auto mb-2">
            <p className="text-sm">¡Hola! 👋 Estoy aquí para ayudarte</p>
          </PopoverContent>
        </Popover>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Asistente de Ayuda</DialogTitle>
            <DialogDescription>
              ¿Tienes alguna pregunta? Pregúntame lo que sea sobre los agentes.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72 w-full pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
