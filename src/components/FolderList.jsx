import { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";

import { File } from "../components/File";
import { Folder } from "../components/Folder";

const URL = `http://localhost:3000/root`;

export function FolderList() {
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
      return <File name={name} key={name} />;
    }

    if (Object.entries(node.children).length === 0) {
      return <Folder name={name} />;
    }

    return (
      <Folder name={name} key={name}>
        {Object.entries(node.children).map(([name, item]) => {
          return renderItems(item, name);
        })}
      </Folder>
    );
  }

  if (loading) {
    return (
      <div className="tree-card">
        <div className="tree-status">
          <span className="tree-spinner" />
          Loading…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tree-card">
        <div className="tree-error">⚠️ Failed to load data</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="tree-card">
        <div className="tree-error">⚠️ No data</div>
      </div>
    );
  }

  const items = renderItems(data);

  return (
    <div className="tree-card">
      <h1>📂 File Structure</h1>
      <ul className="tree-root">{items}</ul>
    </div>
  );
}
