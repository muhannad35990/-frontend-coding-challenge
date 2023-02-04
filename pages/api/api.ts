import { promises as fs } from "fs";
import path from "path";

const ABSENCES_PATH = path.join(process.cwd(), "pages/api/json_files", "absences.json");
const MEMBERS_PATH = path.join(process.cwd(), "pages/api/json_files", "members.json");

const readJsonFile = async (path: string) => {
  const file = await fs.readFile(path, "utf8");
  return JSON.parse(file).payload;
};

export const members = () => readJsonFile(MEMBERS_PATH);
export const absences = () => readJsonFile(ABSENCES_PATH);
