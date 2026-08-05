import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources/once-ui.config";
import { meta } from "@/resources/seo";
import { Hero, Introduction, WhyPostLeaf, Journey, CommunityPreview, Testimonials, Privacy, FAQ, CTA } from "./components";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL,
    path: meta.home.path,
    canonical: meta.home.canonical,
    image: meta.home.image,
    robots: meta.home.robots,
    alternates: meta.home.alternates,
  });
}

export default function Home() {

  return (
    <Column fillWidth horizontal="center" gap="xl">
      <Hero />
      <Column maxWidth="l" gap="xl" paddingX="l" paddingBottom="104">
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={meta.home.title}
          description={meta.home.description}
          path={meta.home.path}
        />
        <Introduction />
        <WhyPostLeaf />
        {/* <Experiences /> */}
        <Journey marginTop="xl" />
        <CommunityPreview marginTop="xl" />
        <Testimonials marginTop="xl" />
        <Privacy marginTop="xl" />
        <FAQ marginTop="xl" />
        <CTA marginTop="xl" />
      </Column>
    </Column>
  );
}