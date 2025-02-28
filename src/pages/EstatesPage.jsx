import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/UseFetch";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { EstateCard } from "../components/EstateCard/EstateCard";
import { EstateType } from "../components/EstateType/EstateType";
import { EstatePrice } from "../components/EstatePrice/EstatePrice";
import { FaRegHeart } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { findObjectValues } from "../helpers/findObjectValues";

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
  const { keyword } = useParams();

  const getFavorites = async () => {
    const res = await fetch("https://api.mediehuset.net/homelands/favorites", {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    const favoriteData = await res.json();
    setFavorites(favoriteData?.items);
  };

  useEffect(() => {
    setFilteredEstates(favorites);
  }, [favorites]);

  useEffect(() => {
    if (data) {
      setEstates(data?.items);
      setFilteredEstates(data?.items);
    }
  }, [data]);

  useEffect(() => {
    if (keyword && keyword.length > 0) {
      let searched = estates?.filter(
        (item) => findObjectValues(item, keyword)
        // item?.address.toLocaleLowerCase()?.includes(keyword.toLocaleLowerCase())
      );
      setFilteredEstates(searched);
    }
  }, [estates, keyword]);

  useEffect(() => {
    if (estates && estates.length > 0) {
      let allEstates = [...estates];
      let selectedEstates = allEstates.filter((item) => {
        if (item?.type === selcetedType) {
          return item;
        }
      });
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
      <Wrapper type="filterWrapper">
        <h2>Boliger til salg</h2>
        <section>
          <EstatePrice setEstatePrice={setEstatePrice} />
          <EstateType setSelectedType={setSelectedType} />
        </section>
        {user?.access_token ? (
          <FaRegHeart onClick={() => getFavorites()} />
        ) : null}
      </Wrapper>
      <Wrapper type="estatesShowcase">
        {estates && estates.length > 0 ? (
          <EstateCard data={filteredEstates} canLike />
        ) : null}
      </Wrapper>
    </>
  );
};
