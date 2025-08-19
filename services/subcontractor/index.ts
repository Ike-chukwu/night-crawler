import { axiosInstance } from "@/constants";
import { PaginatedData } from "../user-management/types";
import {
  PaginatedDataInSubContractor,
  PaginatedDataInSubContractorCustomer,
  SubContractor,
  SubContractorByIdRes,
  UserInSubContractor,
} from "./types";
import { ApiResponse } from "../login/types";

export class SubContractorService {
  private static SubContractor_API_BASE = "/subcontractor";

  public static async getAllSubContractors(page: string, limit: string) {
    return axiosInstance.get<
      ApiResponse<PaginatedDataInSubContractor<SubContractor>>
    >(this.SubContractor_API_BASE, { params: { page, limit } });
  }

  public static async getRequests(page: string, limit: string) {
    return axiosInstance.get<
      ApiResponse<PaginatedDataInSubContractor<Request>>
    >(this.SubContractor_API_BASE + "/new_requests", {
      params: { page, limit },
    });
  }

  public static async getSubContractorById(subcontractorId: string) {
    return axiosInstance.get<ApiResponse<SubContractorByIdRes>>(
      this.SubContractor_API_BASE + `/${subcontractorId}/details`
    );
  }

  public static async getSubContractorCustomers(
    subcontractorId: string,
    page: string,
    limit: string
  ) {
    return axiosInstance.get<
      ApiResponse<PaginatedDataInSubContractorCustomer<UserInSubContractor>>
    >(this.SubContractor_API_BASE + `/subcontractor/customers`, {
      params: {
        subcontractorId,
        page,
        limit,
      },
    });
  }

  public static async rejectSubContractor(payload: {
    subId: string;
    reason: string;
  }) {
    return axiosInstance.patch<ApiResponse<any>>(
      this.SubContractor_API_BASE +
        `/reject_subcontractor?subcontructorId=${payload.subId}&rejectionReason=${payload.reason}`
      //   { reason: payload.reason }
    );
  }

  public static async approveSubContractor(subConId: string) {
    return axiosInstance.patch<ApiResponse<any>>(
      this.SubContractor_API_BASE +
        `/approve_subcontractor?subcontructorId=${subConId}`
      //     {
      //     params: {
      //         userId
      //     }
      // }
    );
  }
}
