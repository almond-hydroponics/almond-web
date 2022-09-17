import { Modal } from '@components/atoms';

interface DeleteScheduleProps {
	isOpen: boolean;
	onDismiss: () => void;
	onSubmit: () => void;
}

const DeleteScheduleModal = ({
	isOpen,
	onDismiss,
	onSubmit,
}: DeleteScheduleProps) => {
	return (
		<Modal
			isModalOpen={isOpen}
			onClose={onDismiss}
			renderHeader={'Delete Time Schedule'}
			renderDialogText={'Do you confirm deletion of time schedule?'}
			submitButtonName={'Delete schedule'}
			onSubmit={onSubmit}
			onDismiss={onDismiss}
		/>
	);
};

export default DeleteScheduleModal;
