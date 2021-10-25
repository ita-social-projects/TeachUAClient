import React, {useEffect, useState} from "react";
import {getAllItems} from "../../service/AboutUsService";
import {Button, Form, Input, Layout, Tooltip} from "antd";
import Search from "../Search";
import "./css/aboutProject.css";
import AddItemComponent from "./AddItemComponent";
import ItemView from "./ItemView";
import EditTitle from "./EditTitle";
import EditText from "./EditText";
import EditVideo from "./EditVideo";
import EditPicture from "./EditPicture";


const AboutUsEdit = () => {
    const [addItemVisible, setAddItemVisible] = useState(false);
    const [titleVisible, setTitleVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    const [videoVisible, setVideoVisible] = useState(false);
    const [pictureVisible, setPictureVisible] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [items, setItems] = useState([]);
    const getData = () => {
        getAllItems().then(response => {
            setItems(response);
        });
    }

    useEffect(() =>  {
        getData();
    },[]);

    const onClickEdit = (item) => {
        switch (item.type){
            case 1:
                setTitleVisible(true);
                break;
            case 2:
                setTextVisible(true);
                break;
            case 5:
                setVideoVisible(true);
                break;
            case 3:
            case 4:
                setPictureVisible(true);
                break;
        }
        setEditItem(item);

        console.log(item);
        console.log(editItem)
    }

    return (
        <Layout className="aboutProject global-padding">
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">
                        Редагування сторінки "Про нас"
                    </h2>
                </div>
                <Search redirect/>
            </div>

            {items.map(item => {

                return <div>
                    <hr></hr>
                    <div className="btn">
                        <Button htmlType="submit" onClick={() => {onClickEdit(item)}}>Редагувати</Button>
                    </div>
                    <ItemView item={item}/>
                </div>
            })}

            <div className="add-item-button">
                <Button className="flooded-button donate-button"
                        onClick={() => setAddItemVisible(true)}>
                    Додати компонент
                </Button>
            </div>
            <AddItemComponent visible={addItemVisible} setVisible={setAddItemVisible}/>
            {editItem &&
            <div>
                <EditTitle visible={titleVisible} setVisible={setTitleVisible} item={editItem}/>
                <EditText visible={textVisible} setVisible={setTextVisible} item={editItem}/>
                <EditVideo visible={videoVisible} setVisible={setVideoVisible} item={editItem}/>
                <EditPicture visible={pictureVisible} setVisible={setPictureVisible} item={editItem}/>
            </div>
            }
        </Layout>
    );

};

export default AboutUsEdit;