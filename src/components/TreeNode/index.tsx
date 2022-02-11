import { useCallback, useEffect, useMemo, useState } from "react";
import { Checkbox } from "../";
import { Container } from "./styles";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight
} from "react-icons/md";

export interface Node {
  id: string;
  name: string;
  children: Record<string, Node>;
  level: number;
}
export interface ITreeNodeProps {
  node: Node;
  parentNodes?: Record<string, Omit<Node, "children">>;
  onSelect?: (id: string[]) => void;
  onUnselect?: (id: string[]) => void;
  selecteds?: string[];
  limitOfNodes: number;
}

function TreeNode({
  selecteds,
  node,
  onSelect,
  onUnselect,
  limitOfNodes,
  parentNodes
}: ITreeNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return node.level !== 0;
  });
  const isSelected = selecteds?.some((nodeId) => node.id === nodeId);

  const getAllChildNodes = useCallback((node: Node, res: Node[]) => {
    Object.values(node.children).forEach((n) => {
      res.push(n);
      if (!Object.keys(n.children).length) return;

      getAllChildNodes(n, res);
    });
    return res;
  }, []);

  const allChildNodes = useMemo(() => getAllChildNodes(node, []), [
    node,
    getAllChildNodes
  ]);

  const onChangeCheckbox = useCallback(
    (checked: boolean | null) => {
      let nodesToHandle = [node.id, ...allChildNodes.map((node) => node.id)];
      let action;

      switch (checked) {
        case null: {
          nodesToHandle = [node.id];
          action = onUnselect;
          break;
        }
        case false: {
          action = onUnselect;
          break;
        }
        case true: {
          action = onSelect;
          break;
        }
      }
      action?.(nodesToHandle);
    },
    [allChildNodes, onUnselect, node.id, onSelect]
  );

  const hasChilds = allChildNodes.length > 0;

  const renderNodes = () => {
    if (!hasChilds || isCollapsed) return;

    return Object.keys(node.children).map((key) => (
      <ul>
        <TreeNode
          key={node.children[key].id}
          node={node.children[key]}
          onSelect={onSelect}
          onUnselect={onUnselect}
          parentNodes={{
            ...parentNodes,
            [node.id]: {
              id: node.id,
              name: node.name,
              level: node.level
            }
          }}
          selecteds={selecteds}
          limitOfNodes={limitOfNodes}
        />
      </ul>
    ));
  };

  const getAllParentNodeElements = () => {
    return Object.keys(parentNodes as any).map((nodeId) =>
      document.getElementById(nodeId)
    );
  };

  const onMouseOver = () => {
    getAllParentNodeElements().forEach((el) =>
      el?.classList.add("node-name-hovered")
    );
    document.getElementById(node.id)?.classList.add("node-name-hovered");
  };
  const onMouseLeave = () => {
    getAllParentNodeElements().forEach((el) =>
      el?.classList.remove("node-name-hovered")
    );
    document.getElementById(node.id)?.classList.remove("node-name-hovered");
  };

  const allChildIsSelected = useMemo(
    () =>
      hasChilds &&
      allChildNodes.every((child) => selecteds?.includes(child.id)),
    [allChildNodes, selecteds, hasChilds]
  );

  const allChildsIsUnselected = useMemo(
    () =>
      hasChilds &&
      allChildNodes.every((child) => !selecteds?.includes(child.id)),
    [hasChilds, allChildNodes, selecteds]
  );
  const hasSomeChildUnSelected = useMemo(
    () =>
      hasChilds &&
      allChildNodes.length > 1 &&
      !allChildsIsUnselected &&
      allChildNodes.some((child) => !selecteds?.includes(child.id)),
    [allChildNodes, allChildsIsUnselected, selecteds, hasChilds]
  );
  const checkBoxIsSelected = useMemo(() => {
    if (allChildIsSelected) return true;

    if (hasSomeChildUnSelected) return null;

    return isSelected;
  }, [allChildIsSelected, hasSomeChildUnSelected, isSelected]);

  useEffect(() => {
    if (allChildIsSelected) {
      onChangeCheckbox(true);
    }
  }, [allChildIsSelected, onChangeCheckbox]);

  useEffect(() => {
    if (!allChildsIsUnselected) return;

    onChangeCheckbox(false);
  }, [allChildsIsUnselected, onChangeCheckbox]);

  useEffect(() => {
    if (hasSomeChildUnSelected) {
      onChangeCheckbox(null);
    }
  }, [hasSomeChildUnSelected, onChangeCheckbox]);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  return (
    <Container className="">
      <div>
        {hasChilds && (
          <button onClick={toggleCollapse}>
            {isCollapsed ? (
              <MdOutlineKeyboardArrowRight size={20} />
            ) : (
              <MdOutlineKeyboardArrowDown size={20} />
            )}
          </button>
        )}
        <Checkbox
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          checked={checkBoxIsSelected}
          id={node.id}
          onChange={onChangeCheckbox}
          label={node.name}
        />
      </div>
      {renderNodes()}
    </Container>
  );
}
TreeNode.defaultProps = {
  limitOfNodes: 10
};

export default TreeNode;
