import React from 'react';
import Image from 'next/image';
import styles from './QRCodeModal.module.css';

interface Props {
  url: string;
  hideModal: () => void;
}

const QrCodeModal: React.FC<Props> = ({ url, hideModal }) => {
  const downloadQRCode = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'qrcode.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Failed to download image', error);
    }
  };

  return (
    <>
      <button className={styles.back} onClick={hideModal}>
        Вернуться
      </button>

      <div className={styles.modal}>
        <Image src={url} width={434} height={431} alt="qr-code-img" />

        <button className={styles.download} onClick={downloadQRCode}>
          Скачать
        </button>
      </div>
    </>
  );
};

export default QrCodeModal;
