import { Get, Route } from "tsoa";

interface HealthResponse {
  message: string;
  date: Date;
}

@Route("health")
export default class HealthController {
  @Get("/")
  public async getMessage(): Promise<HealthResponse> {
    return {
      message: "ok",
      date: new Date(),
    };
  }
}
