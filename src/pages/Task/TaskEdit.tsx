import React from 'react'
import {Button, Col, Divider, Form, Input, message, Row, Select} from "antd"

import {useDispatch, useSelector} from "react-redux"
import {TTaskEdit} from "../../types/task-types"
import {editTask} from "../../redux/task-reducer"
import {SGetTaskById} from "../../selectors/task-selector"
import { useParams } from 'react-router-dom'
import {TAppState} from "../../redux/redux-store"
import {taskStatusDisplay} from "../../utils/utils"
import {SGetUserToken} from "../../selectors/user-selector"
import {Message} from "../../components/Common/Message/Message"

const { Option } = Select


export const TaskEdit: React.FC = () => {
    const dispatch = useDispatch()
    const token = useSelector(SGetUserToken)

    const {taskId} = useParams<{ taskId: string }>()
    const task = useSelector((state: TAppState) => SGetTaskById(state, parseInt(taskId)))

    const [form] = Form.useForm()

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    }
    const onFinish = (values: TTaskEdit) => {
        dispatch(editTask(parseInt(taskId), values))
        message.success('Success')
    }

    if (!token)
        return <Message message='You are not authorized' />

    return (
        <div>
            <Divider>Edit task</Divider>
            <Row>
                <Col offset={6} span={8}>
                    <Form
                        {...layout}
                        name="basic"
                        form={form}
                        onFinish={onFinish}
                    >

                        <Form.Item
                            label="Text"
                            name="text"
                            rules={[{ required: true, message: 'Please input your text!' }]}
                            initialValue={task?.text}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please input correct status!' }]}
                            initialValue={task?.status}
                        >
                            <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                            >
                                {[0,1,10,11].map( (item, index) => <Option key={index} value={item}>{taskStatusDisplay(item)}</Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Token"
                            name="token"
                            hidden={true}
                            rules={[{ required: true, message: 'Please authorize again!' }]}
                            initialValue={token}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}