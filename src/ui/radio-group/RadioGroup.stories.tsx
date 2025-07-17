import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const options = [
	{ title: 'Маленький', value: '14px', className: '' },
	{ title: 'Средний', value: '16px', className: '' },
	{ title: 'Большой', value: '18px', className: '' },
];

export const WithTitle: Story = {
	args: {
		name: 'fontSize',
		options,
		selected: options[0],
		title: 'Размер шрифта',
	},
};

export const WithCustomClass: Story = {
	args: {
		name: 'fontSize',
		options,
		selected: options[0],
		className: 'custom-radio-group-class',
	},
};

export const InteractiveExample = () => {
	const [selected, setSelected] = useState(options[0]);
	return (
		<RadioGroup
			name='fontSize'
			options={options}
			selected={selected}
			onChange={setSelected}
			title='Интерактивный пример'
			className='interactive-radio-group'
		/>
	);
};
