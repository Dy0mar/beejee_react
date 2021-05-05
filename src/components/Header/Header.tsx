import React, {useEffect, useState} from 'react'
import {Layout, Menu} from "antd"
import {NavLink, useLocation} from 'react-router-dom'
import {appUrls, appUrlsT} from "../../urls/urls";
const {Item} = Menu

export const Header: React.FC = () => {
    const [currentItem, setCurrentItem] = useState('')
    const location = useLocation()

    useEffect(() => {
        setCurrentItem(location.pathname)
    }, [location.pathname])


    return (
        <Layout.Header>
            <Menu theme="dark" mode="horizontal" selectedKeys={[currentItem]} style={{paddingLeft: '50px'}}>
                <Item key={appUrls.tasks}> <NavLink to={appUrls.tasks}>Show Tasks</NavLink></Item>
                <Item key={appUrls.task_create}> <NavLink to={appUrls.task_create}>Create new task</NavLink></Item>

                <Item key={appUrls.login}><NavLink to={appUrls.login}>Login</NavLink> </Item>
            </Menu>
        </Layout.Header>
    )
}