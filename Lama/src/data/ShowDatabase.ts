import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_SHOWS = "SHOWS";
  private static TABLE_BANDS = "BANDS";

  public async createShow(
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          week_day,
          start_time,
          end_time,
          band_id
        })
        .into(ShowDatabase.TABLE_SHOWS);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  
  public async getShow(
    week_day: string,
    start_time: number,
    end_time: number
  ):Promise<Show[]>{
    try {
      const result = await this.getConnection()
        .select()
        .where({week_day})
        .andWhere({start_time})
        .andWhere({end_time})
        .into(ShowDatabase.TABLE_SHOWS);

      return result
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowByWeekDay(
    week_day: string
  ):Promise<Show[]>{
    try {
      const result = await this.getConnection()
        .from(ShowDatabase.TABLE_SHOWS)
        .select(`${ShowDatabase.TABLE_BANDS}.name`, `${ShowDatabase.TABLE_BANDS}.music_genre`)
        .join(`${ShowDatabase.TABLE_BANDS}`, `${ShowDatabase.TABLE_BANDS}.id`, `${ShowDatabase.TABLE_SHOWS}.band_id`)
        .where({week_day})
        .orderBy(`${ShowDatabase.TABLE_SHOWS}.start_time`, "ASC")

      return result
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}