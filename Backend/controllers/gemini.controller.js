// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const replyToPrompt = async (req, res) => {
  //   console.log("inside");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const requestFromUser = req.query.userReq;
  //   console.log("user:: ", requestFromUser);

  const prompt = `You are a food recommendation assistant. Based on the user’s preference, suggest the most suitable meal from the following options: 1. Mac and cheese, price: $9.49 2. grilled cheese sandwich, price: $6.49 3. classic tomato soup, price: $5.99 4. quinoa salad with avocado, price: $10.99 5. grilled chicken with veggies, price: $12.49 6. smoothie bowls, price: $7.99 7. chicken wraps, price: $7.5 8. loaded nachos, price: $6.99 9. masala fries, price: $5.99 10. alfredo pasta, price: $10.99 11. chocolate lava cake, price: $6.49 12. loaded pizza, price: $13.99 13.mushroom vol au vent, price: $14.99. \nCompare the user's preference with the listed food options and suggest one meal that best matches their request. Provide the recommendation in one concise sentence just write I recommend and then whatever you recommend. If the user writes anything not relevant then just return by saying what would you like to eat today? \nUser's Preference: ${requestFromUser}`;

  const result = await model.generateContent(prompt);
  // console.log(result);
  res.status(200).json({
    success: true,
    answerFromGemini: result.response.candidates[0].content.parts[0].text,
  });
};

export { replyToPrompt };

//FRONTEND
/*axios.get('/suggest-me', {
  params: {
    mood: userMood
  }
}) */
