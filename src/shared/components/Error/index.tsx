import "./index.css";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = (props) => {
  return <div className="error">{props.message}</div>;
};

export default Error;
