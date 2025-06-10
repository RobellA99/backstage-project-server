import { Request, Response } from "express";
import connection from "../utils/db";
import { Service } from "../types";

//Get all
const getAllServices = async (_req: Request, res: Response) => {
  const sql = "SELECT * FROM services";

  try {
    const [services] = await connection.query(sql);

    if (!services) {
      return res.status(404).json({ message: "No services listed in DB" });
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//Get one
const getServiceById = async (req: Request, res: Response) => {
  const serviceId = req.params.id;
  const sql = "SELECT * FROM services WHERE id = ?";
  try {
    const [results] = await connection.query<Service[]>(sql, [serviceId]);

    const service = results[0];
    if (!service) {
      return res
        .status(404)
        .json({ message: `Service with id ${serviceId} not found` });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { getAllServices, getServiceById };
