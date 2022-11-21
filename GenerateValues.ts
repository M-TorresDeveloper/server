interface IGenerateValues{
  time: Date;
  values: {
    id: number;
    value: number;
  }[];
}
class GenerateValues {
  time:Date;

  constructor() {
    this.time = new Date();
  }

  randomNumberInterval(a:number, b:number) {
    return Math.random() * (b - a + 1) + a;
  }
  generateHumidity() {
    return this.randomNumberInterval(60, 99);
  }

  generateTemperature() {
    return this.randomNumberInterval(80, 99);
  }

  generateValues():IGenerateValues {
    const sensors = {
      time: new Date(),
      values: [
        {
          id: 1,
          value: this.generateTemperature(),
        },
        {
          id: 2,
          value: this.generateHumidity(),
        },
      ],
    };
    return sensors;
  }
}
let singleton:GenerateValues;

export const GenerateValuesController = ():GenerateValues=>{
  if(!singleton){
    singleton = new GenerateValues();
  }
  return singleton
}