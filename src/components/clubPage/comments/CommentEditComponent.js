import React from "react";
import {getClubsByParameters} from "../../../service/ClubService";
import {clearSearchParameters, searchParameters} from "../../../context/SearchContext";
import Loader from "../../Loader";
import EmptySearch from "../../clubs/EmptySearch";
import {Button, Layout, Modal, Pagination, Rate, Space} from "antd";
import ClubCardItem from "../../clubs/ClubCardItem";
import {withRouter} from "react-router";

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

    render() {
        return (
            <Modal

            visible={this.visible}
            onOk={() => {}}
            onCancel={() => {}}
            width={521}
            footer={null}

        >
            <Layout className="clubs">
                <Rate className="rating" value={3} />
                <Button disabled={ false? 'disabled' : ''} > a</Button>
            </Layout>
            </Modal>
        )
    }
}

export default withRouter(CommentEditComponent)