import { render, cleanup } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import Alert from "../alert/Alert";

describe('Alert', () => {
    afterEach(() => {
        cleanup();
    })

    it('should render alert component correctly', () => {
        const { getByTestId } = render(<Alert title="No data found." />);
        const alertElement = getByTestId('alert');
        expect(alertElement).toBeInTheDocument();
    });

    it('should display alert text content correctly', () => {
        const { getByTestId } = render(<Alert title="No data found." />);
        const alertElement = getByTestId('alert');
        expect(alertElement).toHaveTextContent('No data found.');
    });

    it('matches alert snapshot', () => {
        const tree = TestRenderer.create(<Alert title="No data found." />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});