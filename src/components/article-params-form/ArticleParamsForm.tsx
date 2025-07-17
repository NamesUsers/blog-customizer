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
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/radio-group/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

export default {};
type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(currentState);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onChange: setIsMenuOpen,
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

	const handleSelectChange = (
		name: keyof ArticleStateType,
		option: typeof formState.fontFamilyOption
	) => {
		setFormState({
			...formState,
			[name]: option,
		});
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.open]: isMenuOpen })}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text
						as='h2'
						className={styles.title}
						size={31}
						weight={800}
						uppercase
						align='center'>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					{/* Выбор шрифта */}
					<div className={styles.section}>
						<label className={styles.paramTitle}>Шрифт</label>
						<Select
							className={styles.fontSelect}
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								handleSelectChange('fontFamilyOption', option)
							}
							hideSelected={true}
						/>
					</div>

					{/* Выбор размера шрифта */}
					<div className={styles.section}>
						<span className={styles.paramTitle}>Размер шрифта</span>
						<RadioGroup
							className={styles.radioGroup}
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) =>
								handleSelectChange('fontSizeOption', option)
							}
						/>
					</div>

					{/* Выбор цвета шрифта */}
					<div className={styles.section}>
						<label className={styles.paramTitle}>Цвет шрифта</label>
						<Select
							className={styles.colorSelect}
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) => handleSelectChange('fontColor', option)}
						/>
					</div>

					<Separator className={styles.divider} />

					{/* Выбор цвета фона */}
					<div className={styles.section}>
						<label className={styles.backgroundTitle}>Цвет фона</label>
						<Select
							className={styles.colorSelect}
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								handleSelectChange('backgroundColor', option)
							}
						/>
					</div>

					{/* Выбор ширины контента */}
					<div className={styles.section}>
						<label className={styles.paramTitle}>Ширина контента</label>
						<Select
							className={styles.widthSelect}
							options={contentWidthArr.map((opt) => ({
								...opt,
								className: 'width-content-option',
							}))}
							selected={formState.contentWidth}
							onChange={(option) => handleSelectChange('contentWidth', option)}
							hideSelected={true}
						/>
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
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
