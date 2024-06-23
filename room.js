import { camera } from "camera.js"

import { player, setAbs, posRound } from "player.js"

import { next_room_collisor, prev_room_collisor, collision, diagonal_collision, event_collisions } from "collision_masks.js"

import * as color_utils from "modules/color_utils.js"

import * as characters from "characters/characters.js"

import * as objects from "objects/objects.js"

import { GAME_EVENT_FLOWEY_FIRST_DIALOGUE, UP, DOWN, LEFT, RIGHT } from "modules/global_constants.js"

import * as music from "modules/music.js"

let flowey_obj = new characters.flowey

let dummy_obj = new characters.dummy

let faceswitch_obj = new objects.faceswitch

export let room = 0

export function nextRoom()
{
	if (room < ruins_rooms.length - 1)
	{
		room ++

		camera.reset()

		player.x = posRound(ruins_rooms[room].entrance_x)
		player.y = posRound(ruins_rooms[room].entrance_y)
	}
}

export function prevRoom()
{
	if (room > 0)
	{
		room --

		if (next_room_collisor[room].exit_side == UP)
		{
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

function roomDrawStuff() {
	if (room == 1)
	{
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
		if (music.playing != music.mus_ruins)
		{
			music.play(music.mus_ruins, true)
		}
	} else {
		if (music.playing)
		{
			music.pause(music.mus_ruins)
		}	

		if (music.paused == music.mus_ruins)
		{
			Sound.restart()
		}
	}
}

function roomDraw(x, y, w, h, image_a, w2, image_b, chunks)
{
	image_a.width = w
	image_a.height = h
	image_a.draw(x + camera.x, y + camera.y)

	if (chunks == 2)
	{
		image_b.width = w2
		image_b.height = h
		image_b.draw(x + w + camera.x, y + camera.y)
	}

	roomDrawStuff()
}

export let ruins_rooms = [
					{x: 0, y: -20, w: 1360, h: 490, camera_y_max: 20, camera_y_min: -20, camera_x_max: 0, camera_x_min: -700, entrance_x: 290, entrance_y: 210, image_a: new Image("images/rooms/ruins/0.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks)}},
					{x: 0, y: -375, w: 640, h: 675, camera_y_max: 260, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 300, entrance_y: 375, image_a: new Image("images/rooms/ruins/1.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 40, y: -440, w: 560, h: 890, camera_y_max: 480, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 300, entrance_y: 375, image_a: new Image("images/rooms/ruins/2.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 40, y: 0, w: 560, h: 448, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 300, entrance_y: 355, image_a: new Image("images/rooms/ruins/3.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 60, y: 20, w: 1418, h: 428, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: -840, entrance_x: 245, entrance_y: 360, image_a: new Image("images/rooms/ruins/4.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 40, y: 0, w: 572, h: 425, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 80, entrance_y: 260, image_a: new Image("images/rooms/ruins/5.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 60, y: 20, w: 1134, h: 425, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: -1715, entrance_x: 300, entrance_y: 345, image_a: new Image("images/rooms/ruins/6a.png"), w2: 1168, image_b: new Image("images/rooms/ruins/6b.png"), chunks: 2, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, this.w2, this.image_b, this.chunks) }},
					{x: 0, y: 20, w: 1360, h: 331, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: -2100, entrance_x: 65, entrance_y: 190, image_a: new Image("images/rooms/ruins/7a.png"), w2: 1382, image_b: new Image("images/rooms/ruins/7b.png"), chunks: 2, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, this.w2, this.image_b, this.chunks) }},
					]

export function drawRoom()
{
	ruins_rooms[room].draw()
}

export function drawWalls()
{
	for (let i = 0; i < collision[room].length; i++)
	{
		Draw.rect(collision[room][i].x + camera.x, collision[room][i].y + camera.y, collision[room][i].w, collision[room][i].h, color_utils.white_t)
	}
	
	for (let i = 0; i < diagonal_collision[room].length; i++)
	{
		Draw.rect(diagonal_collision[room][i].x + camera.x, diagonal_collision[room][i].y + camera.y, diagonal_collision[room][i].w, diagonal_collision[room][i].h, color_utils.red_t)
	}

	Draw.rect(next_room_collisor[room].x + camera.x, next_room_collisor[room].y + camera.y, next_room_collisor[room].w, next_room_collisor[room].h, color_utils.red_t)

    Draw.rect(prev_room_collisor[room].x + camera.x, prev_room_collisor[room].y + camera.y, prev_room_collisor[room].w, prev_room_collisor[room].h, color_utils.red_t)
}