'use client';

import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchEmployees, setSelectedDepartments, setSelectedRatings, resetEmployees, incrementPage } from '@/store/slices/employeesSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Mail, Building2, BookmarkPlus, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toggleBookmark } from '@/store/slices/bookmarksSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EmployeeCard } from '@/components/employee/employee-card';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton';

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Product', 'Design', 'Operations'];
const ratings = [1, 2, 3, 4, 5];

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { 
    employees, 
    loading, 
    error, 
    searchTerm, 
    selectedDepartments = [], 
    selectedRatings = [],
    hasMore
  } = useAppSelector((state) => state.employees);

  const { ref, inView } = useInView({
    threshold: 0.1,
    delay: 100
  });

  useEffect(() => {
    dispatch(resetEmployees());
    dispatch(fetchEmployees());
  }, [selectedDepartments, selectedRatings, dispatch]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      dispatch(incrementPage());
      dispatch(fetchEmployees());
    }
  }, [inView, hasMore, loading, dispatch]);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      searchTerm === '' ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartments.length === 0 || selectedDepartments.includes(employee.department);

    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(employee.performanceRating);

    return matchesSearch && matchesDepartment && matchesRating;
  });

  const handlePromote = (employeeId: number) => {
    toast.success('Employee promoted successfully!');
  };

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <div className="flex flex-wrap gap-4">
            <Select
              value={selectedDepartments.length > 0 ? selectedDepartments.join(',') : undefined}
              onValueChange={(value) => 
                dispatch(setSelectedDepartments(value ? value.split(',') : []))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedRatings.length > 0 ? selectedRatings.join(',') : undefined}
              onValueChange={(value) =>
                dispatch(setSelectedRatings(value ? value.split(',').map(Number) : []))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {(selectedDepartments.length > 0 || selectedRatings.length > 0) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedDepartments.map((dept) => (
              <Badge
                key={dept}
                variant="secondary"
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    setSelectedDepartments(
                      selectedDepartments.filter((d) => d !== dept)
                    )
                  )
                }
              >
                {dept} ×
              </Badge>
            ))}
            {selectedRatings.map((rating) => (
              <Badge
                key={rating}
                variant="secondary"
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    setSelectedRatings(selectedRatings.filter((r) => r !== rating))
                  )
                }
              >
                {rating} Star{rating !== 1 ? 's' : ''} ×
              </Badge>
            ))}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <div ref={ref} className="h-20" />

        {filteredEmployees.length === 0 && !loading && (
          <div className="mt-8 text-center text-lg text-muted-foreground">
            No employees found matching your criteria.
          </div>
        )}

        {!hasMore && filteredEmployees.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No more employees to load
          </div>
        )}
      </motion.div>
    </div>
  );
} 