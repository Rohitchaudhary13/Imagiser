import React from "react";
import styled from "styled-components";
import { chevronForwardCircleOutline } from 'ionicons/icons';
import { chevronBackCircleOutline } from 'ionicons/icons';
import {
  IonButton,
  IonSearchbar,
  IonItem,
  IonAccordion,
  IonLabel,
  IonAccordionGroup,
  useIonAlert,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
} from "@ionic/react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { BsInstagram } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";

const MyPage = styled.div`
  .box {
    padding: 2rem;
    margin: auto;
  }
  .card {
    height: auto;
    width: 25rem;
    cursor: pointer;
    transition: all 0.5s;
  }
  .card:hover {
    transform: scale(1.05);
  }
  .all-cards {
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 50vh;
  }
  .container {
    width: 100%;
    text-align: center;
    margin: auto;
  }
  .ion-footer{
    position: relative;
    margin-top: 27vh;
  }
  .header {
    position: fixed;
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    display: block;
  }
  .pagination-container {
    display: flex;
    list-style: none;
    justify-content: center;
    position: relative;
    width: 100%;
  }
  ul li a {
    text-decoration: none;
    color: white;
  }
  .page {
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  .disabled {
    cursor: not-allowed;
  }
  .active {
    border: 2px solid #000;
    font-weight: bold;
  }
  .previous {
    padding: 10px;
    border-radius: 6px;
    margin-right: 10px;
    cursor: pointer;
  }
  .break {
    padding: 10px;
  }
  .inner-scroll {
    overflow: scroll;
  }
  .next {
    padding: 10px;
    border-radius: 6px;
    margin-right: 10px;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    .all-cards {
      grid-template-columns: auto;
    }
  }

  @media (max-width: 768px) {
    .all-cards {
      grid-template-columns: auto;
    }
    .card {
      width: 100%;
    }
  }
`;

export const CardExamples: React.FC = () => {
  
  const auth = firebase.auth();
  const [user] = useAuthState(auth as any);

  const Submit = () => {
    fetchRequest();
    setisLoaded(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const fetchRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_ACCESS_KEY}&per_page=20&page=${currentPage}`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    const myPageCount = dataJ.total_pages;
    setRes(result);
    console.log(result);
    setPageCount(myPageCount);
    setisLoaded(true);
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    fetchRequest();
  };
  const [presentAlert] = useIonAlert();
  const [ modalImg, setModalImg ] = useState();
  const [ modalTitle, setModalTitle ] = useState();
  const [ modalBio, setModalBio ] = useState();
  const [ modalAlt, setModalAlt] = useState();
  const [ modalDownload, setModalDownload ] = useState();

  return (
    <MyPage>
      <div className="container">
        <IonHeader className="ion-no-border header">
          <IonSearchbar
            animated={true}
            placeholder="Search Anything!"
            value={img}
            onIonChange={(e: any) => setImg(e.target.value)}
          ></IonSearchbar>
          <IonButton type="submit" onClick={Submit}>
            Submit
          </IonButton>
        </IonHeader>
        <div className="all-cards">
          {isLoaded ? (
            res.map((val, index = 5) => {
              return (
                <div className="box">
                  <div className="card" key={index}>
                    <div onClick={() => {
                      setIsOpen(true);
                      setModalImg(val["urls"]["small"]);
                      setModalTitle(val["user"]["name"]);
                      setModalBio(val["user"]["bio"]);
                      setModalAlt(val["alt_description"]);
                      setModalDownload(val["links"]["download"]);
                      }}>
                      <img
                        style={{ width: "100%" }}
                        src={val["urls"]["small"]}
                        alt={val["alt_description"]}
                      />
                    </div>
                    <div style={{ marginTop: "10px", textAlign: "left" }}>
                      <a
                        href={`https://www.instagram.com/${val["user"]["social"]["instagram_username"]}/?hl=en`}
                      >
                        <BsInstagram />
                      </a>{" "}
                      {val["user"]["social"]["instagram_username"]}
                      {user ? (
                        <>
                          <IonAccordionGroup expand="inset">
                            <IonAccordion value="first" className="accordion">
                              <IonItem slot="header" color="light">
                                <IonLabel>{val["user"]["name"]}</IonLabel>
                              </IonItem>
                              <div className="ion-padding" slot="content">
                                {val["user"]["bio"]}
                              </div>
                            </IonAccordion>
                          </IonAccordionGroup>
                          <IonModal isOpen={isOpen}>
                    <IonHeader>
                      <IonToolbar>
                        <IonTitle>{modalTitle}</IonTitle>
                        <IonButtons slot="end">
                          <IonButton onClick={() => setIsOpen(false)}>
                            Close
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                      <img
                        style={{ width: "100%" }}
                        src={modalImg}
                        alt={modalAlt}
                      />
                      <p><strong>About:</strong>&nbsp;
                        {modalAlt}
                      </p>
                      <p><strong>Bio:</strong>&nbsp;
                        {modalBio}
                      </p>
                      <IonButton><a download href={modalDownload} style={{textDecoration: 'none', color: 'white'}} >Download</a></IonButton>
                    </IonContent>
                  </IonModal>
                        </>
                      ) : (
                        <IonAccordionGroup
                          expand="inset"
                          onClick={() =>
                            presentAlert({
                              header: "Alert",
                              subHeader: "Important message",
                              message: "Please Login First To See Bio!",
                              buttons: ["OK"],
                            })
                          }
                        >
                          <IonAccordion
                            value="first"
                            className="accordion"
                            disabled={true}
                          >
                            <IonItem slot="header" color="light">
                              <IonLabel>{val["user"]["name"]}</IonLabel>
                            </IonItem>
                            <div className="ion-padding" slot="content">
                              {val["user"]["bio"]}
                            </div>
                          </IonAccordion>
                        </IonAccordionGroup>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No data found!</div>
          )}
        </div>
        <IonFooter className="ion-footer">
          <IonToolbar >
            {isLoaded ? (
              <>
                <ReactPaginate
                  pageCount={pageCount}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination-container"}
                  previousLinkClassName={"page"}
                  breakClassName={"page"}
                  nextLinkClassName={"page"}
                  nextLabel={<IonIcon size="large" icon={chevronForwardCircleOutline}></IonIcon>}
                  previousLabel={<IonIcon size="large" icon={chevronBackCircleOutline}></IonIcon>}
                  pageClassName={"page"}
                  disabledClassName={"disabled"}
                  activeClassName={"active"}
                />
              </>
            ) : (
              <div>Nothing to display</div>
            )}
          </IonToolbar>
        </IonFooter>
      </div>
    </MyPage>
  );
};
