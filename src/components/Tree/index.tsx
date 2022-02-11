import TreeNode from "../TreeNode";
import { Container } from "./styles";
export interface Node {
  id: string;
  name: string;
  children: Record<string, Node>;
  level: number;
}

export interface NodeWithParent extends Node {
  parent: {
    id: string;
    name: string;
  };
}
export interface ITreeProps {
  nodes: Record<string, Node>;
  selecteds?: string[];
  onSelect?: (ids: string[]) => void;
  onUnselect?: (ids: string[]) => void;
  limitOfNodes: number;
}

export default function Tree({
  nodes,
  selecteds,
  onSelect,
  onUnselect,
  limitOfNodes
}: ITreeProps) {
  return (
    <Container>
      {Object.values(nodes).map((node) => (
        <TreeNode
          key={node.id}
          selecteds={selecteds}
          node={node}
          onSelect={onSelect}
          onUnselect={onUnselect}
          limitOfNodes={limitOfNodes}
          parentNodes={{}}
        />
      ))}
    </Container>
  );
}
