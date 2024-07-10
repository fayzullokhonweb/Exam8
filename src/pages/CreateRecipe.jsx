import { Form, useActionData, useNavigate, Link } from "react-router-dom";
import { FormInput, FormSelect, FormTextarea, Modal } from "../components";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { CiLogin } from "react-icons/ci";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let time = formData.get("time");
  let price = formData.get("price");
  let ingredients = formData.get("ingredients");
  let imgUrl = formData.get("imgUrl");
  let nation = formData.get("nation");
  let method = formData.get("method");

  // Add validation check
  if (!title || !time || !imgUrl || !ingredients || !method || !price) {
    return { error: "All fields are required." };
  }

  return { title, time, imgUrl, ingredients, method, nation, price };
};

function CreateRecipe() {
  const actionData = useActionData();
  let selectRef = useRef();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("foods", ["uid", "==", user.uid]);
  const [inputValue, setInputValue] = useState({
    title: "",
    time: "",
    imgUrl: "",
    ingredients: "",
    method: "",
    price: "",
    nation: "Uzbek",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (actionData && actionData.title) {
      const newFood = {
        title: actionData.title,
        time: actionData.time,
        imgUrl: actionData.imgUrl,
        ingredients: actionData.ingredients,
        method: actionData.method,
        nation: actionData.nation,
        price: actionData.price,
        uid: user.uid,
      };
      addDoc(collection(db, "foods"), newFood)
        .then(() => {
          toast.success("New Recipe Added");
          setInputValue({
            title: "",
            time: "",
            imgUrl: "",
            ingredients: "",
            method: "",
            price: "",
            nation: "Uzbek",
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [actionData, user.uid]);

  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && !actionData.error) {
      navigate("/");
    }
  }, [actionData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreviewClick = () => {
    if (
      inputValue.title &&
      inputValue.time &&
      inputValue.imgUrl &&
      inputValue.ingredients &&
      inputValue.method &&
      inputValue.price
    ) {
      setIsModalOpen(true);
    } else {
      toast.error("Please fill in all fields to preview the recipe.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="align-element">
      <div className="text-center">
        <h1 className="lg:text-3xl text-xl mb-3">Add New Recipe</h1>
        <div className="max-w-sm lg:max-w-md w-full mx-auto">
          <Form method="post">
            <FormInput
              label="Title:"
              placeholder="Enter your meal name"
              name="title"
              type="text"
              value={inputValue.title}
              onChange={handleInputChange}
            />
            <FormInput
              label="Cooking time:"
              type="number"
              placeholder="Enter preparation time of your meal"
              name="time"
              value={inputValue.time}
              onChange={handleInputChange}
            />

            <FormInput
              label="Ingredients:"
              placeholder="Enter ingredients of meal"
              name="ingredients"
              type="text"
              value={inputValue.ingredients}
              onChange={handleInputChange}
            />
            <FormInput
              label="Price:"
              placeholder="Enter price"
              name="price"
              type="number"
              value={inputValue.price}
              onChange={handleInputChange}
            />

            <FormInput
              label="Image URL:"
              placeholder="Enter image URL"
              name="imgUrl"
              type="URL"
              value={inputValue.imgUrl}
              onChange={handleInputChange}
            />
            <FormSelect
              label="Nation"
              name="nation"
              value={inputValue.nation}
              onChange={handleInputChange}
              refSelect={selectRef}
            />
            <FormTextarea
              label="Method:"
              placeholder="Enter method of meal"
              name="method"
              value={inputValue.method}
              onChange={handleInputChange}
            />
            <div className="flex justify-between gap-2 max-w-sm w-full lg:max-w-md mt-3">
              <button className="btn btn-primary flex-1">Apply</button>
              <button
                type="button"
                className="btn btn-secondary flex-1"
                onClick={handlePreviewClick}
              >
                Preview
              </button>
            </div>
            {actionData?.error && (
              <div className="text-red-500 mt-2">{actionData.error}</div>
            )}
          </Form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <li
            key={inputValue.title}
            className="group w-full   sm:px-24 list-none "
          >
            <div className="card lg:max-w-sm md:max-w-sm max-w-[300px] w-full bg-base-100 shadow-md hover:shadow-2xl group relative hover:-translate-y-0.5">
              <figure className="  px-12 sm:px-10 pt-12">
                <img
                  src={inputValue.imgUrl}
                  alt={inputValue.title}
                  className="rounded-xl w-96 h-48"
                />
              </figure>
              <div className="card-body items-center text-center">
                <div>
                  <span>The name of the dish</span>
                  <h2 className="font-serif font-semibold text-3xl">
                    {inputValue.title}
                  </h2>
                </div>
                <div className="line-clamp-2 flex items-center gap-2 text-center mb-2">
                  <span>
                    <MdAccessTimeFilled className="w-6 h-6" />
                  </span>
                  <span>Cooking time: {inputValue.time} minutes</span>
                </div>
                <p className="line-clamp-2 text-center mb-2">
                  {inputValue.method}
                </p>
              </div>
            </div>
          </li>
        </div>
      </Modal>
    </div>
  );
}

export default CreateRecipe;
