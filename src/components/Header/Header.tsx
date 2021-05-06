import React, {useEffect, useState} from 'react'
import {Button, Layout, Menu} from "antd"
import {NavLink, useLocation} from 'react-router-dom'
import {appUrls} from "../../urls/urls"
import {useDispatch, useSelector} from "react-redux"
import {SGetUser} from "../../selectors/user-selector"
import {logout} from "../../redux/user-reducer"
const {Item} = Menu

export const Header: React.FC = () => {
    const [currentItem, setCurrentItem] = useState('')
    const location = useLocation()
    const dispatch = useDispatch()

    const user = useSelector(SGetUser)

    useEffect(() => {
        setCurrentItem(location.pathname)
    }, [location.pathname])

    const Logout = () => {
        dispatch(logout())
    }

    return (
        <Layout.Header>
            <Menu theme="dark" mode="horizontal" selectedKeys={[currentItem]} style={{paddingLeft: '50px'}}>
                <Item key={appUrls.tasks}> <NavLink to={appUrls.tasks}>Show Tasks</NavLink></Item>
                <Item key={appUrls.task_create}> <NavLink to={appUrls.task_create}>Create new task</NavLink></Item>
                {
                    user?.token
                        ? <Item> <Button key='logout' onClick={Logout} type="link">Logout</Button></Item>
                        : <Item key={appUrls.login}><NavLink to={appUrls.login}>Login</NavLink> </Item>
                }

            </Menu>
        </Layout.Header>
    )
}