import React, { useEffect, useRef, useState } from 'react'
import Input from '../ui/input'
import { useMainContext } from '@/lib/maincontext'
import Popup from '../popup/popup'
import { getCountries } from '@/lib/countries'
import { useSession } from 'next-auth/react'

const UploadForm = () => {
  const { data: session, status } = useSession();

  const [countries, setCountries] = useState();

  const [recipeName, setRecipeName] = useState()
  const [description, setDescription] = useState()
  const [portions, setPortions] = useState()
  const [time, setTime] = useState()
  const [ingredients, setIngredients] = useState([])
  const [picture, setPicture] = useState()
  const [nationality, setNationality] = useState()
  const [difficulity, setDifficulity] = useState()
  const [type, setType] = useState()
  const [steps, setSteps] = useState([])

  const ingredientRef = useRef()
  const amountRef = useRef();
  const unitRef = useRef();
  const stepRef = useRef();

  const ingredientRefMobile = useRef()
  const amountRefMobile = useRef();
  const unitRefMobile = useRef();

  const { setRequestError, setRequestStatus, requestError, requestStatus } = useMainContext();

  const userEmail = session?.user.email;

  const createRecipe = async ({ name, description, peoples, time, ingredients, image, nationality, difficulity, type, steps, userEmail, isApproved}) => {
    const response = await fetch('/api/recipes/create', {
      method: 'POST',
      body: JSON.stringify({ name, description, peoples, time, ingredients, image, nationality, difficulity, type, steps, userEmail, isApproved}),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      setRequestError(data.message);
      setRequestStatus("error");
    }
    setRequestError(data.message);
    setRequestStatus("success");

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesData = await getCountries();
        const sortedData = countriesData.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);


  const addStep = (e) => {
    e.preventDefault();
    const step = stepRef.current?.value;

    if (!step || step.trim().length === 0) {
      setRequestError("Please enter a valid step!");
      setRequestStatus("error");
      return;
    }

    setSteps([...steps, step]);
    stepRef.current.value = "";
  }

  const addIngredientHandlerMobile = (e) => {
    e.preventDefault();

    const ingredient = ingredientRefMobile.current?.value;
    const amount = amountRefMobile.current?.value;
    const unit = unitRefMobile.current?.value;

    if (!ingredient || ingredient.trim().length === 0) {
      setRequestError("Please enter a valid ingredient!");
      setRequestStatus("error");
      return;
    }

    if (!amount || amount.trim().length === 0) {
      setRequestError("Please enter a valid amount!");
      setRequestStatus("error");
      return;
    }

    if (!unit || unit.trim().length === 0) {
      setRequestError("Please enter a valid unit!");
      setRequestStatus("error");
      return;
    }

    setIngredients([...ingredients, { ingredient: ingredient, amount: amount, unit: unit }]);

    ingredientRefMobile.current.value = "";
    amountRefMobile.current.value = "";
    unitRefMobile.current.value = "";
  }

  const deleteItemFromIngredient = (ingredient) => {
    const newIngredients = ingredients.filter(item => item.ingredient !== ingredient);
    setIngredients(newIngredients);
  }

  const deleteItemFromSteps = (step) => {
    const newSteps = steps.filter(item => item !== step);
    setSteps(newSteps);
  }

  const addIngredientHandler = (e) => {
    e.preventDefault();

    const ingredient = ingredientRef.current?.value;
    const amount = amountRef.current?.value;
    const unit = unitRef.current?.value;

    if (!ingredient || ingredient.trim().length === 0) {
      setRequestError("Please enter a valid ingredient!");
      setRequestStatus("error");
      return;
    }

    if (!amount || amount.trim().length === 0) {
      setRequestError("Please enter a valid amount!");
      setRequestStatus("error");
      return;
    }

    if (!unit || unit.trim().length === 0) {
      setRequestError("Please enter a valid unit!");
      setRequestStatus("error");
      return;
    }

    setIngredients([...ingredients, { ingredient: ingredient, amount: amount, unit: unit }]);

    ingredientRef.current.value = "";
    amountRef.current.value = "";
    unitRef.current.value = "";
  }



  const uploadHandler = async (e) => {
    e.preventDefault();

    if (!recipeName || recipeName.trim().length === 0) {
      setRequestError("Please enter a valid recipe name!");
      setRequestStatus("error");
      return;
    }

    if (!description || description.trim().length === 0) {
      setRequestError("Please enter a valid description!");
      setRequestStatus("error");
      return;
    }

    if (!portions || portions.trim().length === 0) {
      setRequestError("Please enter a valid portions!");
      setRequestStatus("error");
      return;
    }

    if (!time || time.trim().length === 0) {
      setRequestError("Please choose a valid time!");
      setRequestStatus("error");
      return;
    }

    if (!ingredients || ingredients.length === 0) {
      setRequestError("Please add ingredients!");
      setRequestStatus("error");
      return;
    }

    if (!picture || picture.trim().length === 0) {
      setRequestError("Please enter a valid picture url!");
      setRequestStatus("error");
      return;
    }

    if (!nationality || nationality.trim().length === 0) {
      setRequestError("Please choose the nationality of the food")
      setRequestStatus("error");
      return;
    }

    if (!difficulity || difficulity.trim().length === 0) {
      setRequestError("Please choose the difficulity of the food")
      setRequestStatus("error");
      return;
    }

    if (!type || type.trim().length === 0) {
      setRequestError("Please choose the type of the food")
      setRequestStatus("error");
      return;
    }

    if (!steps || steps.length === 0) {
      setRequestError("Please add steps!")
      setRequestStatus("error");
      return;
    }

    try {
      setRequestError("Recipe under construction!");
      setRequestStatus("warning");
      const result = await createRecipe({
        name: recipeName,
        description: description,
        peoples: portions,
        time: time,
        ingredients: ingredients,
        nationality: nationality,
        difficulity: difficulity,
        type: type,
        image: picture,
        steps: steps,
        userEmail: userEmail,
        isApproved: false
      });
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }

  }

  return (
    <section className='min-h-screen flex flex-col items-center justify-center w-full max-w-[95%] h-full relative'>
      {requestError && requestStatus && <Popup message={requestError} status={requestStatus} />}
      <h1 className='text-2xl font-bold text-center mb-10 mt-20 lg:mb-20'>Upload your favourite recipe!</h1>
      <button onClick={uploadHandler} className='mb-10 static self-center lg:absolute top-5 right-5 px-4 text-xl py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300'>
        Upload
      </button>
      <div className='flex flex-col items-center lg:items-start justify-start lg:flex-row gap-5 lg:gap-20'>
        <div className='flex flex-col items-start justify-center gap-10 w-full lg:w-1/2 max-w-full lg:max-w-[50%]'>
          <div className='flex flex-col items-center lg:items-start w-full gap-3'>
            <Input label="Recipe name" placeholder="Enter recipe name" type="text" ownStyle="w-full" onChangeHandler={e => setRecipeName(e.target.value)}/>
          </div>
          <div className='flex flex-col items-center lg:items-start w-full gap-3'>
            <Input label="Description" placeholder="Enter the description" type="text" ownStyle="w-full" onChangeHandler={e => setDescription(e.target.value)} />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-5'>
            <div className='flex flex-col items-center lg:items-start w-full gap-3'>
              <Input label="Portions" placeholder="Portions" type="number" ownStyle="w-full" onChangeHandler={e => setPortions(e.target.value)} />
            </div>
            <div className='flex flex-col items-center lg:items-start w-full gap-3'>
              <label htmlFor="time" className='text-4xl font-semibold w-full md:w-auto text-center lg:text-left'>Time</label>
              <select name="time" onChange={e => setTime(e.target.value)} id="time" className='p-3 text-xl w-full active:outline-none focus:outline-none shadow-xl rounded-md border-b border-b-gray-600'>
                <option disabled selected value="">Select time</option>
                <option value=">1h">Less than 1 hour</option>
                <option value="1h-2h">Between 1 and 2 hours</option>
                <option value="2h<">More than 2 hours</option>
              </select>
            </div>
          </div>
          <div className='w-full flex-col items-center justify-center gap-8 hidden lg:flex mb-10'>
            <h1 className='text-4xl font-semibold w-full md:w-auto text-center lg:text-left'>Ingredients</h1>
            <div className='grid grid-cols-3 w-full gap-10 max-w-full'>
              <div className='flex flex-col items-center justify-center'>
                <label>Ingredient</label>
                <input ref={ingredientRef} className='mt-1 p-2 w-full rounded-md border border-gray-300' type="text" placeholder="Enter the ingredient" />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label>Amount</label>
                <input ref={amountRef} className='mt-1 p-2 w-full rounded-md border border-gray-300' type="text" placeholder="Enter the ingredient" />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label>Unit</label>
                <input ref={unitRef} className='mt-1 p-2 w-full rounded-md border border-gray-300' type="text" placeholder="Enter the ingredient" />
              </div>
            </div>
            <button onClick={addIngredientHandler} className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300'>Add ingredient</button>
            <div className='grid grid-cols-4 w-full text-center gap-4'>
              <h1>Ingredient</h1>
              <h1>Amount</h1>
              <h1>Unit</h1>
              <h1 className='text-red-500 text-xl font-bold cursor-pointer' onClick={() => setIngredients([])}>X</h1>
            </div>
            {
              ingredients?.map((ingredient, index) => (
                <div key={index} className={`grid grid-cols-4 w-full gap-4 text-center ${index % 2 !== 0 ? "bg-gray-200 shadow-lg rounded-lg py-4" : ""}`}>
                  <h1 className='max-w-fit' style={{ wordBreak: 'break-word' }}>{ingredient.ingredient}</h1>
                  <h1 className='max-w-fit' style={{ wordBreak: 'break-word' }}>{ingredient.amount}</h1>
                  <h1 className='max-w-fit' style={{ wordBreak: 'break-word' }}>{ingredient.unit}</h1>
                  <h1 className='text-red-500 text-xl font-bold cursor-pointer' onClick={() => deleteItemFromIngredient(ingredient.ingredient)}>X</h1>
                </div>
              ))
            }
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-10 w-full lg:w-1/2 max-w-full lg:max-w-[50%]'>
          <div className='flex flex-col items-center lg:items-start w-full gap-3'>
            <label className="text-4xl font-semibold w-full md:w-auto text-center md:text-left">
              Nationality
            </label>
            <select
              id="nationality"
              className="p-3 text-xl active:outline-none focus:outline-none shadow-xl w-full rounded-md border-b border-b-gray-600"
              onChange={e => setNationality(e.target.value)}
            >
              <option value="" disabled selected>
                Choose your nationality
              </option>
              {countries?.map((country, index) => (
                <option
                  key={index}
                  value={country.name.common}
                >
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col items-center lg:items-start w-full gap-3'>
            <Input label="Picture" placeholder="Enter the picture url" type="text" ownStyle="w-full" onChangeHandler={e => setPicture(e.target.value)} />
          </div>
          <div className='flex flex-col lg:flex-row items-center lg:items-start w-full gap-3'>
            <div className='flex flex-col items-center lg:items-start w-full gap-3'>
              <label className="text-4xl font-semibold w-full md:w-auto text-center md:text-left">
                Difficulity
              </label>
              <select
                id="nationality"
                className="p-3 text-xl active:outline-none focus:outline-none shadow-xl w-full rounded-md border-b border-b-gray-600"
                onChange={e => setDifficulity(e.target.value)}
              >
                <option value="" disabled selected>
                  Choose the difficulity
                </option>
                <option value="SEasy">
                  Super easy
                </option>
                <option value="Easy">
                  Easy
                </option>
                <option value="Medium">
                  Medium
                </option>
                <option value="Hard">
                  Hard
                </option>
              </select>
            </div>
            <div className='flex flex-col items-center lg:items-start w-full gap-3'>
              <label className="text-4xl font-semibold w-full md:w-auto text-center md:text-left">
                Type
              </label>
              <select
                id="nationality"
                className="p-3 text-xl active:outline-none focus:outline-none shadow-xl w-full rounded-md border-b border-b-gray-600"
                onChange={e => setType(e.target.value)}
              >
                <option value="" disabled selected>
                  Choose the type
                </option>
                <option value="Breakfast">
                  Breakfast
                </option>
                <option value="Lunch">
                  Lunch
                </option>
                <option value="Dinner">
                  Dinner
                </option>
                <option value="Dessert">
                  Dessert
                </option>
              </select>
            </div>
          </div>
          <div className='w-full flex-col items-center justify-center gap-8 flex lg:hidden'>
            <h1 className='text-4xl font-semibold w-full md:w-auto text-center lg:text-left'>Ingredients</h1>
            <div className='grid grid-cols-3 w-full gap-3 lg:gap-10 max-w-full'>
              <div className='flex flex-col items-center justify-center'>
                <label>Ingredient</label>
                <input ref={ingredientRefMobile} className='mt-1 p-2 w-full rounded-md border border-gray-300 placeholder:text-xs ' type="text" placeholder="Enter the ingredient" />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label>Amount</label>
                <input ref={amountRefMobile} className='mt-1 p-2 w-full rounded-md border border-gray-300 placeholder:text-xs' type="text" placeholder="Enter the ingredient" />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label>Unit</label>
                <input ref={unitRefMobile} className='mt-1 p-2 w-full rounded-md border border-gray-300 placeholder:text-xs' type="text" placeholder="Enter the ingredient" />
              </div>
            </div>
            <button onClick={addIngredientHandlerMobile} className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300'>Add ingredient</button>
            <div className='grid grid-cols-4 w-full text-center'>
              <h1>Ingredient</h1>
              <h1>Amount</h1>
              <h1>Unit</h1>
              <h1 className='text-red-500 text-lg font-bold' onClick={() => setIngredients([])}>X</h1>
            </div>
            {
              ingredients?.map((ingredient, index) => (
                <div key={index} className={`grid grid-cols-4 w-full gap-4 text-center ${index % 2 !== 0 ? "bg-gray-200 shadow-lg rounded-lg py-4" : ""}`}>
                  <h1 className='max-w-fit' style={{ wordBreak: 'break-word' }}>{ingredient.ingredient}</h1>
                  <h1 className='max-w-fit' style={{ wordBreak: 'break-word' }}>{ingredient.amount}</h1>
                  <h1 className='max-w-fit' style={{ wordBreak: 'break-word' }}>{ingredient.unit}</h1>
                  <h1 className='text-red-500 text-xl font-bold cursor-pointer' onClick={() => deleteItemFromIngredient(ingredient.ingredient)}>X</h1>
                </div>
              ))
            }
          </div>
          <div className='w-full flex flex-col items-center justify-center gap-8'>
            <h1 className='text-4xl font-semibold w-full md:w-auto text-center lg:text-left'>Steps</h1>
            <div className='grid grid-cols-1 items-center w-full gap-10 max-w-full'>
              <div className='flex flex-col items-center justify-center'>
                <label>Step</label>
                <input ref={stepRef} className='mt-1 p-2 w-full rounded-md border border-gray-300' type="text" placeholder="Enter a step" />
              </div>
            </div>
            <button onClick={addStep} className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300'>Add step</button>
            <div className='flex flex-row items-center justify-between min-w-fit px-2 max-w-full gap-2 w-full'>
              <h1 className={`w-11/12 flex flex-col items-start max-w-fit justify-cente text-left px-4 lg:px-14`}>Steps</h1>
              <h1 className='w-1/12 text-red-500 text-lg font-bold cursor-pointer text-center'>X</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 w-full text-center mb-10'>
              {
                steps?.map((step, index) => (
                  <div key={index} className={`flex flex-row items-center justify-between min-w-fit px-2 max-w-full gap-2 w-full ${index % 2 !== 0 ? "bg-gray-200 shadow-lg rounded-lg py-4" : ""}`}>
                    <div
                      key={index}
                      className={`w-11/12 flex flex-col items-start max-w-fit justify-cente text-left px-4 lg:px-14`}
                      style={{ wordBreak: 'break-word' }} // Add this style
                    >
                      {index + 1}. {step}
                    </div>
                    <div className='w-1/12 text-red-500 text-lg font-bold cursor-pointer' onClick={() => deleteItemFromSteps(step)}>
                      X
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadForm