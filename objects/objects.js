import { camera } from "camera.js"

export class faceswitch
{
	w = 40
	h = 40

	sprites = [[
			new Image("objects/faceswitch/spr_faceswitch_0.png", RAM),
			new Image("objects/faceswitch/spr_faceswitch_1.png", RAM),
			]]

	sprite_selected = 0

	animation_selected = 0

	draw(x, y)
	{
		// this.sprites[animation_selected][sprite_selected].color = Color.new(this.opacity, this.opacity, this.opacity);

		if (this.animation_selected == 0 && this.sprite_selected > 1)
		{
			this.sprite_selected = 0
		}

		this.sprites[this.animation_selected][this.sprite_selected].width = this.w
		this.sprites[this.animation_selected][this.sprite_selected].height = this.h

		this.sprites[this.animation_selected][this.sprite_selected].draw(x + camera.x, y + camera.y)
	}
}
