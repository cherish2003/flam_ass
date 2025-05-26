'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchEmployees } from '@/store/slices/employeesSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsPage() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);
  const loading = useAppSelector((state) => state.employees.loading);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  if (loading || employees.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const departmentPerformance = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = {
        total: 0,
        count: 0,
      };
    }
    acc[employee.department].total += employee.performanceRating;
    acc[employee.department].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const departments = Object.keys(departmentPerformance);
  const averagePerformance = departments.map(
    (dept) => departmentPerformance[dept].total / departmentPerformance[dept].count
  );

  const ratingDistribution = employees.reduce((acc, employee) => {
    acc[employee.performanceRating] = (acc[employee.performanceRating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const barChartData = {
    labels: departments,
    datasets: [
      {
        label: 'Average Performance Rating',
        data: averagePerformance,
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['★', '★★', '★★★', '★★★★', '★★★★★'],
    datasets: [
      {
        data: [
          ratingDistribution[1] || 0,
          ratingDistribution[2] || 0,
          ratingDistribution[3] || 0,
          ratingDistribution[4] || 0,
          ratingDistribution[5] || 0,
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.5)',
          'rgba(249, 115, 22, 0.5)',
          'rgba(234, 179, 8, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(249, 115, 22)',
          'rgb(234, 179, 8)',
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-3xl font-bold">Analytics Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 5,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              <Doughnut
                data={doughnutChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
} 