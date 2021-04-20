import { IPaginate } from "@shared/types/paginate";
import { ICustomer } from "./ICustomer";

export interface ICustomerPaginate extends IPaginate {
  data: ICustomer[];
}
