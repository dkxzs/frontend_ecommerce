import { useNavigate } from "react-router-dom";
const Button = (props) => {
  const navigate = useNavigate();
  const { text, className, path, onclick, disabled } = props;
  const onClick = () => {
    if (path) {
      navigate(path);
    } else {
      onclick();
    }
  };
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || false}
    >
      {text}
    </button>
  );
};

export default Button;
