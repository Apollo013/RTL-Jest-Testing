import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial conditions", () => {
    render(<SummaryForm />);

    const checkbox = getCheckBox();
    expect(checkbox).not.toBeChecked();

    const confirmButton = getButton();
    expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);
    const checkbox = getCheckBox();
    const confirmButton = getButton();

    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = getNullPopOver();
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears on mouseover of checkbox label
    const termsAndConditions = getTermsAndConditions();
    await user.hover(termsAndConditions);

    const popover = getPopOver();
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
});

// Helpers
const getCheckBox = () => screen.getByRole("checkbox", { name: /terms and conditions/i });
const getButton = () => screen.getByRole("button", { name: /confirm order/i });
const getNullPopOver = () => screen.queryByText(/no ice cream will actually be delivered/i);
const getPopOver = () => screen.getByText(/no ice cream will actually be delivered/i);
const getTermsAndConditions = () => screen.getByText(/terms and conditions/i);
