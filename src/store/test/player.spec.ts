import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePlayerStore } from '~/store/player'

describe('Player', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should move left', () => {
    const { position, moveLeft } = usePlayerStore()

    moveLeft()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 1,
        "top": 2,
      }
    `)
  })

  it('should move right', () => {
    const { position, moveRight } = usePlayerStore()

    moveRight()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 3,
        "top": 2,
      }
    `)
  })

  it('should move up', () => {
    const { position, moveUp } = usePlayerStore()

    moveUp()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 2,
        "top": 1,
      }
    `)
  })

  it('should move down', () => {
    const { position, moveDown } = usePlayerStore()

    moveDown()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 2,
        "top": 3,
      }
    `)
  })

  it('should not move left', () => {
    const { position, setup, moveLeft } = usePlayerStore()

    setup({
      left: 1,
      top: 1,
    })

    moveLeft()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 1,
        "top": 1,
      }
    `)
  })

  it('should not move up', () => {
    const { position, setup, moveUp } = usePlayerStore()

    setup({
      left: 1,
      top: 1,
    })

    moveUp()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 1,
        "top": 1,
      }
    `)
  })

  it('should not move right', () => {
    const { position, setup, moveRight } = usePlayerStore()

    setup({
      left: 3,
      top: 3,
    })

    moveRight()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 3,
        "top": 3,
      }
    `)
  })

  it('should not move down', () => {
    const { position, setup, moveDown } = usePlayerStore()

    setup({
      left: 3,
      top: 3,
    })

    moveDown()

    expect(position).toMatchInlineSnapshot(`
      {
        "left": 3,
        "top": 3,
      }
    `)
  })
})
