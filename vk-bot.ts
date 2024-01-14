import { VK } from 'vk-io';
import { HearManager } from '@vk-io/hear'
import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas';
import { phrasesVK } from './phrases/prhases';
import { tokenVK } from './config/config';
import { squareSize, squareColor, squareRadius } from './config/config';
import { roundSize, roundColor } from './config/config';

const vk = new VK({
  token: tokenVK
});

const hearManager = new HearManager();

function drawSquareOutline(context: CanvasRenderingContext2D, size: number, lineWidth: number, lineColor: string, cornerRadius: number) {
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;
  context.beginPath();
  context.moveTo(lineWidth / 2 + cornerRadius, lineWidth / 2);
  context.arcTo(size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2, lineWidth / 2 + cornerRadius, cornerRadius);
  context.arcTo(size - lineWidth / 2, size - lineWidth / 2, size - lineWidth / 2 - cornerRadius, size - lineWidth / 2, cornerRadius);
  context.arcTo(lineWidth / 2, size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2 - cornerRadius, cornerRadius);
  context.arcTo(lineWidth / 2, lineWidth / 2, lineWidth / 2 + cornerRadius, lineWidth / 2, cornerRadius);
  context.closePath();
  context.stroke();
}

function drawCircleOutline(context: CanvasRenderingContext2D, size: number, lineWidth: number, lineColor: string) {
  context.lineWidth = lineWidth;
  context.strokeStyle = lineColor;
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2 - lineWidth / 2, 0, Math.PI * 2);
  context.closePath();
  context.stroke();
}

hearManager.hear(/^\/fist_round(?:\s+(\d+(?:\.\d+)?))?(?:\s+(\w+))?$/i, async (context) => {
  if (context.isDM) {
    const userInput = context.$match[1];
    const lineWidth = userInput ? parseFloat(userInput) : roundSize; 
    const userColor = context.$match[2];
    const lineColor = userColor === 'white' ? 'white' : roundColor; 

    if (context.hasAttachments('photo')) {
      const photo = context.getAttachments('photo')[0];
      const imageUrl = photo.largeSizeUrl;
      const image = await loadImage(imageUrl);
      const canvas = createCanvas(256, 256);
      const ctx = canvas.getContext('2d');

      drawCircleOutline(ctx, 256, lineWidth, lineColor);
      ctx.clip();
      ctx.drawImage(image, 0, 0, 256, 256);

      const fistPng = canvas.toBuffer('image/png');
      await context.sendDocuments({
        value: fistPng,
        filename: 'fist_round.png'
      });
    } else {
      await context.send(phrasesVK[1]);
    }
  }
});

hearManager.hear('/fist', async (context) => {
  if (context.isDM) {
    if (context.hasAttachments('photo')) {
      const photo = context.getAttachments('photo')[0];
      const imageUrl = photo.largeSizeUrl;
      const image = await loadImage(imageUrl);
      const canvas = createCanvas(256, 256);
      const ctx = canvas.getContext('2d');
      const lineWidth = squareSize;
      const lineColor = squareColor;
      const cornerRadius = squareRadius;

      drawSquareOutline(ctx, 256, lineWidth, lineColor, cornerRadius);
      ctx.clip();
      ctx.drawImage(image, 0, 0, 256, 256);

      const fistPng = canvas.toBuffer('image/png');
      await context.sendDocuments({
        value: fistPng,
        filename: 'fist.png'
      });
    }
    else {
      await context.send(phrasesVK[1]);
    }
  }
});

hearManager.hear(/^привет|начать$/is, async (context) => {
  if (context.isDM) {
    await context.send(phrasesVK[0]);
  }
});

hearManager.hear("/help", async (context) =>{
  if (context.isDM) {
    await context.send(phrasesVK[0])
  }
})

hearManager.hear(/.*/is, async (context) =>{
  if (context.isDM) {
    await context.send(phrasesVK[2])
  }
});

vk.updates.on('message_new', hearManager.middleware);
vk.updates.start().catch(console.error);
