import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { createHomePageData, createHomeShowcase } from "@/test/fixtures/home";
import { HomePageView } from "./HomePageView";

vi.mock("@/components/learney/providers/PreferenceProvider", () => ({
  usePreference: vi.fn(),
}));

vi.mock("./HomeHeroPremium", () => ({
  HomeHeroPremium: ({
    hero,
    socialProof,
    initialShowcase,
    initialShowcaseState,
  }: {
    hero: { title: { en?: string; th?: string } };
    socialProof: { rating: string };
    initialShowcase?: { title?: string } | null;
    initialShowcaseState?: string;
  }) => (
    <div
      data-testid="home-hero"
      data-hero-title={hero.title.en ?? hero.title.th ?? ""}
      data-rating={socialProof.rating}
      data-showcase-title={initialShowcase?.title ?? ""}
      data-showcase-state={initialShowcaseState ?? ""}
    />
  ),
}));

vi.mock("./CourseCard", () => ({
  CourseCard: ({
    course,
  }: {
    course: { title: { en?: string; th?: string } };
  }) => <div data-testid="course-card">{course.title.en ?? course.title.th}</div>,
}));

describe("HomePageView", () => {
  beforeEach(() => {
    vi.mocked(usePreference).mockReturnValue({ locale: "en" } as never);
  });

  it("passes hero props through and renders the english home sections", () => {
    const data = createHomePageData();
    const showcase = createHomeShowcase({ title: "Feature spotlight" });

    render(
      <HomePageView
        data={data}
        initialShowcase={showcase}
        initialShowcaseState="ready"
      />,
    );

    expect(screen.getByTestId("home-hero")).toHaveAttribute(
      "data-showcase-title",
      "Feature spotlight",
    );
    expect(screen.getByTestId("home-hero")).toHaveAttribute(
      "data-showcase-state",
      "ready",
    );
    expect(screen.getByText("Learn with confidence")).toBeInTheDocument();
    expect(screen.getByText("For students")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all" })).toHaveAttribute(
      "href",
      "/courses",
    );
    expect(
      screen.getByRole("heading", { name: "Admin-ranked popular courses" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View Popular Courses" }),
    ).toHaveAttribute("href", "/courses?sort=most-popular");
    expect(screen.getByText("Promotion 1")).toBeInTheDocument();
    expect(screen.getByText("Promotion 2")).toBeInTheDocument();
    expect(screen.getByText("Promotion 3")).toBeInTheDocument();
    expect(screen.queryByText("Promotion 4")).not.toBeInTheDocument();
  });

  it("switches labels with the thai locale and renders review stars", () => {
    vi.mocked(usePreference).mockReturnValue({ locale: "th" } as never);

    render(<HomePageView data={createHomePageData()} />);

    expect(screen.getByText("เรียนอย่างมั่นใจ")).toBeInTheDocument();
    expect(screen.getByText("สำหรับนักเรียน")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ดูทั้งหมด" })).toHaveAttribute(
      "href",
      "/courses",
    );
    expect(screen.getByRole("heading", { name: "คอร์สยอดนิยม" })).toBeInTheDocument();
    expect(screen.getByText("★★★★")).toBeInTheDocument();
  });
});
