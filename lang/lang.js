import { gameSettings } from "modules/global_settings.js"
import { EN_US, PT_BR } from "modules/global_constants.js"
import * as br from "lang/portuguese.js"
import * as en from "lang/english.js"

let langMap = {
	[EN_US]: en,
	[PT_BR]: br
}

let textMap = {
	"introText": langMap[gameSettings.language].introText,
	"menuText": langMap[gameSettings.language].menuText
}

export function getText(num, pattern) {
	return textMap[pattern][num]
}