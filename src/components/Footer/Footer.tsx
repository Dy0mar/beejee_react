import React from 'react'
import {Layout} from "antd"
import { Typography } from 'antd'

const { Text } = Typography

export const Footer: React.FC = () => {
    return (
        <Layout.Footer style={{backgroundColor: 'white', textAlign: 'center'}}>
            <Text type="secondary">Task &copy; 2021 Developed by Dy0mar</Text>
        </Layout.Footer>
    )
}