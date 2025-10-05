import NextLink             from 'next/link';
import {Link as RadixLink}  from "@radix-ui/themes";

interface LinkProps {
    href        : string;
    className?  : string;
    children    : string;
}

const Link = ({href, children, className} : LinkProps) => {
  return (
    <RadixLink asChild className={className}>
        <NextLink href={href}>
            {children}
        </NextLink>
    </RadixLink>
  )
}

export default Link