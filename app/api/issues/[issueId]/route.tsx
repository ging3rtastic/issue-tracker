import { NextRequest, NextResponse } from "next/server";
import { z }           from 'zod';

import prisma          from '@/lib/prisma';

import {updateIssueSchema} from '@/app/validationSchemas';


interface Props {
    params : Promise<{
        issueId : string;
    }>;
}

export async function PATCH(request: NextRequest, {params} : Props) {
    const { issueId } = await params;
    const body        = await request.json();
    const data        = updateIssueSchema.safeParse(body);

    if (!data.success) {
        return new Response(JSON.stringify({ error: z.treeifyError(data.error) }), {
            status: 400,
        });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if (!issue) {
        return new Response(JSON.stringify({ error: "Issue not found" }), {
            status: 404,
        });
    }

    // Update logic here, e.g., updating the issue status
    const updatedIssue = await prisma.issue.update({
        where : { id: issueId },
        data  : {
            title       : data.data.title,
            description : data.data.description,
            status      : data.data.status,
        },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, {params} : Props) {
    const { issueId } = await params;       
    const issue       = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if (!issue) {
        return new Response(JSON.stringify({ error: "Issue not found" }), {
            status: 404,
        });
    }   

    await prisma.issue.delete({
        where: { id: issueId }
    });  
    
    return new Response(null, { status: 204 });
}