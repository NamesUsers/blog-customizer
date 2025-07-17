import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
	title: 'Components/Separator',
	component: Separator,
	tags: ['autodocs'],
	argTypes: {
		className: {
			control: 'text',
			description: 'Custom CSS class',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
	args: {},
};

export const WithCustomStyle: Story = {
	args: {
		className: 'custom-separator',
	},
	parameters: {
		docs: {
			description: {
				story: 'Separator with custom styling through className prop',
			},
		},
	},
};
