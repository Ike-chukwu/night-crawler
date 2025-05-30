import { SubContractorService } from "@/services/subcontractor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllSubContractors = (page: string, limit: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => SubContractorService.getAllSubContractors(page, limit),
    queryKey: ["getAllSubContractors", page, limit],
  });

  return {
    subcontractors: data?.data.data.subcontractors,
    page: data?.data.data.page,
    limit: data?.data.data.limit,
    hasNextPage: data?.data.data.hasNextPage,
    total: data?.data.data.total,
    isLoading,
    isError,
    isSuccess,
  };
};
export const useGetRequests = (page: string, limit: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => SubContractorService.getRequests(page, limit),
    queryKey: ["getRequests", page, limit],
  });

  return {
    subContractorsRequests: data?.data.data.subcontractors,
    page: data?.data.data.page,
    limit: data?.data.data.limit,
    hasNextPage: data?.data.data.hasNextPage,
    total: data?.data.data.total,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetCustomersInASubContractor = (
  subcontractorId: string,
  page: string,
  limit: string
) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () =>
      SubContractorService.getSubContractorCustomers(
        subcontractorId,
        page,
        limit
      ),
    queryKey: ["getAllSubContractors", page, limit, subcontractorId],
  });

  return {
    customers: data?.data.data.users,
    subcontractor: data?.data.data.subcontractor,
    page: data?.data.data.page,
    limit: data?.data.data.limit,
    hasNextPage: data?.data.data.hasNextPage,
    total: data?.data.data.total,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetSubContractorById = (subcontractorId: string) => {
  const { data, isLoading } = useQuery({
    queryFn: () => SubContractorService.getSubContractorById(subcontractorId),
    queryKey: ["getSubContractorById", subcontractorId],
  });

  return {
    actualSubcontractor: data?.data.data.subcontractor,
    noOfUsers: data?.data.data.noOfUsers,
    noOfSubscriptions: data?.data.data.noOfSubscriptions,
    isLoading,
  };
};

export const useApproveSubContractor = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (variables: { subId: string }) =>
      SubContractorService.approveSubContractor(variables.subId),
    mutationKey: ["approveSubContractor"],
    onSuccess: (_data, variables) => {
      const {subId} = variables
      queryClient.refetchQueries({ queryKey: ["getAllSubContractors"] });
      queryClient.refetchQueries({
        queryKey: ["getSubContractorById", subId], // ✅ Using subId dynamically
      });
      onSuccess?.();
      //   push("/user-management");
    },
    onError: () => {
      onError?.();
    },
  });
  return {
    approveRequest: mutate,
    isPending,
    isSuccess,
    isError,
  };
};

export const useRejectSubContractor = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (variables: { subId: string; reason: string }) =>
      SubContractorService.rejectSubContractor(variables),
    mutationKey: ["rejectSubContractor"],
    onSuccess: (_data, variables) => {
      const { subId } = variables;
      queryClient.refetchQueries({ queryKey: ["getAllSubContractors"] });
      queryClient.refetchQueries({
        queryKey: ["getSubContractorById", subId], // ✅ Using subId dynamically
      });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  return {
    rejectRequest: mutate,
    isPending,
    isError,
    isSuccess,
  };
};
