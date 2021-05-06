import React from 'react'
import {Button, Col, Divider, Form, Input, Row} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {SGetUser} from "../../selectors/user-selector"
import {login} from "../../redux/user-reducer"
import {TUserLogin} from "../../types/username-types"
import {Message} from "../../components/Common/Message/Message"

export const Login: React.FC = () => {
    const dispatch = useDispatch()

    const user = useSelector(SGetUser)


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    }
    const onFinish = (values: TUserLogin) => {
        dispatch(login(values))
    }

    if (user.token)
        return <Message message={'Hello ' + user.username} />

    return (
        <div>
            <Divider>Login </Divider>
            <Row style={{textAlign: 'center'}}>
                <Col key={1} offset={8} span={6}>
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
                    </Form>
                </Col>
            </Row>
        </div>
    )
}