
import prisma                               from '@/lib/prisma';

import React                                from 'react'

import IssueForm                            from '@/app/issues/IssueForm';


interface Props {
    params : Promise<{
        issueId : string;
    }>;
}

const IssueEditViewPage =  async ({params} : Props) => {
    const { issueId } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if (!issue) {
        return <div>Issue not found</div>;
    }

  return (
     <IssueForm issue={issue} />
  )
}

export default IssueEditViewPage