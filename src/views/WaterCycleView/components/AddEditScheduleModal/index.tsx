import { Modal } from '@components/atoms';
import { AddAlarmTwoTone } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface ScheduleModalProps {
	isOpen: boolean;
	isLoading: boolean;
	hasError: boolean;
	onDismiss: () => void;
	isEditMode: boolean;
	onSubmit: (e) => void;
	onChange: (value) => void;
	value: string;
}

const AddEditScheduleModal = ({
	isOpen,
	isLoading,
	hasError,
	onDismiss,
	isEditMode,
	onSubmit,
	onChange,
	value,
}: ScheduleModalProps): JSX.Element => {
	const renderTimeScheduleForm = (): JSX.Element => {
		return (
			<>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<MobileTimePicker
						label="time schedule"
						value={value}
						onChange={onChange}
						renderInput={(params) => (
							<TextField
								{...params}
								fullWidth
								style={{ marginTop: 12 }}
								name="time_schedule"
								{...(hasError ? { error: true } : {})}
								{...(hasError
									? {
											helperText:
												'Schedule time has to be at least one hour apart',
									  }
									: {})}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IconButton>
												<AddAlarmTwoTone
													color={hasError ? 'error' : 'primary'}
												/>
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</LocalizationProvider>
			</>
		);
	};

	return (
		<Modal
			isModalOpen={isOpen}
			isRequesting={isLoading}
			loadingText="Creating..."
			renderContent={renderTimeScheduleForm()}
			onClose={onDismiss}
			renderDialogText={`${
				isEditMode ? 'Change the' : 'Add a'
			} time schedule as per your preference for pumping.`}
			renderHeader={
				isEditMode ? 'Edit time schedule' : 'Create a new time schedule'
			}
			submitButtonName={isEditMode ? 'Update schedule' : 'Create new schedule'}
			onSubmit={onSubmit}
			onDismiss={onDismiss}
			disabled={hasError}
		/>
	);
};

export default AddEditScheduleModal;
