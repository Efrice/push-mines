export enum CellType {
  NORMAL,
  WALL,
}

export type ElementType = CellType | 'MINES' | 'PLAYER' | 'BOX'
export interface ElementTypes {
  type: ElementType
  execute: (position: Position, type?: ElementType) => void
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
