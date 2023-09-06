import Map from '@/components/map/Map';
import AccordionGraphs from '@/components/graph/AccordionGraphs';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const position = [51.5074, -0.1272];
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 550;

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='flex h-full w-full flex-row items-center justify-center'>
        <div className='grid gap-2 grid-cols-1 w-full'>
          <div
            style={{aspectRatio: DEFAULT_WIDTH / DEFAULT_HEIGHT}}
            className='flex items-center justify-center z-0 h-[550px] w-[100%]'
          >
            <Map center={position} />
          </div>
          <AccordionGraphs />
        </div>
      </div>
    </>
  );
}
