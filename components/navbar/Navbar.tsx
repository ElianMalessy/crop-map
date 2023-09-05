import CropPicker from './CropPicker';
import CountryPicker from './CountryPicker';
import ThemeToggle from './ThemeToggle';
import LatLngInput from './LatLngInput';

export default function Navbar() {
  return (
    <div className='border-b mb-4'>
      <nav className='flex h-16 items-center justify-between px-3 bg-navBackground'>
        <div className='flex space-x-2 lg:space-x-3 items-center'>
          <CropPicker />
          <CountryPicker />
          <LatLngInput />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
