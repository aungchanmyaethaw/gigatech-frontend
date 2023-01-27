import Hero from "components/Hero";
import PreviewProductRow from "components/PreviewProductRow";
import { useAppContext } from "contexts/AppContext";

export default function Home() {
  const {} = useAppContext();

  return (
    <>
      <Hero />
      <PreviewProductRow
        variables={{ pagination: { limit: 4 }, sort: "createdAt:desc" }}
        heading="New Arrivals"
        latest
      />
      <PreviewProductRow
        variables={{ pagination: { limit: 4 } }}
        heading="Trending"
      />
      <PreviewProductRow heading="Top Sellings" />
    </>
  );
}
