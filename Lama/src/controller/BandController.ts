import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO, BandInputInfoDTO } from "../model/Band";

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

  async getBand(req: Request, res: Response) {
    try {

      const input: BandInputInfoDTO = {
        id: req.query.id as string,
        name: req.query.name as string
      }

      const bandBusiness = new BandBusiness();
      const band = await bandBusiness.getBand(input)

      console.log(band)

      res.status(200).send({ band });

    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}