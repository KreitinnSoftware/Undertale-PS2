import { camera } from "camera.js"
import { collision, diagonal_collision, next_room_collisor, prev_room_collisor } from "collision_masks.js"
import { room, ruins_rooms, nextRoom, prevRoom } from "room.js"
import { createBox } from "modules/box.js"
import { GAME_EVENT_TYPE_TALK, DOWN_RIGHT, DOWN_LEFT, UP_RIGHT, UP_LEFT } from "modules/global_constants.js"
import { event_type, event } from "event_handler.js"
import { white_t } from "modules/color_utils.js"
import * as text_utils from "modules/text_utils.js"
import * as fonts from "modules/fonts.js"

let step_delay = Timer.new()

export function posRound(num)
{
	return Math.round(num / 3) * 3
}

export function setAbs(x, y)
{
	if (posRound(x) >= 300) {
		if ((-posRound(x) + 300) >= ruins_rooms[room].cam_x_min) {
			camera.x = posRound(-x + 300)
			player.x = 300
		} else {
			camera.x = ruins_rooms[room].cam_x_min
			player.x = posRound(x + ruins_rooms[room].cam_x_min)
		}
	} else {
		camera.x = 0
		player.x = posRound(x)
	}

	if (posRound(y) <= 201) {
		camera.y = posRound(201 - y)
		player.y = 201
	} else {
		camera.y = 0
		player.y = posRound(y)
	}
}

const PLAYER_DOWN = 0
const PLAYER_UP = 1
const PLAYER_LEFT = 2
const PLAYER_RIGHT = 3

class Player
{
	x = 300
	y = 210
	w = 40
	h = 54

	vel = 3

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

	sprite_selected = 0
	animation_selected = 0
	moving_diagonal = 0
	ingame_menu_open = 0
	love = 1
	hp = 20
	max_hp = 20

	draw()
	{
		// this.sprites[animation_selected][sprite_selected].color = Color.new(this.opacity, this.opacity, this.opacity)

		if ((this.animation_selected == 0 || this.animation_selected == 1) && this.sprite_selected > 3)
		{
			this.sprite_selected = 0
		}

		if ((this.animation_selected == 2 || this.animation_selected == 3) && this.sprite_selected > 1)
		{
			this.sprite_selected = 0
		}

		this.sprites[this.animation_selected][this.sprite_selected].width = this.w
		this.sprites[this.animation_selected][this.sprite_selected].height = this.h

		this.sprites[this.animation_selected][this.sprite_selected].draw(this.x, this.y)

		// Draw.rect(this.x, this.y + 32, this.w, this.h - 32, white_t)
	}

	test_collision(obj)
	{
		if (this.x - camera.x < obj.x + obj.w &&
			this.x - camera.x + this.w > obj.x &&
			this.y - camera.y + this.h > obj.y &&
			this.y - camera.y + 32 < obj.y + obj.h
		) { 
			return true
		}	
	}

	collision()
	{
		for (let i = 0; i < collision[room].length; i++) {
			if (this.test_collision(collision[room][i])) {
				return true
			}
		}	
	}

	move_up()
	{
		if (camera.y < ruins_rooms[room].cam_y_max && this.y == 201) {
			camera.y += this.vel
		} else {
			this.y -= this.vel
		}
	}

	move_down()
	{
		if (camera.y > ruins_rooms[room].cam_y_min && this.y == 201) {
			camera.y -= this.vel
		} else {
			this.y += this.vel
		}
	}

	move_right()
	{
		if (camera.x > ruins_rooms[room].cam_x_min && this.x == 300) {
			camera.x -= this.vel
		} else {
			this.x += this.vel
		}
	}

	move_left()
	{
		if (camera.x < ruins_rooms[room].cam_x_max && this.x == 300) {
			camera.x += this.vel
		} else {
			this.x -= this.vel
		}
	}

	diagonal_collision(pad)
	{
		for (let i = 0; i < diagonal_collision[room].length; i++) {
			let diagonal_wall = diagonal_collision[room][i]

			if (this.x - camera.x < diagonal_wall.x + diagonal_wall.w &&
				this.x - camera.x + this.w > diagonal_wall.x &&
				this.y - camera.y + this.h > diagonal_collision[room][i].y &&
				this.y - camera.y + 32 < diagonal_wall.y + diagonal_wall.h
			) { 
				if (diagonal_wall.type == DOWN_LEFT && this.pressing_left && this.moving_diagonal != DOWN_RIGHT && this.moving_diagonal != UP_LEFT) {
					this.move_up()
				}
				if (diagonal_wall.type == DOWN_LEFT && this.pressing_down && this.moving_diagonal != DOWN_RIGHT && this.moving_diagonal != UP_LEFT) {
					this.move_right()
				}
				if (diagonal_wall.type == UP_RIGHT && this.pressing_right && this.moving_diagonal != UP_RIGHT && this.moving_diagonal != UP_LEFT) {
					this.move_down()
				}
				if (diagonal_wall.type == UP_RIGHT && this.pressing_up && this.moving_diagonal != UP_RIGHT && this.moving_diagonal != UP_LEFT) {
					this.move_left()
				}
				if (diagonal_wall.type == UP_LEFT && this.pressing_left && this.moving_diagonal != DOWN_LEFT && this.moving_diagonal != UP_RIGHT) {
					this.move_down()
				}
				if (diagonal_wall.type == UP_LEFT && this.pressing_up && this.moving_diagonal != DOWN_LEFT && this.moving_diagonal != UP_RIGHT) {
					this.move_right()
				}
				if (diagonal_wall.type == DOWN_RIGHT && this.pressing_down && this.moving_diagonal != DOWN_LEFT && this.moving_diagonal != UP_RIGHT) {
					this.move_left()
				}
				if (diagonal_wall.type == DOWN_RIGHT && this.pressing_right && this.moving_diagonal != DOWN_LEFT && this.moving_diagonal != UP_RIGHT) {
					this.move_up()
				}
			} 
		}	
	}

	pressing_up = false
	pressing_down = false
	pressing_left = false
	pressing_right = false

	walk(pad)
	{
		if (this.test_collision(next_room_collisor[room])) {
			nextRoom()
		}

		if (this.test_collision(prev_room_collisor[room])) {
			prevRoom()
		}

		if (this.ingame_menu_open == 0 || event_type == GAME_EVENT_TYPE_TALK) {
			let step_delay_value = Timer.getTime(step_delay)

			this.pressing_down = (pad.pressed(Pads.DOWN) || pad.ly > 64)
			this.pressing_up = (pad.pressed(Pads.UP) || pad.ly < -64)
			this.pressing_left = (pad.pressed(Pads.LEFT) || pad.lx < -64)
			this.pressing_right = (pad.pressed(Pads.RIGHT) || pad.lx > 64)

			this.moving_diagonal = 0

			if (this.pressing_down && this.pressing_right) {
				this.moving_diagonal = DOWN_RIGHT
			} else if (this.pressing_down && this.pressing_left) {
				this.moving_diagonal = DOWN_LEFT
			} else if (this.pressing_up && this.pressing_right) {
				this.moving_diagonal = UP_RIGHT
			} else if (this.pressing_up && this.pressing_left) {
				this.moving_diagonal = UP_LEFT
			}

			if (this.pressing_up) {
				if (this.moving_diagonal == 0) {
					this.animation_selected = PLAYER_UP
				}

				this.move_up()

				if (this.collision()) {
					this.move_down()

					if (this.moving_diagonal == UP_RIGHT) {
						this.animation_selected = PLAYER_RIGHT
					} else if (this.moving_diagonal == UP_LEFT) {
						this.animation_selected = PLAYER_LEFT
					} else {
						this.sprite_selected = 0
					}
				} else {
					if (step_delay_value > 180) {
						if (! (this.moving_diagonal == UP_RIGHT || this.moving_diagonal == UP_LEFT))
						{
							this.sprite_selected ++
						}
						Timer.reset(step_delay)
					}
				}

				this.diagonal_collision(pad)
			} else if (this.pressing_down) {
				if (this.moving_diagonal == 0) {
					this.animation_selected = PLAYER_DOWN
				}

				this.move_down()

				if (this.collision()) {
					this.move_up()

					if (this.moving_diagonal == DOWN_RIGHT)
					{
						this.animation_selected = PLAYER_RIGHT
					} else if (this.moving_diagonal == DOWN_LEFT) {
						this.animation_selected = PLAYER_LEFT
					} else {
						this.sprite_selected = 0
					}
				} else {
					if (step_delay_value > 180) {
						if (! (this.moving_diagonal == DOWN_RIGHT || this.moving_diagonal == DOWN_LEFT)) {
							this.sprite_selected ++
						}
						Timer.reset(step_delay)
					}
				}

				this.diagonal_collision(pad)
			}

			if (this.pressing_left) {
				if (this.moving_diagonal == 0) {
					this.animation_selected = PLAYER_LEFT
				}

				this.move_left()

				if (this.collision())
				{
					this.move_right()

					this.sprite_selected = 0
				} else {
					if (step_delay_value > 180)
					{
						this.sprite_selected ++
						Timer.reset(step_delay)
					}
				}

				this.diagonal_collision(pad)
			} else if (this.pressing_right) {
				if (this.moving_diagonal == 0)  {
					this.animation_selected = PLAYER_RIGHT
				}

				this.move_right()

				if (this.collision()) {
					this.move_left()

					this.sprite_selected = 0
				} else {
					if (step_delay_value > 180) {
						this.sprite_selected ++
						Timer.reset(step_delay)
					}
				}

				this.diagonal_collision(pad)
			}

			if (! this.pressing_up && ! this.pressing_down && ! this.pressing_left && ! this.pressing_right) {
	    		this.sprite_selected = 0
			}
		} else {
			this.sprite_selected = 0
		}
	}

	ingame_menu(pad)
	{
		if (pad.justPressed(Pads.CIRCLE)) {
			if (this.ingame_menu_open == 0) {
				this.ingame_menu_open = 1
			} else {
				this.ingame_menu_open = 0
			}
		}
		if (this.ingame_menu_open == 1) {
			createBox(20, 50, 120, 100, 5)
			text_utils.drawText(30, 50, fonts.exp, "Frisk", 0)
			text_utils.drawText(30, 80, fonts.exp, "Lv    " + this.love + "\nHP     " + this.hp + "/" + this.max_hp + "\nG       0", 20)
			createBox(20, 160, 120, 130, 5)
		}
	}
}

export let player = new Player