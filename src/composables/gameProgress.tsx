import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
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
      // console.log(`Updating progress for user ${userId}, level ${level}`);
      // console.log(progress)
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
    // console.log(docSnap)

    if (docSnap.exists()) {
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

const checkGameProgress = async (userId: string) => {
  try {
    console.log("Fetching progress for userId:", userId);

    // Reference to the 'levels' subcollection under the specific user document
    const progressRef = collection(db, "playerProgress", userId, "levels");

    // Query to fetch documents where `completed` is true
    const progressQuery = query(progressRef); // Add filters like `where()` if needed

    // Fetch the documents matching the query
    const querySnapshot = await getDocs(progressQuery);

    if (!querySnapshot.empty) {
      console.log(
        "User progress found:",
        querySnapshot.docs.map((doc) => doc.data())
      );
      return true; // Progress exists
    } else {
      console.log("No progress found for userId:", userId);
      return false; // No progress
    }
  } catch (error) {
    console.error("Error fetching game progress:", error);
    return false; // Handle errors
  }
};

const deleteLevelRecords = async (userId: string) => {
  try {
    // Reference to the 'levels' subcollection
    const levelsRef = collection(db, "playerProgress", userId, "levels");

    // Fetch all documents in the subcollection
    const querySnapshot = await getDocs(levelsRef);

    // Iterate through the documents and delete each one
    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "playerProgress", userId, "levels", docSnap.id))
    );

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    console.log("All levels deleted successfully.");
  } catch (error) {
    console.error("Error deleting levels:", error);
  }
};

export { checkGameProgress, deleteLevelRecords, fetchGameProgress, saveGameProgress };

