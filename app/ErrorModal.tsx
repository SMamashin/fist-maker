import React, { useState } from 'react';
import styles from './scss/ErrorModal.module.scss';

interface ErrorModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (email: string, message: string) => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, message);
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <form className={styles.modalContent} onSubmit={handleSubmit}>
            <span>С помощью данной формы, вы можете сообщить об ошибке возникшей в ходе
                эксплуатации FistMaker. Указывайте действительный E-Mail, туда будет направлен ответ.
            </span> <br/>
          <input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            id="message"
            rows={4}
            placeholder="Введите ваше сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className={styles.submitButton}>Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ErrorModal;