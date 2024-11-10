import { camera } from "camera.js"
import { player, setAbs, posRound } from "player.js"
import { next_room_collisor, prev_room_collisor, collision, diagonal_collision, event_collisions } from "collision_masks.js"
import { GAME_EVENT_FLOWEY_FIRST_DIALOGUE, UP, DOWN, LEFT, RIGHT } from "modules/global_constants.js"
import * as color_utils from "modules/color_utils.js"
import * as characters from "characters/characters.js"
import * as objects from "objects/objects.js"
import * as music from "modules/music.js"

let flowey_obj = new characters.Flowey
let dummy_obj = new characters.Dummy
let faceswitch_obj = new objects.FaceSwitch

export let room = 0

export function nextRoom()
{
	if (room < ruins_rooms.length - 1) {
		room ++

		camera.reset()

		player.x = posRound(ruins_rooms[room].entrance_x)
		player.y = posRound(ruins_rooms[room].entrance_y)
	}
}

export function prevRoom()
{
	if (room > 0) {
		room --

		if (next_room_collisor[room].exit_side == UP) {
			setAbs(next_room_collisor[room].x + next_room_collisor[room].w / 2 - player.w / 2, next_room_collisor[room].y + next_room_collisor[room].h - 30)
		} else if (next_room_collisor[room].exit_side == DOWN) {
			setAbs(next_room_collisor[room].x + next_room_collisor[room].w / 2 - player.w / 2, next_room_collisor[room].y - player.h)
		} else if (next_room_collisor[room].exit_side == RIGHT) {
			setAbs(next_room_collisor[room].x - player.w, next_room_collisor[room].y)
		} else if (next_room_collisor[room].exit_side == LEFT) {
			setAbs(next_room_collisor[room].x + next_room_collisor[room].w + 2.5, next_room_collisor[room].y)
		}
	}
}

function drawRoomStuff() {
	if (room == 1) {
		flowey_obj.draw(295, 200)

		// Draw Flowey First Dialogue Hitbox
		Draw.rect(event_collisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.x + camera.x, event_collisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.y + camera.y, event_collisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.w, event_collisions.GAME_EVENT_FLOWEY_FIRST_DIALOGUE.h, color_utils.red_t)
	} else if (room == 3) {
		faceswitch_obj.draw(410, 90)
	} else if (room == 5) {
		dummy_obj.draw(435, 164)
	}

	if (room >= 2)
	{
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
	constructor(x, y, cam_x_min, cam_x_max, cam_y_min, cam_y_max, entrance_x, entrance_y, room_image_array)
	{
		this.x = x
		this.y = y
		this.cam_x_min = cam_x_min
		this.cam_x_max = cam_x_max
		this.cam_y_min = cam_y_min
		this.cam_y_max = cam_y_max
		this.entrance_x = entrance_x
		this.entrance_y = entrance_y
		this.room_image_array = room_image_array
	}

	draw()
	{
		this.room_image_array.forEach((room_image, index) => {
			let skipX = 0

			if (index > 0) {
				for (let i = 0; i < index; i++) {
					skipX += this.room_image_array[i].image.width
				}
			}

			room_image.image.draw(this.x + camera.x + skipX, this.y + camera.y)
		})

		drawRoomStuff()
	}
}

export let ruins_rooms = [
	new Room(0, -20, -700, 0, -20, 0, 290, 210, new Array(new RoomImage(1360, 490, "images/rooms/ruins/0.png"))),
	new Room(0, -375, 0, 0, 0, 260, 300, 375, new Array(new RoomImage(640, 675, "images/rooms/ruins/1.png"))),
	new Room(40, -440, 0, 0, 0, 480, 300, 375, new Array(new RoomImage(560, 890, "images/rooms/ruins/2.png"))),
	new Room(40, 0, 0, 0, 0, 0, 300, 355, new Array(new RoomImage(560, 448, "images/rooms/ruins/3.png"))),
	new Room(60, 20, -840, 0, 0, 0, 245, 360, new Array(new RoomImage(1418, 428, "images/rooms/ruins/4.png"))),
	new Room(40, 0, 0, 0, 0, 0, 80, 260, new Array(new RoomImage(572, 425, "images/rooms/ruins/5.png"))),
	new Room(60, 20, -1715, 0, 0, 0, 300, 345, new Array(new RoomImage(1134, 425, "images/rooms/ruins/6a.png"), new RoomImage(1168, 425, "images/rooms/ruins/6b.png"))),
	new Room(0, 20, -2100, 20, 0, 0, 65, 190, new Array(new RoomImage(1360, 331, "images/rooms/ruins/7a.png"), new RoomImage(1382, 331, "images/rooms/ruins/7b.png"))),
]

export function drawRoom()
{
	ruins_rooms[room].draw()
}

export function drawWalls()
{
	for (let i = 0; i < collision[room].length; i++) {
		Draw.rect(collision[room][i].x + camera.x, collision[room][i].y + camera.y, collision[room][i].w, collision[room][i].h, color_utils.white_t)
	}
	
	for (let i = 0; i < diagonal_collision[room].length; i++) {
		Draw.rect(diagonal_collision[room][i].x + camera.x, diagonal_collision[room][i].y + camera.y, diagonal_collision[room][i].w, diagonal_collision[room][i].h, color_utils.red_t)
	}

	Draw.rect(next_room_collisor[room].x + camera.x, next_room_collisor[room].y + camera.y, next_room_collisor[room].w, next_room_collisor[room].h, color_utils.red_t)
    Draw.rect(prev_room_collisor[room].x + camera.x, prev_room_collisor[room].y + camera.y, prev_room_collisor[room].w, prev_room_collisor[room].h, color_utils.red_t)
}