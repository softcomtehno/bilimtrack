import {useState} from 'react';
import ReactApexChart from 'react-apexcharts';

import { Book, ChartArea } from 'lucide-react';
import { Card } from '@heroui/card';
import { Select, SelectItem } from '@heroui/react';

interface ChartDataPoint {
  date: string;
  score: number;
}




export const animals = [
  { key: 'cat', label: 'Front-end Разработка' },
  { key: 'dog', label: 'Back-end Разработка' },
  { key: 'elephant', label: 'Кыргыз Тили' },
  { key: 'lion', label: 'Кыргыз Адабият' },
  { key: 'tiger', label: 'Культура речи' },
  { key: 'giraffe', label: 'Человек и Общество' },
];

const subjectData: Record<string, ChartDataPoint[]> = {
  cat: [
    { date: '01-01', score: 5 },
    { date: '01-15', score: 7 },
    { date: '02-01', score: 6 },
    { date: '02-15', score: 8 },
    { date: '03-01', score: 9 },
  ],
  dog: [
    { date: '01-01', score: 4 },
    { date: '01-15', score: 0 },
    { date: '02-01', score: 7 },
    { date: '02-15', score: 5 },
    { date: '03-01', score: 7 },
  ],
  elephant: [
    { date: '01-01', score: 6 },
    { date: '01-15', score: 8 },
    { date: '02-01', score: 0 },
    { date: '02-15', score: 6 },
    { date: '03-01', score: 7 },
  ],
  lion: [
    { date: '01-01', score: 7 },
    { date: '01-15', score: 6 },
    { date: '02-01', score: 8 },
    { date: '02-15', score: 9 },
    { date: '03-01', score: 8 },
  ],
  tiger: [
    { date: '01-01', score: 8 },
    { date: '01-15', score: 9 },
    { date: '02-01', score: 7 },
    { date: '02-15', score: 0 },
    { date: '03-01', score: 6 },
  ],
  giraffe: [
    { date: '01-01', score: 5 },
    { date: '01-15', score: 4 },
    { date: '02-01', score: 6 },
    { date: '02-15', score: 7 },
    { date: '03-01', score: 5 },
  ],
};

export const Chart: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('cat');
  const chartData = subjectData[selectedSubject] ?? [];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: chartData.map((data) => data.date),
      title: { text: 'Даты' },
    },
    yaxis: {
      max: 10,
      min: 0,
      tickAmount: 5,
      title: { text: 'Баллы' },
    },
    colors: ['#0589c7'],
    tooltip: { shared: true },
  };

  const series = [
    {
      name: 'Score',
      data: chartData.map((data) => data.score),
    },
  ];

  return (
    <div className="w-full shadow-none rounded-lg border border-alto relative">
      <div className="flex items-center gap-2 p-2">
        <Select
          className="max-w-full bg-white rounded-t-md"
          defaultSelectedKeys={['cat']}
          label="График успеваемости"
          color="primary"
          placeholder="Выберите предмет"
          startContent={<Book />}
          radius="sm"
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0];
            setSelectedSubject(key);
          }}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key} value={animal.key}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="p-0">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};
""
