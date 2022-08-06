import { LocalizationProvider, MobileTimePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { FormInputProps } from './FormInputProps';

const FormInputDate = ({ name, control, label }: FormInputProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState, formState }) => (
					<TimePicker
						renderInput={(params) => (
							<TextField margin="dense" size="medium" {...params} />
						)}
						label={label}
						rifmFormatter={(val) => val.replace(/[^[a-zA-Z0-9-]*$]+/gi, '')}
						{...field}
					/>
				)}
			/>
		</LocalizationProvider>
	);
};

export default FormInputDate;
