import { useEffect, useState } from "react";
import s from "./EmployeeCard.module.scss";
import { useFetch } from "../../hooks/UseFetch";

export const EmployeeCard = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.mediehuset.net/homelands/staff"
  );
  console.log(data);
  return (
    <>
      {data?.items?.map((item) => {
        return (
          <figure key={item?.id} className={s.employeeStyling}>
            <img src={item?.image} alt={item?.firstname} />
            <figcaption>
              <h3>{item?.firstname + " " + item?.lastname}</h3>
              <p>{item?.position}</p>
              <span className={s.contactInfo}>
                <p>Email: {item?.email}</p>
                <p>Mobil: {item?.phone}</p>
              </span>
            </figcaption>
          </figure>
        );
      })}
    </>
  );
};
