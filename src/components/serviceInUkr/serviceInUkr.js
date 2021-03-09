import React from "react";
import Layout from "antd/lib/layout/layout";
import "./css/serviceInUkr.css";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import { Button, Collapse } from "antd";

const serviceInUkr = () => {
    const { Panel } = Collapse;

    return (
        <Layout className="serviceInUkr">
            <div className="title" style={{ background: `url(${process.env.PUBLIC_URL}/static/images/service/ukr_service.png)` }}>
                <span className="text">Послуги українською</span>
            </div>
            <div className="social-info">
                <div className="social-media">
                    <span className="text">Ми у соц. мережах</span>
                    <div className="links">
                        <a target="_blank" href="#"><TwitterOutlined className="icon" /></a>
                        <a target="_blank" href="#"><FacebookOutlined className="icon" /></a>
                        <a target="_blank" href="#"><GoogleOutlined className="icon" /></a>
                        <a target="_blank" href="#"><InstagramOutlined className="icon" /></a>
                    </div>
                </div>
                <div className="help-button">
                    <a target="blank" href="#"><Button className="flooded-button donate-button">Допомогти
                проекту</Button> </a>
                </div>
            </div>
            <div className="content">
                <div className="content-title">
                    Освітні послуги українською мовою у закладах позашкільної освіти
                </div>
                <div className="content-text">
                    Із 16 січня 2021 набуває чинності стаття 30 закону “Про забезпечення функціонування української мови як державної” про державну мову у сфері обслуговування споживачів. З 16 січня всі надавачі послуг, незалежно від форми власності, зобов’язані обслуговувати споживачів і надавати інформацію про товари і послуги державною мовою. Громадяни мають право отримати освітній послуги українською мовою у закладах позашкільної освіти.
                </div>
            </div>
            <div className="faq">
                <div className="faq-title">Популярні Питання (FAQ)</div>

                <Collapse class="collapse" defaultActiveKey={['1']} expandIconPosition="right" >
                    <Panel className="panel" header="Як діяти, якщо вам відмовляють в інформації чи послугах українською мовою" key="1">
                        <p>- Спочатку варто спробувати владнати ситуацію на місці та попросити працівника обслуговувати вас державною мовою.
                        - У разі відмови працівника, звернутись до керівництва закладу або на “гарячу лінію” установи.
                        - У разі відмови або не забезпечення надання інформації (послуг) державною мовою необхідно зафіксувати факт відмови (за допомогою аудіо-, відео, письмового підтвердження очевидців тощо) та дані суб’єкта господарювання (назву, місцезнаходження, контакти суб’єкта).
                        </p>
                    </Panel>
                </Collapse>
                <Collapse class="collapse" expandIconPosition="right">
                    <Panel className="panel" header="Куди можна подавати скаргу" key="2">
                        <p>Текст відсутній</p>
                    </Panel>
                </Collapse>
                <Collapse class="collapse" expandIconPosition="right" >
                    <Panel className="panel" header="Що має містити скарга" key="3">
                        <p>Текст відсутній</p>
                    </Panel>
                </Collapse>
            </div>
        </Layout >
    )
}
export default serviceInUkr;