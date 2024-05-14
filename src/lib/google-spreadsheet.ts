import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { env } from "@/env";

export class GoogleSpreadsheetService {
  private doc: GoogleSpreadsheet;

  private client = new JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY,
    scopes: [env.GOOGLE_SCOPE],
  });

  constructor() {
    this.doc = new GoogleSpreadsheet(env.GOOGLE_SPREADSHEET_ID, this.client);
  }

  async createSheet(title: string, headerValues: string[]) {
    await this.doc.addSheet({ title, headerValues });
  }

  async getSheet(title: string) {
    await this.doc.loadInfo();
    return this.doc.sheetsByTitle[title];
  }

  async getRows(title: string) {
    const sheet = await this.getSheet(title);
    return sheet.getRows();
  }

  async addRow(title: string, row: Record<string, string>) {
    const sheet = await this.getSheet(title);
    await sheet.addRow(row);
  }

  async addRows(
    title: string,
    rows: Record<string, string | number | boolean>[],
  ) {
    const sheet = await this.getSheet(title);
    await sheet.addRows(rows);
  }
}
