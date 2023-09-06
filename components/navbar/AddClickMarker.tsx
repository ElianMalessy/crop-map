'use client';
import {Plus} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {useStateStore} from '@/store/useStateStore';

export default function AddClickMarker() {
  const {setClicked} = useStateStore((state) => state);
  return (
    <Button variant='outline' size='icon' onClick={() => setClicked(true)}>
      <Plus className='h-4 w-4' />
    </Button>
  );
}
