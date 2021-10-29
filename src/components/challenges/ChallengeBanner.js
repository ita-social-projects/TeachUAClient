import React, {useEffect} from "react";

const ChallengeBanner = ({challenge}) => {
    return (
        <div className="banner" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), 
                                    url(${process.env.PUBLIC_URL+challenge.picture}) no-repeat 50% 28% / cover`
        }}>
            <span className="title">{challenge.title}</span>
        </div>
    )
}
export default ChallengeBanner;