import React, {useState} from 'react';
import {Layout, Modal} from 'antd';
import MapContainer from "./MapContainer";
import Cities from "./Cities";
import Categories from "./Categories";
import MapClubList from "./MapClubList";
import './css/Sider.css'

const {Sider} = Layout;


const MapComponent = ({visible, setVisible}) => {
    const [mapClubs, setMapClubs] = useState({
        content: [],
    });
    const [selected, setSelected] = useState(null);
    const [lastClub, setLastClub] = useState(null);
    const [zoom, setZoom] = useState(10);

    const closeMap = () => {
        setVisible(false);
        setLastClub(null);
        setZoom(10);
    };

    return (
        <Modal
            centered
            visible={visible}
            onOk={() => closeMap()}
            onCancel={() => closeMap()}
            width={1200}
            footer={null}
            className='map-modal'
        >
            <Layout className="map-layout">
                <Sider className='mapSider' width={342}>
                    <div className="selectBlock">
                        <Cities setMapClubs={setMapClubs} setZoom={setZoom}/>
                        <Categories setMapClubs={setMapClubs}/>
                    </div>
                    <MapClubList mapClubs={mapClubs}
                                 setMapClubs={setMapClubs}
                                 setZoom={setZoom}
                                 setSelected={setSelected}
                                 setLastClub={setLastClub}
                    />
                </Sider>
                <MapContainer mapClubs={mapClubs}
                              zoom={zoom}
                              setZoom={setZoom}
                              selected={selected}
                              setSelected={setSelected}
                              lastClub={lastClub}
                              setLastClub={setLastClub}
                />
            </Layout>
        </Modal>
    )
}

export default MapComponent;