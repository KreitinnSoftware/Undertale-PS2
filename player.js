import { camera } from "camera.js"
import { collisions, diagonalCollision, changeRoomCollisors } from "collision_masks.js"
import { room, rooms, goToRoom } from "room.js"
import { createBox } from "modules/box.js"
import { GAME_EVENT_TYPE_TALK, DOWN_RIGHT, DOWN_LEFT, UP_RIGHT, UP_LEFT, ROOM_EXIT, ROOM_ENTRANCE } from "modules/global_constants.js"
import { globalVariables } from "modules/savefile.js"
import { event_type, event } from "event_handler.js"
import { createVerticalInteractiveDialog } from "modules/interactive_dialog.js"
import * as color_utils from "modules/color_utils.js"
import * as text_utils from "modules/text_utils.js"
import * as fonts from "modules/fonts.js"

export function posRound(num)
{
	return Math.round(num / 3) * 3
}

export function setAbs(x, y)
{
	const xRounded = posRound(x)
	const yRounded = posRound(y)

	if (xRounded >= 300) {
		if (-xRounded + 300 >= rooms[room].cam_x_min) {
			camera.x = -xRounded + 300
			player.x = 300
		} else {
			camera.x = posRound(rooms[room].cam_x_min)
			player.x = xRounded + posRound(rooms[room].cam_x_min)
		}
	} else {
		camera.x = posRound(rooms[room].cam_x_max)
		player.x = xRounded
	}

	if (yRounded >= 201) {
		if (-yRounded + 201 >= rooms[room].cam_y_min) {
			camera.y = -yRounded + 201
			player.y = 201
		} else {
			camera.y = posRound(rooms[room].cam_y_min)
			player.y = yRounded + posRound(rooms[room].cam_y_min)
		}
	} else {
		camera.y = posRound(rooms[room].cam_y_max)
		player.y = yRounded
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

	selectedSprite = 0
	selectedAnimation = 0
	movingDiagonal = 0
	ingameMenuOpen = 0
	canMove = true
	love = 1
	hp = 20
	maxHp = 20

	constructor()
	{
		this.stepDelay = Timer.new()
	}

	draw()
	{
		if ((this.selectedAnimation == 0 || this.selectedAnimation == 1) && this.selectedSprite > 3) {
			this.selectedSprite = 0
		}

		if ((this.selectedAnimation == 2 || this.selectedAnimation == 3) && this.selectedSprite > 1) {
			this.selectedSprite = 0
		}

		this.sprites[this.selectedAnimation][this.selectedSprite].width = this.w
		this.sprites[this.selectedAnimation][this.selectedSprite].height = this.h

		this.sprites[this.selectedAnimation][this.selectedSprite].draw(this.x, this.y)

		if (globalVariables.debugInfo) {
			Draw.rect(this.x, this.y + 32, this.w, this.h - 32, color_utils.white_t)
		}
	}

	testCollision(obj)
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
		if (collisions[room] == undefined) {
			return
		}
		for (let i = 0; i < collisions[room].length; i++) {
			if (this.testCollision(collisions[room][i])) {
				console.log(room + ":" + i)
				return true
			}
		}	
	}

	moveUp()
	{
		if (camera.y < rooms[room].cam_y_max && this.y == 201) {
			camera.y += this.vel
		} else {
			this.y -= this.vel
		}
	}

	moveDown()
	{
		if (camera.y > rooms[room].cam_y_min && this.y == 201) {
			camera.y -= this.vel
		} else {
			this.y += this.vel
		}
	}

	moveRight()
	{
		if (camera.x > rooms[room].cam_x_min && this.x == 300) {
			camera.x -= this.vel
		} else {
			this.x += this.vel
		}
	}

	moveLeft()
	{
		if (camera.x < rooms[room].cam_x_max && this.x == 300) {
			camera.x += this.vel
		} else {
			this.x -= this.vel
		}
	}

	diagonalCollision(pad)
	{
		if (diagonalCollision[room] == undefined) {
			return
		}
		for (let i = 0; i < diagonalCollision[room].length; i++) {
			let diagonalWall = diagonalCollision[room][i]

			if (this.x - camera.x < diagonalWall.x + diagonalWall.w &&
				this.x - camera.x + this.w > diagonalWall.x &&
				this.y - camera.y + this.h > diagonalCollision[room][i].y &&
				this.y - camera.y + 32 < diagonalWall.y + diagonalWall.h
			) { 
				switch (diagonalWall.type) {
					case UP_LEFT: {
						if (this.pressingLeft && this.movingDiagonal != DOWN_LEFT && this.movingDiagonal != UP_RIGHT) {
							this.moveDown()
						} else if (this.pressingUp && this.movingDiagonal != DOWN_LEFT && this.movingDiagonal != UP_RIGHT) {
							this.moveRight()
						}
						break
					}

					case UP_RIGHT: {
						if (this.pressingRight && this.movingDiagonal != DOWN_LEFT && this.movingDiagonal != UP_LEFT) {
							this.moveDown()
						} else if (this.pressingUp && this.movingDiagonal != DOWN_LEFT && this.movingDiagonal != UP_LEFT) {
							this.moveLeft()
						}
						break
					}

					case DOWN_LEFT: {
						if (this.pressingLeft && this.movingDiagonal != DOWN_RIGHT && this.movingDiagonal != UP_LEFT) {
							this.moveUp()
						} else if (this.pressingDown && this.movingDiagonal != DOWN_RIGHT && this.movingDiagonal != UP_LEFT) {
							this.moveRight()
						}
						break
					}

					case DOWN_RIGHT: {
						if (this.pressingDown && this.movingDiagonal != DOWN_LEFT && this.movingDiagonal != UP_RIGHT) {
							this.moveLeft()
						} else if (this.pressingRight && this.movingDiagonal != DOWN_LEFT && this.movingDiagonal != UP_RIGHT) {
							this.moveUp()
						}
						break
					}
				}
			} 
		}	
	}

	pressingUp = false
	pressingDown = false
	pressingLeft = false
	pressingRight = false

	walk(pad)
	{
		this.x = posRound(this.x)
		this.y = posRound(this.y)

		this.canMove = (
			(color_utils.roomTransitionOverlay.opacity == 0 || color_utils.roomTransitionOverlay.opacity == 128) &&
			(this.ingameMenuOpen == 0)
		)

		for (let i = 0; i < changeRoomCollisors[room].length; i++) {
			if (this.testCollision(changeRoomCollisors[room][i])) {
				color_utils.roomTransitionOverlay.fadeIn = 1
				color_utils.roomTransitionOverlay.fadeOut = 0

				if (color_utils.roomTransitionOverlay.opacity == 128) {
					goToRoom(changeRoomCollisors[room][i].destRoom, changeRoomCollisors[room][i].destPlace, changeRoomCollisors[room][i].exitObjId)
				}
			}
		}

		if (this.canMove) {
			const stepDelayValue = Timer.getTime(this.stepDelay)

			this.pressingDown = (pad.pressed(Pads.DOWN) || pad.ly > 64)
			this.pressingUp = (pad.pressed(Pads.UP) || pad.ly < -64)
			this.pressingLeft = (pad.pressed(Pads.LEFT) || pad.lx < -64)
			this.pressingRight = (pad.pressed(Pads.RIGHT) || pad.lx > 64)

			if (this.pressingLeft && this.pressingRight) {
				this.pressingRight = false
			}
			if (this.pressingDown && this.pressingUp) {
				this.pressingDown = false
			}

			this.movingDiagonal = 0

			if (this.pressingDown && this.pressingRight) {
				this.movingDiagonal = DOWN_RIGHT
			} else if (this.pressingDown && this.pressingLeft) {
				this.movingDiagonal = DOWN_LEFT
			} else if (this.pressingUp && this.pressingRight) {
				this.movingDiagonal = UP_RIGHT
			} else if (this.pressingUp && this.pressingLeft) {
				this.movingDiagonal = UP_LEFT
			}

			if (this.pressingUp) {
				if (this.movingDiagonal == 0) {
					this.selectedAnimation = PLAYER_UP
				}

				this.moveUp()

				if (this.collision()) {
					this.moveDown()

					if (this.movingDiagonal == UP_RIGHT) {
						this.selectedAnimation = PLAYER_RIGHT
					} else if (this.movingDiagonal == UP_LEFT) {
						this.selectedAnimation = PLAYER_LEFT
					} else {
						this.selectedSprite = 0
					}
				} else {
					if (stepDelayValue > 180) {
						if (!(this.movingDiagonal == UP_RIGHT || this.movingDiagonal == UP_LEFT)) {
							this.selectedSprite ++
						}
						Timer.reset(this.stepDelay)
					}
				}

				this.diagonalCollision(pad)
			} else if (this.pressingDown) {
				if (this.movingDiagonal == 0) {
					this.selectedAnimation = PLAYER_DOWN
				}

				this.moveDown()

				if (this.collision()) {
					this.moveUp()

					if (this.movingDiagonal == DOWN_RIGHT) {
						this.selectedAnimation = PLAYER_RIGHT
					} else if (this.movingDiagonal == DOWN_LEFT) {
						this.selectedAnimation = PLAYER_LEFT
					} else {
						this.selectedSprite = 0
					}
				} else {
					if (stepDelayValue > 180) {
						if (!(this.movingDiagonal == DOWN_RIGHT || this.movingDiagonal == DOWN_LEFT)) {
							this.selectedSprite ++
						}
						Timer.reset(this.stepDelay)
					}
				}

				this.diagonalCollision(pad)
			}

			if (this.pressingLeft) {
				if (this.movingDiagonal == 0) {
					this.selectedAnimation = PLAYER_LEFT
				}

				this.moveLeft()

				if (this.collision()) {
					this.moveRight()

					this.selectedSprite = 0
				} else {
					if (stepDelayValue > 180)
					{
						this.selectedSprite ++
						Timer.reset(this.stepDelay)
					}
				}

				this.diagonalCollision(pad)
			} else if (this.pressingRight) {
				if (this.movingDiagonal == 0)  {
					this.selectedAnimation = PLAYER_RIGHT
				}

				this.moveRight()

				if (this.collision()) {
					this.moveLeft()

					this.selectedSprite = 0
				} else {
					if (stepDelayValue > 180) {
						this.selectedSprite ++
						Timer.reset(this.stepDelay)
					}
				}

				this.diagonalCollision(pad)
			}

			if (!this.pressingUp && !this.pressingDown && !this.pressingLeft && !this.pressingRight) {
	    		this.selectedSprite = 0
			}
		} else {
			this.selectedSprite = 0
		}
	}

	ingameMenu(pad)
	{
		if (pad.justPressed(Pads.CIRCLE)) {
			if (this.ingameMenuOpen == 0) {
				this.ingameMenuOpen = 1
			} else {
				this.ingameMenuOpen = 0
			}
		}
		if (this.ingameMenuOpen == 1) {
			createBox(20, 50, 120, 100, 5)
			text_utils.drawText(30, 50, fonts.exp, "Frisk", 0)
			text_utils.drawText(30, 80, fonts.exp, "Lv    " + this.love + "\nHP     " + this.hp + "/" + this.maxHp + "\nG       0", 20)
			createBox(20, 160, 120, 130, 5)

			createVerticalInteractiveDialog(pad, 45, 176, "ITEM\nSTAT\nCEL")
		}
	}
}

export const player = new Player