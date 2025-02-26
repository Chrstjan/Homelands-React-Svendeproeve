import { useParams } from "react-router-dom";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Slider } from "../components/Slider/Slider";
import { useFetch } from "../hooks/UseFetch";
import { EstateDetailsCard } from "../components/EstateDetailsCard/EstateDetailsCard";

export const EstatePage = () => {
  const EstateId = useParams();

  const { data, isLoading, error } = useFetch(
    `https://api.mediehuset.net/homelands/homes/${Object.values(EstateId)}`
  );

  return (
    <>
      <Wrapper>
        {data && data?.item?.images ? (
          <Slider thumbnail={data?.item?.images[0]?.filename?.large} />
        ) : null}
      </Wrapper>
      <Wrapper>
        {data && data?.item ? <EstateDetailsCard data={data?.item} /> : null}
      </Wrapper>
    </>
  );
};
