import { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";

import { File } from "../components/File";
import { Folder } from "../components/Folder";

import { ErrorMessage } from "../UI/ErrorMessage";
import { Spinner } from "../UI/Spinner";

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

  function renderItems(node, name = null) {
    if (!node.type) {
      return Object.entries(node).map(([name, item]) => {
        return renderItems(item, name);
      });
    }

    if (node.type === "file") {
      return <File name={name} />;
    }

    if (Object.entries(node.children).length === 0) {
      return <Folder name={name} />;
    }

    return (
      <Folder name={name}>
        {Object.entries(node.children).map(([name, item]) => {
          if (item.type === "folder") {
            const result = renderItems(item, name);
            return (
              <Folder name={name} key={name}>
                {result}
              </Folder>
            );
          } else {
            return <File name={name} key={name} />;
          }
        })}
      </Folder>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!data) {
    return <ErrorMessage />;
  }

  const items = renderItems(data);

  return <ul>{items}</ul>;
}
