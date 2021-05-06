import React, {useEffect} from 'react'
import "antd/dist/antd.css"
import {Layout} from 'antd'
import store from "./redux/redux-store"
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import {Provider, useDispatch} from "react-redux"
import {Header} from "./components/Header/Header"
import {Content} from "antd/es/layout/layout"
import {Footer} from "./components/Footer/Footer"
import style from './App.module.css'
import {Login} from "./pages/Login/Login"
import {appUrls} from "./urls/urls"
import {Tasks} from "./pages/Tasks/Tasks"
import {TaskCreate} from "./pages/Task/Task"
import {Page404} from "./pages/StatusPages/Page404/Page404"
import {TaskEdit} from "./pages/Task/TaskEdit"
import {initializeApp} from "./redux/app-reducer"
import {compose} from "redux"
import {showMessage} from "./hoc/showMessage"


function App() {

    const dispatch = useDispatch()

    const initApp = () => {
        dispatch(initializeApp())
    }
    useEffect(initApp, [dispatch])

    return (
        <Layout className="layout">
            <Header />
            <Content className={style.appWrapperContent}>
                <div className={style.appContent}>
                    <Switch>
                        <Route path={appUrls.login}  render={() => <Login />}/>
                        <Route path={appUrls.tasks} render={() => <Tasks />}/>
                        <Route path={appUrls.task_create} render={() => <TaskCreate />}/>
                        <Route path={appUrls.task_edit+':taskId(\\d+)'} render={() => <TaskEdit />}/>

                        <Redirect exact from="/" to={appUrls.tasks} />


                        <Route path='**' render={() => <Page404 />} />
                    </Switch>
                </div>
            </Content>
            <Footer />
        </Layout>
    )
}

const AppContainer = compose(showMessage)(App)

const MainApp = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL} >
            <Provider store={store} >
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp
