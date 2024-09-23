import dotenv from 'dotenv'
import { HfInference } from '@huggingface/inference'

dotenv.config()
const HF = new HfInference(process.env.HUGGING_FACE_API_KEY);

export const analyzeSentiment = async (text) => {
    
    try {
      const result = await HF.textClassification({ 
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: text });
      return result;
    } catch (error) {
      // Manejo de errores
      throw new Error('Error al analizar el sentimiento');
    }
  } 