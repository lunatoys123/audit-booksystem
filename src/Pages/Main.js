import React from "react";
import { useGlobalContext } from "../context";
import Navbar from '../component/navbar'

const Main = () => {
  const { LoginName } = useGlobalContext();
  return (
    <Navbar />
  );
};

export default Main;
