//Undertale PS2

const screen = Screen.getMode()

import { dynamicDrawText, drawText, resetText } from "modules/text_utils.js"
import { introScene, intro_gc } from "intro.js"
import { GAME_INTRO, GAME_PRE_MENU, GAME_MENU, GAME_INGAME } from "modules/global_constants.js"
import { globalVariables } from "modules/savefile.js"
import * as music from "modules/music.js"

let timer = Timer.new()
let gameState = GAME_INTRO
let pad = Pads.get(0)

globalVariables.loadFile()

music.play(music.mus_story)

while(gameState == GAME_INTRO)
{
	if (introScene(pad, timer) == GAME_PRE_MENU) {
		gameState = GAME_PRE_MENU
	}
}

intro_gc()

import * as sfx from "modules/sfx.js"
import { preMenuScene, menuScene, menu_gc } from "menu.js"

Timer.reset(timer)

music.pause(music.mus_story)

Sound.setVolume(100)
Sound.play(sfx.intro_noise, 0)

while (gameState == GAME_PRE_MENU)
{
	if (preMenuScene(pad, timer) == GAME_MENU) {
		gameState = GAME_MENU
	}
}

music.free(music.mus_story)
music.play(music.mus_menu0, true)

while (gameState == GAME_MENU)
{
	if (menuScene(pad) == GAME_INGAME) {
		gameState = GAME_INGAME
	}
}

music.pause(music.mus_menu0)
//music.free(music.mus_menu0)
music.load(music.mus_ruins)

menu_gc()

import { ingameScene } from "ingame.js"

while (gameState == GAME_INGAME)
{
	ingameScene(pad, timer)
}
