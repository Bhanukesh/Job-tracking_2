'use client'

import { useState } from "react";
import { useGetJobsQuery, useCreateJobMutation, useUpdateJobMutation, useDeleteJobMutation } from "@/store/api/enhanced/jobs";
import type { JobItem } from "@/store/api/generated/jobs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function JobsPage() {
    const { data: jobs, isLoading, isError } = useGetJobsQuery();
    const [createJob] = useCreateJobMutation();
    const [updateJob] = useUpdateJobMutation();
    const [deleteJob] = useDeleteJobMutation();
    const [newJobTitle, setNewJobTitle] = useState("");
    const [newCompany, setNewCompany] = useState("");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !jobs) {
        return <div>Error loading jobs.</div>;
    }

    const handleCreateJob = () => {
        if (newJobTitle.trim()) {
            createJob({ 
                createJobCommand: { 
                    title: newJobTitle,
                    company: newCompany || null,
                    dateApplied: new Date().toISOString().split('T')[0],
                    status: "Interested",
                    description: null,
                    url: null,
                    location: null,
                    salary: null
                } 
            });
            setNewJobTitle("");
            setNewCompany("");
        }
    };

    const handleStatusChange = (job: JobItem) => {
        const nextStatus = job.status === "Interested" ? "Applied" : 
                          job.status === "Applied" ? "Interview" :
                          job.status === "Interview" ? "Offer" : "Interested";
        
        updateJob({ 
            id: job.id!, 
            updateJobCommandDto: { 
                title: job.title ?? "",
                company: job.company,
                dateApplied: job.dateApplied!,
                status: nextStatus as JobItem['status'],
                description: job.description,
                url: job.url,
                location: job.location,
                salary: job.salary
            } 
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Tracker</h1>
            <div className="flex w-full max-w-md items-center space-x-2 mb-4">
                <Input
                    type="text"
                    placeholder="Job title"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Company"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                />
                <Button onClick={handleCreateJob}>Add Job</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Applied</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.company || 'N/A'}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleStatusChange(job)}>
                                    {job.status}
                                </Button>
                            </TableCell>
                            <TableCell>{new Date(job.dateApplied!).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm" onClick={() => deleteJob({ id: job.id! })}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}