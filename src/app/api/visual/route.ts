import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(req: Request) {
  const { prompt, language } = await req.json();

  // Get the generative model
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.9,  // Higher temperature for more creative analogies
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  });

  try {
    // Generate a visual analogy
    const result = await model.generateContent(`
      Create a visual analogy to explain how this ${language} code works.
      Focus on creating a real-world analogy that helps understand the code's:
      1. Main purpose and flow
      2. Key components and their relationships
      3. How data moves through the system
      
      Make the analogy relatable and easy to visualize.
      Avoid technical terms in the analogy.
      Keep the explanation under 200 words.
      
      Code:
      ${prompt}
    `);

    const response = await result.response;
    const text = response.text();

    return new Response(
      JSON.stringify({ analogy: text }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in visual analogy generation:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate visual analogy' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 