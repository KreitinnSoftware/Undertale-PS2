import * as text_utils from "modules/text_utils.js"

import * as fonts from "modules/fonts.js"

import * as color_utils from "modules/color_utils.js";

let sel = 0;

let opt;

let color;

let pressing_down;

let pressing_up;

let confirm_button;

export function createInteractiveDialog(pad, x, y, options)
{
	pressing_down = (pad.justPressed(Pads.DOWN) || pad.ly > 64)
	pressing_up = (pad.justPressed(Pads.UP) || pad.ly < -64)
	confirm_button = (pad.justPressed(Pads.CROSS) || pad.justPressed(Pads.START))

	opt = options.split("\n")

	if (pressing_up && sel > 0)
	{
		sel--;
	}

	if (pressing_down && sel < opt.length - 1)
	{
		sel++;
	}

	for (let i = 0; i < opt.length; i++)
	{
		if (i == sel)
		{
			text_utils.drawText(x, y + 35 * i, fonts.dtm_mono, opt[i], 35, color_utils.yellow);
		} else {
			text_utils.drawText(x, y + 35 * i, fonts.dtm_mono, opt[i], 35, color_utils.white);
		}
	}

	if (confirm_button)
	{
		return sel;
	}
}