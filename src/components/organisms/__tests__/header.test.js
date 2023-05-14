import { render, cleanup, fireEvent } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import Header from "../header/Header";
import { Typography } from '@mui/material';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Header', () => {
    afterEach(() => {
        cleanup();
    })

    const mockGoToHome = jest.fn();

    it('should render header component correctly', () => {
        const { getByTestId } = render(<Header />);
        const headerElement = getByTestId('header');
        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveTextContent('Cocktail Gallery');
    });

    it('clicking header title and then should navigates to home', () => {
        const { getByTestId } = render(<Typography variant="h6" data-testid="headerTitle" className='title'
            onClick={mockGoToHome}> Cocktail Gallery </Typography>);
        const headerTitleElement = getByTestId('headerTitle');
        fireEvent.click(headerTitleElement);
        expect(mockGoToHome).toHaveBeenCalledTimes(1);
    });

    it('matches header snapshot', () => {
        const tree = TestRenderer.create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});