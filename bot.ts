// beta version //
import { VK } from 'vk-io';
import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas';
import { token } from './config';

const vk = new VK({
  token: token
});

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

vk.updates.on('message_new', async (context) => {
  const msg = context.message.text.toLowerCase();
  if (context.isDM) {
    if (context.text === '/fist' && context.hasAttachments('photo')) {
        const photo = context.getAttachments('photo')[0];
        const imageUrl = photo.largeSizeUrl;
        const image = await loadImage(imageUrl);
        const canvas = createCanvas(256, 256);
        const ctx = canvas.getContext('2d');
        const lineWidth = 27; // 25
        const lineColor = 'red';
        const cornerRadius = 34; // 30
    
        drawSquareOutline(ctx, 256, lineWidth, lineColor, cornerRadius);
        ctx.clip();
        ctx.drawImage(image, 0, 0, 256, 256);
    
        const fistPng = canvas.toBuffer('image/png');
        await context.sendDocuments({
          value: fistPng,
          filename: 'fist.png'
        });
      }

    else if (msg === 'привет') {
        await context.send("Привет!")
    }
    else {
        await context.send(msg)
    }
}}); 
vk.updates.start().catch(console.error);

