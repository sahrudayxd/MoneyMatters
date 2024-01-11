import "./index.css";

const Failure = (props) => {
  const { fetchApi } = props;
  return (
    <>
      <p className="failure-msg">Oops! Something went wrong</p>
      <button type="button" className="failure-button" onClick={fetchApi}>
        Try Again
      </button>
    </>
  );
};

export default Failure;
