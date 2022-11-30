import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { DateInputDTO, ShowInputDTO } from "../model/Show";

export class ShowController {
  async create(req: Request, res: Response) {
    try {
      const input: ShowInputDTO = {
        week_day: req.body.weekDay,
        start_time: req.body.startTime,
        end_time: req.body.endTime,
        band_id: req.body.bandId
      }

      const showBusiness = new ShowBusiness();
      await showBusiness.createShow(input);

      res.status(201).send({message: "Show criado com sucesso!"})

    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
  
  async get(req: Request, res: Response) {
    try {
      const input: DateInputDTO = {
        week_day: req.query.weekDay as string
      }

      const showBusiness = new ShowBusiness();
      const shows = await showBusiness.getShow(input);

      res.status(201).send({shows})
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}