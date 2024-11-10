export const white = Color.new(255, 255, 255)
export const black = Color.new(0, 0, 0)
export const yellow = Color.new(255, 255, 0)
export const white_t = Color.new(255, 255, 255, 50)
export const red_t = Color.new(255, 0, 0, 50)

export class ColoredShape
{
	constructor(w, h, r, g, b, a)
	{
		this.w = w
		this.h = h
		this.r = r
		this.g = g
		this.b = b
		this.opacity = a
	}

	x = 0
	y = 0

	draw()
	{
		Draw.rect(this.x, this.y, this.w, this.h, Color.new(this.r, this.g, this.b, this.opacity))
	}
}

export let roomTransitionOverlay = new ColoredShape(640, 448, 0, 0, 0, 0)

export function fadeOut(obj)
{
	if (obj.fadeOut == 1) {
		if (obj.opacity > 0) {
			obj.opacity -= 8
		} else {
			obj.opacity = 0
		}
	
		if (obj.opacity == 0) {
			obj.fadeOut = 0
		}
	}
}

export function fadeIn(obj)
{
	if (obj.fadeIn == 1) {
		if (obj.opacity < 128) {
			obj.opacity += 8
		} else {
			obj.opacity = 128
		}
	
		if (obj.opacity == 128) {
			obj.fadeIn = 0
		}
	}
}