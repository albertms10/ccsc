import { message } from "antd";

export default (status: number, description: string): void => {
  if (status >= 200 && status < 300) message.success(description);
  else if (status >= 300 && status < 400) message.info(description);
  else if (status >= 400 && status < 500) message.warn(description);
  else message.error(description);
};
