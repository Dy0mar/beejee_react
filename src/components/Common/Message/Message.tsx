import React from "react"
import {Col, Row, Typography} from "antd"

const { Text, Title } = Typography

export const Message: React.FC<{message: string}> = (props) => {
    return(
        <Row style={{textAlign: 'center', }}>
            <Col offset={8} span={6}>
                <Text type="secondary"><Title level={2}>{props.message}</Title></Text>
            </Col>
        </Row>
    )
}