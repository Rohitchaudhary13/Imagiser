import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  IonButton,
  IonCol,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useState } from "react";

const Login: React.FC = () => {

  const [ signedIn, setSignedIn ] = useState(false);
  const auth = firebase.auth();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    console.log("signed In!");
    setSignedIn(true);
  };

  return (
    <IonPage>
      <IonRow className="ion-padding ion-align-items-center" style={{height: '100vh', textAlign: 'center'}}>
        <IonCol>
        <div>{
          signedIn ? <IonButton routerLink='/home'>Return to home</IonButton> : <IonButton onClick={signInWithGoogle}>Sign In</IonButton>
        }</div>
        </IonCol>
      </IonRow>
    </IonPage>
  );
};

export default Login;


