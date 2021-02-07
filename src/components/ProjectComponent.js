import React from 'react';
import {Layout} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const ProjectComponent = () => {
    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Content>Content</Content>
                <Sider>Sider</Sider>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    );
};

export default ProjectComponent;