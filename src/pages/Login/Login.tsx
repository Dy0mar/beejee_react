import React from 'react'
import {Alert, Button, Col, Divider, Form, Input, Row, Typography} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {SGetUser} from "../../selectors/user-selector"
import {NullOrString} from "../../types/g-types"
import {login} from "../../redux/user-reducer"
import {SGetAppMessage, SGetAppStatus} from "../../selectors/app-selector"
import {ResultStatusEnum} from "../../api/api";

const { Text, Title } = Typography

export const Login: React.FC = () => {

    const dispatch = useDispatch()

    const user = useSelector(SGetUser)
    const status = useSelector(SGetAppStatus)
    const message = useSelector(SGetAppMessage)

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    }
    const onFinish = (values: {username: string, password: string}) => {
        dispatch(login(values.username, values.password))
    }

    const onFinishFailed = (errorInfo: any) => {
        return JSON.stringify(errorInfo)
    }

    if (user.token)
        return <LoginFormText username={user.username} />

    return (
        <div>
            <Divider>Login </Divider>
            <Row style={{textAlign: 'center'}}>
                <Col offset={8} span={6}>
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            {status && status === ResultStatusEnum.error  ? <Alert message={onFinishFailed(message)} type="error" /> : ''}
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}
const LoginFormText: React.FC<{username: NullOrString}> = (props) => {
    return(
        <Row style={{textAlign: 'center', }}>
            <Col offset={8} span={6}>
                <Text type="secondary"><Title level={2}>Hello {props.username}</Title></Text>
            </Col>
        </Row>
    )

}