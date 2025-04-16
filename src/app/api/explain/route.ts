import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(req: Request) {
  const { prompt, language } = await req.json();

  // Get the generative model with correct model name
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',  // Using the latest recommended model
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  });

  try {
    // Start the generation with language-specific prompt
    const result = await model.generateContentStream(`
      Please explain the following ${language} code in a clear and concise way. 
      Focus on:
      1. The main logic and functionality
      2. Key language-specific features used
      3. Any important patterns or best practices
      4. Potential edge cases or considerations
      
      Use simple analogies where appropriate to help understand the code better.
      Format your explanation with clear sections and bullet points where helpful.
      
      Code:
      ${prompt}
    `);

    // Create a TransformStream to handle the streaming response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Process the stream
    (async () => {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            // Format the chunk as a simple text stream
            await writer.write(new TextEncoder().encode(text));
          }
        }
      } catch (error) {
        console.error('Error processing stream:', error);
        await writer.write(new TextEncoder().encode('Error generating explanation. Please try again.'));
      } finally {
        await writer.close();
      }
    })();

    // Return the stream with proper headers
    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate explanation' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 