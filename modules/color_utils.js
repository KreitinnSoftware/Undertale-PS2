export const white = Color.new(255, 255, 255)
export const black = Color.new(0, 0, 0)
export const yellow = Color.new(255, 255, 0)
export const white_t = Color.new(255, 255, 255, 50)
export const red_t = Color.new(255, 0, 0, 50)

export function fadeOut(obj, fadeout)
{
	if (fadeout == 1) {
		if (obj.opacity > 0) {
			obj.opacity -= 4
		} else {
			obj.opacity = 0
		}
	
		if (obj.opacity == 0) {
			return true
		}
	}
}

export function fadeIn(obj, fadein)
{
	if (fadein == 1) {
		if (obj.opacity < 128) {
			obj.opacity += 4
		} else {
			obj.opacity = 128
		}
	
		if (obj.opacity == 128) {
			return true
		}
	}
}