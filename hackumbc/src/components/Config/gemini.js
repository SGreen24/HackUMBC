import { GoogleGenerativeAI } from "@google/generative-ai";


// Initialize Google Generative AI with API Key
const apiKey = "AIzaSyCu9IQmuFE-4zgXKR0-5cAummUkp1gYIvE";
const genAI = new GoogleGenerativeAI(apiKey);

// Setup the specific Gemini model you’re using
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-002",
});

// Define the generation configuration for Gemini
const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 50,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

// Construct prompt and communicate with Gemini
async function run(userData) {
  try {
    const { name, role, project_query, team_query, task1, task2, task3, task4, task5 } = userData;

    // Prompt structure including all user data to Gemini
    const fullPrompt = `
      Hello Gemini, I have a developer named ${name}, whose role is ${role}.
      They are working on a project called ${project_query} with a team size of ${team_query}.
      The developer has provided proficiency ratings for five key skills as follows:
      Task 1: ${task1}, Task 2: ${task2}, Task 3: ${task3}, Task 4: ${task4}, Task 5: ${task5}.
      Please suggest 3 unique and actionable project ideas or recommendations based on this information. 
      Ensure the recommendations align with the developer's role as a ${role}, and account for their team's size of ${team_query}.
    `;

    // Initialize chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Empty history for fresh prompts
    });

    // Send message and wait for response
    const result = await chatSession.sendMessage(fullPrompt);
    const responseText = await result.text(); // Get the plain text response
    return responseText;
  } catch (error) {
    console.error("Error fetching response from Gemini:", error);
    throw new Error("Failed to retrieve response from Gemini");
  }
}

// Export the run function so it can be used elsewhere
export default run;