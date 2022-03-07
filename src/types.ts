export enum FsItemType {
    Unknown = 0,
    File = 1,
    Dir = 2
}

export interface BaseFsItem<T = number> {
    id: number | bigint
    item_type: T
    parent?: number
    users_id: number
    directory: string
    basename: string
    item_size: number
    created: number
    modified?: number
    item_exists: boolean
    user_data: any
    is_root: boolean
}

export interface FileFsItem extends BaseFsItem<FsItemType.File> {}

export interface DirFsItem extends BaseFsItem<FsItemType.Dir> {
    contents: FileFsItem[]
}

export type FsItem = FileFsItem | DirFsItem;

export interface ErrorJson {
    error: string
    message: string
}