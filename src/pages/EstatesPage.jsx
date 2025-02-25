import { useEffect, useState } from "react";
import { useFetch } from "../hooks/UseFetch"
import { Wrapper } from "../components/Wrapper/Wrapper"
import { EstateCard } from "../components/EstateCard/EstateCard"

export const EstatesPage = () => {
  const { data, isLoading, error } = useFetch("https://api.mediehuset.net/homelands/homes");
  const [estates, setEstates] = useState();

  useEffect(() => {
    if (data) {
      console.log(data);
      setEstates(data?.items)
    }
  }, [data])
  return <>
    <Wrapper>
      {estates && estates.length > 0 ? <EstateCard data={estates} canLike/> : null}
    </Wrapper>
  </>;
};
