import dotenv from "dotenv";
import Stages from "../helpers/constants/stages";

dotenv.config();

const { PORT, SELF_BASE_URL } = process.env;

const STAGE = process.env.STAGE as Stages;

export { PORT, SELF_BASE_URL, STAGE };
