import { render, cleanup } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import Seperator from "../seperator/Seperator";

describe('Button', () => {
    afterEach(() => {
        cleanup();
    })

    it('should render seperator component correctly', () => {
        const { getByTestId } = render(<Seperator />);
        const seperatorElement = getByTestId('seperator');
        expect(seperatorElement).toBeInTheDocument();
    });

    it('matches seperator snapshot', () => {
        const tree = TestRenderer.create(<Seperator />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});