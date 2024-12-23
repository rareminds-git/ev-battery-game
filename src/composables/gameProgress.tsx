import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust import based on your file structure

const saveGameProgress = async (
  userId: string,
  progress: any,
  level: string
) => {
  try {
    // Reference to the 'levels' subcollection under the user's document
    const progressRef = doc(
      collection(db, "playerProgress", userId, "levels"),
      level
    ); // Level as a document in the subcollection

    const docSnap = await getDoc(progressRef);

    if (docSnap.exists()) {
      // Document exists, update it
      console.log(`Updating progress for user ${userId}, level ${level}`);
      await updateDoc(progressRef, progress); // Overwrite existing data
    } else {
      // Document does not exist, create a new one
      console.log(`Adding new progress for user ${userId}, level ${level}`);
      await setDoc(progressRef, progress); // Create new document
    }
  } catch (error) {
    console.error("Error saving game progress:", error);
  }
};

const fetchGameProgress = async (userId: string, level: string) => {
  try {
    // Reference to the 'levels' subcollection under the user's document
    const progressRef = doc(db, "playerProgress", userId, "levels", level); // level as a document in the subcollection

    const docSnap = await getDoc(progressRef);

    if (docSnap.exists()) {
      // Document exists, return the data
      // console.log("Fetched game progress:", docSnap.data());
      return docSnap.data(); // Data retrieved from Firestore
    } else {
      // Document does not exist
      console.log(
        `No progress found for user with ID: ${userId}, level: ${level}`
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching game progress:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};

export { fetchGameProgress, saveGameProgress };
