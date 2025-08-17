"use client";

import "easymde/dist/easymde.min.css";

import { Button,Callout,TextArea,TextField }    from '@radix-ui/themes'
import { MdOutlineSubtitles, MdErrorOutline }   from "react-icons/md";
import { useForm, Controller }                  from 'react-hook-form';
import { useRouter }                            from 'next/navigation';

import axios                                    from 'axios';
import Link                                     from 'next/link';
import React, { useState }                      from 'react'

// import SimpleMDE                            from "react-simplemde-editor";

interface CreateIssueForm {
    title       : string;
    description : string;
}

const NewIssuePage = () => {

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<CreateIssueForm>();

    const [error, setError] = useState('');


  return (
    <div className="flex flex-col mx-auto max-w-xl space-y-4">
        {error && (
            <Callout.Root color="red">
                <Callout.Icon>
                    <MdErrorOutline />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>
        )}

        <form 
            className = "space-y-4" 
            onSubmit  = {handleSubmit( async (data) => {
                    try {
                        await axios.post('/api/issues/', data); 
                        router.push('/issues');
                    } catch (error) {
                        setError("Failed to create issue. Please try again.");
                    }
                }
            )}
        >
           
            <TextField.Root placeholder="Title for your issue..." {...register("title", { required: "Title is required" })}>
                <TextField.Slot>
                    <MdOutlineSubtitles />
                </TextField.Slot>
            </TextField.Root>

            <TextArea placeholder='Description' {...register("description")}/>

            <Button type="submit">
                Create Issue
            </Button>
        </form>
    </div>
   
  )
}

export default NewIssuePage