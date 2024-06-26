import React, { useState, useRef, useEffect } from 'react';
import styles from './scss/FistMaker.module.scss';
import { version } from '../package.json'; // Version APP
import ErrorModal from './ErrorModal'; // Modal Report
import AboutModal from './AboutModal'; // Modal AboutProject
// @ts-ignore
import FAQModal from "./FAQModal"; // Modal FaqProject
import PrivacyPolicy from './PrivacyPolicy';
import axios from 'axios';

interface FixedDimensions {
    width: number;
    height: number;
  }

const FistMaker: React.FC = () => {
  const e = 'https://fistmaker.ru/assets/emoji/';
  const fixedDimensions: FixedDimensions = { width: 200, height: 200 };
  const imageInputRef = useRef<HTMLInputElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [showErrorModal, setShowErrorModal] = useState(false); // Report modal state
  const [showAboutModal, setShowAboutModal] = useState(false); // AboutProject Modal state
  const [showFAQModal, setShowFAQModal] = useState(false); // FAQ Modal state
  const [showPolicyModal, setShowPolicyModal] = useState(false); // Private policy modal
  const [selectedTab, setSelectedTab] = useState('FistMaker'); // Tab in modal
  const [borderType, setBorderType] = useState<string>('round');
  const [borderThickness, setBorderThickness] = useState<number>(5);
  const [borderColor, setBorderColor] = useState<string>('#000000');
  const [outputImage, setOutputImage] = useState<string>(''); 
  const [isReportSent, setIsReportSent] = useState(false); // Report notify state
  const [Notification, setNotification] = useState(true); // Just notify state

  useEffect(() => {
    if (imageInputRef.current?.files && imageInputRef.current.files.length > 0) {
      updateImagePreview(imageInputRef.current.files[0]);
    }
  }, [borderType, borderThickness, borderColor]);

  useEffect(() => {
    if (borderType === 'square') {
      setBorderThickness(30);
    }
    else if (borderType === 'round') {
      setBorderThickness(5);
    }
  }, [borderType]);

  useEffect(() => { // just notify hook
    const timer = setTimeout(() => {
      setNotification(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
  // Policy Modal
  const handleOpenPolicyModal = () => setShowPolicyModal(true);
  const handleClosePolicyModal = () => setShowPolicyModal(false);

  // Report Modal
  const handleOpenErrorModal = () => setShowErrorModal(true);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  // About Modal
  const handleOpenAboutModal = () => setShowAboutModal(true);
  const handleCloseAboutModal = () => setShowAboutModal(false);
  const handleSelectTab = (tab: string) => setSelectedTab(tab);

  // FAQ Modal
  const handleOpenFAQModal = () => setShowFAQModal(true);
  const handleCloseFAQModal = () => setShowFAQModal(false);


  const handleErrorModalSubmit = async (email: string, message: string): Promise<void> => {
    if (message.length > 256) {
      return;
    }
  
    try {
      const response = await axios.post('https://fistmaker.ru/api/', {
        email,
        message
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
  
      if (response.status === 200) {
        setIsReportSent(true);
        setTimeout(() => setIsReportSent(false), 5000);
        handleCloseErrorModal();
      }
    } catch (error) {
      // pass
    }
  };

  const handleBorderThicknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let intValue = value === '' ? 0 : parseInt(value, 10);
  
    if (isNaN(intValue) || intValue < 1) {
      intValue = 1;
    } else if (borderType === 'square' && intValue > 50) {
      intValue = 50;
    } else if (borderType === 'round' && intValue > 25) {
      intValue = 25;
    }
  
    setBorderThickness(intValue);
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
        const aspectRatio = img.width / img.height;
        const imgResized = {
          width: aspectRatio >= 1 ? canvas.height * aspectRatio : canvas.width,
          height: aspectRatio >= 1 ? canvas.height : canvas.width / aspectRatio,
        };
        ctx.drawImage(img, -((imgResized.width - canvas.width) / 2), -((imgResized.height - canvas.height) / 2), imgResized.width, imgResized.height);
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
      {Notification && (<div className={styles.notify}><img src={`${e}fire.gif`}/>{`v${version} - Уменьшен размер фиста`}</div>)}
      {isReportSent && (<div className={styles.notification}>Ваше сообщение отправлено! Спасибо.</div>)}
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
        <div className={styles.group}>
        <label htmlFor="borderThickness" className="borderThicknessLabel">
          Толщина обводки:
          <div className={styles.borderThicknessValue}>
            {borderThickness}
          </div>
        </label>
          <input
            type="range"
            id="borderThickness"
            className={styles.borderThicknessSlider}
            value={borderThickness}
            min="1"
            max={borderType === 'square' ? 50 : 25}
            onChange={handleBorderThicknessChange}
          />
      </div>
        <div className={styles.group}>
            <label htmlFor="borderColor">Цвет обводки: </label>
            <input type="color" id="borderColor" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
        </div>
      </div>
      <img id="outputImage" src={outputImage} alt='Загрузите своё изображение' className={styles.outputImage} />
      <div className={styles.imageInfo}>{outputImage && 'fist.png 200x200'}</div>
      <a ref={downloadLinkRef} className={styles.downloadLink} download="fist.png" style={{ display: outputImage ? 'block' : 'none' }}>
        Скачать fist.png
      </a>
      <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} onSubmit={handleErrorModalSubmit} />
      <AboutModal show={showAboutModal} onClose={handleCloseAboutModal} selectedTab={selectedTab} onSelectTab={handleSelectTab} />
      <FAQModal show={showFAQModal} onClose={handleCloseFAQModal} />
      <div className={styles.footerLinks}>
        <span className={styles.prod}><img src={`${e}ts.svg`}/> + <img src={`${e}react.svg`}/> + <img src={`${e}vite.svg`}/> = © FistMaker 💙</span>
        <div className={styles.linksContainer}>
          <span className={styles.linkProject} onClick={handleOpenAboutModal}>О проекте</span>
          <span className={styles.linkDivider}>·</span>
          <span className={styles.linkFaq} onClick={handleOpenFAQModal} >F.A.Q</span>
          <span className={styles.linkDivider}>·</span>
          <span className={styles.sendError} onClick={handleOpenErrorModal}>
            Сообщить об ошибке
          </span>
        </div>
        <span>Используйте так же в: <a href='https://vk.com/fistmaker'>ВКонтакте</a> & <a href='https://t.me/FistMakerBot'>Telegram</a></span>
        <span className={styles.link} onClick={handleOpenPolicyModal}><img src={`${e}policy.gif`}/> Политика конфиденциальности</span>
        <span className={styles.link}><img src={`${e}git.png`}/> <a href='https://github.com/SMamashin/fist-maker'>github.com/FistMaker</a></span>
        <span className={styles.link}><img src={`${e}bh.png`}/> <a href='https://www.blast.hk/threads/200594/'>blast.hk/FistMaker</a></span>
        {showPolicyModal && (
          <div className={styles.modal}>
            <div className={styles.modalcontent}>
              <h2>Политика Конфиденциальности FistMaker</h2>
              <p> {PrivacyPolicy} </p>
              <button onClick={handleClosePolicyModal}>Понятно</button>
            </div>
          </div>
        )}
      </div>
      <span className={styles.v}>{`v${version}`}<img src={`${e}spin.gif`}/></span>
    </div>
  );
};

export default FistMaker;