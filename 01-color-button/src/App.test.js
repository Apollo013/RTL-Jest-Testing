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
    const colourButton = screen.getByRole("button", { name: "Change to blue" });
    expect(colourButton).toBeEnabled();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
});
