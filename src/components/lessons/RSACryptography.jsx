import RSAKeyGen from '@/components/ciphers/RSAKeyGen';
import RSAEncrypt from '@/components/ciphers/RSAEncrypt';
import RSADecrypt from '@/components/ciphers/RSADecrypt';

export default function RSACryptography({ currentLesson }) {
  switch (currentLesson) {
    case 'rsaencrypt':
      return <RSAEncrypt />;
    case 'rsadecrypt':
      return <RSADecrypt />;
    case 'rsakeygen':
    default:
      return <RSAKeyGen />;
  }
}