import { container } from "tsyringe";
import MailService from "./MailService";

container.registerSingleton<MailService>("MailService", MailService);
