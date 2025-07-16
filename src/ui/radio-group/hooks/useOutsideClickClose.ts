import { useEffect } from 'react';

export default {};
type UseOutsideClickClose = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLElement>;
	onChange: (isOpen: boolean) => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onChange(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onChange, rootRef]);
};
