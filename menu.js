import { GAME_INTRO, GAME_PRE_MENU, GAME_MENU, GAME_INGAME } from "modules/global_constants.js";

import * as fonts from "modules/fonts.js";

let splash = new Image("images/splash.png");
splash.height = 448;

let cross = new Image("images/cross.png");
cross.width *= 2;
cross.height *= 2;

let square = new Image("images/square.png");
square.width *= 2;
square.height *= 2;

let timer_value = 0;

export function pre_menu_scene(pad, timer)
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
		return GAME_MENU;
	}

	Screen.flip();
}

export function menu_scene(pad, playing)
{
	pad.update();

	Screen.clear();

	if (pad.justPressed(Pads.CROSS))
	{
		Sound.pause(playing);

		return GAME_INGAME;
	}

	fonts.dtm_mono.print(160, 35, "--- Instruction ---");

	cross.draw(160, 84);

	fonts.dtm_mono.print(195, 80, "- Confirm");

	square.draw(160, 120);

	fonts.dtm_mono.print(195, 120, "- Cancel");

	Screen.flip();
}

export function menu_gc()
{
	pre_menu_scene = null;
	menu_scene = null;
	splash = null;
	cross = null;
	square = null;
	timer_value = null;

	std.gc();
}