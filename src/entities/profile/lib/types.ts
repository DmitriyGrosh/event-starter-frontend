import { UserEvent } from '@/shared/api/users/types';
import { User } from '@/shared/api/auth/types';

export interface ProfileState {
	user: User | null;
	ownedEvents: UserEvent[];
	subscribedEvents: UserEvent[];
	isLoading: boolean;
	error: string | null;
	init: () => Promise<void>;
}