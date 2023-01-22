import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { useFirestore } from "../context/FirestoreContext";
import { useEffect, useState } from "react";
import ActionBar from "../components/ActionBar";

export async function getServerSideProps() {
  const collectionRef = collection(db, "photos");
  const data = await getDocs(collectionRef);
  const photoDocs = data.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return {
    props: {
      ssrPhotoDocs: photoDocs,
    },
  };
}

const Account = ({ ssrPhotoDocs }) => {
  const { user, userData } = useAuth();
  const { photoDocuments} = useFirestore();

  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    if(!user) return;
    photoDocuments
      ? setFilteredDocuments(
          photoDocuments.filter((doc) => doc.postedBy == user.email)
        )
      : setFilteredDocuments(
          ssrPhotoDocs.filter((doc) => doc.postedBy == user.email)
        );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoDocuments, user]);

  return (
    user && 
    
    <div>
      <ActionBar />
      {user.email}
      {filteredDocuments.map((doc)=>(
        <div key={doc.id}>
          {doc.title}
        </div>
      ))}
    
    </div>
  
  );
};

export default Account;
