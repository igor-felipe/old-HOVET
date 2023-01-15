import { PORT } from "./config/env";
import app from "./app";

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
