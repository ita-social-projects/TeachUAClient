import React, {useEffect, useState} from 'react';
import {getUserId} from "../../../service/StorageService";
import ModalHint from "../register/ModalHint";
import '../../clubPage/sider/css/PageSider.css';
import classes from "./css/SignUpForClub.module.css";
import {Button, Form, Modal, Input, Checkbox, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import AddChildModal from "../../addChild/AddChildModal";
import {postClubRegistration, postUserClubRegistration, getChildren} from "../../../service/ClubRegistrationService";
import './css/SignUpForClub.css';
import ConditionalTooltip from "../../ConditionalTooltip";

const SignUpForClub = ({isShowing, setShowing, club}) => {

    const [registrationToClubForm] = Form.useForm();
    const [children, setChildren] = useState([]);
    const [isAddChildModalVisible, setIsAddChildModalVisible] = useState(false);
    const [selectedChildrenIds, setSelectedChildrenIds] = useState([]);
    const boyIcon = `${process.env.PUBLIC_URL}/static/images/children/boy-icon.png`;
    const girlIcon = `${process.env.PUBLIC_URL}/static/images/children/girl-icon.png`;

    const onCheckboxChange = checkedValues => {
        setSelectedChildrenIds(checkedValues);
    };

    const handleChildAdded = (newChild) => {
        console.log("Child added:", newChild);
        setChildren(prevChildren => [...prevChildren, newChild]);
    };


    useEffect(() => {
        if (isShowing) {
            getChildren(club.id)
                .then(data => {
                    setChildren(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [isShowing]);

    const onFinish = (values) => {
        const comment = values.comment || ' ';

        if (selectedChildrenIds.includes("self")) {
            const userClubRegistrationRequest = {
                userId: getUserId(),
                clubId: club.id,
                comment: comment
            };

            postUserClubRegistration(userClubRegistrationRequest)
                .then((response) => {
                    setShowing(false);
                    registrationToClubForm.resetFields();
                    setSelectedChildrenIds([]);
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });

        } else {
            const clubRegistrationRequest = {
                childIds: selectedChildrenIds,
                clubId: club.id,
                comment: comment
            };

            postClubRegistration(clubRegistrationRequest)
                .then((response) => {
                    setShowing(false);
                    registrationToClubForm.resetFields();
                    setSelectedChildrenIds([]);
                    message.success("Запит на реєстрацію в гурток надіслано");
                })
                .catch((error) => {
                    message.error("Помилка при запиті на додавання в гурток")
                    console.error('There was an error!', error);
                });
        }
    };


    return (
        !getUserId()
            ?
            <ModalHint visible={isShowing}
                       setVisible={setShowing}
            >
                Увійдіть або зареєструйтеся!!!
            </ModalHint>
            :
            <Modal
                className={classes.signUpForClubModal}
                centered
                title="Записати на гурток"
                width={420}
                visible={isShowing}
                onOk={() => setShowing(false)}
                onCancel={() => setShowing(false)}
                footer={null}
            >
                <div className={classes.content}>

                    <div className={classes.clubName}>
                        {club.name}
                    </div>

                    <Form
                        className={classes.form}
                        name="registration-to-club"
                        form={registrationToClubForm}
                        requiredMark={true}
                        onFinish={onFinish}
                    >
                        <div className={classes.label}>
                            Кого записуємо?
                        </div>

                        <Checkbox.Group className={classes.checkboxGroup} value={selectedChildrenIds}
                                        onChange={onCheckboxChange}>
                            {children.length > 0 ? (
                                children.map((child) => (
                                    <div key={child.id} className={classes.customCheckbox}>
                                        <ConditionalTooltip
                                            condition={child.disabled}
                                            title={"Already registered in this club"}
                                        >
                                            <span>
                                                <Checkbox value={child.id} disabled={child.disabled}>
                                                    <div className={classes.label}>
                                                        <img
                                                            src={child.gender === 'MALE' ? boyIcon : girlIcon}
                                                            alt={child.gender === 'MALE' ? 'Boy Icon' : 'Girl Icon'}
                                                            className={classes.childIcon}
                                                        />
                                                        {child.firstName} {child.lastName}, {child.age}
                                                    </div>
                                                </Checkbox>
                                            </span>
                                        </ConditionalTooltip>
                                    </div>
                                ))
                            ) : (
                                <div className={classes.customCheckbox}>
                                    <Checkbox value="self">
                                        Записати мене на гурток
                                    </Checkbox>
                                </div>
                            )}
                        </Checkbox.Group>
                        <div>
                            <Button className="add-children-btn" onClick={() => setIsAddChildModalVisible(true)}>
                                <PlusOutlined/>
                                Додати дитину
                            </Button>
                        </div>

                        <AddChildModal isVisible={isAddChildModalVisible} setIsVisible={setIsAddChildModalVisible}
                                       onChildAdded={handleChildAdded}/>

                        <Form.Item
                            name="comment"
                            className={classes.commentInput}
                            rules={[
                                {
                                    required: false,
                                    pattern: /^[^ЁёЪъЫыЭэ]+$/,
                                    message: 'Коментар не може містити російські літери'
                                }
                            ]}>
                            <Input.TextArea
                                className={classes.textArea}
                                placeholder="Додати коментар"
                                autoSize={{minRows: 1, maxRows: 4}}
                                maxLength={300}
                                style={{width: '100%'}}
                            />
                        </Form.Item>

                        <div className={classes.buttonWrapper}>
                            <Button
                                className={classes.formButton}
                                type="primary"
                                htmlType="submit"
                            >
                                Записати
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
    );
};

export default SignUpForClub;
