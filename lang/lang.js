import { gameSettings } from "modules/global_settings.js"
import { EN_US, PT_BR } from "modules/global_constants.js"
import * as br from "lang/portuguese.js"
import * as en from "lang/english.js"

let en_functions = {
	"introText": en.introText,
	"menuText": en.menuText
}

let br_functions = {
	"introText": br.introText,
	"menuText": br.menuText
}

export function getText(num, pattern) {
	if (gameSettings.language == EN_US) {
		return en_functions[pattern][num]
	} else if (gameSettings.language == PT_BR) {
		return br_functions[pattern][num]
	}
}