import { Response } from "express";
import { vi } from "vitest";

export const createMockResponse = () => {
  const json = vi.fn();
  const status = vi.fn(() => res);
  const res = {
    json,
    status,
  } as unknown as Response;

  return { res, json, status };
};
