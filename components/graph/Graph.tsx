'use client';
import {useTheme} from 'next-themes';
import {Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const data = [
  {
    price: 240,
    yield: 1004,
  },
  {
    price: 300,
    yield: 2004,
  },
  {
    price: 200,
    yield: 944,
  },
  {
    price: 278,
    yield: 1420,
  },
  {
    price: 189,
    yield: 700,
  },
  {
    price: 239,
    yield: 1232,
  },
  {
    price: 282,
    yield: 1602,
  },
  {
    price: 198,
    yield: 904,
  },
];

const CustomTooltip = ({active, payload, label}: any) => {
  if (!(active && payload && payload.length)) return null;
  return (
    <div className='custom-tooltip'>
      <p className='label'>{`Price : ${label}`}</p>
      <p className='label'>{`Yield : ${payload[0].value}`}</p>
    </div>
  );
};

export default function Graph() {
  const {theme} = useTheme();
  const sortedData = data.sort((a, b) => a.price - b.price);

  return (
    <div className='grid gap-4 sm:grid-cols-1 xl:grid-cols-2'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-base font-normal'>Yield / Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>$15,231.89</div>
          <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
          <div className='h-[15rem] w-[15rem]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={sortedData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -17,
                  bottom: 0,
                }}
              >
                <Line
                  type='monotone'
                  strokeWidth={2}
                  dataKey='yield'
                  activeDot={{
                    r: 6,
                    style: {fill: 'var(--theme-primary)', opacity: 0.25},
                  }}
                  style={
                    {
                      stroke: 'var(--theme-primary)',
                      '--theme-primary': `hsl(${theme === 'dark' ? '217.2 91.2% 59.8%' : '221.2 83.2% 53.3%'})`,
                    } as React.CSSProperties
                  }
                />
                <Tooltip content={<CustomTooltip />} />

                <XAxis dataKey='price' />
                <YAxis dataKey='yield' />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-centyield justify-between space-y-0 pb-2'>
          <CardTitle className='text-base font-normal'>Yields</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+2350</div>
          <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
          <div className='h-[15rem] w-[15rem]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={sortedData} margin={{top: 10, right: 10, left: -17, bottom: 0}}>
                <Bar
                  dataKey='yield'
                  style={
                    {
                      fill: 'var(--theme-primary)',
                      opacity: 1,
                      '--theme-primary': `hsl(${theme === 'dark' ? '217.2 91.2% 59.8%' : '221.2 83.2% 53.3%'})`,
                    } as React.CSSProperties
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <XAxis dataKey='price' />
                <YAxis dataKey='yield' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
