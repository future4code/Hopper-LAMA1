import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { BandNotFound, BaseError, EmptyFields, InvalidDate, ShowAlreadyExists, ShowsNotFound, UnavailableTime } from "../error/BaseError";
import { DateInputDTO, ShowInputDTO } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  async createShow(input: ShowInputDTO) {
    try {
      if(!input.band_id || !input.end_time || !input.start_time || !input.week_day){
        throw new EmptyFields()
      }
      const bandDatabase = new BandDatabase();
      const band = await bandDatabase.getBandById(input.band_id)

      if(!band){
        throw new BandNotFound()
      }
      if(input.week_day !== "Sexta" && input.week_day !== "Sabado" && input.week_day !== "Domingo"){
        throw new InvalidDate()
      }
      if(input.start_time < 8 || input.start_time > 22){
        throw new UnavailableTime()
      }
      if(input.end_time <= input.start_time || input.end_time > 23){
        throw new UnavailableTime()
      }

      const showDatabase = new ShowDatabase();
      const showExists = await showDatabase.getShow(input.week_day, input.start_time, input.end_time)

      if(showExists.length > 0) {
        throw new ShowAlreadyExists();
      }

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
      
      await showDatabase.createShow(id, input.week_day, input.start_time, input.end_time, input.band_id)

    } catch (error: any) {
      throw new BaseError(400, error.message);
    }
  }
  
  async getShow (input: DateInputDTO) {
    try {
      if(!input.week_day) {
        throw new EmptyFields();
      }
      
      const showDatabase = new ShowDatabase();
      const shows = await showDatabase.getShowByWeekDay(input.week_day)

      if(shows.length === 0) {
        throw new ShowsNotFound();
      }
      
      return shows
    } catch (error: any) {
      throw new BaseError(400, error.message);
    }
  }
}
