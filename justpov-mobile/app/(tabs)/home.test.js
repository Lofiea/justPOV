import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../index";

const mockQueue = [
  { id: "1", position: 1, name: "Jane Doe", status: "serving" },
  { id: "2", position: 2, name: "Emma Wilson", status: "available", etaMin: 30 },
];

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(mockQueue) })
);

describe("HomeScreen queue", () => {
  it("renders initial queue and updates on pull-to-refresh", async () => {
    render(<HomeScreen />);

    // Initial render shows items
    expect(await screen.findByText("Jane Doe")).toBeTruthy();
    expect(screen.getByText("Emma Wilson")).toBeTruthy();

    // Simulate refresh: swap data and trigger
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([
        { id: "3", position: 1, name: "Alex Kim", status: "serving" },
      ]),
    });

    // Fire the RefreshControl by calling onRefresh prop exposed via testID
    const list = screen.getByTestId("home-queue-list");
    fireEvent(list, "refresh");

    await waitFor(() => expect(screen.getByText("Alex Kim")).toBeTruthy());
  });
});
