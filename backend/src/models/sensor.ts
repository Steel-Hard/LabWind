import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
 reading_time: {
  type: Date,
  required: true
},
temp: {
  type: Number,
  required: true
},
hum: {
  type: Number,
  required: true
},
bar: {
  type: Number,
  required: true
},
cab_temp: {
  type: Number,
  required: true
},
bat_volts: {
  type: Number,
  required: true
},
uv_level: {
  type: Number,
  required: true
},
wind_peak: {
  type: Number,
  required: true
},
wind_rt: {
  type: Number,
  required: true
},
wind_avg: {
  type: Number,
  required: true
},
wind_dir_rt: {
  type: Number,
  required: true
},
wind_dir_avg: {
  type: Number,
  required: true
},
time: {
  type: String,
  required: true
},
estacao: {
  type: String,
  required: true,
  enum: ['A', 'B']
}

});


const SensorDataModel =  mongoose.model('SensorData', SensorDataSchema);

export default SensorDataModel;
