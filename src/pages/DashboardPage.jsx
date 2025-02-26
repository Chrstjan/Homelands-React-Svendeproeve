import { Wrapper } from "../components/Wrapper/Wrapper";
import { EstateCard } from "../components/EstateCard/EstateCard";
import { UserReview } from "../components/UserReview/UserReview";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const [favoriteEstates, setFavoriteEstates] = useState();

  useEffect(() => {
    const getFavorites = async () => {
      const res = await fetch(
        "https://api.mediehuset.net/homelands/favorites",
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      const data = await res.json();
      setFavoriteEstates(data?.items);
    };
    getFavorites();
  }, []);

  return (
    <>
      <Wrapper
        type="filterWrapper"
        text="Administation"
        subText="Du er logget ind som admin"
      >
        <UserReview />
      </Wrapper>
      <Wrapper text="Favoritter">
        {favoriteEstates && favoriteEstates.length > 0 ? (
          <EstateCard data={favoriteEstates} canDislike />
        ) : null}
      </Wrapper>
    </>
  );
};
