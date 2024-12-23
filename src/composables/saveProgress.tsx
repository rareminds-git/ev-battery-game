import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust import based on your file structure

const saveGameProgress = async (userId: string, progress: { level: number; score: number }) => {
  try {
    const progressRef = doc(db, "gameProgress", userId); // 'gameProgress' is the collection
    await setDoc(progressRef, progress, { merge: true }); // Merge to avoid overwriting data
    console.log("Game progress saved");
  } catch (error) {
    console.error("Error saving game progress:", error);
  }
};

export default saveGameProgress;