import { Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LinkTab = (props) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(props.href); // React Router 네비게이션 사용
  };

  return <Tab component="a" onClick={handleClick} {...props} />;
};

export default LinkTab;