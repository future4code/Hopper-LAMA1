import { BandDatabase } from "../data/BandDatabase";
import { BaseError, EmptyFields, Unauthorized } from "../error/BaseError";
import { BandInputDTO, BandInputInfoDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
  async createBand(band: BandInputDTO, token: string) {
    try {
      const authenticator = new Authenticator();
      const tokenInfo = authenticator.getData(token);

      if(tokenInfo.role !== "ADMIN") {
        throw new Unauthorized();
      };

      if(!band.name || !band.music_genre || !band.responsible) {
        throw new EmptyFields();
      }

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const bandDatabase = new BandDatabase();
      await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

    } catch (error: any) {
      throw new BaseError(400, error.message);
    };
  };

  async getBand(input: BandInputInfoDTO) {
    try {

      if(!input.id && !input.name) {
        throw new EmptyFields();
      }

      if(input.id) {
        const bandDatabase = new BandDatabase();
        return await bandDatabase.getBandById(input.id)
      }

      if(input.name) {
        const bandDatabase = new BandDatabase();
        return await bandDatabase.getBandByName(input.name)
      }

    } catch (error: any) {
      throw new BaseError(400, error.message);
    };
  }
};