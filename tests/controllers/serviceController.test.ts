import { expect, vi } from "vitest";
import { Request, Response } from "express";
import connection from "../../src/utils/db";
import {
  createService,
  getAllServices,
} from "../../src/controllers/serviceController";
import { createMockResponse } from "../mocks/express";
import { validateCreateServiceForm } from "../../src/utils/helper";

vi.mock("../../src/utils/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

vi.mock("../../src/utils/helper", () => ({
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

describe("createService", () => {
  it("return 201 when a service is successfully created", async () => {
    const req = {
      body: {
        name: "Test Service",
        owner: "Robell",
        status: "available",
        repo_url: "https://github.com/RobellA99/test",
        docs_slug: "test-service",
      },
    } as Request;

    const { res, json, status } = createMockResponse();

    (validateCreateServiceForm as any)
      .mockReturnValue({ success: true })
      (connection.query as any)
      .mockResolvedValue([{ InsertId: 1 }]);

    await createService(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith("Service Created");
  });

  it("returns 400 if validation fails", async () => {
    const req = {
      body: {},
    } as Request;

    const { res, json, status } = createMockResponse();

    (validateCreateServiceForm as any).mockReturnValue({
      success: false,
      error: "Missing fields",
    });

    await createService(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ error: "Missing fields" });
  });
});
