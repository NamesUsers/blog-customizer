import styles from './index.module.scss';
import clsx from 'clsx';

type SeparatorProps = {
	className?: string;
};

export const Separator = ({ className }: SeparatorProps) => {
	return <div className={clsx(styles.separator, className)} />;
};

export default Separator;
