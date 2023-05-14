import { render, cleanup, fireEvent } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import TextBox from "../textBox/TextBox";

describe('TextBox', () => {
    afterEach(() => {
        cleanup();
    })
    
    const mockHandleChange = jest.fn();
    
    it('should render textBox component correctly', () => {
        const { getByTestId } = render(<TextBox id="search" value="ZENMEISTER" size="small"
            placeholder="Search for a cocktail" onChange={mockHandleChange} />);
        const textBoxElement = getByTestId('textBox');
        expect(textBoxElement).toBeInTheDocument();
    });

    it('updates the textBox value', () => {
        const { getByRole } = render(<TextBox id="search" value="ZENMEISTER" size="small"
            placeholder="Search for a cocktail" onChange={mockHandleChange} />);
        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'ZENMEISTER' } });
        expect(input.value).toBe('ZENMEISTER');
    });

    it('calls the handleChange function three times when the input is changed', () => {
        const { getByRole } = render(<TextBox id="search" value="ZENMEISTER" size="small"
            placeholder="Search for a cocktail" onChange={mockHandleChange} />);
        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'BUCCANEER' } });
        fireEvent.change(input, { target: { value: 'JAMAICAN COFFEE' } });
        expect(mockHandleChange).toHaveBeenCalledTimes(2);
    });

    it('matches textBox snapshot', () => {
        const tree = TestRenderer.create(<TextBox id="search" value="ZENMEISTER" size="small"
            placeholder="Search for a cocktail" onChange={mockHandleChange} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
