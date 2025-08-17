"use client";

import "easymde/dist/easymde.min.css";

import { Button,TextField }                 from '@radix-ui/themes'
import { MdOutlineSubtitles }               from "react-icons/md";
import { useForm, Controller }              from 'react-hook-form';
import { useRouter }                        from 'next/navigation';

import axios                                from 'axios';
import Link                                 from 'next/link';
import React                                from 'react'
import SimpleMDE                            from "react-simplemde-editor";

interface CreateIssueForm {
    title       : string;
    description : string;
}

const NewIssuePage = () => {

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<CreateIssueForm>();

  return (
    <form 
        className = "flex flex-col mx-auto space-y-4 max-w-xl" 
        onSubmit  = {handleSubmit( async (data) => {
                await axios.post('/api/issues', data); 
                router.push('/issues');
            }
        )}
    >
        <TextField.Root placeholder="Title for your issue..." {...register("title", { required: "Title is required" })}>
            <TextField.Slot>
                <MdOutlineSubtitles />
            </TextField.Slot>
        </TextField.Root>
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <SimpleMDE placeholder='Description' {...field}/>
            )}
        />


        <Button>
            <Link href="/issues/new">Create Issue</Link>
        </Button>
    </form>
  )
}

export default NewIssuePage