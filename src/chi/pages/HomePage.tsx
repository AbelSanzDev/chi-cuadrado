import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link
        className="p-1 mx-2 bg-indigo-500 rounded-md text-white"
        to={"/read-excel"}
      >
        read Excel
      </Link>
      <Link
        className="p-1 mx-2 bg-indigo-500 rounded-md text-white"
        to={"/data-manually"}
      >
        data manually
      </Link>
    </div>
  );
};

export default HomePage;
