import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const Crop = () => {
  const [load, setLoad] = useState(false);
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [rain, setRain] = useState("");
  const [prediction, setPrediction] = useState("");
  const [model, setModel] = useState(null);

  // Load the TensorFlow.js model
  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel('./model_XG.json'); // Fixed URL
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading the model:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
    loadModel();
  }, []);


  const handleGetRecommendation = async () => {
    // Check if the model is loaded
    if (!model) {
      console.error("Model not loaded!");
      return;
    }

    // Perform prediction
    const input = tf.tensor2d([[nitrogen, phosphorus, potassium, ph, rain]]);
    const prediction = model.predict(input);
    const predictionArray = await prediction.array();
    const predictedCropIndex = predictionArray[0].indexOf(Math.max(...predictionArray[0]));
    const crops = ["rice", "wheat", "maize", "mungbean", "tea", "millet", "mothbeans", "cotton", "lentil", "jute", "coffee", "banana", "grapes", "apple", "mango", "muskmelon", "orange", "papaya", "pomegranate", "watermelon"];
    const predictedCrop = crops[predictedCropIndex];
    setPrediction(predictedCrop);
  };

  return (
    <>
      <Header />
      <section className="">
        <div className="grid place-items-center my-14  ">
          <div className="container bg-gray-100 p-10 grid place-items-center mt-14  ">
            <p className="text-2xl font-medium text-green-600 my-12">
              Predict the best crop to plant
              <br />
            </p>
            <input
              onChange={(e) => {
                setNitrogen(e.target.value);
              }}
              className="w-3/5 my-2 required"
              type="text"
              placeholder="Enter the value of nitrogen"
            />
            <input
              onChange={(e) => {
                setPhosphorus(e.target.value);
              }}
              className="w-3/5 my-2 required"
              type="text"
              placeholder="Enter the value of Phosphorus"
            />
            <input
              onChange={(e) => {
                setPotassium(e.target.value);
              }}
              className="w-3/5 my-2 required"
              type="text"
              placeholder="Enter the value of Potassium"
            />
            <input
              onChange={(e) => {
                setPh(e.target.value);
              }}
              className="w-3/5 my-2 required"
              type="text"
              placeholder="Enter the soil ph value (0-14)"
            />
            <input
              onChange={(e) => {
                setRain(e.target.value);
              }}
              className="w-3/5 my-2 required"
              type="text"
              placeholder="Enter the rainfall gauge (in mm)"
            />

            <div className="grid place-items-center mt-14 ">
              <div className="mt-2">
                <button
                  onClick={handleGetRecommendation}
                  type="button"
                  className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Get Crop Recommendation
                </button>
              </div>
            </div>
            {prediction && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">Predicted Crop: {prediction}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Crop;
