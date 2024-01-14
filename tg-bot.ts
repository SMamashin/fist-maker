import { Telegram, MediaSource } from 'puregram';
import { createCanvas, loadImage, CanvasRenderingContext2D} from 'canvas';
import { tokenTG, roundSize, roundColor } from './config/config';
import { phrasesTG } from './phrases/prhases';

const bot = new Telegram({
  token: tokenTG
});

function drawCircleOutline(context: CanvasRenderingContext2D, size: number, lineWidth: number, lineColor: string) {
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2 - lineWidth / 2, 0, Math.PI * 2);
  context.closePath();
  context.stroke();
}

bot.updates.on('message', async (context) => {
  const text = context.text ?? context.caption;
  if (!text || !(text.startsWith('/fist') || text.startsWith('/start'))) {
    {
      return context.reply(phrasesTG[1]);
    }
  }

  if (text.startsWith('/start')) {
    return context.reply(phrasesTG[0]);
  }

  const params = text.split(' ');
  let lineWidth = roundSize;
  let lineColor = roundColor;

  if (params.length > 1) {
    for (let i = 1; i < params.length; i++) {
      const param = params[i].toLowerCase();
      if (!isNaN(parseFloat(param))) {
        lineWidth = parseFloat(param);
      } else {
        lineColor = param;
      }
    }
  }
  if (!context.hasAttachmentType('photo')) return context.reply(phrasesTG[2]);

  const imageUrl = await bot.getAttachmentURL(context.attachment.bigSize.fileId);
  if (!imageUrl) return context.reply('Не удалось получить URL Attachment');

  const image = await loadImage(imageUrl).catch(() => null);
  if (!image) return context.reply('Не удалось загрузить Attachment по URL');

  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');

  drawCircleOutline(ctx, 256, lineWidth, lineColor);
  ctx.clip();
  ctx.drawImage(image, 0, 0, 256, 256);

  const canvasBuffer = await canvas.toBuffer('image/png');
  if (!canvasBuffer) return context.reply('Не удалось получить CanvasBuffer');

  await context.replyWithDocument(MediaSource.buffer(canvasBuffer, {
    filename: `fist.png`
  }), {
    caption: 'Фист, сэр!'
  });
});

bot.updates.startPolling();