import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';
import styles from './Select.module.scss';

export default {};
type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
	withBorders?: boolean; // Новый пропс для границ
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		withBorders = false, // По умолчанию без границ
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''], {
				[styles.withBorders]: withBorders, // Применяем стили границ
			})}
			value={value}
			onClick={handleClick(value)}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
