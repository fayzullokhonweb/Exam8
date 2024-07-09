import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
export let useCollection = (collectionName, whereData) => {
  let [data, setData] = useState(null);

  useEffect(() => {
    if ((collectionName, whereData[2])) {
      const q = query(collection(db, collectionName), where(...whereData));
      onSnapshot(q, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setData(data);
      });
    }
  }, [collectionName, whereData[2]]);
  return { data };
};
