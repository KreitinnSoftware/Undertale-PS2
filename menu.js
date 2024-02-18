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

let triangle = new Image("images/triangle.png");
triangle.width *= 2;
triangle.height *= 2;

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

fonts.dtm_mono_smaller.color = Color.new(75, 75, 75)

export function menu_scene(pad)
{
	pad.update();

	Screen.clear();

	if (pad.justPressed(Pads.CROSS))
	{
		return GAME_INGAME;
	}

	fonts.dtm_mono.print(160, 35, "--- Instruction ---");

	cross.draw(160, 80);

	fonts.dtm_mono.print(195, 80, " Confirm");

	square.draw(160, 115);

	fonts.dtm_mono.print(195, 115, " Cancel");

	triangle.draw(160, 150);

	fonts.dtm_mono.print(195, 150, " Menu(In-game)");

	fonts.dtm_mono.print(160, 210, "When HP is 0, you lose.");

	fonts.dtm_mono_smaller.print(80, 420, "UNDERTALE V1.08 (C) TOBY FOX 2015-2017, PS2 REMAKE BY PABLO.");

	Screen.flip();
}

export function menu_gc()
{
	pre_menu_scene = null;
	menu_scene = null;
	splash = null;
	cross = null;
	square = null;
	triangle = null;
	timer_value = null;

	std.gc();
}