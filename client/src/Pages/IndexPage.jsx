import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Components/Spinner";
import Image from "../Components/Image";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading,setLoading] = useState(true);
  const [searchPlace, setSearchPlace] = useState("")

  
  useEffect(() => {
    axios.get("http://localhost:4000/places").then(({ data }) => {
      console.log(data);
      setAllPlaces(data);
      setLoading(false);
    });
  }, []);
  
  if(loading)
  { return <Spinner width={200} height={200}/>;}
  const filteredPlaces = allPlaces.filter((place) => place.title.toLowerCase().includes(searchPlace))

  return (
    <div>
      <div className=" flex border rounded-full w-56 ml-10 shadow-md shadow-gray-300 p-2">
        <input className="focus:outline-none " placeholder="Search palces..." value={searchPlace} onChange={(e) => setSearchPlace(e.target.value.toLowerCase())} />
        <div className="bg-pink border rounded-full p-1 hidden sm:inline-block">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-white font-bold"
            
          >
            <circle r="5" transform="translate(26,21)" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          </div>
      </div>
    <div className="grid grid-cols-1 justify-items-center py-4 px-6 gap-y-8 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
      {allPlaces.length > 0 &&
        filteredPlaces.map((place) => {
          return (
            <Link to={`/place/${place._id}`} key={place._id} className="w-full max-w-[400px] ">
              <div className="bg-gray-500 mb-2 rounded-2xl flex hover:scale-105 transition-all">
                <Image 
                  className="rounded-2xl h-[220px] w-[100%] xs:h-[250px] sm:h-[280px]"
                  src={place.photos[0]}
                  alt="place-main-photo"
                />
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title.length > 44 ? `${place.title.substr(0,44)}....` 
              : `${place.title}`}</h3>
              <div className="font-semibold">
                <span className="font-bold">₹{place.price?.toLocaleString('en-IN')}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
    </div>
  );
};

export default IndexPage;
