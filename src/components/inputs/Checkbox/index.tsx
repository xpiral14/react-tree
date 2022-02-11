import { CheckBoxContainer, Container, IndeterminateIcon } from "./styles";
import { FaCheck } from "react-icons/fa";
export interface CheckboxProps {
  checked?: boolean | null;
  onChange?: (value: boolean) => void;
  onMouseOver?: React.MouseEventHandler<HTMLInputElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLInputElement> | undefined;

  indeterminated?: boolean;
  id?: string;
  label?: string;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  id,
  onMouseOver,
  onMouseLeave
}: CheckboxProps) {
  const renderContent = () => {
    if (checked) return <FaCheck size={8} />;

    if (checked === undefined || checked === null) return <IndeterminateIcon />;

    return <></>;
  };
  return (
    <Container id={id} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <label htmlFor={"checkbox_" + id}>
        <input
          type="checkbox"
          id={"checkbox_" + id}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <CheckBoxContainer>{renderContent()}</CheckBoxContainer>
        {label}
      </label>
    </Container>
  );
}
