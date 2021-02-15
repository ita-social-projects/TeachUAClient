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
    const [zoom, setZoom] = useState(10);

    return (
        <Modal
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1200}
            footer={null}
            className='map-modal'
        >
            <Layout className="layout-map">
                <Sider className='mapSider' width={342}>
                    <div className="selectBlock">
                        <Cities setMapClubs={setMapClubs} setZoom={setZoom}/>
                        <Categories setMapClubs={setMapClubs}/>
                    </div>
                    <MapClubList mapClubs={mapClubs}
                                 setMapClubs={setMapClubs}
                                 setZoom={setZoom}
                                 setSelected={setSelected}
                    />
                </Sider>
                <Layout style={{height: "100%"}}>
                    <MapContainer mapClubs={mapClubs}
                                  zoom={zoom}
                                  setZoom={setZoom}
                                  selected={selected}
                                  setSelected={setSelected}
                    />
                </Layout>
            </Layout>
        </Modal>
    )
}

export default MapComponent;