import { room, nextRoom, prevRoom, drawRoom, drawWalls } from "room.js"
import { player } from "player.js"
import { camera } from "camera.js"
import { GAME_EVENT_FLOWEY_FIRST_DIALOGUE } from "modules/global_constants.js"
import { checkEventCollisions } from "event_handler.js"
import * as fonts from "modules/fonts.js"
import * as color_utils from "modules/color_utils.js"

let timerValue = 0
let ram = 0

export function ingameScene(pad, timer)
{
	pad.update()

	timerValue = Timer.getTime(timer)

	ram = System.getMemoryStats()

	Screen.clear()

	drawRoom()
	drawWalls()

	player.walk(pad)
	player.draw()
	player.ingame_menu(pad)

	color_utils.roomTransitionOverlay.draw()
	color_utils.fadeOut(color_utils.roomTransitionOverlay)
	color_utils.fadeIn(color_utils.roomTransitionOverlay)

	checkEventCollisions()

	fonts.dtm_mono.print(0, 0, "Player Abs X:" + (player.x - camera.x))
	fonts.dtm_mono.print(0, 20, "Player Abs Y:" + (player.y - camera.y))
	fonts.dtm_mono.print(0, 40, "Player Real X:" + player.x)
	fonts.dtm_mono.print(0, 60, "Player Real Y:" + player.y)
	fonts.dtm_mono.print(0, 80, "Camera X:" + camera.x)
	fonts.dtm_mono.print(0, 100, "Camera Y:" + camera.y)
	fonts.dtm_mono.print(0, 120, "Room Number:" + room)
	fonts.dtm_mono.print(0, 140, "RAM:" + (ram.used / 1048576).toFixed(2) + "MB/32MB")

	Screen.flip()
}