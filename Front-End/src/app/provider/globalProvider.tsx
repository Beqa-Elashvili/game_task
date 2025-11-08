"use client";

import { useContext, useState } from "react";
import {
  TGameFilterQuery,
  UserDetailContext,
  TCategory,
  TCollections,
  TProviders,
  TUser,
  defaultUserData,
} from "./globalContext";

function Provider({ children }: { children: any }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [options, setOptions] = useState<TGameFilterQuery>();
  const [collectionsData, setCollectionsData] = useState<TCollections[]>([]);
  const [categoriesData, setCategoriesData] = useState<TCategory[]>([]);
  const [providersData, setProvidersData] = useState<TProviders[]>([]);
  const [userData, setUserData] = useState<TUser>(defaultUserData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openNewsModal, setOpenNewsModal] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<string>("");
  
  return (
    <UserDetailContext.Provider
      value={{
        userData,
        setUserData,
        isCollapsed,
        openModal,
        setOpenModal,
        modalImg,
        setModalImg,
        setIsCollapsed,
        openNewsModal,
        setOpenNewsModal,
        options,
        setOptions,
        providersData,
        setProvidersData,
        collectionsData,
        setCollectionsData,
        categoriesData,
        setCategoriesData,
      }}
    >
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useGlobalProvider = () => {
  const context = useContext(UserDetailContext);
  return context;
};
