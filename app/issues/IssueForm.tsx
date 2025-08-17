"use client";

import { updateIssueSchema }                            from '@/app/validationSchemas';
import { Button, Callout, Select, TextArea, TextField } from '@radix-ui/themes';
import { useRouter }                                    from 'next/navigation';
import React, {useState}                                from 'react'
import { useForm }                                      from 'react-hook-form';
import { MdErrorOutline, MdOutlineSubtitles }           from 'react-icons/md';
import z                                                from 'zod';
import { zodResolver }                                  from '@hookform/resolvers/zod';
import FormErrorMessage                                 from '../components/FormErrorMessage';
import axios                                            from 'axios';
import { Issue, IssueStatus }                           from '../generated/prisma';

type updateIssueForm = z.infer<typeof updateIssueSchema>;

interface IssueFormProps {
    issue?: Issue
}

const IssueForm = ({issue} : IssueFormProps) => {

    const router = useRouter();

    const [error, setError]     = useState('');
    const [Loading, setLoading] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<updateIssueForm>({resolver: zodResolver(updateIssueSchema)});

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
                        setLoading(true);
                        await axios.post('/api/issues/', data); 
                        router.push('/issues');
                        setLoading(false);
                    } catch (error) {
                        setError("Failed to create issue. Please try again.");
                    }
                }
            )}
        >
           
            <TextField.Root placeholder="Title for your issue..." {...register("title")} value={issue?.title || ''}>
                <TextField.Slot>
                    <MdOutlineSubtitles />
                </TextField.Slot>
            </TextField.Root>
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>

            <Select.Root defaultValue="apple">
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Fruits</Select.Label>
                        <Select.Item value="orange">Orange</Select.Item>
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="grape" disabled>
                            Grape
                        </Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                        <Select.Label>Vegetables</Select.Label>
                        <Select.Item value="carrot">Carrot</Select.Item>
                        <Select.Item value="potato">Potato</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Root>

            <TextArea placeholder='Description' {...register("description")} value={issue?.description || ''}/>
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>

            <Button type="submit" loading={Loading}>
                Update Issue
            </Button>
        </form>
    </div>
  )
}

export default IssueForm;