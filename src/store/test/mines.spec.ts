import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMapStore } from '~/store/map'
import { usePlayerStore } from '~/store/player'
import { useMinesStore } from '~/store/mines'

describe('Mines', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const { setup } = useMapStore()
    setup([
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ])

    const { setup: setupPlayer } = usePlayerStore()
    setupPlayer({
      top: 3,
      left: 3,
    })
  })

  it('should move left', () => {
    const { position, moveLeft } = usePlayerStore()
    const { positions, setup } = useMinesStore()

    setup([
      {
        top: 3,
        left: 2,
      },
    ])

    moveLeft()

    expect(position).toEqual(
      {
        top: 3,
        left: 2,
      },
    )

    expect(positions).toEqual(
      [
        {
          top: 3,
          left: 1,
        },
      ],
    )
  })

  it('should move right', () => {
    const { position, moveRight } = usePlayerStore()
    const { positions, setup } = useMinesStore()

    setup([
      {
        top: 3,
        left: 4,
      },
    ])

    moveRight()

    expect(position).toEqual(
      {
        top: 3,
        left: 4,
      },
    )

    expect(positions).toEqual(
      [
        {
          top: 3,
          left: 5,
        },
      ],
    )
  })

  it('should move up', () => {
    const { position, moveUp } = usePlayerStore()
    const { positions, setup } = useMinesStore()

    setup([
      {
        top: 2,
        left: 3,
      },
    ])

    moveUp()

    expect(position).toEqual(
      {
        top: 2,
        left: 3,
      },
    )

    expect(positions).toEqual(
      [
        {
          top: 1,
          left: 3,
        },
      ],
    )
  })

  it('should move down', () => {
    const { position, moveDown } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    setup([
      {
        top: 4,
        left: 3,
      },
    ])

    moveDown()

    expect(position).toEqual(
      {
        top: 4,
        left: 3,
      },
    )

    expect(positions).toEqual(
      [
        {
          top: 5,
          left: 3,
        },
      ],
    )
  })
})

describe('Mines should not move when next cell is grid', () => {
  const playerPosition = {
    top: 2,
    left: 2,
  }
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

    const { setup: setupPlayer } = usePlayerStore()
    setupPlayer(playerPosition)
  })

  it('should not move left', () => {
    const { position, moveLeft } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 2,
        left: 1,
      },
    ]
    setup(minesPosition)

    moveLeft()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })

  it('should not move right', () => {
    const { position, moveRight } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 2,
        left: 3,
      },
    ]
    setup(minesPosition)

    moveRight()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })

  it('should not move up', () => {
    const { position, moveUp } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 1,
        left: 2,
      },
    ]
    setup(minesPosition)

    moveUp()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })

  it('should not move down', () => {
    const { position, moveDown } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 3,
        left: 2,
      },
    ]
    setup(minesPosition)

    moveDown()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })
})

describe('Mines should not move when next cell is mine', () => {
  const playerPosition = {
    top: 3,
    left: 3,
  }
  beforeEach(() => {
    setActivePinia(createPinia())
    const { setup } = useMapStore()
    setup([
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ])

    const { setup: setupPlayer } = usePlayerStore()
    setupPlayer(playerPosition)
  })

  it('should not move left', () => {
    const { position, moveLeft } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 3,
        left: 1,
      },
      {
        top: 3,
        left: 2,
      },
    ]
    setup(minesPosition)

    moveLeft()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })

  it('should not move right', () => {
    const { position, moveRight } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 3,
        left: 4,
      },
      {
        top: 3,
        left: 5,
      },
    ]
    setup(minesPosition)

    moveRight()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })

  it('should not move up', () => {
    const { position, moveUp } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 2,
        left: 3,
      },
      {
        top: 1,
        left: 3,
      },
    ]
    setup(minesPosition)

    moveUp()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })

  it('should not move down', () => {
    const { position, moveDown } = usePlayerStore()
    const { positions, setup } = useMinesStore()
    const minesPosition = [
      {
        top: 4,
        left: 3,
      },
      {
        top: 5,
        left: 3,
      },
    ]
    setup(minesPosition)

    moveDown()

    expect(position).toEqual(playerPosition)
    expect(positions).toEqual(minesPosition)
  })
})
