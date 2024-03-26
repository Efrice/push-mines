export enum CellType {
  NORMAL,
  WALL,
}

export interface ElementType {
  type: CellType | 'MINE' | 'PLAYER' | 'BOX'
  execute: (position: Position) => void
}

export type MapType = CellType[][]

export interface Position {
  top: number
  left: number
}

export enum Step {
  up = 1,
  left,
  down,
  right,
}

export interface Game {
  map: MapType
  player: Position
  mines: Position[]
  boxes: Position[]
}
