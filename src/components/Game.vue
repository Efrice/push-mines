<script setup lang="ts">
import { $message, howPlay, howToPlay, setup, shareGame, shareGif } from '~/composables'
import { usePlayerStore } from '~/store/player'
import { useMinesStore } from '~/store/mines'
import { useBoxesStore } from '~/store/boxes'
import { inflate } from '~/utils'
import type { Game } from '~/store/types'
import level1 from '~/data/level1.json'

const { steps: playerSteps, resetSteps } = usePlayerStore()
const { positions: minesPosition } = useMinesStore()
const { positions: boxesPosition } = useBoxesStore()

function getMap(game: string | Game) {
  // console.log({ game })
  return typeof game === 'string' ? inflate((game).replaceAll(' ', '+')) : useCloned(game).cloned.value
}

const gameRef = ref<Game>(level1)
function handleSelect(game: Game) {
  gameRef.value = useCloned(game).cloned.value
  setup(game)
}

if (location.search) {
  const gameRegex = /(?<=game=)([^&]+)/
  const matchGame = location.search.match(gameRegex)
  const game = matchGame === null ? '' : matchGame[0]
  if (game) {
    gameRef.value = useCloned(inflate(game)).cloned.value
    setup(getMap(game))
  }

  const stepsRegex = /(steps=)(.+)/
  const matchSteps = location.search.match(stepsRegex)
  const steps = matchSteps === null ? [] : matchSteps[2]
  if (steps?.length > 0)
    howPlay(inflate(steps).steps)
}
else {
  setup(getMap(gameRef.value))
}

const showMask = ref(false)
const passed = computed(() => {
  return minesPosition.every(mine => boxesPosition.find(position => position.top === mine.top && position.left === mine.left))
})
watch(passed, () => {
  if (passed.value)
    showMask.value = true
  else
    showMask.value = false
})

function restart() {
  setup(getMap(gameRef.value))
  resetSteps()
}

const showEdit = ref(false)
function handleEdit() {
  showEdit.value = true
}

function handleEditPlay(game: Game) {
  gameRef.value = useCloned(game).cloned.value
  setup(game)
  resetSteps()
  showEdit.value = false
}

function handleShare() {
  shareGame(gameRef.value)
  $message.success('Copied.')
}

function handlePlay() {
  howToPlay(getMap(gameRef.value))
  $message.success('Copied.')
}

function handleShareGif() {
  setup(getMap(gameRef.value))
  shareGif()
}

function handleCloseMask() {
  showMask.value = false
  restart()
}
</script>

<template>
  <div v-if="showEdit">
    <Edit @play="handleEditPlay" />
  </div>
  <div v-else>
    <h4 mb-2>
      PUSH MINES
    </h4>
    <select-level @select="handleSelect" />
    <h6 my-2>
      steps: {{ playerSteps.length }}
    </h6>
    <Map>
      <Player />
      <Mines />
      <Boxes />
    </Map>
    <div mt-4>
      <div mr-2 btn @click="restart">
        RESTART
      </div>
      <div mr-2 btn @click="handleEdit">
        EDIT MAP
      </div>
    </div>
    <div mt-4>
      <div mr-2 btn @click="handleShare">
        SHARE GAME
      </div>
    </div>
    <div
      v-show="passed && showMask"
      fixed
      bottom-0 left-0 right-0 top-0
      flex items-center justify-center
      bg-white dark:bg-black
      @click="handleCloseMask"
    >
      <div mt--40 btn @click="handlePlay">
        SHARE HOW TO PLAY
      </div>
      <div ml-8 mt--40 btn @click="handleShareGif">
        SHARE GIF SHOW PLAY
      </div>
      <Confetti :passed />
    </div>
  </div>
</template>
