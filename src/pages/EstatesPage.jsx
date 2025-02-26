import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/UseFetch";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { EstateCard } from "../components/EstateCard/EstateCard";
import { EstateType } from "../components/EstateType/EstateType";
import { EstatePrice } from "../components/EstatePrice/EstatePrice";
import { FaRegHeart } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

export const EstatesPage = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/homes"
  );
  const { user } = useContext(UserContext);
  const [estates, setEstates] = useState();
  const [selcetedType, setSelectedType] = useState();
  const [estatePrice, setEstatePrice] = useState();
  const [filteredEstates, setFilteredEstates] = useState();
  const [favorites, setFavorites] = useState();

  const getFavorites = async () => {
    const res = await fetch("https://api.mediehuset.net/homelands/favorites", {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    const favoriteData = await res.json();
    console.log(favoriteData);
    setFavorites(favoriteData?.items);
  };

  useEffect(() => {
    setFilteredEstates(favorites);
  }, [favorites]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setEstates(data?.items);
      setFilteredEstates(data?.items);
    }
  }, [data]);

  useEffect(() => {
    console.log("Selected", selcetedType);
    if (estates && estates.length > 0) {
      let allEstates = [...estates];
      let selectedEstates = allEstates.filter((item) => {
        if (item?.type === selcetedType) {
          return item;
        }
      });
      console.log(selectedEstates);
      setFilteredEstates(selectedEstates);
    }
  }, [selcetedType]);

  useEffect(() => {
    if (estates && estates.length > 0) {
      let allEstates = [...estates];

      if (estatePrice === "low") {
        let lowEstates = allEstates.sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        );
        setFilteredEstates(lowEstates);
      }

      if (estatePrice === "high") {
        let highEstates = allEstates.sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        );
        setFilteredEstates(highEstates);
      }
    }
  }, [estatePrice]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error getting estates, try again</h2>;
  }
  return (
    <>
      <Wrapper text="Boliger til salg" type="filterWrapper">
        <EstateType setSelectedType={setSelectedType} />
        <EstatePrice setEstatePrice={setEstatePrice} />
        {user?.access_token ? (
          <FaRegHeart onClick={() => getFavorites()} />
        ) : null}
      </Wrapper>
      <Wrapper>
        {estates && estates.length > 0 ? (
          <EstateCard data={filteredEstates} canLike />
        ) : null}
      </Wrapper>
    </>
  );
};
