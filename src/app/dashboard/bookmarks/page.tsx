'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EmployeeCard } from '@/components/employee/employee-card';

export default function BookmarksPage() {
  const router = useRouter();
  const bookmarkedEmployees = useAppSelector((state) => state.bookmarks.bookmarkedEmployees);
  const employees = useAppSelector((state) => state.employees.employees);

  const bookmarkedEmployeeDetails = employees.filter((employee) =>
    bookmarkedEmployees.includes(employee.id)
  );

  if (bookmarkedEmployeeDetails.length === 0) {
    return (
      <div className="container mx-auto">
        <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold">No Bookmarked Employees</h1>
          <p className="text-muted-foreground">
            Start bookmarking employees from the dashboard to see them here.
          </p>
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        </div>
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
        <h1 className="mb-8 text-3xl font-bold">Bookmarked Employees</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bookmarkedEmployeeDetails.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </motion.div>
    </div>
  );
} 