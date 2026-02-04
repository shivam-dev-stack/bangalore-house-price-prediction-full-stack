import { useState } from "react";
import axios from "axios";

function App() {
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("");
  const [bath, setBath] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/predict", {
        sqft: Number(sqft),
        bhk: Number(bhk),
        bath: Number(bath),
        location: location,
      });

      setPrice(res.data.predicted_price_lakh);
    } catch (err) {
      alert("Prediction failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "absolute", top: "20%", left: "45%", right:"20%", bottom:"30%"}}>
      <h2>Bangalore House Price</h2>

      <input placeholder="Sqft" value={sqft} onChange={e=>setSqft(e.target.value)} /><br/><br/>
      <input placeholder="BHK" value={bhk} onChange={e=>setBhk(e.target.value)} /><br/><br/>
      <input placeholder="Bath" value={bath} onChange={e=>setBath(e.target.value)} /><br/><br/>
      <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} /><br/><br/>

      <button onClick={predict}>
        {loading ? "Predicting..." : "Predict"}
      </button>

      {price && (
        <h3>Estimated Price: ₹ {price} Lakhs</h3>
      )}
    </div>
  );
}

export default App;
