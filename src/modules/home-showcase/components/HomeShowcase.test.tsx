import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createHomeShowcase } from "@/test/fixtures/home";
import { HomeShowcase } from "./HomeShowcase";

vi.mock("./HomeShowcaseSkeleton", () => ({
  HomeShowcaseSkeleton: ({ className }: { className?: string }) => (
    <div data-testid="showcase-skeleton" className={className} />
  ),
}));

vi.mock("./HomeShowcaseMedia", () => ({
  HomeShowcaseMedia: ({ banner }: { banner: { title: string } }) => (
    <div data-testid="showcase-media">{banner.title}</div>
  ),
}));

vi.mock("./HomeShowcaseFloatingCards", () => ({
  HomeShowcaseFloatingCards: () => <div data-testid="showcase-floating-cards" />,
}));

describe("HomeShowcase", () => {
  it("renders the skeleton in the loading state", () => {
    render(<HomeShowcase state="loading" className="test-shell" />);

    expect(screen.getByTestId("showcase-skeleton")).toHaveClass("test-shell");
    expect(screen.queryByTestId("showcase-media")).not.toBeInTheDocument();
  });

  it("renders showcase media, floating cards, and animation classes when ready", () => {
    render(
      <HomeShowcase
        state="ready"
        banner={createHomeShowcase({
          title: "Animated showcase",
          enableFloating: true,
          enableAnimation: true,
        })}
      />,
    );

    expect(screen.getByTestId("showcase-media")).toHaveTextContent(
      "Animated showcase",
    );
    expect(screen.getByTestId("showcase-floating-cards")).toBeInTheDocument();
    expect(screen.getByTestId("showcase-media").parentElement?.className).toContain(
      "group-hover:-translate-y-1",
    );
  });

  it("renders the standby fallback when no active banner exists", () => {
    render(<HomeShowcase state="empty" />);

    expect(screen.getByText("Showcase standby")).toBeInTheDocument();
    expect(screen.getByText("No active showcase")).toBeInTheDocument();
    expect(screen.queryByTestId("showcase-media")).not.toBeInTheDocument();
  });

  it("renders the error fallback message when the showcase fails", () => {
    render(
      <HomeShowcase
        state="error"
        banner={createHomeShowcase({ title: "Unavailable panel" })}
      />,
    );

    expect(screen.getByText("Showcase error")).toBeInTheDocument();
    expect(screen.getByText("Temporarily unavailable")).toBeInTheDocument();
    expect(screen.getByText("Unavailable panel")).toBeInTheDocument();
  });
});
