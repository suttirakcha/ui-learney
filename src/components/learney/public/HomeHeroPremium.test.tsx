import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { useHomeShowcase } from "@/modules/home-showcase/hooks/useHomeShowcase";
import { createHomePageData, createHomeShowcase } from "@/test/fixtures/home";
import { HomeHeroPremium } from "./HomeHeroPremium";

vi.mock("@/components/learney/providers/PreferenceProvider", () => ({
  usePreference: vi.fn(),
}));

vi.mock("@/modules/home-showcase/hooks/useHomeShowcase", () => ({
  useHomeShowcase: vi.fn(),
}));

vi.mock("@/modules/home-showcase/components/HomeShowcase", () => ({
  HomeShowcase: ({
    state,
    banner,
  }: {
    state?: string;
    banner?: { title?: string } | null;
  }) => (
    <div
      data-testid="home-showcase"
      data-state={state}
      data-banner-title={banner?.title ?? ""}
    />
  ),
}));

describe("HomeHeroPremium", () => {
  const hero = createHomePageData().hero;
  const socialProof = createHomePageData().socialProof;

  beforeEach(() => {
    vi.mocked(usePreference).mockReturnValue({ locale: "en" } as never);
    vi.mocked(useHomeShowcase).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as never);
  });

  it("renders localized fallback content when no showcase is available", () => {
    vi.mocked(usePreference).mockReturnValue({ locale: "th" } as never);

    render(<HomeHeroPremium hero={hero} socialProof={socialProof} />);

    expect(
      screen.getByRole("heading", { name: "เติบโตทักษะ AI" }),
    ).toBeInTheDocument();
    expect(screen.getByText("เริ่มต้นเส้นทางใหม่กับ LEARNEY")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "เริ่มเรียนเลย" })).toHaveAttribute(
      "href",
      "/courses",
    );
    expect(
      screen.getByRole("link", { name: "ค้นหาอาชีพที่เหมาะกับคุณ" }),
    ).toHaveAttribute("href", "/career-assessment");
    expect(screen.getByText("4.8/5")).toBeInTheDocument();
    expect(screen.getByTestId("home-showcase")).toHaveAttribute(
      "data-state",
      "empty",
    );
  });

  it("renders only valid banner CTAs and keeps external links external", () => {
    vi.mocked(useHomeShowcase).mockReturnValue({
      data: createHomeShowcase({
        primaryText: "Explore path",
        primaryHref: "/courses/featured",
        secondaryText: "Read guide",
        secondaryHref: "https://example.com/guide",
      }),
      isLoading: false,
      isError: false,
    } as never);

    render(<HomeHeroPremium hero={hero} socialProof={socialProof} />);

    expect(
      screen.getByRole("link", { name: "Explore path" }),
    ).toHaveAttribute("href", "/courses/featured");
    expect(screen.getByRole("link", { name: "Read guide" })).toHaveAttribute(
      "href",
      "https://example.com/guide",
    );
    expect(screen.getByRole("link", { name: "Read guide" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("drops invalid banner CTAs and forces the error state when preload failed", () => {
    vi.mocked(useHomeShowcase).mockReturnValue({
      data: createHomeShowcase({
        primaryText: "Broken CTA",
        primaryHref: "mailto:team@example.com",
        secondaryText: "Safe CTA",
        secondaryHref: "/promotions",
      }),
      isLoading: false,
      isError: false,
    } as never);

    render(
      <HomeHeroPremium
        hero={hero}
        socialProof={socialProof}
        initialShowcase={createHomeShowcase({ title: "Server preload" })}
        initialShowcaseState="error"
      />,
    );

    expect(vi.mocked(useHomeShowcase)).toHaveBeenCalledWith(undefined);
    expect(screen.queryByRole("link", { name: "Broken CTA" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Safe CTA" })).toHaveAttribute(
      "href",
      "/promotions",
    );
    expect(screen.getByTestId("home-showcase")).toHaveAttribute(
      "data-state",
      "error",
    );
  });
});
