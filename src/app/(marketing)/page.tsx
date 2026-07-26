import { Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources/once-ui.config";
import { meta } from "@/resources/seo";
import Hero from "@/components/Landing/Hero";
import { Introduction } from "@/components/Landing/Introduction";
import WhyPostLeafExists from "@/components/Landing/WhyPostLeaf";
import { Experiences } from "@/components/Landing/Experiences";
import { Journey } from "@/components/Landing/Journey";
import { CommunityPreview } from "@/components/Landing/CommunityPreview";
import { Testimonials } from "@/components/Landing/Testimonials";

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
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={meta.home.title}
        description={meta.home.description}
        path={meta.home.path}
      />
      <Hero />
      <Introduction />
      <WhyPostLeafExists />
      <Experiences />
      <Journey />
      <CommunityPreview />
      <Testimonials />
    </>
  );
}
