import React from 'react'
import {Button, Col, Divider, Form, Input, Row} from "antd"

import {useDispatch} from "react-redux"
import {TTaskCreate} from "../../types/task-types"
import {createTask} from "../../redux/task-reducer"



export const TaskCreate: React.FC = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    }
    const onFinish = (values: TTaskCreate) => {
        dispatch(createTask(values))
        form.resetFields()
    }

    return (
        <div>
            <Divider>Create new task</Divider>
            <Row>
                <Col offset={8} span={6}>
                    <Form
                        {...layout}
                        name="basic"
                        form={form}
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
                            label="Email"
                            name="email"
                            rules={[{ type: 'email' }, { required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Text"
                            name="text"
                            rules={[{ required: true, message: 'Please input your text!' }]}
                        >
                            <Input />
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