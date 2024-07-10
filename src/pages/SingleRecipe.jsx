import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addProduct } from "../features/productSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SingleRecipe = () => {
  const [productAmount, setProductAmount] = useState(1);
  let { id } = useParams();
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "foods", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleAddToCart = () => {
    if (recipe) {
      dispatch(
        addProduct({
          id, // Use id here
          time: recipe.time,
          price: recipe.price,
          amount: productAmount, // Use productAmount here
          image: recipe.imgUrl,
          title: recipe.title,
        })
      );
      toast.success("Your chosen amount of food has been added to the store");
      setProductAmount(1);
    }
  };

  const setAmount = (type) => {
    if (type === "decrease" && productAmount > 1) {
      setProductAmount((prev) => prev - 1);
    } else if (type === "increase" && productAmount < 9) {
      // updated limit
      setProductAmount((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div className="align-element">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe found</div>;
  }

  console.log(recipe);

  return (
    <div className="align-element ">
      <div className="group flex flex-col lg:flex-row p-6 gap-10 lg:gap-20 hover:shadow-2xl hover:rounded-2xl relative">
        <img
          className="w-full max-w-full lg:max-w-md rounded"
          src={recipe.imgUrl}
          alt={recipe.title}
        />

        <div className="py-6">
          <div className="flex flex-col text-left mb-11">
            <h2 className="text-2xl lg:text-4xl font-black mr-auto mb-6">
              {recipe.title}
            </h2>
            <p className="text-lg lg:text-xl font-medium mb-1">
              National dish of the:
              <span className="font-light"> {recipe.nation} people</span>
            </p>
            <p className="text-lg lg:text-xl font-medium mb-1">
              Time to get ready:
              <span className="font-light">{recipe.time}m</span>
            </p>
            <p className="text-lg lg:text-xl font-medium mb-4">
              Ingredients:
              <span className="font-light">{recipe.ingredients}</span>
            </p>
            <p className="text-lg lg:text-xl w-full line-clamp-4 font-medium">
              Cooking method:
              <span className="font-light">{recipe.method}</span>
            </p>
          </div>

          <div className="flex gap-6 items-center">
            <div className="flex items-center px-3 w-28 py-2 border border-gray-300 text-gray-800 outline-none bg-transparent rounded-md">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setAmount("decrease")}
                disabled={productAmount === 1}
              >
                <FaMinus className="w-5 h-5 " />
              </button>
              <p className="mx-4 text-xl">{productAmount}</p>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setAmount("increase")}
                disabled={productAmount === 10}
              >
                <FaPlus className="w-5 h-5" />
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary text-white"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className="absolute bottom-7 right-20 ">
            <Link to="/" className="btn btn-primary text-white">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
