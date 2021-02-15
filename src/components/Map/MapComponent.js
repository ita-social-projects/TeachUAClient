import React, {useContext, useState} from 'react';
import {Layout} from 'antd';
import MapContainer from "./MapContainer";
import Cities from "./Cities";
import Categories from "./Categories";
import {MapSearchContext} from "../../context/SearchContext";
import MapClubList from "./MapClubList";
import './css/Sider.css'
import {MapSelectContext} from "../../context/SearchContext";
import {MapZoomContext} from "../../context/SearchContext";

const MapComponent = () => {
    const {mapClubs, setMapClubs} = useContext(MapSearchContext);
    const [loading, setLoading] = useState(false);
    const {Sider} = Layout;
    const [selected, setSelected] = useState(null);
    const [zoom, setZoom] = useState(10);

    return (
        <MapZoomContext.Provider value={{zoom, setZoom}}>
            <MapSelectContext.Provider value={{selected, setSelected}}>
                <Layout style={{height: '100%', width: '100%', borderRadius: '100px'}}>
                    <Sider className='mapSider' width={342}>
                        <div className="selectBlock">
                            <Cities className="sel" setMapClubs={setMapClubs}/>
                            <Categories className="sel" setMapClubs={setMapClubs}/>
                        </div>
                        <MapClubList loading={loading} load={setLoading} mapClubs={mapClubs} setMapClubs={setMapClubs}/>
                    </Sider>
                    <Layout style={{height: "100%"}}>
                        <MapContainer mapClubs={mapClubs}/>
                    </Layout>
                </Layout>
            </MapSelectContext.Provider>
        </MapZoomContext.Provider>
    )
}

export default MapComponent;