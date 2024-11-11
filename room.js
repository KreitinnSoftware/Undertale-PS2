import { camera } from "camera.js"
import { player, setAbs, posRound } from "player.js"
import { nextRoomCollisor, prevRoomCollisor, collisions, diagonalCollision, eventCollisions } from "collision_masks.js"
import { GAME_EVENT_FLOWEY_FIRST_DIALOGUE, UP, DOWN, LEFT, RIGHT } from "modules/global_constants.js"
import { globalVariables } from "modules/savefile.js"
import * as color_utils from "modules/color_utils.js"
import * as characters from "characters/characters.js"
import * as objects from "objects/objects.js"
import * as music from "modules/music.js"

let floweyObj = new characters.Flowey
let dummyObj = new characters.Dummy
let faceSwitchObj = new objects.FaceSwitch

export let room = 0

export function nextRoom()
{
	if (room < rooms.length - 1) {
		room++

		camera.reset()

		player.x = posRound(rooms[room].entranceX)
		player.y = posRound(rooms[room].entranceY)

		color_utils.roomTransitionOverlay.fadeOut = 1				
	}
}

export function prevRoom()
{
	if (room > 0) {
		room--

		if (nextRoomCollisor[room].exit_side == UP) {
			setAbs(nextRoomCollisor[room].x + nextRoomCollisor[room].w / 2 - player.w / 2, nextRoomCollisor[room].y + nextRoomCollisor[room].h - 30)
		} else if (nextRoomCollisor[room].exit_side == DOWN) {
			setAbs(nextRoomCollisor[room].x + nextRoomCollisor[room].w / 2 - player.w / 2, nextRoomCollisor[room].y - player.h)
		} else if (nextRoomCollisor[room].exit_side == RIGHT) {
			setAbs(nextRoomCollisor[room].x - player.w - 3, nextRoomCollisor[room].y)
		} else if (nextRoomCollisor[room].exit_side == LEFT) {
			setAbs(nextRoomCollisor[room].x + nextRoomCollisor[room].w + 3, nextRoomCollisor[room].y)
		}

		color_utils.roomTransitionOverlay.fadeOut = 1	
	}
}

function drawRoomStuff() {
	if (room == 1) {
		floweyObj.draw(295, 200)

		if (globalVariables.debugInfo) {
			Draw.rect(eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.x + camera.x, eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.y + camera.y, eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.w, eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.h, color_utils.red_t)
		}
	} else if (room == 3) {
		faceSwitchObj.draw(410, 90)
	} else if (room == 5) {
		dummyObj.draw(435, 164)
	}

	if (room >= 2) {
		if (music.playing != music.mus_ruins) {
			music.play(music.mus_ruins, true)
		}
	} else {
		if (music.playing) {
			music.pause(music.mus_ruins)
		}	

		if (music.paused == music.mus_ruins) {
			Sound.restart()
		}
	}
}

export class RoomImage
{
	constructor(w, h, image)
	{
		this.image = new Image(image)
		this.image.width = w
		this.image.height = h
	}
}

export class Room
{
	constructor(x, y, cam_x_min, cam_x_max, cam_y_min, cam_y_max, entranceX, entranceY, roomImageArray)
	{
		this.x = x
		this.y = y
		this.cam_x_min = cam_x_min
		this.cam_x_max = cam_x_max
		this.cam_y_min = cam_y_min
		this.cam_y_max = cam_y_max
		this.entranceX = entranceX
		this.entranceY = entranceY
		this.roomImageArray = roomImageArray
	}

	draw()
	{
		for (let index = 0; index < this.roomImageArray.length; index++) {
			let skipX = 0

			if (index > 0) {
				for (let i = 0; i < index; i++) {
					skipX += this.roomImageArray[i].image.width
				}
			}

			this.roomImageArray[index].image.draw(this.x + camera.x + skipX, this.y + camera.y)
		}

		drawRoomStuff()
	}
}

export const rooms = [
	new Room(0, -20, -700, 0, -20, 0, 300, 210, new Array(new RoomImage(1360, 490, "images/rooms/ruins/0.png"))),
	new Room(0, -375, 0, 0, 0, 260, 300, 375, new Array(new RoomImage(640, 675, "images/rooms/ruins/1.png"))),
	new Room(40, -440, 0, 0, 0, 480, 300, 375, new Array(new RoomImage(560, 890, "images/rooms/ruins/2.png"))),
	new Room(40, 0, 0, 0, 0, 0, 300, 355, new Array(new RoomImage(560, 448, "images/rooms/ruins/3.png"))),
	new Room(60, 20, -840, 0, 0, 0, 245, 360, new Array(new RoomImage(1418, 428, "images/rooms/ruins/4.png"))),
	new Room(38, 2, 0, 0, 0, 0, 80, 260, new Array(new RoomImage(572, 425, "images/rooms/ruins/5.png"))),
	new Room(60, 20, -1715, 0, 0, 0, 300, 345, new Array(new RoomImage(1134, 425, "images/rooms/ruins/6a.png"), new RoomImage(1168, 425, "images/rooms/ruins/6b.png"))),
	new Room(0, 20, -2100, 20, 0, 0, 65, 190, new Array(new RoomImage(1360, 331, "images/rooms/ruins/7a.png"), new RoomImage(1382, 331, "images/rooms/ruins/7b.png"))),
	new Room(0, 0, 0, 0, -700, 0, 42, 192, new Array(new RoomImage(638, 818, "images/rooms/ruins/8.png"))),
]

export function drawRoom()
{
	rooms[room].draw()
}

export function drawWalls()
{
	if (collisions[room] != undefined) {
		for (let i = 0; i < collisions[room].length; i++) {
			Draw.rect(collisions[room][i].x + camera.x, collisions[room][i].y + camera.y, collisions[room][i].w, collisions[room][i].h, color_utils.white_t)
		}
	}
	
	if (diagonalCollision[room] != undefined) {
		for (let i = 0; i < diagonalCollision[room].length; i++) {
			Draw.rect(diagonalCollision[room][i].x + camera.x, diagonalCollision[room][i].y + camera.y, diagonalCollision[room][i].w, diagonalCollision[room][i].h, color_utils.red_t)
		}
	}

	if (nextRoomCollisor[room] != undefined) {
		Draw.rect(nextRoomCollisor[room].x + camera.x, nextRoomCollisor[room].y + camera.y, nextRoomCollisor[room].w, nextRoomCollisor[room].h, color_utils.red_t)
	}
	if (prevRoomCollisor[room] != undefined) {
		Draw.rect(prevRoomCollisor[room].x + camera.x, prevRoomCollisor[room].y + camera.y, prevRoomCollisor[room].w, prevRoomCollisor[room].h, color_utils.red_t)
	}
}