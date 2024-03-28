import React, { useState, useRef, useEffect } from 'react';
import styles from './scss/FistMaker.module.scss';

interface FixedDimensions {
    width: number;
    height: number;
  }

const FistMaker: React.FC = () => {
  const fixedDimensions: FixedDimensions = { width: 256, height: 256 };
  const [borderType, setBorderType] = useState<string>('round');
  const [borderThickness, setBorderThickness] = useState<number>(5);
  const [borderColor, setBorderColor] = useState<string>('#000000');
  const [outputImage, setOutputImage] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (imageInputRef.current?.files && imageInputRef.current.files.length > 0) {
      updateImagePreview(imageInputRef.current.files[0]);
    }
  }, [borderType, borderThickness, borderColor]);

  useEffect(() => {
    if (borderType === 'square') {
      setBorderThickness(40);
    }
    else if (borderType === 'round') {
      setBorderThickness(5);
    }
  }, [borderType]);

  const handleBorderThicknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setBorderThickness(value as unknown as number); 
    } else {
      const intValue = Math.max(1, parseInt(value, 10));
      if (!isNaN(intValue)) {
        setBorderThickness(intValue);
      }
    }
  };

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
  
  const updateImagePreview = (file: File) => {
    const reader = new FileReader();
    const clearImage = true;

    reader.onload = function (e) {
      const img = new Image();
      img.src = (e.target as FileReader).result as string;

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
    
        canvas.width = fixedDimensions.width;
        canvas.height = fixedDimensions.height;
    
        ctx.fillStyle = clearImage ? 'rgba(0, 0, 0, 0)' : 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.beginPath();

        if (borderType === 'round') {
            ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2 - borderThickness / 2, 0, 2 * Math.PI);
          } else if (borderType === 'square') {
            const size = Math.min(canvas.width, canvas.height);
            const cornerRadius = 20; 
            drawSquareOutline(ctx, size, borderThickness, borderColor, cornerRadius);
          }

        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        if (borderThickness > 0) {
          ctx.beginPath();
          if (borderType === 'round') {
            ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2 - borderThickness / 2, 0, 2 * Math.PI);
          }
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = borderThickness;
          ctx.stroke();
        }

        const dataUrl = canvas.toDataURL('image/png');
        setOutputImage(dataUrl);

        if (downloadLinkRef.current) {
          downloadLinkRef.current.href = dataUrl;
          downloadLinkRef.current.style.display = 'block';
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      updateImagePreview(file);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}></h1>
      <div className={styles.controls}>
        <div className={styles.group}>
          <label htmlFor="imageInput">Выберите картинку:</label>
          <input ref={imageInputRef} type="file" id="imageInput" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className={styles.group}>
          <label htmlFor="borderType">Вариант обводки:</label>
          <select id="borderType" value={borderType} onChange={(e) => setBorderType(e.target.value)}>
            <option value="round">Круглая ⚪ </option>
            <option value="square">Квадратная 🔲 </option>
          </select>
        </div>
        {borderType === 'round' && (
          <div className={styles.group}>
            <label htmlFor="borderThickness">Толщина обводки:</label>
            <input type="number" id="borderThickness" value={borderThickness} min="1" onChange={handleBorderThicknessChange} />
          </div>
        )}
        <div className={styles.group}>
            <label htmlFor="borderColor">Цвет обводки: </label>
            <input type="color" id="borderColor" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
        </div>
        <div className={styles.tooltipWrapper}>
        <button className={styles.tooltipButton} disabled>
         ✨ Сгенерировать фист ✨
        </button>
        <span className={styles.tooltipText}> 🛠️ Скоро...</span>
      </div>
      </div>
      <img id="outputImage" src={outputImage} alt="Загрузите картинку" className={styles.outputImage} />
      <div className={styles.imageInfo}>{outputImage && 'fist.png 256x256'}</div>
      <a ref={downloadLinkRef} className={styles.downloadLink} download="fist.png" style={{ display: outputImage ? 'block' : 'none' }}>
        Скачать fist.png
      </a>
      <span>Выполнено на React & TypeScript 💙 © FistMaker 2024 </span>
      <span>Используйте так же в: <a href='https://vk.com/fistmaker'>ВКонтакте</a> & <a href='https://t.me/FistMakerBot'>Telegram</a></span>
      <span>Github: <a href='https://github.com/SMamashin/fist-maker'>github.com/SMamashin/fist-maker</a></span>
      <span>BlastHack: <a href='https://www.blast.hk/threads/200594/'>blast.hk/threads/200594/</a></span>
      <span className={styles.v}>v1.0.5-alpha 🛠️</span>
    </div>
  );
};

export default FistMaker;