import { useState } from "react";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { useFetch } from "../hooks/UseFetch";
import { UserReview } from "../components/UserReview/UserReview";

export const DashboardPage = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/reviews"
  );

  console.log(data);
  return (
    <>
      <Wrapper
        type="filterWrapper"
        text="Administation"
        subText="Du er logget ind som admin"
      >
        {data && data?.items ? <UserReview data={data?.items} /> : null}
      </Wrapper>
    </>
  );
};
