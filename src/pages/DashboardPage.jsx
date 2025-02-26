import { useState } from "react";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { useFetch } from "../hooks/UseFetch";
import { UserReview } from "../components/UserReview/UserReview";

export const DashboardPage = () => {
  return (
    <>
      <Wrapper
        type="filterWrapper"
        text="Administation"
        subText="Du er logget ind som admin"
      >
        <UserReview />
      </Wrapper>
    </>
  );
};
