import React, { useState, useEffect, useContext } from "react";
import MediaCard from "../components/Cards/MediaCard";
import { getMediaDetails } from "../components/API/getMedia";
import { API_URL } from "../apiConfig";
import { UserContext } from "../UserContext";

const ListPage = ({ listType, title }) => {
  const { userInfo } = useContext(UserContext);
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
          console.log("Problem getting user info");
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
    <div className={"listPage"}>
      <h1>{title}</h1>
      <div className="cardGrid">
        {list?.map((media) => (
          <MediaCard key={media.id} mediaData={media} setReload={setReload} />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
