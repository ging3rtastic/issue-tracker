import React                    from 'react'

import { Button, Table}         from "@radix-ui/themes";

import {Link, IssueStatusBadge} from '@/app/components';

import prisma                   from '@/lib/prisma';


const IssuesPage = async () => {

  const issues = await prisma.issue.findMany();

  return (
    <div className='flex flex-col mx-auto max-w-3xl space-y-4'>

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden sm:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='sm:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>{issue.description}</Table.Cell>
              <Table.Cell className='hidden sm:table-cell'>
                <IssueStatusBadge status={issue.status} />
                </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toLocaleDateString("UK-en")}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </div>
  )
}

export const dynamic = 'force-dynamic';

export default IssuesPage