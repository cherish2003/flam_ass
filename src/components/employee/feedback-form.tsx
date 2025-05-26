'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const feedbackSchema = z.object({
  feedback: z
    .string()
    .min(10, 'Feedback must be at least 10 characters')
    .max(500, 'Feedback must not exceed 500 characters'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  employeeId: number;
  employeeName: string;
}

export function FeedbackForm({ employeeId, employeeName }: FeedbackFormProps) {
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: '',
    },
  });

  function onSubmit(data: FeedbackFormValues) {
    console.log('Submitting feedback:', data.feedback, 'for employee:', employeeId);
    toast.success('Feedback submitted successfully');
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback for {employeeName}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your feedback here..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide constructive feedback about the employee&apos;s performance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Feedback</Button>
      </form>
    </Form>
  );
} 