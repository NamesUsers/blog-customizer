import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import styles from './Select.module.scss';

export default {};
type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
	className?: string;
	hideSelected?: boolean;
};

export const Select = (props: SelectProps) => {
	const {
		options,
		placeholder,
		selected,
		onChange,
		onClose,
		title,
		className,
		hideSelected = false,
	} = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);
	const optionClassName = selected?.optionClassName ?? '';

	// Проверяем, является ли выбранная опция цветом (только если selected не null)
	const isColorOption = selected?.value.includes('color') ?? false;

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false);
		onChange?.(option);
	};

	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const filteredOptions =
		hideSelected && selected
			? options.filter((option) => option.value !== selected.value)
			: options;

	return (
		<div className={clsx(styles.container, className)}>
			{title && (
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}
				data-testid='selectWrapper'>
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName]
					)}
					data-selected={!!selected?.value}
					onClick={handlePlaceHolderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					{isColorOption && selected && (
						<span
							className={styles.colorIndicator}
							style={{ backgroundColor: selected.value }}>
							<span className={styles.colorDot} />
						</span>
					)}
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{filteredOptions.map((option) => (
							<Option
								key={option.value}
								option={option}
								onClick={() => handleOptionClick(option)}
							/>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
