import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const addItem = async (item) => {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid
        const itemsCollectionRef = collection(db, 'users', userId, 'items');
        await addDoc(itemsCollectionRef, item);
    } else {
        throw new Error("No user is signed in");
    }
};


export const fetchItems = async () => {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        const itemsCollectionRef = collection(db, 'users', userId, 'items');
        const querySnapshot = await getDocs(itemsCollectionRef);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return items;
    } else {
        throw new Error("No user is signed in");
    }
};

export const updateItem = async (id, updatedData) => {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        await updateDoc(doc(db, 'users', userId, 'items', id), updatedData);
    } else {
        throw new Error("No user is signed in");
    }
};

export const deleteItem = async (id) => {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        await deleteDoc(doc(db, 'users', userId, 'items', id));
    } else {
        throw new Error("No user is signed in");
    }
}