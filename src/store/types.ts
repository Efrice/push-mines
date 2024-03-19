export enum CellType {
  NORMAL,
  GRID,
}

export type MapType = CellType[][]

export interface Position {
  top: number
  left: number
}
