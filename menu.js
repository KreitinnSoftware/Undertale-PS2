import { GAME_INTRO, GAME_PRE_MENU, GAME_MENU, GAME_INGAME } from "modules/global_constants.js"

import { getText } from "lang/lang.js"

import * as fonts from "modules/fonts.js"

import * as text_utils from "modules/text_utils.js"

import { createInteractiveDialog } from "modules/interactive_dialog.js"

let splash = new Image("images/splash.png")
splash.height = 448

let cross = new Image("images/cross.png")
cross.width *= 2
cross.height *= 2

let square = new Image("images/square.png")
square.width *= 2
square.height *= 2

let triangle = new Image("images/triangle.png")
triangle.width *= 2
triangle.height *= 2

let timer_value = 0

export function pre_menu_scene(pad, timer)
{
	pad.update()

	timer_value = Timer.getTime(timer)

	Screen.clear()

	splash.draw(0, 0)

	if (timer_value > 1400)
	{
		fonts.dtm_mono.print(250, 350, getText(0, "menuText"))
	}

	if (pad.justPressed(Pads.CROSS) || pad.justPressed(Pads.START))
	{
		return GAME_MENU
	}

	Screen.flip()
}

fonts.dtm_mono_smaller.color = Color.new(75, 75, 75)
fonts.dtm_mono_smaller.scale = 0.5f

export function menu_scene(pad)
{
	pad.update()

	Screen.clear()

	if (createInteractiveDialog(pad, 160, 290, getText(6, "menuText") + "\n" + getText(7, "menuText")) == 0)
	{
		return GAME_INGAME
	}


	text_utils.drawText(160, 35, fonts.dtm_mono, getText(1, "menuText"), 35)

	cross.draw(160, 80)

	text_utils.drawText(195, 80, fonts.dtm_mono, getText(2, "menuText"), 35)

	square.draw(160, 115)

	text_utils.drawText(195, 115, fonts.dtm_mono, getText(3, "menuText"), 35)

	triangle.draw(160, 150)

	text_utils.drawText(195, 150, fonts.dtm_mono, getText(4, "menuText"), 35)

	text_utils.drawText(160, 200, fonts.dtm_mono, getText(5, "menuText"), 35)

	text_utils.drawText(0, 420, fonts.dtm_mono_smaller, "UNDERTALE V1.08 (C) TOBY FOX 2015-2017, PS2 REMAKE BY PABLO, ATHENAENV BY DANIEL.", 35)

	Screen.flip()
}

export function menu_gc()
{
	pre_menu_scene = null
	menu_scene = null
	splash = null
	cross = null
	square = null
	triangle = null
	timer_value = null

	std.gc()
}