import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to={"/read-excel"}>read Excel</Link>
      <Link to={"/data-manually"}>data manually</Link>
    </div>
  );
};

export default HomePage;
