import Hero from "components/Hero";
import PreviewProductRow from "components/PreviewProductRow";

export default function Home() {
  return (
    <>
      <Hero />
      <PreviewProductRow
        variables={{ pagination: { limit: 4 }, sort: "createdAt:desc" }}
        heading="New Arrivals"
      />
      <PreviewProductRow
        variables={{ pagination: { limit: 4 } }}
        heading="Trending"
      />
      <PreviewProductRow heading="Top Sellings" />
    </>
  );
}
