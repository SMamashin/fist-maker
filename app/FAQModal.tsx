import React, { useState } from 'react';
import styles from './scss/FAQModal.module.scss';

interface FAQModalProps {
    show: boolean;
    onClose: () => void;
}

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'Будет ли таблица созданных фистов?',
        answer: 'Ответ: Вряд-ли, поскольку нету обработчика содержимого',
    },
    {
        question: 'Вернётся ли функция "Сгенерировать фист"?',
        answer: 'Ответ: Вернётся, как только я найду подходящие сервисы и допишу API',
    },
    {
        question: 'Есть ли возможность двигать картинку?',
        answer: 'Ответ: Нет, пока-что, такой возможности нет',
    },
    {
        question: 'Есть ли лимит на создание фистов?',
        answer: 'Ответ: Нет, никаких ограничений пока-что нет',
    },
    {
        question: 'Будут ли обновления, продвижения',
        answer: 'Ответ: Да, я поддерживаю проект обновлениями и планирую приобретать рекламу',
    },
    {
        question: 'Станет ли FistMaker платным?',
        answer: 'Ответ: Скорее всего нет, у меня есть планы на 2-й мажор, но это лишь планы.',
    },
];

const FAQModal: React.FC<FAQModalProps> = ({ show, onClose }) => {
    const [openQuestions, setOpenQuestions] = useState<number[]>([]);

    const toggleFAQItem = (index: number) => {
        setOpenQuestions(openQuestions.includes(index)
            ? openQuestions.filter(i => i !== index)
            : [...openQuestions, index]);
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <div className={styles.headerImage}></div>
                <div className={styles.content}>
                    {faqData.map((item, index) => (
                        <div key={index} className={styles.faqItem}>
                            <button
                                className={`${styles.question} ${openQuestions.includes(index) ? styles.pressed : ''}`}
                                onClick={() => toggleFAQItem(index)}>
                                {item.question}
                            </button>
                            <div className={`${styles.answer} ${openQuestions.includes(index) ? styles.active : ''}`}>
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
                <br/>
                <span>Раздел на стадии разработки! Добавить свой вопрос можно
                    <a href="https://vk.com/wall-224244475_17" target="_blank"> здесь</a>
                </span>
            </div>
        </div>
    );
};

export default FAQModal;