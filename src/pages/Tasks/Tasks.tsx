import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {getTaskList, TStatus, TTask} from "../../redux/task-reducer"
import {Col, Divider, Row, Table, TablePaginationConfig} from "antd"
import {appUrls} from "../../urls/urls"
import {NavLink} from "react-router-dom"
import {SGetTotalTaskCount, STasks} from "../../selectors/task-selector"
import {SIsLoading} from "../../selectors/app-selector"
import {
    capitalizeFirstLetter, makeShortAntdSortOrderName,
    taskStatusDisplay
} from "../../utils/utils"
import {TFiltersFromTableAntd, TSorterFromTableAntd} from "../../types/g-types"
import {TTasks} from "../../types/task-types"


export const Tasks: React.FC = () => {
    const [config, setConfig] = useState({})
    const dispatch = useDispatch()

    // Data
    const isLoading = useSelector(SIsLoading)

    const total_task_count = useSelector(SGetTotalTaskCount)
    const tasks = useSelector(STasks)

    // Effects

    // Load tasks
    const loadTasks = () => {
        dispatch(getTaskList())
    }

    useEffect(loadTasks, [dispatch])


    // Set config for Task table
    useEffect(() => {
        const pageSize = 3
        const total = total_task_count ? total_task_count : 0
        const getColumn = (field: string) => ({title: capitalizeFirstLetter(field), dataIndex: field, key: field})

        setConfig({
            bordered: true,
            pagination: {
                pageSizeOptions: [],
                total: total,
                defaultPageSize: pageSize,
                pageSize: pageSize,
                position: total >= pageSize ? 'bottom' : 'none'
            },
            loading: isLoading,
            dataSource: isLoading ? [] : tasks,
            rowKey: (row: TTask) => row.id,

            columns: [
                {...getColumn('id'), sorter: true},
                {...getColumn('username'), sorter: true},
                {...getColumn('email'), sorter: true},
                {...getColumn('text')},
                {
                    ...getColumn('status'),
                    sorter: true,
                    render: (row: TStatus) => taskStatusDisplay(row)
                },
            ]
        })

    }, [total_task_count, isLoading, tasks])

    const handleTableChange = (pagination: TablePaginationConfig, filter: TFiltersFromTableAntd, sorter: TSorterFromTableAntd ) => {
        const params: TTasks = {
            page: pagination.current ? pagination.current : 1
        }

        // if remove sort then order will be undefined
        if (!Array.isArray(sorter) && sorter.order !== undefined && sorter.field !== undefined){
            const sort_field = sorter.field ? sorter.field.toString() : null
            if (sort_field)
                params.sort_field = sort_field

            const sort_direction = makeShortAntdSortOrderName(sorter.order)
            if (sort_direction)
                params.sort_direction = sort_direction
        }

        dispatch(getTaskList(params))
    }

    return (
        <div>
            <Divider>Tasks here / <NavLink to={appUrls.task_create} >Create new task</NavLink></Divider>
            <Row>
                <Col span={24}>
                    <Table {...config} onChange={handleTableChange} />
                </Col>
            </Row>
        </div>

    )
}