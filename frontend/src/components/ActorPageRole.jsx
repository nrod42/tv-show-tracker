import React from "react";
import { Link } from "react-router-dom";
import defaultMediaIcon from "../img/default_media_icon.svg";

const ActorPageRole = ({ roleInfo }) => {
  const { id, poster, title, year, type, role } = roleInfo;

  return (
    <>
      <Link 
        to={type === "tv" ? `/tv/${id}` : `/movie/${id}`} 
        className="d-flex flex-row flex-wrap align-items-center justify-content-between mt-2 mb-2" 
        style={{width: '100%'}}
      >  
        <div className="d-flex flex-row gap-3">   
          <img
            src={poster !== null ? poster : defaultMediaIcon}
            alt={`${title} poster`}
            style={{ width: "45px", height: "68px", objectFit: 'cover' }}
          />
          
          <div className="d-flex flex-column justify-content-start">
            <div>
              <strong>{title}</strong>
            </div>
            <div>
              {role}
            </div>
          </div>
        </div>
        
        <div>
          {year}
        </div>
      </Link>
    </>
  );
};

export default ActorPageRole;
