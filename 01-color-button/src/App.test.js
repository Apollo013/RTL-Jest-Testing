import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText("Learn React");
    expect(linkElement).toBeInTheDocument();
});

test("renders learn react link (by role)", () => {
    render(<App />);
    const linkElement = screen.getByRole("link", { name: "Learn React" });
    expect(linkElement).toBeInTheDocument();
});
