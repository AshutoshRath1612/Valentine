'use server';
/**
 * @fileOverview A Genkit flow for generating or refining love letters.
 *
 * - generateLoveLetter - A function that handles the love letter generation or refinement process.
 * - GenerateLoveLetterInput - The input type for the generateLoveLetter function.
 * - GenerateLoveLetterOutput - The return type for the generateLoveLetter function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLoveLetterInputSchema = z.object({
  recipientName: z.string().describe('The name of the person receiving the love letter. (e.g., "My Dearest Sarah", "Sweetheart")'),
  senderName: z.string().describe('The name of the person sending the love letter. (e.g., "Your Loving Mark", "Forever Yours, Alex")'),
  occasion: z.string().optional().describe('The occasion for the love letter (e.g., "our anniversary", "Valentine\'s Day", "just because").'),
  keyFeelings: z.string().optional().describe('Key feelings, memories, or specific messages to include in the letter. (e.g., "how much I cherish our time together", "the day we first met")'),
  existingLetter: z.string().optional().describe('An optional existing love letter to refine or improve.'),
});
export type GenerateLoveLetterInput = z.infer<typeof GenerateLoveLetterInputSchema>;

const GenerateLoveLetterOutputSchema = z.object({
  loveLetter: z.string().describe('The generated or refined love letter.'),
});
export type GenerateLoveLetterOutput = z.infer<typeof GenerateLoveLetterOutputSchema>;

export async function generateLoveLetter(input: GenerateLoveLetterInput): Promise<GenerateLoveLetterOutput> {
  return generateLoveLetterFlow(input);
}

const loveLetterPrompt = ai.definePrompt({
  name: 'loveLetterPrompt',
  input: { schema: GenerateLoveLetterInputSchema },
  output: { schema: GenerateLoveLetterOutputSchema },
  prompt: `You are an AI assistant specialized in crafting beautiful and heartfelt love letters.
Your goal is to help users express their deepest feelings with eloquence and sincerity.

Instructions:
- If an 'existingLetter' is provided, your task is to refine it, making it more romantic, poetic, or articulate, while retaining the core message.
- If no 'existingLetter' is provided, generate a new love letter based on the provided details.
- Use a warm, affectionate, and sincere tone.
- Incorporate the recipient's and sender's names naturally.
- Mention the 'occasion' if provided, making it central to the letter's theme.
- Weave in the 'keyFeelings' or specific messages to personalize the letter.
- The output should be a complete, well-structured love letter.

Here are the details:
Recipient: {{{recipientName}}}
Sender: {{{senderName}}}
{{#if occasion}}Occasion: {{{occasion}}}{{/if}}
{{#if keyFeelings}}Key Feelings/Messages: {{{keyFeelings}}}{{/if}}

{{#if existingLetter}}
Refine the following letter:
"""
{{{existingLetter}}}
"""
{{else}}
Generate a new love letter based on the details above.
{{/if}}`,
});

const generateLoveLetterFlow = ai.defineFlow(
  {
    name: 'generateLoveLetterFlow',
    inputSchema: GenerateLoveLetterInputSchema,
    outputSchema: GenerateLoveLetterOutputSchema,
  },
  async (input) => {
    const { output } = await loveLetterPrompt(input);
    return output!;
  }
);
