import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from '~/store/player'

describe('Player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should move left', () => {
    const { position, setup, moveLeft } = usePlayerStore()

    setup({
      left: 1,
      top: 1,
    })

    moveLeft()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 0,
        "top": 1,
      }
    `)
  })

  it('should move right', () => {
    const { position, setup, moveRight } = usePlayerStore()

    setup({
      left: 1,
      top: 1,
    })

    moveRight()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 2,
        "top": 1,
      }
    `)
  })

  it('should move up', () => {
    const { position, setup, moveUp } = usePlayerStore()

    setup({
      left: 1,
      top: 1,
    })

    moveUp()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 1,
        "top": 0,
      }
    `)
  })

  it('should move down', () => {
    const { position, setup, moveDown } = usePlayerStore()

    setup({
      left: 1,
      top: 1,
    })

    moveDown()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 1,
        "top": 2,
      }
    `)
  })
})
