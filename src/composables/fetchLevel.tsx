import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure you have initialized Firebase and Firestore

const fetchAllLevels = async () => {
  try {
    const levelsCollection = collection(db, "scenarios");
    const sortedQuery = query(levelsCollection, orderBy("id", "asc"));
    let levels: any[] = [];

    const snapshot = await getDocs(sortedQuery);

    levels = snapshot.docs.map((doc) => ({
      id: doc.id, // Always include the document ID
      ...doc.data(), // Fetch only the selected fields
    }));
    // console.log("Levels fetched successfully:", levels);
    return levels;
  } catch (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
};

const fetchLevelById = async (levelId: any) => {
  try {
    const levelDoc = doc(db, "scenarios", levelId);
    const docSnap = await getDoc(levelDoc);

    if (docSnap.exists()) {
      // console.log("Level data:", docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such level document!");
    }
  } catch (error) {
    console.error("Error fetching level data:", error);
  }
};

const fetchTopLevel = async (userId: string) => {
  try {
    // Reference to the 'levels' subcollection under the user
    const levelsRef = collection(db, "playerProgress", userId, "levels");

    // Get all documents from the 'levels' subcollection
    const completedQuery = query(levelsRef, where("completed", "==", true));

    const querySnapshot = await getDocs(completedQuery);

    // Extracting the IDs of each document (subdocument)
    const maxLevelId = Math.max(
      ...querySnapshot.docs.map((doc) => Number(doc.id)).filter((id) => !isNaN(id))
    );

    return maxLevelId;
  } catch (error) {
    console.error("Error fetching level IDs:", error);
    throw error;
  }
};

export { fetchAllLevels, fetchLevelById, fetchTopLevel };
