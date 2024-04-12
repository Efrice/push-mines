<script setup lang="ts">
import { howPlay, howToPlay, setup, shareGame, shareGif } from '~/composables'
import { usePlayerStore } from '~/store/player'
import { useMinesStore } from '~/store/mines'
import { useBoxesStore } from '~/store/boxes'
import { inflate } from '~/utils'
import type { Game } from '~/store/types'
import level1 from '~/data/level1.json'

function getMap(game: string | Game) {
  console.error({ game })
  return typeof game === 'string' ? inflate((game).replaceAll(' ', '+')) : useCloned(game).cloned.value
}

const gameRef = ref<Game>(level1)
function handleSelect(game: Game) {
  gameRef.value = game
  setup(game)
}

const route = useRoute()
setup(getMap(route.query.game as string || gameRef.value))

const steps = route.query.steps ? inflate(route.query.steps).steps : []
howPlay(steps)

const { steps: playerSteps } = usePlayerStore()
const { positions: minesPosition } = useMinesStore()
const { positions: boxesPosition } = useBoxesStore()

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
  setup(getMap(route.query.game as string || gameRef.value))
}

function handleShare() {
  shareGame(location.search || gameRef.value)
}

function handlePlay() {
  howToPlay(getMap(route.query.game as string || gameRef.value))
}

function handleShareGif() {
  setup(getMap(route.query.game as string || gameRef.value))
  shareGif()
}

function handleCloseMask() {
  showMask.value = false
  restart()
}
</script>

<template>
  <div>
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
      <div btn>
        <RouterLink to="/edit">
          EDIT MAP
        </RouterLink>
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
