import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

console.log('auth file ran')
onAuthStateChanged(auth, (user)=>{
  console.log("authstatechange ran")
  if(user){
    console.log("authstatechanged: signed in ", user)
  }else{
    console.log("authstatechanged: no user")
  }
})

export async function handleSignIn(){
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider)
    console.log("sign in success ", result)

  } catch (error) {
    console.log(error.message);
  }
}
