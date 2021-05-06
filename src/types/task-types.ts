
export type TTaskCreate = {
    username: string,
    email: string,
    text: string,
}

export type TTasks = {
    page: number,
    sort_field?: string,
    sort_direction?: string
}