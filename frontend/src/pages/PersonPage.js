
import React, { useEffect, useState } from "react";
import { getActorInfo, getActorRoles } from "../components/API/getMedia";
import { useParams } from "react-router-dom";

const PersonPage = () => {
  const { actorId } = useParams();
  const [actorInfo, setActorInfo] = useState("");
  const [actorRoles, setActorRoles] = useState([]);

  const { name, profile_path, birthday, place_of_birth, biography } = actorInfo;

  const fetchActorInfo = async () => {
      const info = await getActorInfo(actorId);
      setActorInfo(info);
  };

  const fetchActingRoles = async () => {
    const roles = await getActorRoles(actorId);
    setActorRoles(roles);
  };
  

  useEffect(() => {
    fetchActorInfo();
    fetchActingRoles();
  }, [actorId]);


  return (
    <div className="actorPage">
      <div className="actorInfo">
        <div className="actorProfile">
          <img
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={`${name} profile`}
          />
        </div>
        <div className="actorDetails">
          <h2>{name}</h2>
          <p>
            <strong>Birthday:</strong> {birthday}
          </p>
          <p>
            <strong>Place of Birth:</strong> {place_of_birth}
          </p>
          <h3>Biography</h3>
          <p>{biography}</p>
        </div>
      </div>
      {/* <div className="actingRoles">
        <h2>Acting Roles</h2>
        <div className="roleList">
          {actorRoles.cast[0].map((role) => (
            <div key={role.id} className="roleCard">
              <img
                src={`https://image.tmdb.org/t/p/w200${role.poster_path}`}
                alt={`${role.title} poster`}
              />
              <h3>{role.title}</h3>
              <p>{role.character}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default PersonPage;

// import React, { useEffect, useState } from "react";
// import { getActorInfo, getActorRoles } from "../components/API/getMedia";
// import { useParams } from "react-router-dom";

// const PersonPage = () => {
//   const { actorId } = useParams();
//   const [actorInfo, setActorInfo] = useState("");
//   const [actorRoles, setActorRoles] = useState([]);
//   const [rolesToShow, setRolesToShow] = useState(10);
//   const [totalRoles, setTotalRoles] = useState(0);

//   const { name, profile_path, birthday, place_of_birth, biography } = actorInfo;

//   const fetchActorInfo = async () => {
//     const info = await getActorInfo(actorId);
//     setActorInfo(info);
//   };

//   const fetchActingRoles = async () => {
//     const roles = await getActorRoles(actorId);
//     setTotalRoles(roles.cast.length);

//     // Get the roles to show based on the current state
//     const rolesToDisplay = roles.cast.slice(0, rolesToShow);
//     setActorRoles(rolesToDisplay);
//   };

//   const handleShowMoreRoles = () => {
//     // Increase the number of roles to show by 10
//     setRolesToShow((prevRolesToShow) => prevRolesToShow + 10);
//   };

//   useEffect(() => {
//     fetchActorInfo();
//     fetchActingRoles();
//   }, [actorId, rolesToShow]);

//   return (
//     <div className="actorPage">
//       <div className="actorInfo">
//         <div className="actorProfile">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${profile_path}`}
//             alt={`${name} profile`}
//           />
//         </div>
//         <div className="actorDetails">
//           <h2>{name}</h2>
//           <p>
//             <strong>Birthday:</strong> {birthday}
//           </p>
//           <p>
//             <strong>Place of Birth:</strong> {place_of_birth}
//           </p>
//           <h3>Biography</h3>
//           <p>{biography}</p>
//         </div>
//       </div>
//       <div className="actingRoles">
//         <h2>Acting Roles</h2>
//         <div className="roleList">
//           {actorRoles.map((role) => (
//             <div key={role.id} className="roleCard">
//               <img
//                 src={`https://image.tmdb.org/t/p/w200${role.poster_path}`}
//                 alt={`${role.title} poster`}
//               />
//               <h3>{role.title}</h3>
//               <p>{role.character}</p>
//             </div>
//           ))}
//         </div>
//         {/* Show the "Show More" button only if there are more roles to show */}
//         {rolesToShow < totalRoles && (
//           <button onClick={handleShowMoreRoles}>Show More</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonPage;

