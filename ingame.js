import { room, nextRoom, previousRoom, drawRoom, drawWalls } from "room.js";

import { player } from "player.js";

import { next_room_collisor } from "collision_masks.js";

import { camera } from "camera.js";

import * as fonts from "modules/fonts.js";

import * as color_utils from "modules/color_utils.js";

import { GAME_EVENT_FLOWEY_FIRST_DIALOGUE } from "modules/global_constants.js"

import { checkEventCollisions } from "event_handler.js"

let timer_value = 0;

let ram = 0;

export function ingame_scene(pad, timer)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	ram = System.getMemoryStats();

	Screen.clear();

	drawRoom();

	drawWalls();

    Draw.rect(next_room_collisor[room].x + camera.x, next_room_collisor[room].y + camera.y, next_room_collisor[room].w, next_room_collisor[room].h, color_utils.red_t);

    if (player.x - camera.x < next_room_collisor[room].x + next_room_collisor[room].w &&
		player.x - camera.x + player.w > next_room_collisor[room].x &&
		player.y - camera.y + player.h > next_room_collisor[room].y &&
		player.y - camera.y + 32 < next_room_collisor[room].y + next_room_collisor[room].h
	) {
    	nextRoom();
	}

	if (pad.justPressed(Pads.CROSS))
	{
		previousRoom();
	}

    player.walk(pad);

    player.draw();

    player.ingame_menu(pad);

    //event_handler.checkEventCollisions();

	//fonts.dtm_mono.print(0, 0, "Player Abs X:" + (player.x - camera.x));
	//fonts.dtm_mono.print(0, 20, "Player Abs Y:" + (player.y - camera.y));
	//fonts.dtm_mono.print(0, 40, "Player Real X:" + player.x);
	//fonts.dtm_mono.print(0, 60, "Player Real Y:" + player.y);
	//fonts.dtm_mono.print(0, 80, "Camera X:" + camera.x);
	//fonts.dtm_mono.print(0, 100, "Camera Y:" + camera.y);
	//fonts.dtm_mono.print(0, 120, "Room Number:" + room);
	//fonts.dtm_mono.print(0, 140, "RAM:" + (ram.used / 1048576).toFixed(2) + "MB/32MB");

	Screen.flip();
}