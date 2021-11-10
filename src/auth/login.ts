import { Application, Request, Response } from 'express'
import { Resource } from 'express-automatic-routes'

export default (router: Application) => <Resource> {
  get: (req: Request, res: Response) => {
    res.render("pages/login");
  }
}