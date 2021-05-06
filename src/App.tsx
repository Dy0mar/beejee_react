import React from 'react'
import "antd/dist/antd.css"
import {Layout} from 'antd'
import store from "./redux/redux-store"
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import {Provider} from "react-redux"
import {Header} from "./components/Header/Header"
import {Content} from "antd/es/layout/layout"
import {Footer} from "./components/Footer/Footer"
import style from './App.module.css'
import {Login} from "./pages/Login/Login"
import {appUrls} from "./urls/urls"
import {Tasks} from "./pages/Tasks/Tasks"
import {TaskCreate} from "./pages/Task/Task"
import {Page404} from "./pages/StatusPages/Page404/Page404"
import {HomePage} from "./pages/HomePage/HomePage"
import {TaskEdit} from "./pages/Task/TaskEdit"


function App() {

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
                        <Route path={appUrls.index} render={() => <HomePage />} />

                        <Redirect exact from="/" to={appUrls.index} />


                        <Route path='**' render={() => <Page404 />} />
                    </Switch>
                </div>
            </Content>
            <Footer />
        </Layout>
    )
}

const MainApp = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL} >
            <Provider store={store} >
                <App />
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp
