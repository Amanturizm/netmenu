import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './QRCodeModal.module.css';
import Preloader from '@/app/components/UI/Preloader/Preloader';

interface Props {
  url: string;
  hideModal: () => void;
}

const QrCodeModal: React.FC<Props> = ({ url, hideModal }) => {
  const [downloadIsLoading, setDownloadIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const downloadQRCode = async () => {
    try {
      setDownloadIsLoading(true);
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
    } finally {
      setDownloadIsLoading(false);
    }
  };

  return (
    <>
      <button className={styles.back} onClick={hideModal}>
        Вернуться
      </button>

      <div className={styles.modal}>
        <Image src={url} width={434} height={431} alt="qr-code-img" />

        <button className={styles.download} onClick={downloadQRCode} disabled={downloadIsLoading}>
          {downloadIsLoading ? <Preloader color="#fff" scale={0.8} margin="0" /> : 'Скачать'}
        </button>
      </div>
    </>
  );
};

export default QrCodeModal;
