import { useNavigate } from "react-router-dom";
const Button = (props) => {
  const navigate = useNavigate();
  const { text, className, path } = props;
  return (
    <button className={className} onClick={() => navigate(path)}>
      {text}
    </button>
  );
};

export default Button;
