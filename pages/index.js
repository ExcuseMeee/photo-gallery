import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import ActionBar from "../components/ActionBar";
import Photo from "../components/Photo";
import { db } from "../firebaseConfig";
import { useFirestore } from "../context/FirestoreContext";

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

export default function Home({ ssrPhotoDocs }) {
  const { photoDocuments } = useFirestore();

  return (
    <div>
      <Head>
        <title>Photo Gallery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {console.log("photo context: ", photoDocuments)}

      <main>
        <ActionBar />
        <div
          className={`flex flex-col lg:flex-row flex-wrap justify-evenly items-center`}
        >
          <Photo imageUrl={"/space-img.jpg"} title={"Static Placeholder"} postedBy={"No poster"}/>
          <Photo imageUrl={"/space-img.jpg"} title={"Static Placeholder"} postedBy={"No poster"}/>
          <Photo imageUrl={"/space-img.jpg"} title={"Static Placeholder"} postedBy={"No poster"}/>
          <Photo imageUrl={"/space-img.jpg"} title={"Static Placeholder"} postedBy={"No poster"}/>
          <Photo imageUrl={"/space-img.jpg"} title={"Static Placeholder"} postedBy={"No poster"}/>

          {photoDocuments
            ? photoDocuments.map((document) => {
                return (
                  <Photo
                    key={document.id}
                    imageUrl={document.imageUrl}
                    title={document.title}
                    postedBy={document.postedBy}
                  />
                );
              })
            : ssrPhotoDocs.map((document) => {
                return (
                  <Photo
                    key={document.id}
                    imageUrl={document.imageUrl}
                    title={document.title + "ssr rendered"}
                    postedBy={document.postedBy}
                  />
                );
              })}
        </div>
      </main>
    </div>
  );
}
