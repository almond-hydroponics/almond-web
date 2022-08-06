import { UserDetails } from '@modules/user/interfaces';
import { ReactNode } from 'react';

export interface UserContextProps {
	user: UserDetails;
	getUserDetails: () => Promise<any>;
	children: ReactNode;
}
