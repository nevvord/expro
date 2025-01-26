import { useLogger } from "./utils/logger";

const logger = useLogger({ name: "main" });

logger.error({ message: "Hello, world! 123321" });
