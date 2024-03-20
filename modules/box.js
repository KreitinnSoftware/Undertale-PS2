export function createBox(x, y, w, h, t)
{
	Draw.rect(x, y, t, h + t, Color.new(255,255,255))
	Draw.rect(x + w, y, t, h + t, Color.new(255,255,255))
	Draw.rect(x + t, y, w - t, t, Color.new(255, 255, 255))
	Draw.rect(x + t, y + h, w - t, t, Color.new(255, 255, 255))
	Draw.rect(x + t, y + t, w - t, h - t, Color.new(0, 0, 0))
}