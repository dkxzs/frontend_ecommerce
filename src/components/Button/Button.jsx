import { Link } from "react-router-dom";

const Button = (props) => {
  const { text, className, path } = props;
  return (
    <Link to={path}>
      <button className={className}>{text}</button>
    </Link>
  );
};

export default Button;
