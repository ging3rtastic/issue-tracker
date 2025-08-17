"use client";

import React                                from 'react'

import { Button,TextField }                 from '@radix-ui/themes'

import { MdOutlineSubtitles }               from "react-icons/md";

import Link                                 from 'next/link';

import SimpleMDE                            from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="flex flex-col mx-auto space-y-4 max-w-xl">
        <TextField.Root placeholder="Title for your issue...">
            <TextField.Slot>
                <MdOutlineSubtitles />
            </TextField.Slot>
        </TextField.Root>

        <SimpleMDE/>

        <Button>
            <Link href="/issues/new">Create Issue</Link>
        </Button>
    </div>
  )
}

export default NewIssuePage