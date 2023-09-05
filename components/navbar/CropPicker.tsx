import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export default function CropPicker() {
  return (
    <Select>
      <SelectTrigger className='w-[180px] font-medium'>
        <SelectValue placeholder='Select a crop' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='blueberry'>Blueberry</SelectItem>
          <SelectItem value='grapes'>Grapes</SelectItem>
          <SelectItem value='pineapple'>Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
