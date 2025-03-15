import TopHeader from '@/components/TopHeader/topHeader';
import BottomHeader from '@/components/BottomHeader/bottomHeader';
import EmblaCarousel from '@/components/EmblaCarousel/emblaCarousel';

// Array of images for the carousel
const homePageImages = [
  '/home-image-1.png',
  '/home-image-2.png',
  '/home-image-3.png',
  '/home-image-4.png',
  '/home-image-5.png',
  '/home-image-6.png',
];

export default function Home() {
  return (
    <div className="container">
      <TopHeader />
      <div className="content">
        <EmblaCarousel slides={homePageImages} />
      </div>
      <BottomHeader />
    </div>
  );
}