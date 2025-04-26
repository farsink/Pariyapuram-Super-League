import React, { createContext, useContext, useEffect, useState } from "react";
import { getNews } from "../Api/ApiList";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [News, setNews] = useState([]);
  const [metadata, setMetadata] = useState({});

  const fetchNews = async () => {
    const response = await getNews();
    setNews(response.data.news);
    setMetadata(response.data.metadata);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  console.log(News);
  return (
    <NewsContext.Provider value={{ News, metadata }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
