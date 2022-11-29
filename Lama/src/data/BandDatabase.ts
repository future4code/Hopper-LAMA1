import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
  private static TABLE_NAME = "BANDS";

  public async createBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandByName(name: string) {
    try {
      const result = await this.getConnection()
        .select()
        .where("name", "like", `%${name}%`)
        .into(BandDatabase.TABLE_NAME)
        
      return result
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBandById(id: string) {
    try {
      const result = await this.getConnection()
      .select()
      .where({id})
      .into(BandDatabase.TABLE_NAME)

      return result
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}