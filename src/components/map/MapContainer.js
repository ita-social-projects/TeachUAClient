import React, {useState} from 'react';
import {GoogleMap, InfoWindow, Marker, MarkerClusterer, useLoadScript} from "@react-google-maps/api";
import MarkItem from "./MarkItem";

const MapContainer = ({mapClubs, zoom, setZoom, selected, setSelected, lastClub, setLastClub}) => {
    const [map, setMap] = useState(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyBdEOt1rGu5B5h5-wpS4WnTA5gD7-O6R30'
    });
    if (loadError) return "Error loading map";
    if (!isLoaded) return "Map is loading";

    const mapContainerStyle = {
        width: "100%",
        height: "100%"
    };

    const option = {
        disableDefaultUI: true,
        zoomControl: true
    };

    const changeZoom = () => {
        if (map != null) {
            setZoom(map.zoom);
        }
    };

    const center = () => {
        if (lastClub) {
            return {
                lat: lastClub.latitude,
                lng: lastClub.longitude
            }
        } else {
            return {
                lat: 46.73259434488975,
                lng: 23.997036169252326
            }
        }
    };

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            onLoad={map => {setMap(map);}}
            center={center()}
            options={option}
            onZoomChanged={changeZoom}>
            <MarkerClusterer
                onClusteringEnd={(clusters) => {
                    clusters.clusters.map((cluster) => {
                        cluster.clusterIcon.styles = [{
                            url: '/static/images/map/cluster.png',
                            height: 58,
                            width: 67,
                            textColor: '#FFFFFF',
                            textSize: 18,
                        }];
                    })
                }}>
                {(cluster) =>
                    mapClubs.content.map(club => (
                            <Marker
                                id={club.id}
                                position={{
                                    lat: club.latitude,
                                    lng: club.longitude
                                }}
                                clusterer={cluster}
                                onClick={() => {
                                    setSelected(club);
                                    setLastClub(club);
                                    setZoom(15);
                                }}
                                icon={{url: '/static/images/map/location.png'}}/>
                        )
                    )}
            </MarkerClusterer>

            {selected && (
                <InfoWindow position={{lat: selected.latitude, lng: selected.longitude}}
                            onCloseClick={() => {
                                setSelected(null);
                            }}>
                    <MarkItem mapClub={selected}/>
                </InfoWindow>)}
        </GoogleMap>
    )

}

export default MapContainer;