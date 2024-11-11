import { EN_US, PT_BR } from "modules/global_constants.js"
import { globalVariables } from "modules/savefile.js"
import * as br from "lang/portuguese.js"
import * as en from "lang/english.js"

const langMap = {
	[EN_US]: en,
	[PT_BR]: br
}

export function getText(num, pattern) {
	return langMap[globalVariables.language][pattern][num]
}