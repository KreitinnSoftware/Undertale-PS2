import { camera } from "camera.js"
import { player, setAbs, posRound } from "player.js"
import { changeRoomCollisors, collisions, diagonalCollision, eventCollisions } from "collision_masks.js"
import { GAME_EVENT_FLOWEY_FIRST_DIALOGUE, UP, DOWN, LEFT, RIGHT, ROOM_EXIT, ROOM_ENTRANCE } from "modules/global_constants.js"
import { globalVariables } from "modules/savefile.js"
import * as color_utils from "modules/color_utils.js"
import * as characters from "characters/characters.js"
import * as objects from "objects/objects.js"
import * as music from "modules/music.js"

let floweyObj = new characters.Flowey
let dummyObj = new characters.Dummy
let faceSwitchObj = new objects.FaceSwitch
let savePointObj = new objects.SavePoint
let fakeWaterObj = new objects.FakeWater
let spikeTile = new objects.SpikeTile

export let room = 0

export function goToRoom(roomId, place, exitObjId)
{
	if (roomId >= 0 && roomId < rooms.length) {
		room = roomId

		camera.reset()

		if (place == ROOM_ENTRANCE) {
			const x = posRound(rooms[room].entranceX)
			const y = posRound(rooms[room].entranceY)

			setAbs(x, y)
		} else if (place == ROOM_EXIT) {
			const exitObj = changeRoomCollisors[room][exitObjId]

			if (exitObj.exitSide == UP) {
				setAbs(exitObj.x + exitObj.w / 2 - player.w / 2, exitObj.y + exitObj.h - 30)
			} else if (exitObj.exitSide == DOWN) {
				setAbs(exitObj.x + exitObj.w / 2 - player.w / 2, exitObj.y - player.h)
			} else if (exitObj.exitSide == RIGHT) {
				setAbs(exitObj.x - player.w - 3, exitObj.y)
			} else if (exitObj.exitSide == LEFT) {
				setAbs(exitObj.x + exitObj.w + 3, exitObj.y)
			}
		}

		color_utils.roomTransitionOverlay.fadeOut = 1	
	}
}

function drawRoomBackgrounds() {
	if (room == 4) {
		fakeWaterObj.draw(478, 110, 3)
		fakeWaterObj.draw(478, 190, 0)
		fakeWaterObj.draw(478, 230, 0)
		fakeWaterObj.draw(478, 336, 6)
		fakeWaterObj.draw(478, 376, 0)
		fakeWaterObj.draw(518, 110, 5)
		fakeWaterObj.draw(518, 190, 2)
		fakeWaterObj.draw(518, 230, 2)
		fakeWaterObj.draw(518, 336, 8)
		fakeWaterObj.draw(518, 376, 2)
		fakeWaterObj.draw(958, 110, 3)
		fakeWaterObj.draw(958, 190, 0)
		fakeWaterObj.draw(958, 230, 0)
		fakeWaterObj.draw(958, 336, 6)
		fakeWaterObj.draw(958, 376, 0)
		fakeWaterObj.draw(998, 110, 5)
		fakeWaterObj.draw(998, 190, 2)
		fakeWaterObj.draw(998, 230, 2)
		fakeWaterObj.draw(998, 336, 8)
		fakeWaterObj.draw(998, 376, 2)
	} else if (room == 6) {
		fakeWaterObj.draw(1560, 109, 3)
		fakeWaterObj.draw(1560, 189, 0)
		fakeWaterObj.draw(1560, 229, 0)
		fakeWaterObj.draw(1600, 189, 1)
		fakeWaterObj.draw(1600, 229, 1)
		fakeWaterObj.draw(1560, 334, 6)
		fakeWaterObj.draw(1600, 334, 7)
		fakeWaterObj.draw(1640, 334, 7)
		fakeWaterObj.draw(1680, 334, 7)
		fakeWaterObj.draw(1720, 334, 7)
		fakeWaterObj.draw(1760, 334, 7)
		fakeWaterObj.draw(1800, 334, 7)
		fakeWaterObj.draw(1840, 334, 7)
		fakeWaterObj.draw(1880, 334, 7)
		fakeWaterObj.draw(1920, 334, 7)
		fakeWaterObj.draw(1960, 334, 7)
		fakeWaterObj.draw(2000, 334, 7)
		fakeWaterObj.draw(2040, 334, 7)
		fakeWaterObj.draw(2080, 334, 7)
		fakeWaterObj.draw(2120, 334, 7)
		fakeWaterObj.draw(2160, 334, 7)
		fakeWaterObj.draw(2200, 334, 1)
		fakeWaterObj.draw(2200, 294, 1)
		fakeWaterObj.draw(2200, 260, 7)
		fakeWaterObj.draw(2240, 260, 8)
		fakeWaterObj.draw(2240, 334, 2)
		fakeWaterObj.draw(2240, 294, 2)
		fakeWaterObj.draw(1600, 109, 4)
		fakeWaterObj.draw(1640, 109, 4)
		fakeWaterObj.draw(1680, 109, 4)
		fakeWaterObj.draw(1720, 109, 4)
		fakeWaterObj.draw(1760, 109, 4)
		fakeWaterObj.draw(1800, 109, 4)
		fakeWaterObj.draw(1840, 109, 4)
		fakeWaterObj.draw(1880, 109, 4)
		fakeWaterObj.draw(1920, 109, 4)
		fakeWaterObj.draw(1960, 109, 4)
		fakeWaterObj.draw(2000, 109, 4)
		fakeWaterObj.draw(2040, 109, 4)
		fakeWaterObj.draw(2080, 109, 4)
		fakeWaterObj.draw(2120, 109, 4)
		fakeWaterObj.draw(2160, 109, 4)
		fakeWaterObj.draw(2200, 109, 4)
		fakeWaterObj.draw(2240, 109, 5)

		spikeTile.draw(1640, 259, player)
		spikeTile.draw(1680, 259, player)
		spikeTile.draw(1720, 259, player)
		spikeTile.draw(1760, 259, player)
		spikeTile.draw(1640, 296, player)
		spikeTile.draw(1680, 296, player)
		spikeTile.draw(1720, 296, player)
		spikeTile.draw(1760, 296, player)
		spikeTile.draw(1720, 222, player)
		spikeTile.draw(1760, 222, player)
		spikeTile.draw(1720, 185, player)
		spikeTile.draw(1760, 185, player)
		spikeTile.draw(1800, 222, player)
		spikeTile.draw(1840, 222, player)
		spikeTile.draw(1800, 185, player)
		spikeTile.draw(1840, 185, player)
		spikeTile.draw(1880, 222, player)
		spikeTile.draw(1880, 185, player)
		spikeTile.draw(1840, 259, player)
		spikeTile.draw(1880, 259, player)
		spikeTile.draw(1920, 259, player)
		spikeTile.draw(1960, 259, player)
		spikeTile.draw(1840, 296, player)
		spikeTile.draw(1880, 296, player)
		spikeTile.draw(1920, 296, player)
		spikeTile.draw(1960, 296, player)
		spikeTile.draw(2000, 259, player)
		spikeTile.draw(2000, 296, player)
		spikeTile.draw(2040, 259, player)
		spikeTile.draw(2080, 259, player)
		spikeTile.draw(2040, 296, player)
		spikeTile.draw(2080, 296, player)
		spikeTile.draw(2040, 222, player)
		spikeTile.draw(2080, 222, player)
		spikeTile.draw(2040, 185, player)
		spikeTile.draw(2080, 185, player)
		spikeTile.draw(2120, 222, player)
		spikeTile.draw(2160, 222, player)
		spikeTile.draw(2120, 185, player)
		spikeTile.draw(2160, 185, player)
	} else if (room == 9) {
		fakeWaterObj.draw(160, 139, 6)
		fakeWaterObj.draw(160, 179, 0)
		fakeWaterObj.draw(160, 219, 0)
		fakeWaterObj.draw(160, 259, 0)
		fakeWaterObj.draw(160, 299, 0)
		fakeWaterObj.draw(160, 339, 0)

		fakeWaterObj.draw(200, 139, 8)
		fakeWaterObj.draw(200, 179, 2)
		fakeWaterObj.draw(200, 219, 2)
		fakeWaterObj.draw(200, 259, 2)
		fakeWaterObj.draw(200, 299, 2)
		fakeWaterObj.draw(200, 339, 2)

		fakeWaterObj.draw(401, 139, 6)
		fakeWaterObj.draw(401, 179, 0)
		fakeWaterObj.draw(401, 219, 0)
		fakeWaterObj.draw(401, 259, 0)
		fakeWaterObj.draw(401, 299, 0)
		fakeWaterObj.draw(401, 339, 0)

		fakeWaterObj.draw(441, 139, 8)
		fakeWaterObj.draw(441, 179, 2)
		fakeWaterObj.draw(441, 219, 2)
		fakeWaterObj.draw(441, 259, 2)
		fakeWaterObj.draw(441, 299, 2)
		fakeWaterObj.draw(441, 339, 2)
	}
}

function drawRoomStuff() {
	if (room == 1) {
		floweyObj.draw(295, 467)

		if (globalVariables.debugInfo) {
			Draw.rect(eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.x + camera.x, eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.y + camera.y, eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.w, eventCollisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.h, color_utils.red_t)
		}
	} else if (room == 2){
		savePointObj.draw(297, 355)
	} else if (room == 3) {
		faceSwitchObj.draw(410, 90)
	} else if (room == 5) {
		dummyObj.draw(435, 164)
	} else if (room == 8) {
		savePointObj.draw(418, 264)
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
		drawRoomBackgrounds()

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
	new Room(0, 80, 0, 0, -261, 0, 300, 750-108, new Array(new RoomImage(640, 486, "images/rooms/ruins/1.png"))),
	new Room(40, 20, 0, 0, -480, 0, 300, 835, new Array(new RoomImage(560, 890, "images/rooms/ruins/2.png"))),
	new Room(40, 0, 0, 0, 0, 0, 300, 354, new Array(new RoomImage(560, 448, "images/rooms/ruins/3.png"))),
	new Room(60, 20, -840, 0, 0, 0, 245, 360, new Array(new RoomImage(1418, 428, "images/rooms/ruins/4.png"))),
	new Room(38, 2, 0, 0, 0, 0, 80, 260, new Array(new RoomImage(572, 425, "images/rooms/ruins/5.png"))),
	new Room(60, 20, -1715, 0, 0, 0, 300, 345, new Array(new RoomImage(1134, 425, "images/rooms/ruins/6a.png"), new RoomImage(1168, 425, "images/rooms/ruins/6b.png"))),
	new Room(0, 20, -2100, 0, 0, 0, 60, 189, new Array(new RoomImage(1360, 331, "images/rooms/ruins/7a.png"), new RoomImage(1382, 331, "images/rooms/ruins/7b.png"))),
	new Room(0, 0, 0, 0, -700, 0, 42, 192, new Array(new RoomImage(638, 818, "images/rooms/ruins/8.png"))),
	new Room(142, 6, 0, 0, 0, 0, 300, 366, new Array(new RoomImage(356, 442, "images/rooms/ruins/9.png"))),
	new Room(0, 60, 0, 0, -728, 0, 30, 189, new Array(new RoomImage(640, 1056, "images/rooms/ruins/10.png"))),
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

	if (changeRoomCollisors[room] != undefined) {
		for (let i = 0; i < changeRoomCollisors[room].length; i++) {
			Draw.rect(changeRoomCollisors[room][i].x + camera.x, changeRoomCollisors[room][i].y + camera.y, changeRoomCollisors[room][i].w, changeRoomCollisors[room][i].h, color_utils.red_t)
		}
	}
}