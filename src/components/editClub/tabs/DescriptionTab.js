import {Button, Form, Input, Typography, Upload, message} from "antd";
import React, {useRef, useState} from "react";
import EditClubContentFooter from "../EditClubContentFooter";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import EditorComponent from "../../editor/EditorComponent";
import {convertFromJson, getShortContent, saveContent} from "../../editor/EditorConverter";
import {transToEng} from "../../../util/Translit";
import {UPLOAD_IMAGE_URL} from "../../../service/config/ApiConfig";
import {addClub, updateClubBuId} from "../../../service/ClubService";
import "../css/MainInformationTab.less"
import {tokenToHeader} from "../../../service/UploadService";
import AddClubGalery from "../../addClub/AddClubGalery";

const DescriptionTab = ({setResult, result}) => {
    const [descriptionForm] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const editorRef = useRef(null);
    const [hideButton, setHideButton] = useState();
    const {Text} = Typography;

    const clubName = transToEng(result.name.replace(/[^a-zA-ZА-Яа-яЁё0-9]/gi, ""));

    const leftDesc = "{\"blocks\":[{\"key\":\"etag9\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8lltb\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"98dtl\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9q9dc\",\"text\":\"";
    const rightDesc = "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"image\",\"mutability\":\"IMMUTABLE\",\"data\":{\"src\":\"https://linguapedia.info/wp-content/uploads/2015/05/history-of-ukrainian.jpg\",\"className\":\"edited-image edited-image-center\"}}}}";

    const onChangeHandler = ({files}) => {
        setFileList(files);
    }

    const commitTab = (values) => {

        Object.assign(values, descriptionForm.getFieldValue());
        //result.description = saveContent(editorRef.current.state.editorState.getCurrentContent());
        if (values.descriptionText) {
            const text = values.descriptionText.replace(/(\r\n|\n|\r)/gm, "");
            const textEdit = text.replace(/"/gm, '\\"');
            const descJSON = leftDesc + textEdit + rightDesc;
            result.description = saveContent(descJSON);
        }

        if (values.urlLogo && values.urlLogo.file) {
            result.urlLogo = values.urlLogo.file.response;
        }

        if (values.urlBackground && values.urlBackground.file) {
            result.urlBackground = values.urlBackground.file.response;
        }

        if (values.urlGallery) {
            values.urlGallery.forEach((el) => {
                result.urlGallery.push({"url":el.response});
            })
        }

        setHideButton({display:"none"});

        console.log("result: ");
        console.log(result);

    }

    const onFinish = (values) => {
        //values.description = saveContent(editorRef.current.state.editorState.getCurrentContent());

        //descriptionForm.setFieldsValue(values);

        //setResult(Object.assign(result, values));

        //addClub(result).then(response => console.log(response));
        updateClubBuId(result).then((response) => {
            if(response.status != 400){
                window.location.reload()
            } else{
                message.warning(response.message);
            }
        });
        //window.location.reload();
    };

    return (
        <Form
            name="basic"
            form={descriptionForm}
            onFinish={onFinish}>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Логотип</Text>
            <Form.Item name="urlLogo"
                       className="edit-club-row"
                       // label="Логотип"
                       hasFeedback>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{folder: `clubs/${clubName}/logo`}}
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                    headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                >
                    <span className="edit-club-upload"><UploadOutlined className="icon"/>Завантажити лого</span>
                </Upload>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Обкладинка</Text>
            <Form.Item name="urlBackground"
                       className="edit-club-row"
                       // label="Обкладинка"
                       hasFeedback>
                <Upload
                    name="image"
                    action={UPLOAD_IMAGE_URL}
                    maxCount={1}
                    data={{folder: `clubs/${clubName}/background`}}
                    accept="image/png,image/jpeg,image/jpg,image/svg"
                    headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
                >
                    <span className="edit-club-upload"><UploadOutlined className="icon"/>Завантажити обкладинку</span>
                </Upload>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Галерея</Text>
            <Form.Item name="urlGallery"
                       className="add-club-row"
                       // label="Галерея"
                       hasFeedback>
                <AddClubGalery onChange={onChangeHandler}/>
            </Form.Item>

            <Text style={{fontSize :'19px', color:'GrayText'}}>Опис</Text>
            <Form.Item name="descriptionText"
                       className="edit-club-row"
                       // label="Опис"
                       hasFeedback
                       rules={[{
                           required: true,
                           max:1100,
                           pattern: "^[А-Яа-яіІєЄїЇґҐa-zA-Z0-9()" + "\\\\!\\\"\\\"#$%&'*\\n+\\r, ,\\-.:;\\\\<=>—«»„”“–’‘?|@_`{}№~^/\\[\\]]+$"
                       }]}>
                {/*<EditorComponent ref={editorRef}/>*/}
                <Input.TextArea className="editor-textarea" defaultValue={getShortContent(result.description).trim()} style={{ height: 200 }} />
            </Form.Item>
            <div style={{height: 70}}>
                <Button htmlType="button" style={hideButton} onClick={commitTab} className="edit-club-tab-button">Зберегти зміни вікна</Button>
                <Button htmlType="submit" onClick={onFinish} className="edit-club-button">Зберегти гурток</Button>
            </div>
        </Form>
    )
};

export default DescriptionTab;