import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirestoreContext";
import { useEffect, useState } from "react";
import Head from "next/head";
import Avatar from "@mui/material/Avatar";
import PhotoGallery from "../components/PhotoGallery";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const Account = () => {
  const { user, userData } = useAuth();
  const { photoDocuments } = useFirestore();

  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [likedPhotos, setLikedPhotos] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  function createToast(severity, message) {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  }

  useEffect(() => {
    if (!user || !photoDocuments) return;
    setFilteredDocuments(
      photoDocuments.filter((doc) => doc.postedBy.uid == user.uid)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoDocuments, user]);

  useEffect(() => {
    if (!userData || !photoDocuments) return;
    setLikedPhotos(
      photoDocuments.filter((doc) => userData.likedPhotos.includes(doc.id))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return photoDocuments && user && userData ? (
    <main>
      <Head>
        <title>Photo Gallery | Account</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`flex justify-center`}>
        <div
          className={`bg-white flex flex-col items-center py-5 my-2 w-2/3 rounded-lg shadow-md`}
        >
          <div>
            <Avatar
              src={user.photoURL}
              imgProps={{ referrerPolicy: "no-referrer" }}
            />
          </div>
          <div className={`flex flex-col items-center space-y-2`}>
            <div className={`flex flex-col items-center`}>
              <div className={`font-medium text-2xl`}>{user.displayName}</div>
              <div className={`text-xs font-medium `}>{user.email}</div>
            </div>
            <div className={`flex flex-col items-center`}>
              <div className={`flex space-x-1.5`}>
                <PhotoCameraRoundedIcon />
                <div>Photos Posted: {filteredDocuments.length} </div>
              </div>
              <div className={`flex space-x-1.5`}>
                <ThumbUpIcon />
                <div>Liked Photos: {likedPhotos.length} </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="flex justify-center my-3">
            <p className="font-medium border-b-2 border-b-black px-3">
              My Photos
            </p>
          </div>
          <PhotoGallery
            photoDocuments={filteredDocuments}
            createToast={createToast}
          />
        </div>
        {likedPhotos.length ? (
          <div>
            <div className="flex justify-center my-3">
              <p className="font-medium border-b-2 border-b-black px-3">
                Liked Photos
              </p>
            </div>
            <PhotoGallery
              photoDocuments={likedPhotos}
              createToast={createToast}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <Alert
          severity={severity}
          variant="filled"
          anchorOrigin={{
            horizontal: `${severity == "success" ? "left" : "center"}`,
            vertical: `${severity == "success" ? "bottom" : "top"}`,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </main>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default Account;
