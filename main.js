//Undertale PS2

const screen = Screen.getMode();

import { dynamicDrawText, drawText, resetText } from "modules/text_utils.js";

import { intro_scene, intro_gc } from "intro.js"

import * as music from "modules/music.js"

import { GAME_INTRO, GAME_PRE_MENU, GAME_MENU, GAME_INGAME } from "modules/global_constants.js"

import { saveMan } from "modules/savefile.js"

let timer = Timer.new();

let gamestate = GAME_INTRO;

let pad = Pads.get(0);

saveMan.loadFile();

music.play(music.mus_story);

while(gamestate == GAME_INTRO)
{
	if (intro_scene(pad, timer) == GAME_PRE_MENU)
	{
		gamestate = GAME_PRE_MENU;
	}
}

intro_gc();

import { intro_noise } from "modules/sfx.js"

import { pre_menu_scene, menu_scene, menu_gc } from "menu.js"

Timer.reset(timer);

music.pause(music.mus_story);

Sound.setVolume(100);

Sound.play(intro_noise, 0);

while (gamestate == GAME_PRE_MENU)
{
	if (pre_menu_scene(pad, timer) == GAME_MENU)
	{
		gamestate = GAME_MENU
	}
}

music.free(music.mus_story);

music.play(music.mus_menu0, true)

while (gamestate == GAME_MENU)
{
	if (menu_scene(pad) == GAME_INGAME)
	{
		gamestate = GAME_INGAME
	}
}

music.pause(music.mus_menu0)

//music.free(music.mus_menu0)

music.load(music.mus_ruins)

menu_gc();

import { ingame_scene } from "ingame.js";

while (gamestate == GAME_INGAME)
{
	ingame_scene(pad, timer);
}
