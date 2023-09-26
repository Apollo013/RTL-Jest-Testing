import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct inital colour", () => {
    // Arrange & Act
    render(<App />);
    const colourButton = screen.getByRole("button", { name: "Change to blue" });

    // Assert
    expect(colourButton).toHaveStyle({ backgroundColor: "red" });
});

test("button has correct inital text", () => {});

test("button turns blue when clicked", () => {
    // Arrange
    render(<App />);
    const colourButton = screen.getByRole("button", { name: "Change to blue" });

    // Act
    fireEvent.click(colourButton);

    // Assert
    expect(colourButton).toHaveStyle({ backgroundColor: "blue" });
    expect(colourButton).toHaveTextContent("Change to red");
});

test("initial conditions", () => {
    render(<App />);

    const colourButton = getButton();
    const checkbox = getCheckbox();

    expect(colourButton).toBeEnabled();
    expect(checkbox).not.toBeChecked();
});

test("Checkbox disables button on first click and enables on second click", () => {
    render(<App />);
    const colourButton = getButton();
    const checkbox = getCheckbox();

    fireEvent.click(checkbox);
    expect(colourButton).toBeDisabled();

    fireEvent.click(checkbox);
    expect(colourButton).toBeEnabled();
});

test("Disabled button has gray background and reverts to red", () => {
    render(<App />);
    const colourButton = getButton();
    const checkbox = getCheckbox();

    fireEvent.click(checkbox);
    expect(colourButton).toHaveStyle("background-color: gray");

    fireEvent.click(checkbox);
    expect(colourButton).toHaveStyle("background-color: red");
});

test("Clicked disabled button has gray background and reverts to blue", () => {
    render(<App />);
    const colourButton = getButton();
    const checkbox = getCheckbox();

    // change to blue
    fireEvent.click(colourButton);

    // disable
    fireEvent.click(checkbox);
    expect(colourButton).toHaveStyle("background-color: gray");

    // enable
    fireEvent.click(checkbox);
    expect(colourButton).toHaveStyle("background-color: blue");
});

// Helpers
const getButton = () => screen.getByRole("button", { name: "Change to blue" });
const getCheckbox = () => screen.getByRole("checkbox", { name: "Disable button" });
