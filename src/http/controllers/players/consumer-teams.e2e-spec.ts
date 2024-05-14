import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Consumer Teams (e2e)", () => {
  async function delay(milliseconds: number) {
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to consumer teams", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .get("/consumer/teams")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);

    await delay(1000);
    const teams = await prisma.team.findMany();
    expect(teams.length).toBeGreaterThan(0);
  });
});
