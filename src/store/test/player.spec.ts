import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMapStore } from '~/store/map'
import { usePlayerStore } from '~/store/player'

describe('player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const { setup } = useMapStore()

    setup([
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ])
  })

  it('should move left', () => {
    const { position, setup, moveLeft } = usePlayerStore()
    setup({
      top: 2,
      left: 2,
    })

    moveLeft()

    expect(position).toEqual(
      {
        top: 2,
        left: 1,
      },
    )
  })

  it('should move right', () => {
    const { position, setup, moveRight } = usePlayerStore()
    setup({
      top: 2,
      left: 2,
    })

    moveRight()

    expect(position).toEqual(
      {
        top: 2,
        left: 3,
      },
    )
  })

  it('should move up', () => {
    const { position, setup, moveUp } = usePlayerStore()
    setup({
      top: 2,
      left: 2,
    })

    moveUp()

    expect(position).toEqual(
      {
        top: 1,
        left: 2,
      },
    )
  })

  it('should move down', () => {
    const { position, setup, moveDown } = usePlayerStore()
    setup({
      top: 2,
      left: 2,
    })

    moveDown()

    expect(position).toEqual(
      {
        top: 3,
        left: 2,
      },
    )
  })
})

describe('player should not move', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const { setup } = useMapStore()

    setup([
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ])
  })

  it('should not move left', () => {
    const { position, setup, moveLeft } = usePlayerStore()
    const playerPosition = {
      left: 1,
      top: 1,
    }

    setup(playerPosition)

    moveLeft()

    expect(position).toEqual(playerPosition)
  })

  it('should not move up', () => {
    const { position, setup, moveUp } = usePlayerStore()
    const playerPosition = {
      left: 1,
      top: 1,
    }

    setup(playerPosition)

    moveUp()

    expect(position).toEqual(playerPosition)
  })

  it('should not move right', () => {
    const { position, setup, moveRight } = usePlayerStore()
    const playerPosition = {
      left: 3,
      top: 3,
    }

    setup(playerPosition)

    moveRight()

    expect(position).toEqual(playerPosition)
  })

  it('should not move down when next cell is grid', () => {
    const { position, setup, moveDown } = usePlayerStore()
    const playerPosition = {
      left: 3,
      top: 3,
    }

    setup(playerPosition)

    moveDown()

    expect(position).toEqual(playerPosition)
  })
})
