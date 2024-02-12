import { camera } from "camera.js";

import { collision, diagonal_collision } from "collision_masks.js";

import { room, ruins_rooms } from "room.js"

let step_delay = Timer.new();

let step_delay_value;

let diagonal_wall

export function setAbs(x, y)
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

		//Draw.rect(this.x - 2, this.y + 32, this.w, this.h - 32, color_utils.white_t);
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

	diagonal_collision(pad)
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

	pressing_up = false;
	pressing_down = false;
	pressing_left = false;
	pressing_right = false;

	walk(pad)
	{
		step_delay_value = Timer.getTime(step_delay);

		this.pressing_down = (pad.pressed(Pads.DOWN) || pad.ly > 64)
		this.pressing_up = (pad.pressed(Pads.UP) || pad.ly < -64)
		this.pressing_left = (pad.pressed(Pads.LEFT) || pad.lx < -64)
		this.pressing_right = (pad.pressed(Pads.RIGHT) || pad.lx > 64)

		this.moving_diagonal = 0;

		if (this.pressing_down && this.pressing_right) {
			this.moving_diagonal = 1;
		} else if (this.pressing_down && this.pressing_left) {
			this.moving_diagonal = 2;
		} else if (this.pressing_up && this.pressing_right) {
			this.moving_diagonal = 3;
		} else if (this.pressing_up && this.pressing_left) {
			this.moving_diagonal = 4;
		}

		if (this.pressing_down)
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

			this.diagonal_collision(pad);
		}

		if (this.pressing_up)
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

			this.diagonal_collision(pad);
		}

		if (this.pressing_right)
		{
			if (this.moving_diagonal == 0) 
			{
				this.animation_selected = 3;
			}

			this.move_right();

			if (this.collision())
			{
				this.move_left();

				this.sprite_selected = 0;
			} else {
				if (step_delay_value > 180)
				{
					this.sprite_selected ++;
					Timer.reset(step_delay);
				}
			}

			this.diagonal_collision(pad);
		} 

		if (this.pressing_left)
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

			this.diagonal_collision(pad);
		}

		if (! this.pressing_up && ! this.pressing_down && ! this.pressing_left && ! this.pressing_right)
		{
    		this.sprite_selected = 0;
		}
	}
}

export let player = new player_obj;