import { NextRequest, NextResponse }    from 'next/server';
import { z }                            from 'zod';

import prisma                           from '@/lib/prisma';
import { createIssueSchema }            from '@/app/validationSchemas';


export async function POST(request: NextRequest) {
    const body = await request.json();

    const data = createIssueSchema.safeParse(body);

    if (!data.success) {
        return new Response(JSON.stringify({ error: z.treeifyError(data.error) }), {
            status  : 400,

        });
    }
    
    const newIssue = await prisma.issue.create({
        data: { 
            title       : data.data.title,
            description : data.data.description,
        },
    });

    // Process the request body as needed
    // console.log('Received POST request with body:', body);

    return NextResponse.json(newIssue, {status: 201});
}