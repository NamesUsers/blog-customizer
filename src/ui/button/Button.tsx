import { Text } from 'src/ui/text'; // Убедись, что Text тоже правильно типизирован
import styles from './Button.module.scss';
import { clsx } from 'clsx';
import React from 'react';

// Обновлённая типизация с обязательным type
export default {};
type ButtonProps = {
	title: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	htmlType?: 'button' | 'submit' | 'reset';
	type: 'apply' | 'clear'; // Тип кнопки обязателен
	className?: string;
};

export const Button = ({
	title,
	onClick,
	htmlType = 'button',
	type,
	className, // Добавим className как пропс
}: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				{ [styles.button_apply]: type === 'apply' },
				{ [styles.button_clear]: type === 'clear' },
				className // Добавим кастомный className
			)}
			type={htmlType}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
