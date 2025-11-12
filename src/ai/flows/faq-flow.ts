'use server';
/**
 * @fileOverview A flow for answering frequently asked questions about the Agent Store.
 *
 * - faqFlow - A function that takes a user's question and returns an answer.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FaqInputSchema = z.object({
  question: z.string().describe('The user\'s question about the Agent Store.'),
});
export type FaqInput = z.infer<typeof FaqInputSchema>;

const FaqOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question.'),
});
export type FaqOutput = z.infer<typeof FaqOutputSchema>;

const faqPrompt = ai.definePrompt({
  name: 'faqPrompt',
  input: { schema: FaqInputSchema },
  output: { schema: FaqOutputSchema },
  prompt: `You are a helpful assistant for the "Agent Store". Your goal is to answer questions from users about the available agents, their specialities, how to connect them to a project, or any other related query.

Available Agents and their specialties:
- Data Miner: Specialist in large-scale data extraction and analysis.
- Web Crawler: Navigates and extracts information from websites automatically.
- Content Analyst: Analyzes and summarizes large volumes of text and content.
- Code Generator: Generates code snippets in multiple programming languages.

User Question: {{{question}}}

Provide a clear and concise answer.`,
});

const flow = ai.defineFlow(
  {
    name: 'faqFlow',
    inputSchema: FaqInputSchema,
    outputSchema: FaqOutputSchema,
  },
  async (input) => {
    const { output } = await faqPrompt(input);
    return output!;
  }
);

export async function faqFlow(input: FaqInput): Promise<FaqOutput> {
  return await flow(input);
}
