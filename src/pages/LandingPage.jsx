import { useEffect, useState } from "react";
import { Slider } from "../components/Slider/Slider";
import { useFetch } from "../hooks/UseFetch";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { EstateCard } from "../components/EstateCard/EstateCard";
import { EmployeeCard } from "../components/EmployeeCard/EmployeeCard";

export const LandingPage = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/homes"
  );
  const [estates, setEstates] = useState();

  useEffect(() => {
    if (data) {
      const estates = data?.items?.slice(0, 3);
      setEstates(estates);
    }
  }, [data]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error getting estates, try again</h2>;
  }

  return (
    <>
      <Wrapper>
        <Slider />
      </Wrapper>
      <Wrapper type="estateShowcase">
        {estates && estates?.length > 0 ? <EstateCard data={estates} /> : null}
      </Wrapper>
      <Wrapper text="Det siger kunderne:"></Wrapper>
      <Wrapper text="Mød vores ansatte">
        <EmployeeCard />
      </Wrapper>
    </>
  );
};
