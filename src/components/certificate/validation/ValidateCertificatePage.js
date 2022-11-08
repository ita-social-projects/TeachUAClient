import React from "react";
import { Layout, Result } from "antd";
import { useEffect, useState } from "react";
import { useParams, BrowserRouter, Redirect, useHistory } from "react-router-dom";
import { getValidationResponse } from "../../../service/CertificateService";
import { getCertificateTypeBySerialNumber } from "../../../util/CertificateUtil";
import "../css/CertificateValidation.css";

const ValidateCertificatePage = () => {

    const params = useParams();
    const history = useHistory();
    const[certificate, setCertificate] = useState({
        serialNumber: 0,
        certificateType: "",
        userName: "",
        courseDescription: "",
        projectDescription: "",    
        picturePath: ""
    });

    useEffect(() => {
        if (params.serialNumber === 'null'){
            history.push("/")
        }
        getValidationResponse(params.serialNumber).then((response) => {
            if (response.status > 400){
                setCertificate(undefined);
            }else{
                window.scrollTo(0, 0);
                setCertificate(response);
            }
        });
    }, []);

    
    return (  
        <Layout className="certificate-validate-page">
            {certificate ? 
                    <BrowserRouter>
                        <div className="banner-image">
                                <img src={process.env.PUBLIC_URL + certificate.picturePath} />
                        </div>
                        <div className="validation-content">    
                            <div className="title-text">
                                Цей сертифікат є дійсним
                            </div>
                            <div className="main-text">
                                <div className="sub-title">
                                    {getCertificateTypeBySerialNumber(certificate.serialNumber)}
                                </div>
                                <div className="user-name">
                                    {certificate.userName}
                                </div>
                                <div className="sub-title">
                                    Номер сертифіката
                                </div>
                                <div className="serial-number">
                                    {certificate.serialNumber}
                                </div>
                                <div className="sub-title">
                                    Навчальний курс:
                                </div>
                                <p>
                                    <p>{certificate.courseDescription}</p>
                                    <p>{certificate.projectDescription}</p>
                                </p>
                            </div>
                            
                            
                        </div>    
                    </BrowserRouter>
                    :
                    <Result
                        className="certificate-not-found"
                        status="404"
                        title="404"
                        subTitle="Сертифіката у реєстрі не знайдено"
                    />}
        </Layout>
    );
}
 
export default ValidateCertificatePage;