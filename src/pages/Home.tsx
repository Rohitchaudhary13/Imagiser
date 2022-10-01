import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import styled from 'styled-components';
import { CardExamples } from '../components/IonCard/card';
import './Home.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const NewNav = styled(IonPage)`
  .toolbar-content {
    display: flex!important;
    flex-direction: row;
  }
  .Imagiser{
    font-family: 'Silkscreen', cursive; 
  }
  *{
    font-family: 'Poppins', sans-serif;
    
  }
`;

const Home: React.FC = () => {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  })
  
  const auth = firebase.auth();
  const [user] = useAuthState(auth as any);
  return (
    <NewNav>
      <IonHeader>
        <IonToolbar className='toolbar'>
          <IonTitle className='Imagiser' >Imagiser</IonTitle>
          {user ? <IonButton onClick={() => auth.signOut()} slot="end" >Sign Out</IonButton> : <IonButton routerLink='/Login' slot="end" >Login</IonButton>}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='background-image'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Imagiser</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
      <IonHeader>
        <CardExamples />
      </IonHeader>
    </NewNav>
  );
};

export default Home;
