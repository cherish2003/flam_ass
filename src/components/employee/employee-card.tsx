import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookmarkPlus, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { toggleBookmark } from '@/store/slices/bookmarksSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'sonner';

interface EmployeeCardProps {
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    department: string;
    performanceRating: number;
    image: string;
  };
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const dispatch = useAppDispatch();
  const bookmarkedEmployees = useAppSelector((state) => state.bookmarks.bookmarkedEmployees);
  const isBookmarked = bookmarkedEmployees.includes(employee.id);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handlePromote = () => {
    toast.success('Employee promoted successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-16 sm:h-18">
            <div className="absolute " />
            <Avatar className="absolute -bottom-4 left-4 h-10 w-10 sm:h-12 sm:w-12 border-2 border-background shadow-md">
              <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
              <AvatarFallback>
                {employee.firstName[0]}
                {employee.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="mt-6 space-y-2 p-4 flex-grow">
          <div>
            <h3 className="font-semibold truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs">{employee.department}</Badge>
              <Badge variant="outline" className="text-xs">Age: {employee.age}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                  index < employee.performanceRating
                    ? getRatingColor(employee.performanceRating)
                    : 'text-gray-300'
                }`}
                fill={index < employee.performanceRating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 p-4 pt-0">
          <Link href={`/dashboard/employee/${employee.id}`} className="w-full sm:flex-1">
            <Button className="w-full" variant="outline" size="sm">
              View
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:flex-1"
            onClick={() => dispatch(toggleBookmark(employee.id))}
          >
            {isBookmarked ? (
              <BookmarkCheck className="mr-2 h-4 w-4" />
            ) : (
              <BookmarkPlus className="mr-2 h-4 w-4" />
            )}
            <span className="truncate">{isBookmarked ? 'Saved' : 'Save'}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:flex-1"
            onClick={handlePromote}
          >
            <ArrowUpRight className="mr-2 h-4 w-4" />
            <span className="truncate">Promote</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}