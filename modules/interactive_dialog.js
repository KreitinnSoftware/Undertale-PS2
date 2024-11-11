import * as text_utils from "modules/text_utils.js"
import * as fonts from "modules/fonts.js"
import * as color_utils from "modules/color_utils.js"

let sel = 0

export function createInteractiveDialog(pad, x, y, options)
{
	let pressingDown = (pad.justPressed(Pads.DOWN) || pad.ly > 64)
	let pressingUp = (pad.justPressed(Pads.UP) || pad.ly < -64)
	let confirmButton = (pad.justPressed(Pads.CROSS) || pad.justPressed(Pads.START))

	let opt = options.split("\n")

	if (pressingUp && sel > 0) {
		sel--
	}

	if (pressingDown && sel < opt.length - 1) {
		sel++
	}

	for (let i = 0; i < opt.length; i++) {
		if (i == sel) {
			text_utils.drawText(x, y + 35 * i, fonts.dtm_mono, opt[i], 35, color_utils.yellow)
		} else {
			text_utils.drawText(x, y + 35 * i, fonts.dtm_mono, opt[i], 35, color_utils.white)
		}
	}

	if (confirmButton) {
		let ret = sel

		sel = 0
		
		return ret
	}
}