import React                                from 'react'

import { Button, TextArea, TextField }      from '@radix-ui/themes'

import { MdOutlineSubtitles }               from "react-icons/md";

import Link                                 from 'next/link';

const NewIssuePage = () => {
  return (
    <div className="flex flex-col mx-auto space-y-4 max-w-xl">
        <TextField.Root placeholder="Title for your issue...">
            <TextField.Slot>
                <MdOutlineSubtitles />
            </TextField.Slot>
        </TextField.Root>

        <TextArea placeholder="Describe your issue...">
        </TextArea>
        
        <Button>
            <Link href="/issues/new">Create Issue</Link>
        </Button>
    </div>
  )
}

export default NewIssuePage