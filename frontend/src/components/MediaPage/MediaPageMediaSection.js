import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../Contexts/DarkModeContext';
import PersonCard from '../Cards/PersonCard';
import MediaCard from '../Cards/MediaCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import rightArrowWhite from '../../img/right_arrow_white.svg';
import rightArrowBlack from '../../img/right_arrow_black.svg';


const MediaPageMediaSection = ({id, mediaType, media, title}) => {
    const {darkMode} = useContext(DarkModeContext);
    
    return (
        <section>
            {media.length > 0 ? (
                <>
                    <Link to={title === 'cast' ? `/${mediaType}/credits/${id}` : `/${mediaType}/related/${title}/${id}`}>
                        <div className="d-flex flex-row justify-content-between align-items-center mt-5 mb-5">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <h2 style={{margin: 0}}>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
                            <img src={darkMode ? rightArrowWhite : rightArrowBlack}  style={{ height: "25px", width: "auto", marginLeft: "10px" }}></img>
                        </div>
                        <span>Show More</span>
                        </div>
                    </Link>
                    <Row>
                        {media
                        .map((item) => (
                            <Col key={item.id} xs={6} sm={4} md={3} lg={2}>
                            {title === 'cast' ? <PersonCard person={item} /> : <MediaCard mediaData={item} />}
                            </Col>
                        ))
                        .slice(0, 6)}
                    </Row>
                </> 
            ) : 
                <>
                    <h2 className="mt-5 mb-5">{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
                    <p className="text-center mt-5 mb-5">Not Available</p>
                </>
            }
        </section>
    )
}

export default MediaPageMediaSection;