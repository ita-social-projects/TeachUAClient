import React, {useState} from 'react';
import {GoogleMap, InfoWindow, Marker, MarkerClusterer, useLoadScript} from "@react-google-maps/api";
import MarkItem from "./MarkItem";

const MapContainer = ({mapClubs, zoom, setZoom, selected, setSelected}) => {
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
        if (mapClubs.content.length === 0) {
            return {
                lat: 50.44161765084062,
                lng: 30.52203536749006
            }
        } else {
            return {
                lat: mapClubs.content[0].latitude,
                lng: mapClubs.content[0].longitude
            }
        }
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            onLoad={map => {
                setMap(map);
                console.log(map)
            }}
            center={center()}
            options={option}
            onZoomChanged={changeZoom}>
            <MarkerClusterer>
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