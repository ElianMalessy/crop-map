'use client';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import Footer from '@/components/footer/Footer';

import {useStateStore} from '@/store/useStateStore';
import Graph from './Graph';

export default function AccordionGraphs() {
  const {markerLocations} = useStateStore((state) => state);
  return (
    <Accordion type='single' collapsible className='w-[calc(100%-1rem)] h-[10vh]'>
      {markerLocations.map((markerLocation: number[], i: number) => {
        return (
          <AccordionItem value={`item-${i}`} key={i}>
            <AccordionTrigger>
              Data for (latitude: {markerLocation[0]}, longitude: {markerLocation[1]})
            </AccordionTrigger>
            <AccordionContent>
              <Graph latitude={markerLocation[0]} longitude={markerLocation[1]} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
      <Footer />
    </Accordion>
  );
}
