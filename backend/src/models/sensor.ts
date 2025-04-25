import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  temp_C: {
    type: Number,
    required: true
  },
  hum: {
    type: Number,
    required: true
  },
  press_Bar: {
    type: Number,
    required: true
  },
  tempCabine_C: {
    type: Number,
    required: true
  },
  charge: {
    type: Number,
    required: true
  },
  SR_Wm2: {
    type: Number,
    required: true
  },
  WindPeak_ms: {
    type: Number,
    required: true
  },
  WindSpeed_Inst: {
    type: Number,
    required: true
  },
  WindSpeed_Avg: {
    type: Number,
    required: true
  },
  WindDir_Inst: {
    type: Number,
    required: true
  },
  WindDir_Avg: {
    type: Number,
    required: true
  }
});


const SensorDataModel =  mongoose.model('SensorData', SensorDataSchema);

export default SensorDataModel;
