import * as color_utils from "modules/color_utils.js";

import * as text_utils from "modules/text_utils.js"

import * as fonts from "modules/fonts.js"

import * as sfx from "modules/sfx.js"

import * as music from "modules/music.js"

import { GAME_INTRO, GAME_PRE_MENU, GAME_MENU, GAME_INGAME, EN_US, PT_BR } from "modules/global_constants.js"

import { getText } from "lang/lang.js"

let ram = 0;

class intro_bg_obj
{
	w = 400
	h = 198
	x = 120
	y = 60
	last_img_h = 637.2
	last_img_y = -380
	opacity = 128

	img_available = [
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

	img_selected = 0

	draw()
	{
		this.img_available[this.img_selected].color = Color.new(this.opacity, this.opacity, this.opacity);
		this.img_available[this.img_selected].width = this.w;

		if (this.img_selected == 10)
		{
			this.img_available[this.img_selected].height = 637.2;
			this.img_available[this.img_selected].draw(this.x, this.last_img_y);

		} else
		{
			this.img_available[this.img_selected].height = this.h;
			this.img_available[this.img_selected].draw(this.x, this.y);
		}

		Draw.rect(0, 0, 640, 60, color_utils.black)
		Draw.rect(0, 258, 640, 448 - this.h, color_utils.black)
	}
}

let intro_bg = new intro_bg_obj();

function nextFrameOn(time)
{
	if (timer_value > time)
	{
		fadeout = 1;

		if (color_utils.fadeOut(intro_bg, fadeout))
		{
			intro_bg.img_selected ++;
			fadein = 1;
			fadeout = 0;
			text_utils.resetText();
		}
	}
}

let timer_value = 0;

let skip = 0;

let fadeout = 0;

let fadein = 0;

export function intro_scene(pad, timer)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	ram = System.getMemoryStats();

	Screen.clear();

	if ((pad.justPressed(Pads.CROSS) || pad.justPressed(Pads.START)) && skip == 0)
	{
		fadeout = 1;
		skip = 1;
		text_utils.resetText();

		Timer.reset(timer);
		timer_value = Timer.getTime(timer);
	}

	intro_bg.draw();

	if (skip == 1)
	{
		color_utils.fadeOut(intro_bg, fadeout);

		Sound.setVolume(intro_bg.opacity / 128 * 100);

		if (color_utils.fadeOut(intro_bg, fadeout) == 1)
		{
			music.pause(music.playing);
		}

		if (timer_value > 1500)
		{
			text_utils.resetText();

			return GAME_PRE_MENU;
		}
	}

	if (intro_bg.img_selected == 0 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(0, "introText"))
		nextFrameOn(6500)
	} else if (intro_bg.img_selected == 1 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(1, "introText"))
		nextFrameOn(12000)
	} else if (intro_bg.img_selected == 2 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(2, "introText"))
		nextFrameOn(18000)
	} else if (intro_bg.img_selected == 3 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(3, "introText"))
		nextFrameOn(25000)
	} else if (intro_bg.img_selected == 4 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(4, "introText"))
		nextFrameOn(29000)
	} else if (intro_bg.img_selected == 5 && skip == 0) {
		text_utils.dynamicDrawText(225, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(5, "introText"))
		nextFrameOn(35000)
	} else if (intro_bg.img_selected == 6 && skip == 0) {
		text_utils.dynamicDrawText(120, 300, 40, sfx.snd_txt2, fonts.dtm_mono, getText(6, "introText"))
		nextFrameOn(42000)
	} else if (intro_bg.img_selected == 7 && skip == 0) {
		nextFrameOn(46000)
	} else if (intro_bg.img_selected == 8 && skip == 0) {
		nextFrameOn(50000)
	} else if (intro_bg.img_selected == 9 && skip == 0) {
		nextFrameOn(54000)
	} else if (intro_bg.img_selected == 10 && skip == 0) {
		if (timer_value > 60000)
		{
			if (intro_bg.last_img_y <= 36)
			{
				intro_bg.last_img_y += 0.6;
			}
		} 

		if (timer_value > 74750)
		{
			fadeout = 1;

			music.pause(music.playing);

			if (color_utils.fadeOut(intro_bg, fadeout))
			{
				fadeout = 0;

				text_utils.resetText();

				return GAME_PRE_MENU;
			}
		}
	}

	if (color_utils.fadeIn(intro_bg, fadein))
	{
		fadein = 0;
	}

	fonts.dtm_mono.print(0, 0, timer_value);

	Screen.flip();
}

export function intro_gc()
{
	intro_scene = null;
	nextFrameOn = null;
	intro_bg = null;
	timer_value = null;
	skip = null;
	fadein = null;
	fadeout = null;
	ram = null;

	std.gc();
}