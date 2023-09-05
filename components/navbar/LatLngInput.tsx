import {useContext} from 'react';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {SetMarkerContext} from '@/app/page';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});
const LatLngForm = () => {
  const {setMarkerLocations, setMarkerNumber} = useContext(SetMarkerContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latitude: 51.5074,
      longitude: -0.1272,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setMarkerLocations((MarkersArray: number[][]) => {
      MarkersArray.push([values.latitude, values.longitude]);
      console.log(MarkersArray.length);
      setMarkerNumber(MarkersArray.length);
      return MarkersArray;
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='grid gap-2 py-4'>
            <FormField
              control={form.control}
              name='latitude'
              render={({field}) => (
                <FormItem className='items-center'>
                  <div className='grid grid-cols-4 gap-4 items-center'>
                    <FormLabel htmlFor='latitude' className='text-right'>
                      Latitude
                    </FormLabel>
                    <FormControl>
                      <Input id='latitude' className='col-span-3' type='text' {...field} autoComplete='off' />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='longitude'
              render={({field}) => (
                <FormItem className='items-center'>
                  <div className='grid grid-cols-4 gap-4 items-center'>
                    <FormLabel htmlFor='longitude' className='text-right'>
                      Longitude
                    </FormLabel>
                    <FormControl>
                      <Input id='longitude' className='col-span-3' type='text' {...field} autoComplete='off' />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button type='submit'>Create</Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
};

export default function LatLngInput() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Create Marker</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create Marker</DialogTitle>
          <DialogDescription>
            Set a specific Latitude and Longitude for a marker that you want to create.
          </DialogDescription>
        </DialogHeader>
        <LatLngForm />
      </DialogContent>
    </Dialog>
  );
}
