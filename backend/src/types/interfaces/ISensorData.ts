export interface ISensorData{
    date: Date;
    time: string;
    temp_C: number;
    hum: number;
    press_Bar: number;
    tempCabine_C: number;
    charge: number;
    SR_Wm2: number;
    WindPeak_ms: number;
    WindSpeed_Inst: number;
    WindSpeed_Avg: number;
    WindDir_Inst: number;
    WindDir_Avg: number;
}