import { BandDatabase } from "../data/BandDatabase";
import { BaseError, Unauthorized } from "../error/BaseError";
import { BandInputDTO } from "../model/Band";
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

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const bandDatabase = new BandDatabase();
      await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

    } catch (error: any) {
      throw new BaseError(400, error.message);
    };
  };
};