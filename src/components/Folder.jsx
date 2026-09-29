export function Folder({ name, children }) {
  return (
    <li>
      <span className="tree-folder">📁 {name}</span>
      {children && <ul className="tree-children">{children}</ul>}
    </li>
  );
}
