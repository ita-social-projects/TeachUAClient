import React from 'react'

const MarathonBanner = ({imageURL}) => {
    return (
        <div className="banner" style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), 
                                    url(${imageURL}) no-repeat 50% 28% / cover`
            }}>
            <span className="title">Про Мовомаратон</span>
        </div>
    )
}

export default MarathonBanner;
