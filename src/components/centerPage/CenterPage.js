import { Layout, Result} from "antd";
import React, {useEffect, useReducer, useState} from "react";
import {useParams, withRouter} from 'react-router';
import CenterPageHeader from "./header/CenterPageHeader";
import CenterPageSider from "./sider/CenterPageSider";
import './css/CenterPage.css';
import {searchParameters} from "../../context/SearchContext";
import {getCenterById} from "../../service/CenterService";
import CenterPageContent from "./content/CenterPageContent";
import Loader from "../Loader";
import {convertToHtml} from "../editor/EditorConverter";
import {Content} from "antd/es/layout/layout";

const CenterPage = () => {

    const [cityName, setCityName] = useState(searchParameters.cityName);
    const [centerNotFound, setCenterNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState({
        clubs: [],
        contacts: [],
        description: "",
        email: "",
        id: null,
        locations: [],
        name: "",
        phones: "",
        socialLinks: "",
        urlBackgroundPicture: "",
        urlLogo: "",
        urlWeb: "",
        user: {}
    });

    const centerId  = useParams();

    const getData = () => {

            console.log("props.match.params.id : "+centerId);
            console.log("getCenterById start====>")
            getCenterById(centerId.id).then(response => {
               // console.log(JSON.stringify(response));
                console.log(response);
                setCenter(response);
                console.log("hell");
            });
            console.log(center);

    };

    useEffect(() =>  {
        console.log("======= CenterPage starts rendering ======");
        console.log("==== loading : "+loading);
        getData();
        // console.log(center);

    },[]);

        return (
             !center.name ?  <Loader/> : (
                <Layout className="global-padding">
                    <CenterPageHeader center={{
                        name: center.name,
                        urlBackground: center.urlBackgroundPicture,
                        urlLogo: center.urlLogo}}/>
                    <Layout
                        className="center-page"
                        style={{padding: 40, background: "white"}}
                    >
                        <CenterPageContent description={center.description}/>

                        {/*<CenterPageSider cityName={cityName} center={center}/>*/}
                    </Layout>
                </Layout>
            )
        );
}

export default CenterPage;

// <div>{center.name}
//     <ul>
//         <li>{center.description}</li>
//     </ul>
// </div>





