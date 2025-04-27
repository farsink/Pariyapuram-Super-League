import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getNews } from "../Api/ApiList";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [News, setNews] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [page, setpage] = useState(1);

  const fetchNews = useCallback(async (pageNum = 1) => {
    const response = await getNews(pageNum, 10);
    setNews(response.data.news);
    setMetadata(response.data.meta);
  }, []);

  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);
  console.log(News, metadata);
  return (
    <NewsContext.Provider value={{ News, metadata, setpage, page }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
