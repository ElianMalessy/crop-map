'use client';
import {useEffect, useRef, useState} from 'react';
import {useTheme} from 'next-themes';
import {Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Label} from 'recharts';

import {Card, CardContent} from '@/components/ui/card';
import {useStateStore} from '@/store/useStateStore';
import DataTable from './DataTable';

const CustomTooltip = ({active, payload, label, type}: any) => {
  if (!(active && payload && payload.length && type)) return null;
  return (
    <div className='custom-tooltip'>
      <p className='label'>{`Month : ${label}`}</p>
      {type[0] === 'T' ? (
        <>
          <p className='label'>{`Min ${type} : ${payload[0].value}`}</p>
          <p className='label'>{`Max ${type} : ${payload[1].value}`}</p>
        </>
      ) : (
        <p className='label'>{`${type} : ${payload[0].value}`}</p>
      )}
    </div>
  );
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export default function Graph({latitude, longitude}: {latitude: number; longitude: number}) {
  const [data, setData] = useState();
  const dataRef: any = useRef([]);
  useEffect(() => {
    // if (!latitude || !longitude) return;
    console.log('here');

    fetch(`/api/crop-data?lat=${latitude}&lng=${longitude}`)
      .then((res) => res.json())
      .then((value: any) => {
        const {data}: any = value;
        for (let i = 0; i < 12; i++) {
          dataRef.current.push({month: months[i], pr: data.pr[i], tn: data.tn[i], tx: data.tx[i]});
        }
        setData(dataRef.current);
      });
  }, [latitude, longitude]);

  const {theme} = useTheme();
  return (
    <Card className='grid grid-rows-2 grid-cols-2 grid-flow-row pt-4'>
      <div className='h-full w-full flex items-center justify-center'>
        <CardContent>
          <div className='text-2xl font-bold ml-11'>Extreme Temperatures (°C)</div>
          <p className='text-xs text-muted-foreground ml-11'>+2.1° on average from last year </p>
          <div className='h-[15rem] w-[40vw]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  xAxisId={'Month'}
                  yAxisId={'Temperature (°C)'}
                  type='monotone'
                  strokeWidth={2}
                  dataKey='tn'
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
                <Line
                  xAxisId={'Month'}
                  yAxisId={'Temperature (°C)'}
                  type='monotone'
                  strokeWidth={2}
                  dataKey='tx'
                  activeDot={{
                    r: 6,
                    style: {fill: 'var(--theme-secondary)', opacity: 0.25},
                  }}
                  style={
                    {
                      stroke: 'var(--theme-secondary)',
                      '--theme-secondary': `hsl(${theme === 'dark' ? '210 40% 98%' : '222.2 47.4% 11.2%'})`,
                    } as React.CSSProperties
                  }
                />
                <Tooltip content={<CustomTooltip type={'Temperature (°C)'} />} />

                <XAxis dataKey='month' xAxisId={'Month'} />
                <YAxis dataKey='tx' yAxisId={'Temperature (°C)'}>
                  <Label value='Temperature (°C)' angle={-90} position={'insideBottomLeft'} offset={20} />
                </YAxis>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </div>
      <div className='h-full w-full flex items-center justify-center'>
        <CardContent>
          <div className='text-2xl font-bold ml-11'>Monthly Precipitation</div>
          <p className='text-xs text-muted-foreground ml-11'>+41.7% on average from last year</p>
          <div className='h-[15rem] w-[40vw]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data} margin={{top: 10, right: 10, left: 10, bottom: 0}}>
                <Bar
                  xAxisId={'Month'}
                  yAxisId={'Precipitation (mm)'}
                  dataKey='pr'
                  style={
                    {
                      fill: 'var(--theme-primary)',
                      opacity: 1,
                      '--theme-primary': `hsl(${theme === 'dark' ? '217.2 91.2% 59.8%' : '221.2 83.2% 53.3%'})`,
                    } as React.CSSProperties
                  }
                />
                <Tooltip content={<CustomTooltip type={'Precipitation (mm)'} />} />
                <XAxis dataKey='month' xAxisId={'Month'} />
                <YAxis dataKey='pr' yAxisId={'Precipitation (mm)'}>
                  <Label value='Precipitation (mm)' angle={-90} position={'insideBottomLeft'} offset={20} />
                </YAxis>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </div>
      <div className='w-full col-span-2'>
        <DataTable data={data} />
      </div>
    </Card>
  );
}
