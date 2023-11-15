import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

export const fetchCollection = async (db, list) => {
  let response = await getDocs(collection(db, list));
  return response.docs.map((doc) => doc.data());
};

export const fetchCollectionWhere = async (
  db,
  list,
  whereField,
  whereValue
) => {
  try {
    let queryRef = collection(db, list);

    if (whereField && whereValue) {
      queryRef = query(queryRef, where(whereField, '==', whereValue));
    }

    const response = await getDocs(queryRef);
    return response.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error(`Error fetching collection ${list}:`, error);
    throw error;
  }
};

export const insertIntoCollection = async (db, collectionName, values) => {
  try {
    const response = await addDoc(collection(db, collectionName), {
      ...values,
    });
    await updateDoc(response, {
      id: response.id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const insertIntoCollectionReturnId = async (
  db,
  collectionName,
  values
) => {
  try {
    const response = await addDoc(collection(db, collectionName), {
      ...values,
    });
    await updateDoc(response, {
      id: response.id,
    });
    return response.id;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCollection = async (db, collectionName, id, values) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {...values});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (db, collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.log(error.message);
  }
};
