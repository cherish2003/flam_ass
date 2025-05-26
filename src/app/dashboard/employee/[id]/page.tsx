'use client';

import { use, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { notFound } from 'next/navigation';
import { Employee, RootState } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeedbackForm } from '@/components/employee/feedback-form';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EmployeeProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const employeeId = parseInt(resolvedParams.id);
  
  const employee = useAppSelector((state: RootState) =>
    state.employees.employees.find((e) => e.id === employeeId)
  );

  if (!employee) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState('overview');

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const mockBio = `${employee.firstName} is a dedicated professional with ${
    Math.floor(Math.random() * 10) + 1
  } years of experience in the ${
    employee.department
  } department. Known for exceptional problem-solving skills and team collaboration.`;

  const mockProjects = [
    {
      id: 1,
      name: 'Project Alpha',
      status: 'Completed',
      contribution: 'Lead Developer',
      date: '2023-Q4',
    },
    {
      id: 2,
      name: 'Project Beta',
      status: 'In Progress',
      contribution: 'Technical Advisor',
      date: '2024-Q1',
    },
    {
      id: 3,
      name: 'Project Gamma',
      status: 'Planning',
      contribution: 'Team Member',
      date: '2024-Q2',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
                <AvatarFallback>
                  {employee.firstName.toString().charAt(0)}
                  {employee.lastName.toString().charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">
                  {employee.firstName} {employee.lastName}
                </h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{employee.department}</Badge>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < employee.performanceRating
                            ? getRatingColor(employee.performanceRating)
                            : 'text-gray-300'
                        }`}
                        fill={index < employee.performanceRating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {employee.address.street}, {employee.address.city}, {employee.address.state}{' '}
                      {employee.address.postalCode}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.company?.title}</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="mb-2 font-semibold">Bio</h3>
                    <p className="text-muted-foreground">{mockBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.contribution}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          project.status === 'Completed'
                            ? 'default'
                            : project.status === 'In Progress'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {project.status}
                      </Badge>
                      <p className="mt-1 text-sm text-muted-foreground">{project.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <FeedbackForm
                  employeeId={employee.id}
                  employeeName={`${employee.firstName} ${employee.lastName}`}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 