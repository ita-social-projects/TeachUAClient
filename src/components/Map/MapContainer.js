import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer} from "@react-google-maps/api";
import {useState, useRef, useCallback} from 'react';
import MarkItem from "./MarkItem";
import {mapSearchParameters, MapSelectContext, searchParameters} from "../../context/SearchContext";
import {useContext} from "react";
import {getClubsByParameters} from "../../service/ClubService";

const MapContainer = ({mapClubs}) => {
    const {selected, setSelected} = useContext(MapSelectContext);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyBdEOt1rGu5B5h5-wpS4WnTA5gD7-O6R30'
    });
    if (loadError) return "Error loading map";
    if (!isLoaded) return "Map is loading";

    const mapContainerStyle = {
        width: "100%",
        height: "100%"
    }

    const option = {
        disableDefaultUI: true,
        zoomControl: true
    }
    const onMarkClick = (value) => {
        console.log(this);
        console.log(value);
        // setSelected(value)

    };

    const center = () => {
        console.log(mapClubs);
        if(mapClubs.content.length==0){
            return {
                lat: 50.07997498322472,
                lng: 25.14858376125237
            }
        }else{
            return{
                lat: mapClubs.content[0].latitude,
                lng: mapClubs.content[0].longitude
            }
        }
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center()}
            options={option}>

            <MarkerClusterer>
                {(cluster) =>
                    mapClubs.content.map(club => (
                            <CustomMarker key={club.id}
                                    id={club.id}
                                    position={{
                                        lat: club.latitude,
                                        lng: club.longitude
                                    }}
                                    clusterer={cluster}
                                    // onClick={onMarkClick}
                                    icon={{url: '/static/images/map/location.png'}}
                            />
                        )
                    )
                }

            </MarkerClusterer>
            {console.log(mapClubs.content[0])}

            {selected ? (<InfoWindow position={{lat: selected.latitude, lng: selected.longitude}} onCloseClick={() => {
                setSelected(null)
            }}>
                <MarkItem mapClub={selected}/>
            </InfoWindow>) : null}
        </GoogleMap>
    )

}


const CustomMarker = props => {
    const {id} = props;
    const onMarkerClick = (evt) =>{
        console.log(id);

    }
    return (
        <Marker onClick={onMarkerClick}
            {...props}/>
    )
}

export default MapContainer;