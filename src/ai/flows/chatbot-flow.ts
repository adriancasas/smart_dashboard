'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { agents } from '@/lib/data';

// Define the schema for a single message in the chat history
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// Define the input schema for the chatbot flow
export const ChatbotInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string(),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

// Define the output schema for the chatbot flow
export const ChatbotOutputSchema = z.string();
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Helper function to create the system prompt
const buildSystemPrompt = () => {
  const agentDetails = agents
    .map(
      (agent) =>
        `- ${agent.name}: ${agent.description} (Status: ${agent.status})`
    )
    .join('\n');

  return `You are a helpful AI assistant for the "Agent Dashboard" application.
Your role is to answer user questions about the application and its agents.

Here are some frequently asked questions and their answers:
- Q: How do I recharge my credit?
  A: You can recharge credits for an agent that has a low or zero balance by clicking the "Recharge Credits" button on its card.
- Q: How do I add a new agent to a project?
  A: From the "Agent Bench", you can click "Assign credit & Activate" to add an agent to your project.
- Q: What is the Agent Bench?
  A: The Agent Bench is a collection of available agents that are ready to be assigned to your projects.

Here is a list of all available agents and their descriptions:
${agentDetails}

When a user asks about a specific agent, use the information above to describe its features.
Be concise and friendly in your responses.`;
};

// Define the Genkit prompt
const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  system: buildSystemPrompt(),
  input: {
    schema: z.object({
      history: z.array(ChatMessageSchema),
      message: z.string(),
    }),
  },
  output: {
    schema: z.string(),
  },
  prompt: (input) => {
    const history = input.history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));
    const userMessage = {
      role: 'user' as const,
      content: [{ text: input.message }],
    };
    return {
      history: [...history, userMessage],
      messages: [], // We are putting everything in history for simplicity
    };
  },
});

// Define the Genkit flow
export const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await chatbotPrompt(input);
    return output || "I'm sorry, I couldn't generate a response.";
  }
);

// Server action to be called from the client
export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return await chatbotFlow(input);
}
