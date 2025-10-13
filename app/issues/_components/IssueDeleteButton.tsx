import { AlertDialog, Button, Flex } 					from "@radix-ui/themes";
import axios                                            from 'axios';
import { useRouter }                                    from "next/navigation";


interface IssueDeleteButtonProps {
	issueId : string | undefined; 
}

const IssueDeleteButton = ({issueId} : IssueDeleteButtonProps) => {

	const router = useRouter();
	

  return (
	<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button color="red">X</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content maxWidth="450px">
			<AlertDialog.Title>Delete Issue</AlertDialog.Title>
			<AlertDialog.Description size="2">
				Are you sure? This action cannot be undone.
			</AlertDialog.Description>

			<Flex gap="3" mt="4" justify="end">
				<AlertDialog.Cancel>
					<Button variant="soft" color="gray">
						Cancel
					</Button>
				</AlertDialog.Cancel>
				<AlertDialog.Action>
					<Button variant="solid" color="red" onClick={ async () => {
							if (!issueId) return;
							await axios.delete('/api/issues/' + issueId); 
							router.push('/issues');
							}}
							>
						Delete
					</Button>
				</AlertDialog.Action>
			</Flex>
		</AlertDialog.Content>
	</AlertDialog.Root>
);

};


export default IssueDeleteButton;