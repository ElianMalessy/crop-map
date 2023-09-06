import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

export default function DataTable({data}: {data: any}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Jan</TableHead>
          <TableHead>Feb</TableHead>
          <TableHead>Mar</TableHead>
          <TableHead>Apr</TableHead>
          <TableHead>May</TableHead>
          <TableHead>Jun</TableHead>
          <TableHead>Jul</TableHead>
          <TableHead>Aug</TableHead>
          <TableHead>Sep</TableHead>
          <TableHead>Oct</TableHead>
          <TableHead>Nov</TableHead>
          <TableHead>Dec</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Min Temperature (°C)</TableCell>
          {data && data.map((value: any, i: number) => <TableCell key={i.toString()}>{value.tn}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Max Temperature (°C)</TableCell>
          {data && data.map((value: any, i: number) => <TableCell key={1000 + i}>{value.tx}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Precipitation (mm)</TableCell>
          {data && data.map((value: any, i: number) => <TableCell key={2000 + i}>{value.pr}</TableCell>)}
        </TableRow>
      </TableBody>
    </Table>
  );
}
