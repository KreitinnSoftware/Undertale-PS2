import { camera } from "camera.js"

class ResizedImage
{
	constructor(w, h, image)
	{
		this.image = new Image(image)
		this.image.width = w
		this.image.height = h
	}

	draw(x, y)
	{
		this.image.draw(x, y)
	}
}

export class FaceSwitch
{
	w = 40
	h = 40

	sprites = [
		[
		new Image("objects/faceswitch/spr_faceswitch_0.png", RAM),
		new Image("objects/faceswitch/spr_faceswitch_1.png", RAM),
		]
	]

	sprite_selected = 0
	animation_selected = 0

	draw(x, y)
	{
		this.sprites[this.animation_selected][this.sprite_selected].width = this.w
		this.sprites[this.animation_selected][this.sprite_selected].height = this.h

		this.sprites[this.animation_selected][this.sprite_selected].draw(x + camera.x, y + camera.y)
	}
}

export class OurHeart
{
	w = 32
	h = 32

	sprites = [
		[
		new Image("objects/outheart/spr_ourheart_0.png", RAM),
		new Image("objects/outheart/spr_ourheart_1.png", RAM),
		]
	]

	sprite_selected = 0
	animation_selected = 0

	draw(x, y)
	{
		this.sprites[this.animation_selected][this.sprite_selected].width = this.w
		this.sprites[this.animation_selected][this.sprite_selected].height = this.h

		this.sprites[this.animation_selected][this.sprite_selected].draw(x + camera.x, y + camera.y)
	}
}

export class SavePoint
{
	w = 40
	h = 40

	sprites = [
		[
		new Image("objects/savepoint/spr_savepoint_0.png", RAM),
		new Image("objects/savepoint/spr_savepoint_1.png", RAM),
		]
	]

	sprite_selected = 0
	animation_selected = 0

	constructor()
	{
		this.timer = Timer.new()
	}

	draw(x, y)
	{
		if (Timer.getTime(this.timer) > 180) {
			Timer.reset(this.timer)
			this.sprite_selected++
		}

		if (this.sprite_selected > this.sprites[this.animation_selected].length - 1) {
			this.sprite_selected = 0
		}

		this.sprites[this.animation_selected][this.sprite_selected].width = this.w
		this.sprites[this.animation_selected][this.sprite_selected].height = this.h

		this.sprites[this.animation_selected][this.sprite_selected].draw(x + camera.x, y + camera.y)
	}
}

export class FakeWater
{
	sprites = [
		[
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterl_0.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterl_1.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterl_2.png"),
		],[
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterm_0.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterm_0.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterm_0.png"),
		],[
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterr_0.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterr_1.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewaterr_2.png"),
		],[
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenl_0.png"),
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenl_1.png"),
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenl_2.png"),
		],[
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenm_0.png"),
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenm_1.png"),
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenm_2.png"),
		],[
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenr_0.png"),
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenr_1.png"),
		new ResizedImage(40, 80, "objects/fakewater/spr_fakewateropenr_2.png"),
		],[
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowl_0.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowl_1.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowl_2.png"),
		],[
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowm_0.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowm_1.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowm_2.png"),
		],[
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowr_0.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowr_1.png"),
		new ResizedImage(40, 40, "objects/fakewater/spr_fakewatershadowr_2.png"),
		]
	]

	sprite_selected = 0

	constructor()
	{
		this.timer = Timer.new()
	}

	draw(x, y, animation)
	{
		if (Timer.getTime(this.timer) > 180) {
			Timer.reset(this.timer)
			this.sprite_selected++
		}

		if (this.sprite_selected > this.sprites[animation].length - 1) {
			this.sprite_selected = 0
		}

		this.sprites[animation][this.sprite_selected].draw(x + camera.x, y + camera.y)
	}
}

export class SpikeTile
{
	sprites = [
		new ResizedImage(40, 38, "objects/spiketile/spr_spiketile_0.png"),
		new ResizedImage(40, 38, "objects/spiketile/spr_spiketile_1.png"),
	]

	draw(x, y, player)
	{
		if (player.testCollision({x: x, y: y, w: 40, h: 48})) {
			this.sprites[1].draw(x + camera.x, y + camera.y)
		} else {
			this.sprites[0].draw(x + camera.x, y + camera.y)
		}
	}
}