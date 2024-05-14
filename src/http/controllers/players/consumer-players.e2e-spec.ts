import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Consumer Players (e2e)", () => {
  async function delay(milliseconds: number) {
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  let token: string;
  beforeAll(async () => {
    await app.ready();
    const data = await createAndAuthenticateUser(app);
    token = data.token;

    await request(app.server)
      .get("/consumer/leagues")
      .set("Authorization", `Bearer ${token}`)
      .send();

    await request(app.server)
      .get("/consumer/teams")
      .set("Authorization", `Bearer ${token}`)
      .send();

    await delay(1000);
  });

  afterAll(async () => {
    await app.close();
  });

  it.only("should be able to consumer players", async () => {
    const response = await request(app.server)
      .get("/consumer/players")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);

    await delay(1000);
    const players = await prisma.player.findMany();
    expect(players.length).toBeGreaterThan(0);
  });
});
