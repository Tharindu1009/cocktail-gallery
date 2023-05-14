import { render, cleanup } from "@testing-library/react";
import TestRenderer from 'react-test-renderer';
import Button from "../button/Button";

describe('Button', () => {
    afterEach(() => {
        cleanup();
    })

    it('should render button component correctly', () => {
        const { getByTestId } = render(<Button type="search" />);
        const btnElement = getByTestId('button');
        expect(btnElement).toBeInTheDocument();
    });

    it('should render search icon when button type is search', () => {
        const { getByTestId } = render(<Button type="search" />);
        const searchIconElement = getByTestId('searchIcon');
        expect(searchIconElement).toBeInTheDocument();
    });

    it('should render favoriteBorder icon when button type is add', () => {
        const { getByTestId } = render(<Button type="add" />);
        const favoriteBorderIconElement = getByTestId('favoriteBorderIcon');
        expect(favoriteBorderIconElement).toBeInTheDocument();
    });

    it('should render delete icon when button type is remove', () => {
        const { getByTestId } = render(<Button type="remove" />);
        const deleteIconElement = getByTestId('deleteIcon');
        expect(deleteIconElement).toBeInTheDocument();
    });

    it('matches button snapshot', () => {
        const tree = TestRenderer.create(<Button type="search" />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});