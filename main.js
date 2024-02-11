//Undertale PS2

const screen = Screen.getMode();

let ram;

let splash = new Image("images/splash.png");

splash.height = 448;

let intro_noise = Sound.load("sfx/mus_intronoise.adp");

import { dynamicDrawText, drawText, resetText } from "modules/text_utils.js";

import { intro_scene } from "intro.js"

import { mus_story, mus_menu0 } from "modules/music.js"

import { GAME_INTRO, GAME_PRE_MENU, GAME_MENU, GAME_INGAME } from "modules/global_constants.js"

let timer = Timer.new();

let gamestate = GAME_INTRO;

let fadeout = 0;
let fadein = 0;

let skip = 0;

let pad = Pads.get(0);

let timer_value;

let playing = mus_story;

Sound.play(playing);

while(gamestate == GAME_INTRO)
{
	if (intro_scene(pad, ram, timer, playing) == GAME_PRE_MENU)
	{
		gamestate = GAME_PRE_MENU;
	}
}

let cross = new Image("images/cross.png");
cross.width *= 2;
cross.height *= 2;

let square = new Image("images/square.png");
square.width *= 2;
square.height *= 2;

Timer.reset(timer);

Sound.setVolume(100);

Sound.play(intro_noise, 0);

import * as fonts from "modules/fonts.js"

import * as color_utils from "modules/color_utils.js";

while (gamestate == GAME_PRE_MENU)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	Screen.clear();

	splash.draw(0, 0);

	if (timer_value > 1400)
	{
		fonts.dtm_mono.print(250, 350, "[PRESS X]")
	}

	if (pad.justPressed(Pads.CROSS))
	{
		gamestate = GAME_MENU;
	}

	//fonts.dtm_mono.print(0, 80, "RAM:" + ram.used);

	Screen.flip();
}

Sound.play(mus_menu0);

while (gamestate == GAME_MENU)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	Screen.clear();

	if (pad.justPressed(Pads.CROSS))
	{
		Sound.pause(mus_menu0);
		gamestate = GAME_INGAME;
	}

	fonts.dtm_mono.print(160, 35, "--- Instruction ---");

	cross.draw(160, 84);

	fonts.dtm_mono.print(195, 80, "- Confirm");

	square.draw(160, 120);

	fonts.dtm_mono.print(195, 120, "- Cancel");

	//text_utils.dtm_mono.print(0, 100, "RAM:" + ram.used);

	Screen.flip();
}

import { room, nextRoom, previousRoom, drawRoom, drawWalls } from "room.js";

import { player } from "player.js";

import { next_room_collisor } from "collision_masks.js";

import { camera } from "camera.js";

while (gamestate == GAME_INGAME)
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

	fonts.dtm_mono.print(0, 0, "Player Abs X:" + (player.x - camera.x));
	fonts.dtm_mono.print(0, 20, "Player Abs Y:" + (player.y - camera.y));
	fonts.dtm_mono.print(0, 40, "Player Real X:" + player.x);
	fonts.dtm_mono.print(0, 60, "Player Real Y:" + player.y);
	fonts.dtm_mono.print(0, 80, "Camera X:" + camera.x);
	fonts.dtm_mono.print(0, 100, "Camera Y:" + camera.y);

	Screen.flip();
}
