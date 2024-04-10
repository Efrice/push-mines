import html2canvas from 'html2canvas'
import GIF from 'gif.js'
import { usePlayerStore } from '~/store/player'
import { deflate } from '~/utils'
import type { Game, Step } from '~/store/types'

const { steps, pushStep, moveUp, moveLeft, moveDown, moveRight } = usePlayerStore()

const source = ref('')
const { copy } = useClipboard({ source })
export function shareGame(game: string | Game) {
  if (typeof game === 'string')
    copy(`${location.origin}${game}`)
  else
    copy(`${location.origin}?game=${deflate(game)}`)
}

export function howToPlay(game: Game) {
  copy(`${location.origin}?game=${deflate(game)}&steps=${deflate({ steps })}`)
}

interface STEP_OPERATIONS {
  [Step.up]: () => void
  [Step.left]: () => void
  [Step.down]: () => void
  [Step.right]: () => void
}

export const stepOperations: STEP_OPERATIONS = {
  1: moveUp,
  2: moveLeft,
  3: moveDown,
  4: moveRight,
}

export function shareGif() {
  if (steps.length > 0) {
    const gif = new GIF({
      workers: 2,
      quality: 10,
    })

    steps.push(1)
    steps.forEach((step: Step, i: number) => {
      setTimeout(async () => {
        stepOperations[step]()
        pushStep(step)
        const canvas: any = await createCanvas()
        gif.addFrame(canvas, { copy: true })
      }, 500 * (i + 2))
    })

    setTimeout(() => {
      gif.on('finished', (blob: Blob) => {
        const url = URL.createObjectURL(blob)
        window.open(url)
        downloadGif(url)
      })
      gif.render()
    }, (steps.length + 2) * 500)
  }
}

async function createCanvas() {
  return new Promise((resolve) => {
    html2canvas(document.getElementById('map')!).then((canvas) => {
      resolve(canvas)
    })
  })
}

function downloadGif(url: string) {
  const formatted = useDateFormat(useNow(), 'HH_mm_ss')
  const a = document.createElement('a')
  a.download = `push-mines-${formatted.value}.gif`
  a.style.display = 'none'
  a.href = url
  document.body.appendChild(a)
  a.dispatchEvent(new MouseEvent('click'))
  document.body.removeChild(a)
}
