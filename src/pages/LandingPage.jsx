import { useEffect, useState } from "react";
import { Slider } from "../components/Slider/Slider";
import { useFetch } from "../hooks/UseFetch";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { EstateCard } from "../components/EstateCard/EstateCard";
import { EmployeeCard } from "../components/EmployeeCard/EmployeeCard";
import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import { ReviewForm } from "../components/ReviewForm/ReviewForm";

export const LandingPage = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/homes"
  );
  const [estates, setEstates] = useState();
  const [writeReview, setWriteReview] = useState(false);

  useEffect(() => {
    if (data) {
      const randomEstate = [];
      randomEstate.push(
        data?.items[Math.floor(Math.random() * data?.items?.length)],
        data?.items[Math.floor(Math.random() * data?.items?.length)],
        data?.items[Math.floor(Math.random() * data?.items?.length)]
      );
      const estates = randomEstate?.slice(0, 3);
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
      <Wrapper type="estatesShowcase">
        {estates && estates?.length > 0 ? (
          <EstateCard data={estates} canLike />
        ) : null}
      </Wrapper>
      <Wrapper text="Det siger kunderne:">
        {!writeReview ? (
          <ReviewCard setWriteReview={setWriteReview} />
        ) : (
          <ReviewForm setWriteReview={setWriteReview} />
        )}
      </Wrapper>
      <Wrapper text="Mød vores ansatte" type="employee">
        <EmployeeCard />
      </Wrapper>
    </>
  );
};
