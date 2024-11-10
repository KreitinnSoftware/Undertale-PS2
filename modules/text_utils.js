import * as color_utils from "modules/color_utils.js"

let pos = 0
let dialogProcessedText = ""
let processedText = ""
let speechTimer = Timer.new()

export function resetText()
{
	pos = 0
	dialogProcessedText = ""
}

export function drawText(posX, posY, font, text, spacing, color)
{
	processedText = text.split("\n")

	if (color == null) {
		font.color = color_utils.white
	} else {
		font.color = color
	}

	for (let i = 0; i < processedText.length; i++) {
		font.print(posX, posY + spacing * i, processedText[i])
	}
}

export function dynamicDrawText(posX, posY, delay, speech, font, text)
{
	if (pos != text.length) {
		let speechTimerValue = Timer.getTime(speechTimer)

		if (speechTimerValue > delay) {
			dialogProcessedText += text[pos]

			if (text[pos] != " ") {
				Sound.play(speech, Math.floor(Math.random() * 48))
			}

			pos++

			Timer.reset(speechTimer)
		}
	}

	drawText(posX, posY, font, dialogProcessedText, 35, color_utils.white)
}