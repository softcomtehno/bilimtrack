import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Select from 'react-select';
import { getSubjectsStudent } from '@/entities/subject/subject.api';
import { useGetPerformanceBySubject } from '@/entities/subject/subject.queries';
import { Loader2, Inbox } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
}

interface ChartDataPoint {
  date: string;
  score: number;
}

export const Chart: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);


  useEffect(() => {
    getSubjectsStudent().then((res) => {
      const list = Array.isArray(res) ? res : res.data;
      setSubjects(list);
      if (list.length > 0) {
        setSelectedSubject(list[0]);
      }
    });
  }, []);


  const { data, isLoading } = useGetPerformanceBySubject(
    selectedSubject?.id ?? 0,
    {
      enabled: !!selectedSubject,
    }
  );

  const chartData: ChartDataPoint[] = data?.data ?? [];

  const options: ApexCharts.ApexOptions = {
    chart: { type: 'line', toolbar: { show: false }, zoom: { enabled: false } },
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: chartData.map((d) => d.date),
      title: { text: 'Даты' },
    },
    yaxis: {
      max: 30,
      min: 0,
      tickAmount: 5,
      title: { text: 'Баллы' },
    },
    colors: ['#0589c7'],
    tooltip: { shared: true },
  };

  const series = [{ name: 'Score', data: chartData.map((d) => d.score) }];

  return (
    <div className="w-full shadow-none rounded-lg border border-alto relative">
      <Select
        options={subjects.map((s) => ({ value: s.id, label: s.name }))}
        value={
          selectedSubject
            ? { value: selectedSubject.id, label: selectedSubject.name }
            : null
        }
        onChange={(option) => {
          if (option) {
            setSelectedSubject(
              subjects.find((s) => s.id === option.value) || null
            );
          }
        }}
        placeholder="Выберите предмет..."
        isSearchable
        styles={{
          container: (base) => ({ ...base, width: '100%' }),
          control: (base) => ({ ...base, width: '100%' }),
        }}
      />
      <div className="p-0">
        {isLoading ? (
          <div className="flex  flex-col items-center gap-2 text-blue-600">
            <Loader2 className="w-8 h-8" />
            <span>Загрузка данных...</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex flex-col  p-4 items-center gap-2 text-gray-500">
            <Inbox className="w-8 h-8" />
            <span>Нет данных по предмету</span>
          </div>
        ) : (
          <ReactApexChart
            height={350}
            options={options}
            series={series}
            type="line"
          />
        )}
      </div>
    </div>
  );
};
