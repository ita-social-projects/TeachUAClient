import { Typography, List, Button } from "antd";
import { getCertificateTypeAsString } from "../../../../util/CertificateUtil";

const CertificateList = ({certificates, startDownload}) => {

    const {Text} = Typography;

    const extractContent = (htmlText) => {
        let span = document.createElement('span');
        span.innerHTML = htmlText;
        return span.textContent;
    }

    return (
        <List
            className="certificates"
            itemLayout="horizontal"
            split={false}
            locale={{
                emptyText: <div className="noMessages">Сертифікатів немає</div>
            }}
            dataSource={certificates}
            pagination={{ hideOnSinglePage: true, defaultPageSize: 4 }}
            renderItem={(certificate) => (
                <List.Item actions={[
                    <Button onClick={() => startDownload(certificate)}>
                        Завантажити
                    </Button>
                ]}>
                    <List.Item.Meta
                        title={<h3>{extractContent(certificate.courseDescription)}</h3>}
                        description={certificate.date}
                    />
                    <Text italic>{getCertificateTypeAsString(certificate.certificateType)}</Text>
                </List.Item>
            )}
        />
    );
};

export default CertificateList;