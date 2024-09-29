import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from '../Config/firebase';
import { doc, updateDoc } from "firebase/firestore";

const apiKey = "AIzaSyCu9IQmuFE-4zgXKR0-5cAummUkp1gYIvE";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-002",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Generate questions for a user based on their skills
export const generateQuestions = async (skills) => {
  const prompts = [];
  
  // Split skills by commas and generate questions for each
  for (const skill of skills.split(',')) {
    const chatSession = model.startChat({
      generationConfig,
      history: [{ user: `Generate a skill-assessment question for ${skill}` }],
    });
    
    const result = await chatSession.sendMessage(`Rate your ${skill} skills on a scale of 1 to 5.`);
    prompts.push(result.response.text());
  }

  return prompts; // Array of generated prompts for the user's skills
};

// Function to update user's answers
export const saveAnswers = async (userId, answers) => {
  const userDoc = doc(db, "Users", userId);
  await updateDoc(userDoc, { skill_assessment: answers });
};
