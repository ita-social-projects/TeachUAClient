import { Carousel } from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import React, { useRef } from "react";
import { getShortContent } from "../editor/EditorConverter";
import "./css/ClubCarousel.css";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";


// const ClubCarousel = ({ clubs }) => {
//     const carousel = useRef(null);
//
// //     return (
// //         <Carousel ref={node => carousel.current = node} className="clubCarousel" autoplay>
// //             {clubs.map((club) =>
// //                 <div className="club">
// //                     <div className="inf">
// //                         <div className="club-img">
// //                             <img src={`${process.env.PUBLIC_URL + club.urlBackground}`}></img>
// //                         </div>
// //                         <div className="club-inf">
// //                             <div className="address">
// //                                 <EnvironmentFilled className="address-icon" />
// //                                 <div className="text">{club.locations[0].city.name}</div>
// //                             </div>
// //                             <div className="club-name">
// //                                 {club.name}
// //                             </div>
// //                             <div className="club-description">
// //                                 {getShortContent(club.description)}
// //                             </div>
// //                         </div>
// //                         <div className="arrow-icon">
// //                             <ArrowLeftOutlined className="arrow" onClick={() => carousel.current.prev()} />
// //                             <ArrowRightOutlined className="arrow" onClick={() => carousel.current.next()} />
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </Carousel>
// //     );
// // };
//
// export default ClubCarousel;