import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../apiConfig.jsx";
import { DarkModeContext } from "../contexts/DarkModeContext.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import getMediaDetails from "../components/API/getMediaDetails.tsx";
import MediaCard from "../components/Cards/MediaCard.tsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import uniqid from "uniqid";
import styles from "./WatchListPage.module.css";

const ListPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { userInfo } = useContext(UserContext);
  const { listType } = useParams();
  const [userData, setUserData] = useState([]);
  const [list, setList] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch(`${API_URL}/lists/${userInfo.id}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Problem getting user info");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLists();
  }, [userInfo, reload]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const tvShows = await Promise.all(
          (userData[listType]?.tvShows || []).map((showId) =>
            getMediaDetails(showId, "tv")
          )
        );
        const movies = await Promise.all(
          (userData[listType]?.movies || []).map((movieId) =>
            getMediaDetails(movieId, "movie")
          )
        );
        setList([...tvShows, ...movies]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedia();
  }, [listType, userData, reload]);

  return (
    <div className={darkMode ? styles.listPageDark : styles.listPageLight}>
      <Container className="text-center">
        <h2 className="mb-5">
          {listType.charAt(0).toUpperCase() + listType.slice(1)}
        </h2>
        <Row>
          {list?.map((media) => (
            <Col key={uniqid()} lg={2} md={4} sm={6} xs={6}>
              <MediaCard mediaData={media} setReload={setReload} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ListPage;
