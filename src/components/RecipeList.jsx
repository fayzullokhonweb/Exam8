import { MdAccessTimeFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { IoClose } from "react-icons/io5";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const RecipeList = () => {
  const { user } = useSelector((state) => state.user);
  const { data, error } = useCollection("foods", ["uid", "==", user?.uid]);

  const handleDelete = (id) => {
    deleteDoc(doc(db, "foods", id))
      .then(() => {
        toast.success("Recipe deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="align-element px-7 mt-5 overflow-x-hidden">
      <h1 className="text-2xl mb-6">Recipes</h1>
      {error && <p>Error loading data: {error.message}</p>}
      <ul className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-1 items-center  lg:grid-cols-3  gap-5">
        {data &&
          data.map((food) => {
            return (
              <li key={food.id} className="group">
                <div className="card  lg:max-w-md md:max-w-sm max-w-xs w-full bg-base-100 shadow-md hover:shadow-2xl group relative hover:-translate-y-0.5">
                  <div className="absolute cursor-pointer top-3 hover: hidden group-hover:block  right-3">
                    <button onClick={() => handleDelete(food.id)}>
                      <IoClose className="w-7 h-7 " />
                    </button>
                  </div>
                  <figure className="px-10 pt-12">
                    <img
                      src={food.imgUrl}
                      alt={food.title}
                      className="rounded-xl w-96 h-48"
                    />
                  </figure>

                  <div className="card-body items-center text-center">
                    <div>
                      <span>The name of the dish</span>
                      <h2 className="font-serif font-semibold text-3xl">
                        {food.title}
                      </h2>
                    </div>
                    <div className="line-clamp-2 flex items-center gap-2 text-center mb-2">
                      <span>
                        <MdAccessTimeFilled className="w-6 h-6" />
                      </span>
                      <span>Cooking time: {food.time} minutes</span>
                    </div>
                    <p className="line-clamp-2 h-12 text-center mb-2">
                      {food.method}
                    </p>
                    <div className="card-actions">
                      <Link
                        to={`/recipe/${food.id}`}
                        className="text-lg font-serif btn btn-outline border-none"
                      >
                        <span className="flex items-center gap-1">
                          <span> More Details</span>
                          <span>
                            <CiLogin className="w-7 h-7" />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RecipeList;
