import { render, cleanup } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import Footer from "../footer/Footer";

describe('Footer', () => {
    afterEach(() => {
        cleanup();
    })

    it('should render footer component correctly', () => {
        const { getByTestId } = render(<Footer />);
        const footerElement = getByTestId('footer');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent('Copyright ©2023');
    });

    it('matches footer snapshot', () => {
        const tree = TestRenderer.create(<Footer />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});