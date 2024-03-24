<script setup lang="ts">
import html2canvas from 'html2canvas'
import GIF from 'gif.js'
import type { Game, Step } from '~/store/types'
import { useMapStore } from '~/store/map'
import { useMinesStore } from '~/store/mines'
import { usePlayerStore } from '~/store/player'
import { useBoxesStore } from '~/store/boxes'
import { deflate, inflate } from '~/utils/index'

const { map: mapInfo, setup: setupMap } = useMapStore()
const { position: palyerInfo, setup: setupPlayer, steps, moveUp, moveLeft, moveDown, moveRight } = usePlayerStore()
const { positions: minesInfo, setup: setupMines, positions: minesPosition } = useMinesStore()
const { positions: boxesInfo, setup: setupBoxes, positions: boxesPosition } = useBoxesStore()

const map = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]
const player = {
  left: 3,
  top: 3,
}
const mines = [
  {
    top: 3,
    left: 2,
  },
  {
    top: 3,
    left: 4,
  },
  {
    top: 2,
    left: 3,
  },
  {
    top: 4,
    left: 3,
  },
]
const boxes = [
  {
    top: 1,
    left: 3,
  },
  {
    top: 3,
    left: 5,
  },
  {
    top: 5,
    left: 3,
  },
  {
    top: 3,
    left: 1,
  },
]

function setup({ map, player, mines, boxes }: Game) {
  setupMap(map)
  setupPlayer(player)
  setupMines(mines)
  setupBoxes(boxes)
}

setup({ map, player, mines, boxes })

const route = useRoute()
const router = useRouter()

// setup(inflate(route.query.game))

interface STEP_OPERATIONS {
  [Step.up]: () => void
  [Step.left]: () => void
  [Step.down]: () => void
  [Step.right]: () => void
}

const stepOperations: STEP_OPERATIONS = {
  1: moveUp,
  2: moveLeft,
  3: moveDown,
  4: moveRight,
}
const routeSteps = route.query.steps
if (routeSteps) {
  const { steps: querySteps } = inflate(route.query.steps)
  if (querySteps.length > 0) {
    const gif = new GIF({
      workers: 2,
      quality: 10,
    })
    querySteps.forEach((step: Step, i: number) => {
      setTimeout(async () => {
        stepOperations[step]()
        const canvas: any = await createCanvas()
        gif.addFrame(canvas, { copy: true })
      }, 500 * (i + 1))
    })

    setTimeout(() => {
      gif.on('finished', (blob: Blob) => {
        window.open(URL.createObjectURL(blob))
      })
      gif.render()
    }, (querySteps.length + 1) * 500)
  }
}

watchEffect(() => {
  router.push({
    path: route.path,
    query: {
      game: deflate({ map: mapInfo, player: palyerInfo, mines: minesInfo, boxes: boxesInfo }),
      steps: deflate({ steps }),
    },
  })
})

const passed = computed(() => {
  return minesPosition.every(mine => boxesPosition.find(position => position.top === mine.top && position.left === mine.left))
})

async function createCanvas() {
  return new Promise((resolve) => {
    html2canvas(document.getElementById('map')!).then((canvas) => {
      resolve(canvas)
    })
  })
}
</script>

<template>
  <div>
    <Map>
      <Player />
      <Mines />
      <Boxes />
      <Confetti :passed />
    </Map>
  </div>
</template>
