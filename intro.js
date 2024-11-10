import { GAME_INTRO, GAME_PRE_MENU, GAME_MENU, GAME_INGAME, EN_US, PT_BR } from "modules/global_constants.js"
import { getText } from "lang/lang.js"
import * as color_utils from "modules/color_utils.js"
import * as text_utils from "modules/text_utils.js"
import * as fonts from "modules/fonts.js"
import * as sfx from "modules/sfx.js"
import * as music from "modules/music.js"

let ram = 0

class IntroBackground
{
	w = 400
	h = 198
	x = 120
	y = 60
	last_img_h = 637.2
	last_img_y = -380
	opacity = 128

	imgAvailable = [
		new Image("images/intro/1.png", RAM),
		new Image("images/intro/2.png", RAM),
		new Image("images/intro/3.png", RAM),
		new Image("images/intro/4.png", RAM),
		new Image("images/intro/black.png", RAM),
		new Image("images/intro/5.png", RAM),
		new Image("images/intro/6.png", RAM),
		new Image("images/intro/7.png", RAM),
		new Image("images/intro/8.png", RAM),
		new Image("images/intro/9.png", RAM),
		new Image("images/intro/10.png", RAM)
	]

	imgSelected = 0

	draw()
	{
		this.imgAvailable[this.imgSelected].color = Color.new(this.opacity, this.opacity, this.opacity)
		this.imgAvailable[this.imgSelected].width = this.w

		if (this.imgSelected == 10) {
			this.imgAvailable[this.imgSelected].height = 637.2
			this.imgAvailable[this.imgSelected].draw(this.x, this.last_img_y)
		} else {
			this.imgAvailable[this.imgSelected].height = this.h
			this.imgAvailable[this.imgSelected].draw(this.x, this.y)
		}

		Draw.rect(0, 0, 640, 60, color_utils.black)
		Draw.rect(0, 258, 640, 448 - this.h, color_utils.black)
	}
}

let introBackground = new IntroBackground()

function nextFrameOn(time)
{
	if (timerValue > time) {
		fadeOut = 1

		if (color_utils.fadeOut(introBackground, fadeOut)) {
			introBackground.imgSelected ++
			fadeIn = 1
			fadeOut = 0
			text_utils.resetText()
		}
	}
}

let timerValue = 0
let skip = 0
let fadeOut = 0
let fadeIn = 0

export function introScene(pad, timer)
{
	pad.update()

	timerValue = Timer.getTime(timer)

	ram = System.getMemoryStats()

	Screen.clear()

	if ((pad.justPressed(Pads.CROSS) || pad.justPressed(Pads.START)) && skip == 0) {
		fadeOut = 1
		skip = 1
		text_utils.resetText()

		Timer.reset(timer)
		timerValue = Timer.getTime(timer)
	}

	introBackground.draw()

	if (skip == 1) {
		color_utils.fadeOut(introBackground, fadeOut)

		Sound.setVolume(introBackground.opacity / 128 * 100)

		if (color_utils.fadeOut(introBackground, fadeOut) == 1) {
			music.pause(music.playing)
		}

		if (timerValue > 1500) {
			text_utils.resetText()

			return GAME_PRE_MENU
		}
	}

	if (introBackground.imgSelected == 0 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(0, "introText"))
		nextFrameOn(6500)
	} else if (introBackground.imgSelected == 1 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(1, "introText"))
		nextFrameOn(12000)
	} else if (introBackground.imgSelected == 2 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(2, "introText"))
		nextFrameOn(18000)
	} else if (introBackground.imgSelected == 3 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(3, "introText"))
		nextFrameOn(25000)
	} else if (introBackground.imgSelected == 4 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(4, "introText"))
		nextFrameOn(29000)
	} else if (introBackground.imgSelected == 5 && skip == 0) {
		text_utils.dynamicDrawText(225, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(5, "introText"))
		nextFrameOn(35000)
	} else if (introBackground.imgSelected == 6 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(6, "introText"))
		nextFrameOn(42000)
	} else if (introBackground.imgSelected == 7 && skip == 0) {
		nextFrameOn(46000)
	} else if (introBackground.imgSelected == 8 && skip == 0) {
		nextFrameOn(50000)
	} else if (introBackground.imgSelected == 9 && skip == 0) {
		nextFrameOn(54000)
	} else if (introBackground.imgSelected == 10 && skip == 0) {
		if (timerValue > 60000) {
			if (introBackground.last_img_y <= 36) {
				introBackground.last_img_y += 0.6
			}
		} 

		if (timerValue > 74750) {
			fadeOut = 1

			music.pause(music.playing)

			if (color_utils.fadeOut(introBackground, fadeOut)) {
				fadeOut = 0

				text_utils.resetText()

				return GAME_PRE_MENU
			}
		}
	}

	if (color_utils.fadeIn(introBackground, fadeIn)) {
		fadeIn = 0
	}

	fonts.dtm_mono.print(0, 0, timerValue)

	Screen.flip()
}

export function intro_gc()
{
	introScene = null
	nextFrameOn = null
	introBackground = null
	timerValue = null
	skip = null
	fadeIn = null
	fadeOut = null
	ram = null

	std.gc()
}