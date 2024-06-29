import React from 'react';
import styles from './scss/AboutModal.module.scss';
import { version } from '../package.json';
import FistMakerPrice from './tsx/Price';
import FistMakerDonate from './tsx/Donate';
import FistMakerAuthor from './tsx/Author';
import FistMakerDevelopment from "./tsx/Dev.tsx";

interface AboutModalProps {
  show: boolean;
  onClose: () => void;
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const e = 'https://fistmaker.ru/assets/emoji/';
const a = 'https://fistmaker.ru/assets/';

const FistMakerProject = 
    <>
      <img className={styles.banner} src={`${a}banner-web.jpg`} alt='FistMaker Banner' />
      <h2>О проекте</h2>
      <span>
      <img className={styles.logo} src={`${a}FistMaker.png`}/>  - проект, который позволяет пользователю изготовить fist.png за считанные секунды
        практически не прилагая усилий. <br /> <br />
        {/* Зачаток проекта положил своё начало в 2023-м году на тот момент были скромные, без инициативные 
        попытки реализовать изготовление fist.png посредством языка программирования Python. <br /> <br />
В 2024-м году идея была переосмыслена и приняла статус разработки.*/} <strong>14.01.2024</strong> - вышли  
        в свет первые боты FistMaker ВКонтакте и Telegram. <br /> <br />
      </span>
      <hr /> <br />
      <h2>Использовать <img className={styles.logo} src={`${a}FistMaker.png`}/> в ВКонтакте и Telegram</h2>
      <span>
        Вы можете воспользоваться ботами по этим кнопкам: <br/> <br/>
        <a className={styles.linkBtn} href='https://vk.com/fistmaker' target="_blank"><img src={`${a}vk.png`}/></a>
        <a className={styles.linkBtn} href='https://t.me/FistMakerBot' target="_blank"><img src={`${a}tg.png`}/></a>
      </span> <br /> <br />
    </>

const AboutModal: React.FC<AboutModalProps> = ({ show, onClose, selectedTab, onSelectTab }) => {
  if (!show) {
    return null;
  }

  const tabClasses = (tabName: string) =>
    selectedTab === tabName ? `${styles.tab} ${styles.active}` : styles.tab;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.headerImage}></div>
        <div className={styles.tabContentContainer}>
          <div className={tabClasses('FistMaker')} onClick={() => onSelectTab('FistMaker')}><img className={styles.FistMakerTab} src="https://fistmaker.ru/assets/FistMaker.png"/>
            <img className={styles.statusIconCheck} src={`${e}check.svg`} />
          </div>
          <div className={tabClasses('Development')} onClick={() => onSelectTab('Development')}>Разработка 
            <img className={styles.statusIcon} src={`${e}dev.gif`} />
          </div>
          <div className={tabClasses('Price')} onClick={() => onSelectTab('Price')}>Цена
            <img className={styles.statusIcon} src={`${e}price.gif`} />
          </div>
          <div className={tabClasses('Author')} onClick={() => onSelectTab('Author')}>Автор
            <img className={styles.statusIcon} src={`${e}author.gif`} />
          </div>
          <div className={tabClasses('Donate')} onClick={() => onSelectTab('Donate')}>Donate
            <img className={styles.statusIconDonate} src={`${e}donate.svg`} />
          </div>
          <div className={styles.vModal}>{`v${version}`}<img src={`${e}spin.gif`}/></div>
        </div>
        <div className={styles.content}>
          {selectedTab === 'FistMaker' && FistMakerProject}
          {selectedTab === 'Development' && FistMakerDevelopment}
          {selectedTab === 'Price' && FistMakerPrice}
          {selectedTab === 'Author' && FistMakerAuthor}
          {selectedTab === 'Donate' && FistMakerDonate}
        </div>
      </div>
    </div>
  );
};

export default AboutModal;