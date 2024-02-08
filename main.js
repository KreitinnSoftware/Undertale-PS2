//Undertale PS2

Sound.setVolume(100);
Sound.setVolume(100, 0);

const screen = Screen.getMode();

const white = Color.new(255, 255, 255);
const black = Color.new(0, 0, 0);
const yellow = Color.new(255, 255, 0);

const white_t = Color.new(255, 255, 255, 50);
const red_t = Color.new(255, 0, 0, 50);

const GAME_INTRO = 0;
const GAME_PRE_MENU = 1;
const GAME_MENU = 2;
const GAME_INGAME = 3;

const dtm_mono = new Font("fonts/dtm-mono.otf");

let ram;

let splash = new Image("images/splash.png");

splash.height = 448;

let intro_noise = Sound.load("sfx/mus_intronoise.adp");

import { dynamicDrawText, drawText, resetText } from "modules/text_utils.js";

function fadeOut(obj)
{
	if (fadeout == 1)
	{
		if (obj.opacity > 0)
		{
			obj.opacity -= 4;
		} else {
			obj.opacity = 0
		}
	
		if (obj.opacity == 0)
		{
			fadeout = 0;

			return 1;
		}
	}
}

function fadeIn(obj)
{
	if (fadein == 1)
	{
		if (obj.opacity < 128)
		{
			obj.opacity += 4;
		} else {
			obj.opacity = 128
		}
	
		if (obj.opacity == 128)
		{
			fadein = 0;

			return 1;
		}
	}
}

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

		Draw.rect(0, 0, 640, 60, black)
		Draw.rect(0, 258, 640, 448 - this.h, black)
	}
}

function nextFrameOn(time)
{
	if (timer_value > time)
	{
		fadeout = 1;

		if (fadeOut(intro_bg) == 1)
		{
			intro_bg.img_selected ++;
			fadein = 1;
			resetText();
		}
	}
}

let intro_bg = new intro_bg_obj;

let mus_story = Sound.load("music/mus_story.wav");
let mus_menu0 = Sound.load("music/mus_menu0.wav")
let snd_txt2 = Sound.load("sfx/snd_txt2.adp");
let speech_delay = Timer.new();

let timer = Timer.new();

let gamestate = GAME_INTRO;

let fadeout = 0;
let fadein = 0;

let skip = 0;

let pad = Pads.get(0);

let timer_value;

Sound.play(mus_story);

while(gamestate == GAME_INTRO)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	ram = System.getMemoryStats();

	Screen.clear(black);

	if (pad.justPressed(Pads.CROSS) && skip == 0)
	{
		fadeout = 1;
		skip = 1;
		resetText();

		Timer.reset(timer);
		timer_value = Timer.getTime(timer);
	}

	intro_bg.draw();

	if (skip == 1)
	{
		fadeOut(intro_bg);

		Sound.setVolume(intro_bg.opacity / 128 * 100);

		if (fadeOut(intro_bg) == 1)
		{
			Sound.pause(mus_story);
		}

		if (timer_value > 1500)
		{
			resetText();
			gamestate = GAME_PRE_MENU;
		}
	}

	if (intro_bg.img_selected == 0 && skip == 0) {
		dynamicDrawText(120, 300, 50, speech_delay, snd_txt2, dtm_mono, "Long ago, two races\nruled over Earth:\nHUMANS and MONSTERS.")
		nextFrameOn(5750)
	} else if (intro_bg.img_selected == 1 && skip == 0) {
		dynamicDrawText(120, 300, 50, speech_delay, snd_txt2, dtm_mono, "One day, war broke\nout between the races.")
		nextFrameOn(10000)
	} else if (intro_bg.img_selected == 2 && skip == 0) {
		dynamicDrawText(120, 300, 50, speech_delay, snd_txt2, dtm_mono, "After a long battle,\nthe humans were\nvictorious.")
		nextFrameOn(15000)
	} else if (intro_bg.img_selected == 3 && skip == 0) {
		dynamicDrawText(120, 300, 50, speech_delay, snd_txt2, dtm_mono, "They sealed the monsters\nunderground with a magic\nspell.")
		nextFrameOn(25000)
	} else if (intro_bg.img_selected == 4 && skip == 0) {
		dynamicDrawText(120, 300, 50, speech_delay, snd_txt2, dtm_mono, "Many years later.")
		nextFrameOn(30000)
	} else if (intro_bg.img_selected == 5 && skip == 0) {
		dynamicDrawText(225, 300, 50, speech_delay, snd_txt2, dtm_mono, "MT. EBOTT\n   201X")
		nextFrameOn(35000)
	} else if (intro_bg.img_selected == 6 && skip == 0) {
		dynamicDrawText(120, 300, 50, speech_delay, snd_txt2, dtm_mono, "Legends say that those\nwho climb the montain\nnever return.")
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
		} else if (timer_value > 74750)
		{
			fadeout = 1;
			Sound.pause(mus_story);

			if (fadeOut(intro_bg) == 1)
			{
				resetText();
				gamestate = GAME_PRE_MENU;
			}
		}
	}

	fadeIn(intro_bg);

	dtm_mono.print(0, 0, ram.used);

	Screen.flip();
}

let cross = new Image("images/cross.png");
cross.width *= 2;
cross.height *= 2;

let square = new Image("images/square.png");
square.width *= 2;
square.height *= 2;

Timer.reset(timer);

Sound.setVolume(100);

Sound.play(intro_noise, 0);

while (gamestate == GAME_PRE_MENU)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	Screen.clear(black);

	splash.draw(0, 0);

	if (timer_value > 1400)
	{
		dtm_mono.print(250, 350, "[PRESS X]")
	}

	if (pad.justPressed(Pads.CROSS))
	{
		gamestate = GAME_MENU;
	}

	//dtm_mono.print(0, 80, "RAM:" + ram.used);

	Screen.flip();
}

Sound.play(mus_menu0);

while (gamestate == GAME_MENU)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	Screen.clear(black);

	if (pad.justPressed(Pads.CROSS))
	{
		Sound.pause(mus_menu0);
		gamestate = GAME_INGAME;
	}

	dtm_mono.print(160, 35, "--- Instruction ---");

	cross.draw(160, 84);

	dtm_mono.print(195, 80, "- Confirm");

	square.draw(160, 120);

	dtm_mono.print(195, 120, "- Cancel");

	//dtm_mono.print(0, 100, "RAM:" + ram.used);

	Screen.flip();
}

class camera_obj
{
	x = 0;
	y = 0;

	reset()
	{
		this.x = 0;
		this.y = 0;
	}
}

class player_obj
{
	x = 290
	y = 210
	w = 40
	h = 54
	hitbox_h = 20
	opacity = 128

	sprites = [[
			new Image("images/frisk/spr_f_maincharad_0.png", RAM),
			new Image("images/frisk/spr_f_maincharad_1.png", RAM),
			new Image("images/frisk/spr_f_maincharad_2.png", RAM),
			new Image("images/frisk/spr_f_maincharad_3.png", RAM),
			],[
			new Image("images/frisk/spr_f_maincharau_0.png", RAM),
			new Image("images/frisk/spr_f_maincharau_1.png", RAM),
			new Image("images/frisk/spr_f_maincharau_2.png", RAM),
			new Image("images/frisk/spr_f_maincharau_3.png", RAM),
			],[
			new Image("images/frisk/spr_f_maincharal_0.png", RAM),
			new Image("images/frisk/spr_f_maincharal_1.png", RAM),
			],[
			new Image("images/frisk/spr_f_maincharar_0.png", RAM),
			new Image("images/frisk/spr_f_maincharar_1.png", RAM),
			]]

	sprite_selected = 0;

	animation_selected = 0;

	moving_diagonal = 0;

	draw()
	{
		// this.sprites[animation_selected][sprite_selected].color = Color.new(this.opacity, this.opacity, this.opacity);

		if ((this.animation_selected == 0 || this.animation_selected == 1) && this.sprite_selected > 3)
		{
			this.sprite_selected = 0;
		}

		if ((this.animation_selected == 2 || this.animation_selected == 3) && this.sprite_selected > 1)
		{
			this.sprite_selected = 0;
		}

		this.sprites[this.animation_selected][this.sprite_selected].width = this.w;
		this.sprites[this.animation_selected][this.sprite_selected].height = this.h;

		this.sprites[this.animation_selected][this.sprite_selected].draw(this.x, this.y);

		//Draw.rect(this.x - 2, this.y + 32, this.w, this.h - 32, white_t);
	}

	collision()
	{
		for (let i = 0; i < collision[room].length; i++)
		{
			if (this.x - camera.x -2 < collision[room][i].x + collision[room][i].w &&
				this.x - camera.x -2 + this.w > collision[room][i].x &&
				this.y - camera.y + this.h > collision[room][i].y &&
				this.y - camera.y + 32 < collision[room][i].y + collision[room][i].h
			) { 
				return true;
			} 
		}	
	}

	move_up()
	{
		if (camera.y < ruins_rooms[room].camera_y_max && this.y == 200)
		{
			camera.y += 2.5
		} else {
			this.y -= 2.5
		}
	}

	move_down()
	{
		if (camera.y > ruins_rooms[room].camera_y_min && this.y == 200)
		{
			camera.y -= 2.5
		} else {
			this.y += 2.5
		}
	}

	move_right()
	{
		if (camera.x > ruins_rooms[room].camera_x_min && this.x == 300)
		{
			camera.x -= 2.5
		} else {
			this.x += 2.5
		}
	}

	move_left()
	{
		if (camera.x < ruins_rooms[room].camera_x_max && this.x == 300)
		{
			camera.x += 2.5
		} else {
			this.x -= 2.5
		}
	}

	diagonal_collision()
	{
		for (let i = 0; i < diagonal_collision[room].length; i++)
		{
			diagonal_wall = diagonal_collision[room][i]

			if (this.x - camera.x < diagonal_wall.x + diagonal_wall.w &&
				this.x - camera.x + this.w > diagonal_wall.x &&
				this.y - camera.y + this.h > diagonal_collision[room][i].y &&
				this.y - camera.y + 32 < diagonal_wall.y + diagonal_wall.h
			) { 
				if (diagonal_wall.type == 0 && (pad.pressed(Pads.LEFT) || pad.lx < -64) && this.moving_diagonal != 1 && this.moving_diagonal != 4)
				{
					this.move_up();
				}
				if (diagonal_wall.type == 0 && (pad.pressed(Pads.DOWN) || pad.ly > 64) && this.moving_diagonal != 1 && this.moving_diagonal != 4)
				{
					this.move_right();
				}
				if (diagonal_wall.type == 1 && (pad.pressed(Pads.RIGHT) || pad.lx > 64) && this.moving_diagonal != 3 && this.moving_diagonal != 4)
				{
					this.move_down();
				}
				if (diagonal_wall.type == 1 && (pad.pressed(Pads.UP) || pad.ly < -64) && this.moving_diagonal != 3 && this.moving_diagonal != 4)
				{
					this.move_left();
				}
				if (diagonal_wall.type == 2 && (pad.pressed(Pads.LEFT) || pad.lx < -64) && this.moving_diagonal != 2 && this.moving_diagonal != 3)
				{
					this.move_down();
				}
				if (diagonal_wall.type == 2 && (pad.pressed(Pads.UP) || pad.ly < -64) && this.moving_diagonal != 2 && this.moving_diagonal != 3)
				{
					this.move_right();
				}
				if (diagonal_wall.type == 3 && (pad.pressed(Pads.DOWN) || pad.ly > 64) && this.moving_diagonal != 2 && this.moving_diagonal != 3)
				{
					this.move_left();
				}
				if (diagonal_wall.type == 3 && (pad.pressed(Pads.RIGHT) || pad.lx > 64) && this.moving_diagonal != 2 && this.moving_diagonal != 3)
				{
					this.move_up();
				}
			} 
		}	
	}

	walk()
	{
		step_delay_value = Timer.getTime(step_delay);

		this.moving_diagonal = 0;

		if ((pad.pressed(Pads.DOWN) || pad.ly > 64) && (pad.pressed(Pads.RIGHT) || pad.lx > 64)) {
			this.moving_diagonal = 1;
		} else if ((pad.pressed(Pads.DOWN) || pad.ly > 64) && (pad.pressed(Pads.LEFT) || pad.lx < -64)) {
			this.moving_diagonal = 2;
		} else if ((pad.pressed(Pads.UP) || pad.ly < -64) && (pad.pressed(Pads.RIGHT) || pad.lx > 64)) {
			this.moving_diagonal = 3;
		} else if ((pad.pressed(Pads.UP) || pad.ly < -64) && (pad.pressed(Pads.LEFT) || pad.lx < -64)) {
			this.moving_diagonal = 4;
		}

		if (pad.pressed(Pads.DOWN) || pad.ly > 64)
		{
			if (this.moving_diagonal == 0) 
			{
				this.animation_selected = 0;
			}
			
			this.move_down();

			if (this.collision())
			{
				this.move_up();

				if (this.moving_diagonal == 1)
				{
					this.animation_selected = 3;
				} else if (this.moving_diagonal == 2) {
					this.animation_selected = 2;
				} else {
					this.sprite_selected = 0;
				}
			} else {
				if (step_delay_value > 180)
				{
					if (! (this.moving_diagonal == 1 || this.moving_diagonal == 2))
					{
						this.sprite_selected ++;
					}
					Timer.reset(step_delay);
				}
			}

			this.diagonal_collision()
		}

		if (pad.pressed(Pads.UP) || pad.ly < -64)
		{
			if (this.moving_diagonal == 0) 
			{
				this.animation_selected = 1;
			}

			this.move_up();

			if (this.collision())
			{
				this.move_down();

				if (this.moving_diagonal == 3)
				{
					this.animation_selected = 3;
				} else if (this.moving_diagonal == 4) {
					this.animation_selected = 2;
				} else {
					this.sprite_selected = 0;
				}
			} else {
				if (step_delay_value > 180)
				{
					if (! (this.moving_diagonal == 3 || this.moving_diagonal == 4))
					{
						this.sprite_selected ++;
					}
					Timer.reset(step_delay);
				}
			}

			this.diagonal_collision();
		}

		if (pad.pressed(Pads.RIGHT) || pad.lx > 64)
		{
			if (this.moving_diagonal == 0) 
			{
				this.animation_selected = 3;
			}

			if (camera.x >= ruins_rooms[room].camera_x_min && this.x == 300)
			{
				camera.x -= 2.5
			} else {
				this.x += 2.5
			}

			if (this.collision())
			{
				if (camera.x >= ruins_rooms[room].camera_x_min && this.x == 300)
				{
					camera.x += 2.5
				} else {
					this.x -= 2.5
				}
				this.sprite_selected = 0;
			} else {
				if (step_delay_value > 180)
				{
					this.sprite_selected ++;
					Timer.reset(step_delay);
				}
			}

			this.diagonal_collision()
		} 

		if (pad.pressed(Pads.LEFT) || pad.lx < -64)
		{
			if (this.moving_diagonal == 0) 
			{
				this.animation_selected = 2;
			}

			this.move_left();

			if (this.collision())
			{
				this.move_right();

				this.sprite_selected = 0;
			} else {
				if (step_delay_value > 180)
				{
					this.sprite_selected ++;
					Timer.reset(step_delay);
				}
			}

			this.diagonal_collision()
		}

		if ((pad.pressed(Pads.UP) == false &&
			pad.pressed(Pads.DOWN) == false &&
			pad.pressed(Pads.LEFT) == false &&
			pad.pressed(Pads.RIGHT) == false) &&
			(pad.lx < 64 && pad.lx > -64 && pad.ly > -64 && pad.ly < 64))
		{
    		this.sprite_selected = 0;
		}
	}
}

function roomDraw(x, y, w, h, image_a, w2, image_b, chunks)
{
	image_a.width = w;
	image_a.height = h;
	image_a.draw(x + camera.x, y + camera.y);

	if (chunks == 2)
	{
		image_b.width = w2;
		image_b.height = h;
		image_b.draw(x + w + camera.x, y + camera.y);
	}
}

let ruins_rooms = [{x: 0, y: -20, w: 1360, h: 490, camera_y_max: 20, camera_y_min: -20, camera_x_max: 0, camera_x_min: -700, entrance_x: 290, entrance_y: 210, image_a: new Image("images/rooms/ruins/0.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks)}},
					{x: 0, y: -375, w: 638, h: 676, camera_y_max: 260, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 300, entrance_y: 375, image_a: new Image("images/rooms/ruins/1.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 40, y: -440, w: 560, h: 890, camera_y_max: 480, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 300, entrance_y: 375, image_a: new Image("images/rooms/ruins/2.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 40, y: 0, w: 560, h: 448, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 300, entrance_y: 355, image_a: new Image("images/rooms/ruins/3.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 60, y: 20, w: 1418, h: 428, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: -840, entrance_x: 245, entrance_y: 360, image_a: new Image("images/rooms/ruins/4.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 40, y: 0, w: 572, h: 426, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: 0, entrance_x: 80, entrance_y: 260, image_a: new Image("images/rooms/ruins/5.png"), chunks: 1, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, null, null, this.chunks) }},
					{x: 60, y: 20, w: 1134, h: 426, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: -1715, entrance_x: 300, entrance_y: 345, image_a: new Image("images/rooms/ruins/6a.png"), w2: 1168, image_b: new Image("images/rooms/ruins/6b.png"), chunks: 2, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, this.w2, this.image_b, this.chunks) }},
					{x: 0, y: 20, w: 1360, h: 331, camera_y_max: 0, camera_y_min: 0, camera_x_max: 0, camera_x_min: -2100, entrance_x: 300, entrance_y: 345, image_a: new Image("images/rooms/ruins/7a.png"), w2: 1382, image_b: new Image("images/rooms/ruins/7b.png"), chunks: 2, draw() { roomDraw(this.x, this.y, this.w, this.h, this.image_a, this.w2, this.image_b, this.chunks) }},
					];

let collision = [[ // Sala 0
				{x: 0, y: 53, w: 40, h: 379},
				{x: 0, y: 432, w: 440, h: 40},
				{x: 40, y: 53, w: 480, h: 40},
				{x: 40, y: 92, w: 40, h: 40},
				{x: 520, y: 92, w: 40, h: 40},
				{x: 560, y: 92, w: 40, h: 189},
				{x: 600, y: 242, w: 595, h: 40},
				{x: 520, y: 357, w: 800, h: 40},
				{x: 1320, y: 242, w: 40, h: 155},
				{x: 1275, y: 242, w: 45, h: 40}
				],[
				// Sala 1
				{x: 0, y: 0, w: 40, h: 440},
				{x: 0, y: -40, w: 130, h: 40},
				{x: 0, y: -80, w: 280, h: 40},
				{x: 40, y: 300, w: 80, h: 40},
				{x: 40, y: 260, w: 40, h: 40},
				{x: 40, y: 370, w: 200, h: 70},
				{x: 40, y: 340, w: 160, h: 30},
				{x: 600, y: 0, w: 40, h: 440},
				{x: 520, y: -40, w: 130, h: 40},
				{x: 360, y: -80, w: 280, h: 40},
				{x: 520, y: 300, w: 80, h: 40},
				{x: 560, y: 260, w: 40, h: 40},
				{x: 440, y: 340, w: 160, h: 30},
				{x: 400, y: 370, w: 200, h: 70},
				],[
				// Sala 2
				// Meio cima
				{x: 160, y: -207, w: 315, h: 40},
				// Colisão Cima
				{x: 80, y: -287, w: 200, h: 40},
				{x: 360, y: -287, w: 200, h: 40},
				// Pilar 1
				{x: 80, y: -90, w: 40, h: 425},
				// Logo em baixo do Pilar 1
				{x: 80, y: 335, w: 160, h: 40},
				{x: 240, y: 375, w: 40, h: 80},
				// Pilar 2
				{x: 520, y: -90, w: 40, h: 425},
				// Logo em baixo do Pilar 2
				{x: 400, y: 335, w: 160, h: 40},
				{x: 360, y: 375, w: 40, h: 80},
				// Lado do Pilar 1 em Cima
				{x: 120, y: -52, w: 40, h: 40},
				// Lado do Pilar 2 em Cima
				{x: 480, y: -52, w: 40, h: 40},
				// Cima Extrema Esquerda
				{x: 40, y: -247, w: 40, h: 160},
				// Cima Extrema Direita
				{x: 560, y: -247, w: 40, h: 160},
				],[
				// Sala 3
				{x: 60, y: 140, w: 40, h: 44},
				{x: 100, y: 105, w: 134, h: 44},
				{x: 40, y: 180, w: 20, h: 158},
				{x: 100, y: 372, w: 44, h: 40},
				{x: 190, y: 410, w: 86, h: 40},
				{x: 320, y: 105, w: 180, h: 44},
				{x: 500, y: 140, w: 40, h: 44},
				{x: 540, y: 180, w: 40, h: 44},
				{x: 580, y: 220, w: 20, h: 120},
				{x: 360, y: 410, w: 135, h: 40},
				],[
				{x: 60, y: 20, w: 20, h: 408},
				{x: 80, y: 128, w: 1320, h: 20},
				{x: 80, y: 410, w: 160, h: 20},
				{x: 320, y: 410, w: 1100, h: 20},
				{x: 480, y: 340, w: 70, h: 70},
				{x: 480, y: 148, w: 70, h: 115},
				{x: 960, y: 340, w: 70, h: 70},
				{x: 960, y: 148, w: 70, h: 115},
				{x: 1400, y: 148, w: 20, h: 115},
				{x: 1400, y: 338, w: 20, h: 72},
				],[
				{x: 70, y: 220, w: 40, h: 40},
				{x: 110, y: 182, w: 40, h: 40},
				{x: 150, y: 145, w: 40, h: 40},
				{x: 190, y: 110, w: 120, h: 40},
				{x: 70, y: 335, w: 80, h: 38},
				{x: 150, y: 373, w: 40, h: 38},
				{x: 190, y: 411, w: 324, h: 38},
				{x: 514, y: 373, w: 40, h: 38},
				{x: 554, y: 335, w: 40, h: 38},
				{x: 594, y: 222, w: 40, h: 112},
				{x: 554, y: 182, w: 40, h: 40},
				{x: 514, y: 145, w: 40, h: 40},
				{x: 394, y: 110, w: 120, h: 40},
				],[
				{x: 60, y: 20, w: 20, h: 368},
				{x: 80, y: 130, w: 720, h: 20},
				{x: 80, y: 370, w: 200, h: 18},
				{x: 360, y: 370, w: 440, h: 18},
				{x: 798, y: 298, w: 160, h: 90},
				{x: 958, y: 370, w: 440, h: 18},
				{x: 1398, y: 335, w: 800, h: 52},
				{x: 798, y: 130, w: 240, h: 90},
				{x: 1038, y: 200, w: 280, h: 95},
				{x: 1318, y: 180, w: 400, h: 80},
				{x: 1800, y: 259, w: 40, h: 76},
				{x: 1920, y: 180, w: 120, h: 80},
				{x: 2120, y: 259, w: 220, h: 76},
				{x: 1720, y: 105, w: 640, h: 80},
				],[
				{x: 78, y: 128, w: 2582, h: 20},
				{x: 38, y: 148, w: 40, h: 38},
				{x: 78, y: 335, w: 2582, h: 20},
				{x: 38, y: 260, w: 40, h: 76},
				{x: 2345, y: 148, w: 72, h: 38},
				{x: 2660, y: 148, w: 40, h: 38},
				{x: 2660, y: 260, w: 40, h: 78},
				]];

let next_room_collisor = [{x: 1195, y: 242, w: 80, h: 40, color: red_t},
						{x: 280, y: -100, w: 80, h: 40, color: red_t},
						{x: 280, y: -287, w: 80, h: 40, color: red_t},
						{x: 235, y: 128, w: 80, h: 20, color: red_t},
						{x: 1420, y: 256, w: 40, h: 80, color: red_t},
						{x: 310, y: 108, w: 84, h: 40, color: red_t},
						{x: 2300, y: 180, w: 40, h: 80, color: red_t},
						{x: 2680, y: 185, w: 40, h: 75, color: red_t}
						];

// Type 0 == \ <
// Type 1 == > \
// Type 2 == / <
// Type 3 == > /

let diagonal_wall;

let diagonal_collision = [[{x: 40, y: 319, w: 40, h: 38, type: 0},
							{x: 80, y: 357, w: 40, h: 38, type: 0},
							{x: 120, y: 395, w: 40, h: 37, type: 0},
							{x: 440, y: 395, w: 40, h: 40, type: 3},
							{x: 480, y: 357, w: 40, h: 40, type: 3},
							{x: 480, y: 92, w: 40, h: 40, type: 1},
							{x: 80, y: 92, w: 40, h: 40, type: 2}
							],[
							// Sala 1
							],[
							// Sala 2 // Inicio das Ruinas
							// Perto do Pilar 1
							{x: 120, y: 295, w: 40, h: 40, type: 0},
							{x: 240, y: 335, w: 40, h: 40, type: 0},
							// Perto do Pilar 2
							{x: 480, y: 295, w: 40, h: 40, type: 3},
							{x: 360, y: 335, w: 40, h: 40, type: 3},
							// Escada 1 Baixo
							{x: 80, y: -130, w: 40, h: 40, type: 0},
							{x: 120, y: -92, w: 40, h: 40, type: 0},
							// Escada 2 Baixo
							{x: 520, y: -130, w: 40, h: 40, type: 3},
							{x: 480, y: -92, w: 40, h: 40, type: 3},
							// Escada 2 Cima
							{x: 440, y: -167, w: 40, h: 40, type: 2},
							{x: 400, y: -127, w: 40, h: 40, type: 2},
							// Escada 1 Cima
							{x: 160, y: -167, w: 40, h: 40, type: 1},
							{x: 200, y: -127, w: 40, h: 40, type: 1},
							// Cima Extrema Esquerda
							{x: 80, y: -247, w: 40, h: 40, type: 2},
							// Cima Extrema Direita
							{x: 520, y: -247, w: 40, h: 40, type: 1},
							],[
							{x: 60, y: 337, w: 40, h: 36, type: 0},
							{x: 144, y: 372, w: 42, h: 40, type: 0},
							{x: 495, y: 370, w: 40, h: 40, type: 3},
							{x: 535, y: 340, w: 40, h: 30, type: 3},
							],[
							],[
							],[
							],[
							]]

let player = new player_obj;

let camera = new camera_obj;

let step_delay = Timer.new();

let room = 7;

let new_max_camera_y;
let new_max_player_y;

function setAbs(x, y)
{
	if (x >= 300)
	{
		if ((x * -1 + 300) >= ruins_rooms[room].camera_x_min)
		{
			camera.x = (x * -1 + 300);
			player.x = 300
		} else {
			camera.x = ruins_rooms[room].camera_x_min;
			player.x = 300 + (((x * -1 + 300) - ruins_rooms[room].camera_x_min) * -1 - 2.5)
		}
	} else {
		camera.x = 0;

		player.x = x;
	}

	if (y <= 200)
	{
		if (y - 200 <= ruins_rooms[room].camera_y_min)
		{
			camera.y = 200 - y;
			player.y = 200;
		} else {
			camera.y = ruins_rooms[room].camera_y_min;
			player.y = 200 - y + ruins_rooms[room].camera_y_max;
		}
	} else {
		camera.y = 0;

		player.y = y;
	}
}

function nextRoom()
{
	room ++;

	camera.reset();

	player.x = ruins_rooms[room].entrance_x
	player.y = ruins_rooms[room].entrance_y
}

function previousRoom()
{
	room --;

	if (next_room_collisor[room].w > next_room_collisor[room].h)
	{
		setAbs(next_room_collisor[room].x + next_room_collisor[room].w / 2 - player.w / 2, next_room_collisor[room].y + next_room_collisor[room].h - 30);
	} else {
		setAbs(next_room_collisor[room].x - player.w, next_room_collisor[room].y);
	}
}

let step_delay_value;

while (gamestate == GAME_INGAME)
{
	pad.update();

	timer_value = Timer.getTime(timer);

	ram = System.getMemoryStats();

	Screen.clear(black);

	ruins_rooms[room].draw();

	for (let i = 0; i < collision[room].length; i++)
	{
		Draw.rect(collision[room][i].x + camera.x, collision[room][i].y + camera.y, collision[room][i].w, collision[room][i].h, white_t);
	}
	
	for (let i = 0; i < diagonal_collision[room].length; i++)
	{
		Draw.rect(diagonal_collision[room][i].x + camera.x, diagonal_collision[room][i].y + camera.y, diagonal_collision[room][i].w, diagonal_collision[room][i].h, red_t);
	}

    Draw.rect(next_room_collisor[room].x + camera.x, next_room_collisor[room].y + camera.y, next_room_collisor[room].w, next_room_collisor[room].h, next_room_collisor[room].color);

    if (player.x - camera.x < next_room_collisor[room].x + next_room_collisor[room].w &&
		player.x - camera.x + player.w > next_room_collisor[room].x &&
		player.y - camera.y + player.h > next_room_collisor[room].y &&
		player.y - camera.y + 32 < next_room_collisor[room].y + next_room_collisor[room].h
	) {
    	nextRoom();
	}

	if (pad.justPressed(Pads.CROSS))
	{
		previousRoom();
	}

    player.walk();

    player.draw();

	dtm_mono.print(0, 0, "Player Abs X:" + (player.x - camera.x));
	dtm_mono.print(0, 20, "Player Abs Y:" + (player.y - camera.y));
	dtm_mono.print(0, 40, "Player Real X:" + player.x);
	dtm_mono.print(0, 60, "Player Real Y:" + player.y);
	dtm_mono.print(0, 80, "Camera X:" + camera.x);
	dtm_mono.print(0, 100, "Camera Y:" + camera.y);

	Screen.flip();
}
