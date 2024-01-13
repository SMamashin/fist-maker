import { VK } from 'vk-io';
import { createCanvas, loadImage } from 'canvas';
import { token } from './config';

const vk = new VK({
  token: token
});

vk.updates.on('message_new', async (context) => {
  if (context.text === '/fist' && context.hasAttachments('photo')) {
    const photo = context.getAttachments('photo')[0];
    const imageUrl = photo.largeSizeUrl;
    const image = await loadImage(imageUrl);
    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, 256, 256);
    const size = 256;
    const lineWidth = 11; 
    const lineColor = 'red'; 
    const cornerRadius = 30; 
    
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(lineWidth / 2 + cornerRadius, lineWidth / 2);
    ctx.lineTo(size - lineWidth / 2 - cornerRadius, lineWidth / 2);
    ctx.arcTo(size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2, lineWidth / 2 + cornerRadius, cornerRadius);
    ctx.lineTo(size - lineWidth / 2, size - lineWidth / 2 - cornerRadius);
    ctx.arcTo(size - lineWidth / 2, size - lineWidth / 2, size - lineWidth / 2 - cornerRadius, size - lineWidth / 2, cornerRadius);
    ctx.lineTo(lineWidth / 2 + cornerRadius, size - lineWidth / 2);
    ctx.arcTo(lineWidth / 2, size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2 - cornerRadius, cornerRadius);
    ctx.lineTo(lineWidth / 2, lineWidth / 2 + cornerRadius);
    ctx.arcTo(lineWidth / 2, lineWidth / 2, lineWidth / 2 + cornerRadius, lineWidth / 2, cornerRadius);
    ctx.closePath();
    ctx.stroke();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth * 2;

    ctx.beginPath();
    ctx.moveTo(lineWidth / 2 + cornerRadius, lineWidth / 2);
    ctx.lineTo(size - lineWidth / 2 - cornerRadius, lineWidth / 2);
    ctx.arcTo(size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2, lineWidth / 2 + cornerRadius, cornerRadius);
    ctx.lineTo(size - lineWidth / 2, size - lineWidth / 2 - cornerRadius);
    ctx.arcTo(size - lineWidth / 2, size - lineWidth / 2, size - lineWidth / 2 - cornerRadius, size - lineWidth / 2, cornerRadius);
    ctx.lineTo(lineWidth / 2 + cornerRadius, size - lineWidth / 2);
    ctx.arcTo(lineWidth / 2, size - lineWidth / 2, lineWidth / 2, size - lineWidth / 2 - cornerRadius, cornerRadius);
    ctx.lineTo(lineWidth / 2, lineWidth / 2 + cornerRadius);
    ctx.arcTo(lineWidth / 2, lineWidth / 2, lineWidth / 2 + cornerRadius, lineWidth / 2, cornerRadius);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(lineWidth / 2 + cornerRadius, lineWidth / 2);
    ctx.clip();
    ctx.drawImage(image, 0, 0, 256, 256);

    const buffer = canvas.toBuffer('image/png');
    await context.sendDocuments({
      value: buffer,
      filename: 'fist.png'
    });
  }
});

vk.updates.start().catch(console.error);
