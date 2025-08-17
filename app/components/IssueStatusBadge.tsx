import React                from 'react'
import { IssueStatus }      from '../generated/prisma'
import { Badge }            from '@radix-ui/themes'

interface Props {
    status : IssueStatus
}

const stausMap : Record<IssueStatus, {label : string, color: 'red' | 'green' | 'blue'}> = {
    open        : { label :'Open', color: 'red'},
    in_progress : { label : 'In Progress', color: 'blue'},
    closed      : { label : 'Closed', color: 'green'}
}

const IssueStatusBadge = ({status} : {status : IssueStatus}) => {
  return (
    <Badge color={stausMap[status].color}>
        {stausMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge