import React, { useEffect, useState } from 'react';
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import { Avatar, Collapse, Badge, Modal } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { DeleteOutlined } from '@ant-design/icons';
import { getLogo } from '../messages/MessageUtil';
import { updateComplaintIsActiveById } from '../../../../service/ComplaintService';
import { getRole } from '../../../../service/StorageService';

const Complaint = ({ message, onDelete, userRole }) => {
  const { Panel } = Collapse;
  const [active, setActive] = useState(message.isActive);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!active && getRole() === 'ROLE_MANAGER') {
      updateComplaintIsActiveById(message.id, { isActive: false })
        .then(response => setActive(response.isActive));
    }
  }, [active]);

  const handleDelete = () => {
    onDelete(message.id);
  };

  const handleNameClick = () => {
    message.hasAnswer ? setShowModal(true) : setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showReadComplaint = (isActive) => {
    if (isActive) return <ExclamationCircleOutlined className="exclamation" />
    else return <CheckCircleOutlined className="checkCircle" />
  }

  return (
    <>
      <Collapse
        onChange={() => {
          if (message.isActive) setActive(false);
        }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <div className="userInfo">
          <Avatar size={36} src={getLogo(message.user.urlLogo)} icon={<UserOutlined />} />
          <div className="userName" style={{ cursor: 'pointer' }}>
            {`${message.user.firstName} ${message.user.lastName}`}
          </div>
        </div>
        <Panel
          key={message.id}
          header={
            <div>
              <div>
                {message.hasAnswer && userRole !== 'ROLE_MANAGER' ? (
                  <Badge dot onClick={handleNameClick}>{message.club.name}</Badge>
                ) : (
                  <Badge onClick={handleNameClick}>{message.club.name}</Badge>
                )}
              </div>
            </div>
          }
          extra={
            <div className="extra">
              {showReadComplaint(active)}
              <DeleteOutlined className="deleteButton" onClick={handleDelete} />
            </div>
          }
        >
          <div>
            {message.text}
          </div>
        </Panel>
      </Collapse>

      <Modal
        visible={showModal}
        onCancel={handleCloseModal}
        footer={null}
        title={`${message.club.name} - Відповідь`}
      >
        {message.answer} {/* Assuming the answer is available in the message object */}
      </Modal>
    </>
  );
};

export default Complaint;
