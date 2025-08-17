import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export const updateIssueSchema = z.object({
    title       : z.string().min(1, "Title is required"),
    description : z.string().min(1, "Description is required"),
    status      : z.enum(["open", "in_progress", "closed"])
});
