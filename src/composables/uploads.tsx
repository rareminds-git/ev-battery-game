import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { scenarios } from '../data/diagnosticScenarios';
import { db } from '../firebaseConfig';

const uploadLevelData = async () => {
    try {
      for (const scenario of scenarios) {
        const scenarioRef = doc(db, "scenarios", String(scenario.id));  // Reference to the scenario by its ID
        const docSnap = await getDoc(scenarioRef);
  
        if (docSnap.exists()) {
          // Document exists, update it
          console.log(`Updating document with ID: ${scenario.id}`);
          await updateDoc(scenarioRef, {
            title: scenario.title,
            description: scenario.description,
            symptoms: scenario.symptoms,
            clues: scenario.clues,
            questions: scenario.questions,
            resolutionQuestion: scenario.resolutionQuestion
          });
        } else {
          // Document does not exist, create a new one
          console.log(`Adding new document with ID: ${scenario.id}`);
          await setDoc(scenarioRef, scenario);
        }
      }
    } catch (e) {
      console.error("Error uploading data: ", e);
    }
  };

export { uploadLevelData };
