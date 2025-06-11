import { expect, vi } from "vitest";
import { Request, Response } from "express";
import connection from "../../src/utils/db";
import { getAllServices } from "../../src/controllers/serviceController";

vi.mock("../../src/utils/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getAllServices", () => {
  it("returns 200 with a list of services", async () => {
    //Arrange test - get data ready
    const req = {} as Request;
    const json = vi.fn();
    const res = { json, status: vi.fn(() => res) } as unknown as Response;

    const mockServices = [{ id: 1, name: "Auth" }];

    (connection.query as any).mockResolvedValue([mockServices]);

    //Act - call function being tested
    await getAllServices(req, res);

    //Assert - check the result is correct
    expect(res.status).not.toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith(mockServices);
  });

  it("returns 404 if no services are found", async () => {
    const req = {} as Request;
    const json = vi.fn();
    const res = { json, status: vi.fn(() => res) } as unknown as Response;

    (connection.query as any).mockResolvedValue([]);

    await getAllServices(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: "No services listed in DB" });
  });
});
