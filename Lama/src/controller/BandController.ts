import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";

export class BandController {
  async createBand(req: Request, res: Response) {
    try {
      const input: BandInputDTO = {
        name: req.body.name,
        music_genre: req.body.music_genre,
        responsible: req.body.responsible
      }
      const token = req.headers.authorization as string

      const bandBusiness = new BandBusiness();
      await bandBusiness.createBand(input, token)

      res.status(201).send({ message: "Banda registrada com sucesso!" });

    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}