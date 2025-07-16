import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	type ArticleStateType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/radio-group/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import narrowIcon from 'src/images/narrow.svg';
import wideIcon from 'src/images/wide.svg';

export default {};
type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: (isOpen: boolean) => void;
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

const CustomColorSelect = ({
	options,
	value,
	onChange,
	className,
	onOpen,
	onClose,
}: {
	options: typeof fontColors;
	value: string;
	onChange: (value: string) => void;
	className?: string;
	onOpen: () => void;
	onClose: () => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);
	const selectedOption =
		options.find((opt) => opt.value === value) || options[0];

	const toggleOpen = () => {
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: selectRef,
		onChange: (open) => {
			if (!open) onClose();
			setIsOpen(open);
		},
	});

	return (
		<div
			ref={selectRef}
			className={clsx(styles.customSelect, styles.colorSelect, className, {
				[styles.open]: isOpen,
			})}>
			<div className={styles.selectHeader} onClick={toggleOpen}>
				<div
					className={clsx(styles.colorPreview, {
						[styles.whiteColor]: selectedOption.value === '#FFFFFF',
					})}
					style={{ backgroundColor: selectedOption.value }}
				/>
				<span>{selectedOption.title}</span>
				<div className={styles.selectArrow} />
			</div>
			{isOpen && (
				<div className={clsx(styles.selectOptions)}>
					{options.map((option) => (
						<div
							key={option.value}
							className={clsx(styles.option, {
								selected: value === option.value,
							})}
							onClick={() => {
								onChange(option.value);
								setIsOpen(false);
								onClose();
							}}>
							<div
								className={clsx(styles.optionColor, {
									[styles.whiteColor]: option.value === '#FFFFFF',
								})}
								style={{ backgroundColor: option.value }}
							/>
							<span>{option.title}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(currentState);
	const asideRef = useRef<HTMLElement>(null);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onChange: onToggle,
	});

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = (e: React.MouseEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	const handleSelectChange = (name: keyof ArticleStateType, value: string) => {
		const options = {
			fontFamilyOption: fontFamilyOptions,
			fontColor: fontColors,
			backgroundColor: backgroundColors,
			contentWidth: contentWidthArr,
			fontSizeOption: fontSizeOptions,
		}[name];

		const selectedOption = options.find((opt) => opt.value === value);
		if (selectedOption) {
			setFormState({
				...formState,
				[name]: selectedOption,
			});
		}
	};

	const handleDropdownToggle = (dropdownName: string) => {
		setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
	};

	const availableFontOptions = fontFamilyOptions.filter(
		(option) => option.value !== formState.fontFamilyOption.value
	);

	const availableWidthOptions = contentWidthArr.filter(
		(option) => option.value !== formState.contentWidth.value
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => onToggle(!isOpen)} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.open]: isOpen })}>
				<form className={styles.form} onSubmit={handleApply}>
					<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

					<div className={styles.section}>
						<label className={styles.paramTitle}>Шрифт</label>
						<div
							className={clsx(styles.customSelect, styles.fontSelect, {
								[styles.open]: activeDropdown === 'font',
							})}>
							<div
								className={styles.selectHeader}
								onClick={() => handleDropdownToggle('font')}>
								<span style={{ fontFamily: formState.fontFamilyOption.value }}>
									{formState.fontFamilyOption.title}
								</span>
								<div className={styles.selectArrow} />
							</div>
							{activeDropdown === 'font' && (
								<div className={clsx(styles.selectOptions)}>
									{availableFontOptions.map((option) => (
										<div
											key={option.value}
											className={clsx(styles.option, option.className, {
												selected:
													formState.fontFamilyOption.value === option.value,
											})}
											onClick={() => {
												handleSelectChange('fontFamilyOption', option.value);
												setActiveDropdown(null);
											}}
											style={{ fontFamily: option.value }}>
											<span>{option.title}</span>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<div className={styles.section}>
						<span className={styles.paramTitle}>Размер шрифта</span>
						<div className={styles.radioGroup}>
							{fontSizeOptions.map((option) => (
								<label key={option.value} className={styles.radioLabel}>
									<input
										type='radio'
										name='fontSize'
										value={option.value}
										checked={formState.fontSizeOption.value === option.value}
										onChange={() =>
											handleSelectChange('fontSizeOption', option.value)
										}
										className={styles.radioInput}
									/>
									<span
										className={clsx(styles.radioText, {
											[styles.active]:
												formState.fontSizeOption.value === option.value,
										})}>
										{option.title}
									</span>
								</label>
							))}
						</div>
					</div>

					<div className={styles.section}>
						<label className={styles.paramTitle}>Цвет шрифта</label>
						<CustomColorSelect
							options={fontColors}
							value={formState.fontColor.value}
							onChange={(value) => handleSelectChange('fontColor', value)}
							onOpen={() => setActiveDropdown('fontColor')}
							onClose={() => setActiveDropdown(null)}
						/>
					</div>

					<hr className={styles.divider} />

					<div className={styles.section}>
						<label className={styles.backgroundTitle}>Цвет фона</label>
						<CustomColorSelect
							options={backgroundColors}
							value={formState.backgroundColor.value}
							onChange={(value) => handleSelectChange('backgroundColor', value)}
							onOpen={() => setActiveDropdown('backgroundColor')}
							onClose={() => setActiveDropdown(null)}
						/>
					</div>

					<div className={styles.section}>
						<label className={styles.paramTitle}>Ширина контента</label>
						<div
							className={clsx(styles.customSelect, styles.widthSelect, {
								[styles.open]: activeDropdown === 'width',
							})}>
							<div
								className={styles.selectHeader}
								onClick={() => handleDropdownToggle('width')}>
								{formState.contentWidth.value === '948px' ? (
									<img
										src={narrowIcon}
										alt='Узкий'
										className={styles.optionIcon}
									/>
								) : (
									<img
										src={wideIcon}
										alt='Широкий'
										className={styles.optionIcon}
									/>
								)}
								<span>{formState.contentWidth.title}</span>
								<div className={styles.selectArrow} />
							</div>
							{activeDropdown === 'width' && (
								<div className={clsx(styles.selectOptions)}>
									{availableWidthOptions.map((option) => (
										<div
											key={option.value}
											className={clsx(styles.option)}
											onClick={() => {
												handleSelectChange('contentWidth', option.value);
												setActiveDropdown(null);
											}}>
											{option.value === '948px' ? (
												<img
													src={narrowIcon}
													alt='Узкий'
													className={styles.optionIcon}
												/>
											) : (
												<img
													src={wideIcon}
													alt='Широкий'
													className={styles.optionIcon}
												/>
											)}
											<span>{option.title}</span>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<div className={styles.buttons}>
						<Button
							className={styles.reset}
							title='Сбросить'
							onClick={handleReset}
							type='clear'
						/>
						<Button
							className={styles.apply}
							title='Применить'
							htmlType='submit'
							onClick={handleApply}
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
