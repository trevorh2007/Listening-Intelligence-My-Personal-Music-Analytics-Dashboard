import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />);
    const heading = screen.getByText(/listening intelligence/i);
    expect(heading).toBeInTheDocument();
  });
});
