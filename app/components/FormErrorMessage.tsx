import { Text }                     from '@radix-ui/themes'
import React                        from 'react'
import { PropsWithChildren }        from 'react'


const FormErrorMessage = ({children} : PropsWithChildren) => {
    if (!children) return null;

    return (
    <Text color='red' as='p'>{children}</Text>
    )
}

export default FormErrorMessage