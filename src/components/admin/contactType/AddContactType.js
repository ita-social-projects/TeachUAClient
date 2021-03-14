import React, {useState} from "react";
import {Button, Form, Input, message, Upload} from "antd";
import {addToTable} from "../../../util/TableUtil";
import {addContactType} from "../../../service/ContactTypeService";
import "./css/AddContactType.css";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import Avatar from "./Avatar";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";

const AddContactType = ({contactTypes, setContactTypes}) => {
    const [contactType, setContactType] = useState(null);
    const [input, setInput] = useState('');
    const [urlLogo, setUrlLogo] = useState('');


    const onClick = () => {
        if (input.length === 0) {
            message.error("Введіть назву!");
            return;
        }

        addContactType({
                name: input,
                urlLogo: '/upload/contact-types/'+urlLogo
            }
        ).then((response) => {
            if (response.status) {
                message.warning(response.message);
                return;
            }

            message.success(`${response.name} успішно доданий`);

            setContactTypes(addToTable(contactTypes, response));
        });
    };

    return (
        <div className="add-contact-type">
            <div className="add-contact-type-content">
                <Input placeholder="Введіть назву"
                       value={input} onInput={e => setInput(e.target.value)}
                       className="add-contact-type-input"/>
                <Input placeholder=""
                       value={urlLogo} onInput={e => setUrlLogo(e.target.value)}
                       className="add-contact-type-input"/>
                {/*<Avatar/>*/}
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{folder: `contact-types/`}}
                >
                    <span className="add-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                </Upload>
                <Button className="flooded-button add-contact-type-button" onClick={onClick}>Добавити</Button>
            </div>
        </div>
    );
};

export default AddContactType;