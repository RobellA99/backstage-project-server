import { Request, Response } from "express";
import connection from "../utils/db";
import { Docs } from "../types";
import { RowDataPacket } from "mysql2";
import { validateCreateDocForm } from "../utils/helper";

type DocRow = Docs & RowDataPacket;

const getDocSlugs = async (
  _req: Request,
  res: Response
): Promise<Response | void> => {
  const sql = "SELECT * FROM docs";

  try {
    const [docs] = await connection.query(sql);

    if (!docs) {
      return res.status(404).json({ message: "No docs listed in DB" });
    }

    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
};

const getDocBySlug = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const slug = req.params.slug;
  const sql = "SELECT * FROM docs WHERE slug = ?";

  try {
    const [results] = await connection.query<DocRow[]>(sql, [slug]);

    const doc = results[0];
    if (!doc) {
      return res
        .status(404)
        .json({ message: `Doc with slug ${slug} not found` });
    }

    res.json({
      slug: doc.slug,
      content: doc.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
};

const createDoc = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const formData = req.body;
  const sql = "INSERT INTO docs SET ?";

  const validationResult = validateCreateDocForm(formData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const [results] = await connection.query(sql, [formData]);
    res.status(201).json({ message: "Doc Created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create doc" });
  }
};

export { getDocSlugs, getDocBySlug };
