import {FilterValue, SorterResult} from "antd/lib/table/interface"

export type TFiltersFromTableAntd = Record<string, FilterValue | null>
export type TSorterFromTableAntd = SorterResult<any> | SorterResult<any>[]

export type NullOrString = string | null
export type NullOrNumber = null | number

