import React from "react";

import {Button, Form, Input, Modal, Rate, Tabs} from "antd";
import './css/CommentEditComponent.css';
import {withRouter} from "react-router";
import TextArea from "antd/lib/input/TextArea";

const { TabPane } = Tabs;

class CommentEditComponent extends React.Component {
    visible = true;
    rate = 0;
    getData = () => {
        /*this.props.load(true);

        getClubsByParameters(searchParameters).then(response => {
            this.props.setClubs(response);
            this.props.load(false)
        });*/
    };

    componentDidMount() {
        /*clearSearchParameters();
        this.getData();*/
    }

    onPageChange = (page) => {
        /*searchParameters.page = page - 1;

        this.getData();*/
    };

    onFinish(values){
        console.log('Success:', values);
    };

    render() {
        return (
            <Modal

                visible={this.visible}
                onOk={() => {}}
                onCancel={() => {}}
                width={521}
                footer={null}>

                <span className="comment-edit-title">Залишити коментар</span>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Коментар" key="1"></TabPane>
                    <TabPane tab="Скарга" key="2"></TabPane>
                </Tabs>

                <Form
                    name="comment-edit"
                    onFinish={this.onFinish}

                >
                    <div className="comment-fields">
                        <Form.Item
                            colon={false}
                            label="Телефон"
                            name="Phone"
                            labelAlign={"right"}
                            style={{ marginBottom: 16 }}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            label="Email"
                            name="Email"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            colon={false}
                            label="Оцінка"
                            name="Rate"
                        >
                            <Rate className="edit-field-input" value={3} />
                        </Form.Item>


                        <Form.Item
                            colon={false}
                            label="Опис"
                            name="Description"
                        >
                            <TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder="Додайте опис" />
                        </Form.Item>

                    </div>

                    <Form.Item >
                        <Button htmlType="submit" className="comment-button" >Надіслати</Button>
                    </Form.Item>
                </Form>


            </Modal>
        )
    }
}

export default withRouter(CommentEditComponent)