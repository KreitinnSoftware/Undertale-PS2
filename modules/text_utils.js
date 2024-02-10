let rand = 0;

let pos = 0;

let text_processed_dialog = "";

let text_processed = "";

let speech_timer_value = 0;

let speech_timer = Timer.new();

export function resetText()
{
	pos = 0;
	text_processed_dialog = "";
}

export function drawText(posx, posy, font, text)
{
	text_processed = text.split("\n");

	for (let i = 0; i < text_processed.length; i++)
	{
		font.print(posx, posy + 35 * i, text_processed[i]);
	}
}

export function dynamicDrawText(posx, posy, delay, speech, font, text)
{
	if (pos != text.length)
	{
		speech_timer_value = Timer.getTime(speech_timer);

		if (speech_timer_value > delay)
		{
			text_processed_dialog += text[pos];

			if (text[pos] != " ")
			{
				rand = Math.floor(Math.random() * 48)

				Sound.play(speech, rand)
			}

			pos ++;

			Timer.reset(speech_timer);
		}
	}

	drawText(posx, posy, font, text_processed_dialog);
}