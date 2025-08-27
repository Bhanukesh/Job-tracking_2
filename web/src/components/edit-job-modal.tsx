"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Loader2, Check } from "lucide-react"
import { useUpdateJobMutation, type JobItem } from "@/store/api/enhanced/jobs"
import { jobApplicationSchema, transformToUpdateCommand, type JobApplicationFormData } from "@/lib/validations/jobApplication"
import { formatDateForInput } from "@/lib/utils/date"
import { toast } from "sonner"

interface EditJobModalProps {
  job?: JobItem;
  trigger?: React.ReactNode;
}

export function EditJobModal({ job, trigger }: EditJobModalProps) {
  const [open, setOpen] = useState(false)
  const [updateJob, { isLoading }] = useUpdateJobMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
      salary: "",
      status: "Applied",
      description: "",
      jobUrl: "",
      dateApplied: "",
    },
  })

  // Update form data when job prop changes
  useEffect(() => {
    if (job) {
      reset({
        jobTitle: job.title || "",
        company: job.company || "",
        location: job.location || "",
        salary: job.salary ? job.salary.toString() : "",
        status: job.status || "Applied",
        description: job.description || "",
        jobUrl: job.url || "",
        dateApplied: formatDateForInput(job.dateApplied) || "",
      })
    }
  }, [job, reset])

  const onSubmit = async (data: JobApplicationFormData) => {
    if (!job?.id) {
      console.error("No job ID provided for update")
      return
    }

    try {
      console.log("Updating with data:", data) // Debug log

      const updateCommand = transformToUpdateCommand(data)

      await updateJob({
        id: job.id,
        updateJobCommandDto: updateCommand,
      }).unwrap()

      // Show success toast
      toast.success("Job application updated successfully!", {
        icon: <Check className="h-4 w-4" />,
        description: `${data.jobTitle} at ${data.company}`,
      })

      setOpen(false)
    } catch (error: any) {
      console.error("Failed to update job application:", error)

      // Extract more detailed error message
      let errorMessage = "Please try again later."

      if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.data?.title) {
        errorMessage = error.data.title
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.status) {
        errorMessage = `Server error: ${error.status}`
      }

      // Show error toast
      toast.error("Failed to update job application", {
        description: errorMessage,
      })
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Edit Job Application</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Update your job application details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title *</Label>
                <Input
                  id="jobTitle"
                  {...register("jobTitle")}
                  placeholder="e.g. Senior Frontend Developer"
                  className={`text-sm ${errors.jobTitle ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">Company *</Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="e.g. Google"
                  className={`text-sm ${errors.company ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.company && (
                  <p className="text-sm text-red-500">{errors.company.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="e.g. San Francisco, CA"
                  className={`text-sm ${errors.location ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-sm font-medium">Salary Range</Label>
                <Input
                  id="salary"
                  {...register("salary")}
                  placeholder="e.g. $120,000 - $150,000 or 50K"
                  className={`text-sm ${errors.salary ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.salary && (
                  <p className="text-sm text-red-500">{errors.salary.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Examples: $120,000, 50K, $50k-$60k, 120000-150000
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">Status *</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`text-sm ${errors.status ? 'border-red-500 focus:border-red-500' : ''}`}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateApplied" className="text-sm font-medium">Date Applied *</Label>
                <Input
                  id="dateApplied"
                  type="date"
                  {...register("dateApplied")}
                  className={`text-sm ${errors.dateApplied ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.dateApplied && (
                  <p className="text-sm text-red-500">{errors.dateApplied.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobUrl" className="text-sm font-medium">Job URL</Label>
              <Input
                id="jobUrl"
                type="url"
                {...register("jobUrl")}
                placeholder="https://company.com/jobs/..."
                className={`text-sm ${errors.jobUrl ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.jobUrl && (
                <p className="text-sm text-red-500">{errors.jobUrl.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Job Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Paste the job description here..."
                className={`min-h-[100px] sm:min-h-[120px] resize-none text-sm ${errors.description ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Maximum 2000 characters
              </p>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              className="w-full sm:w-auto text-sm"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !job?.id}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Application'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
