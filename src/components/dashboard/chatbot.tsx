'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, Send, X, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { askChatbot, type ChatMessageSchema } from '@/ai/flows/chatbot-flow';
import { users } from '@/lib/data';
import type { z } from 'zod';

type ChatMessage = z.infer<typeof ChatMessageSchema>;

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "Hello! I'm your dashboard assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentUser = users[0];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
        try {
            const botResponse = await askChatbot({
                history: newMessages.slice(0, -1),
                message: input,
            });
            setMessages((prev) => [...prev, { role: 'model', content: botResponse }]);
        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage = { role: 'model' as const, content: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages((prev) => [...prev, errorMessage]);
        }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[22rem] h-[32rem] p-0 flex flex-col"
        sideOffset={16}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className='flex items-center gap-2'>
            <Bot className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Dashboard Assistant</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
            {messages.map((message, index) => (
                <div
                key={index}
                className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
                >
                {message.role === 'model' && (
                    <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={cn(
                    'max-w-[75%] rounded-lg p-3 text-sm',
                    message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                >
                    <p>{message.content}</p>
                </div>
                {message.role === 'user' && currentUser && (
                    <Avatar className="h-8 w-8 border">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                </div>
            ))}
            {isPending && (
                <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8 border">
                        <AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
            </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
              disabled={isPending}
            />
            <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
