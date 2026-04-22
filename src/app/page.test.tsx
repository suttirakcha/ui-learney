import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import { createHomePageData, createHomeShowcase } from "@/test/fixtures/home";
import { getHomePageData } from "@/lib/api/experience.service";
import { getActiveHomeShowcase } from "@/modules/home-showcase/services/home-showcase.service";
import HomePage from "./page";

vi.mock("@/components/learney/public/HomePageView", () => ({
  HomePageView: (props: Record<string, unknown>) => (
    <div data-testid="home-page-view" data-props={JSON.stringify(props)} />
  ),
}));

vi.mock("@/lib/api/experience.service", () => ({
  getHomePageData: vi.fn(),
}));

vi.mock("@/modules/home-showcase/services/home-showcase.service", () => ({
  getActiveHomeShowcase: vi.fn(),
}));

function getRenderedProps() {
  const raw = screen.getByTestId("home-page-view").getAttribute("data-props");
  return JSON.parse(raw ?? "{}") as {
    initialShowcase: { title?: string } | null;
    initialShowcaseState: "ready" | "empty" | "error";
  };
}

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes a ready showcase state when an active showcase is preloaded", async () => {
    vi.mocked(getHomePageData).mockResolvedValue(createHomePageData());
    vi.mocked(getActiveHomeShowcase).mockResolvedValue(
      createHomeShowcase({ title: "Hero spotlight" }),
    );

    render(await HomePage());

    expect(getRenderedProps()).toMatchObject({
      initialShowcaseState: "ready",
      initialShowcase: { title: "Hero spotlight" },
    });
  });

  it("passes an empty showcase state when no active showcase exists", async () => {
    vi.mocked(getHomePageData).mockResolvedValue(createHomePageData());
    vi.mocked(getActiveHomeShowcase).mockResolvedValue(null);

    render(await HomePage());

    expect(getRenderedProps()).toMatchObject({
      initialShowcaseState: "empty",
      initialShowcase: null,
    });
  });

  it("falls back to an error showcase state when preloading fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.mocked(getHomePageData).mockResolvedValue(createHomePageData());
    vi.mocked(getActiveHomeShowcase).mockRejectedValue(
      new Error("showcase unavailable"),
    );

    render(await HomePage());

    expect(getRenderedProps()).toMatchObject({
      initialShowcaseState: "error",
      initialShowcase: null,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to preload home showcase:",
      expect.any(Error),
    );
  });
});
