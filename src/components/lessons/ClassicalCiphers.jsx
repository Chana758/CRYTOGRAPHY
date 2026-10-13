import CaesarCipher from '@/components/ciphers/CaesarCipher';
import GeneralShift from '@/components/ciphers/GeneralShift';
import AffineCipher from '@/components/ciphers/AffineCipher';

export default function ClassicalCiphers({ currentLesson }) {
  switch (currentLesson) {
    case 'shift':
      return <GeneralShift />;
    case 'affine':
      return <AffineCipher />;
    case 'caesar':
    default:
      return <CaesarCipher />;
  }
}