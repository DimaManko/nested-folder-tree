import { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";

import { File } from "../components/File";

const URL = `http://localhost:3000/root`;

export function MainPage() {
  const [data, setData] = useState(null);

  const { loading, error, request } = useHttp();

  useEffect(() => {
    const initialFetchData = async () => {
      const data = await request(URL);
      setData(data);
    };
    initialFetchData();
  }, []);

  function renderItems(item) {
    if (item.type === "file") {
      return <File item={item} />;
    }

    if (item.children) {
      return Object.entries(item.children).map((child) => {
        return renderItems(child[1]);
      });
    }
  }
  console.log(data);
}
