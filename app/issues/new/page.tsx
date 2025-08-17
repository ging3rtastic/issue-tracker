"use client";

import "easymde/dist/easymde.min.css";

import { Button,Callout,TextArea,TextField,Text }   from '@radix-ui/themes'
import { MdOutlineSubtitles, MdErrorOutline }       from "react-icons/md";
import { useForm, Controller }                      from 'react-hook-form';
import { createIssueSchema }                        from "@/app/validationSchemas";
import { useRouter }                                from 'next/navigation';
import { zodResolver }                              from '@hookform/resolvers/zod';
import { z }                                        from 'zod';

import axios                                        from 'axios';
import Link                                         from 'next/link';
import React, { useState }                          from 'react'

// import SimpleMDE                            from "react-simplemde-editor";

type CreateIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<CreateIssueForm>({resolver: zodResolver(createIssueSchema)});

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
           
            <TextField.Root placeholder="Title for your issue..." {...register("title")}>
                <TextField.Slot>
                    <MdOutlineSubtitles />
                </TextField.Slot>
            </TextField.Root>
            {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}

            <TextArea placeholder='Description' {...register("description")}/>
            {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}

            <Button type="submit">
                Create Issue
            </Button>
        </form>
    </div>
   
  )
}

export default NewIssuePage