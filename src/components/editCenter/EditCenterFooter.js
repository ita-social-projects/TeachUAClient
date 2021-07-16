import {Button} from "antd";
import React from "react";
import "./css/EditCenterFooter.css"
const EditCenterContentFooter = ({result,setResult}) => {

    const onFinish = (values) =>{

    }
    return (
        <div className="edit-center-content-footer">
            <Button htmlType="submit"
                    onClick={onFinish}
                    className="flooded-button edit-center-content-save">Зберегти зміни</Button>
        </div>
    )
};

export default EditCenterContentFooter;
