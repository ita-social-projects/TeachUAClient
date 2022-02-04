import React, {useState} from "react";
import {Menu, Dropdown, Button, Modal, Rate, Popconfirm} from "antd";
import "./css/ClubInfo.css";
import {Link} from "react-router-dom";
import Tags from "../Tags";
import ClubLogo from "../clubPage/header/ClubLogo";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import ContactsInfoUtil from "../../util/ContactsInfoUtil";
import ImageCarousel from "../ImageCarousel";
import {getShortContent} from "../editor/EditorConverter";
import {deleteClubById, getClubReport} from "../../service/ClubService";
import {getUserId} from "../../service/StorageService";
import {getFeedbackListByClubId} from "../../service/FeedbackService";
import PageRating from "../clubPage/content/PageRating";
import {BASE_URL} from "../../service/config/ApiConfig";
import {FilePdfOutlined} from "@ant-design/icons";


const ClubListItemInfo = ({visible, setVisible, club}) => {
    const [rating, setRating] = useState(0);
    const [count, setCount] = useState(0);
    const feedback = getFeedbackListByClubId(club.id);
    const images = club.urlGallery.map(image => BASE_URL + image.url);

    feedback.then((value) => {

        var clubRate = 0;
        for (let i = 0; i < value.length; i++) {
            clubRate += value[i].rate;
        }

        setRating(clubRate / value.length);
        setCount(value.length);
    })

    const popupHeaderText = (
        <div>
            <h2>Видалити</h2>
            <p>Відновлення гуртка буде неможливим</p>
        </div>
    );

    function confirmPopup(e) {
        deleteClubById(club.id).then(window.location.reload());
    }


    function showDropdown() {
        return (club.center != null && (club.center.user != null && Number(club.center.user.id) == getUserId())) ||
            (club.center == null && club.user != null && getUserId() == Number(club.user.id));
    };

    // function closeModal() {
    //     setVisible(false);
    // }

    const menu = (
        <Menu>
            <Menu.Item>
                <Popconfirm
                    className="popConfirm"
                    icon={""}
                    title={popupHeaderText}
                    placement="bottom"
                    onConfirm={confirmPopup}
                    okButtonProps={{className: "clubModal popConfirm"}}
                    // onCancel={cancelPopup}
                    cancelButtonProps={{className: "clubModal popCancel"}}
                    okText="Видалити гурток"
                    cancelText="Відмінити">
                    <a href="!#">Видалити</a>
                </Popconfirm>
            </Menu.Item>
            {/* <Menu.Item onClick={closeModal}>
                <EditClubModal visible={true} />
            </Menu.Item> */}
        </Menu>
    );


    return (
        <Modal
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={900}
            footer={null}
            className="clubInfo">
            <div className="container">
                {showDropdown() && (
                    <Dropdown
                        // trigger="click"
                        overlay={menu}
                        placement="bottomRight">
                        <Button className="modal-settings-btn">
                            <SettingOutlined style={{fontSize: "1em"}}/>
                        </Button>
                    </Dropdown>
                )}
                <div className="title">
                    <ClubLogo
                        logo={club.urlLogo}
                        category={club.categories[0]}
                    />
                    <div className="club-name">{club.name}</div>
                </div>
                <Tags className="categories" categories={club.categories}/>
                <div className="rating">
                    <PageRating rating={rating} count={count}/>
                </div>
                <div className="address">
                    <EnvironmentFilled className="address-icon"/>
                    <span className="text">
                        {club.locations.length === 0
                            ? "Онлайн"
                            : club.locations[0].address}
                    </span>
                </div>
                <div className="age">
                    <span className="sider-label">Вік аудиторії: </span>
                    <span className="years">
                        від {club.ageFrom} до {club.ageTo} років
                    </span>
                </div>
                <ContactsInfoUtil
                    className="socialMedia"
                    label="Контакти гуртка"
                    contacts={club.contacts}
                />
                <Button className="flooded-button more-button">
                    <Link to={`/club/${club.id}`}>Більше про гурток</Link>
                </Button>
                <div className="about-club">
                    <span className="title">Про гурток</span>
                    <ImageCarousel className="carousel" urls={images}/>
                    <div className="description">
                        {getShortContent(club.description)}
                    </div>
                </div>
                <div>
                    <Button onClick={() => getClubReport(club.id, club.name)} className="outlined-button details-button">
                        Завантажити
                        <FilePdfOutlined/>
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ClubListItemInfo;
