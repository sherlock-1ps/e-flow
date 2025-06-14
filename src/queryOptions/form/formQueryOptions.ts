/* eslint-disable react-hooks/rules-of-hooks */

import { changeRoleAccount, createOperator, fetchAccount, searchAccount, updateStatusAccount } from '@/app/sevices/account/account';
import { changeNameFolder, changeNameImage, createApi, createFlow, createFolder, createForm, createNewVersionForm, createVariable, deleteApi, deleteFlow, deleteFolder, deleteForm, deleteMedia, deleteUploadFile, deleteVariable, editVariable, fetchApi, fetchFlow, fetchForm, fetchFormName, fetchMedia, fetchVariable, getDepartmentList, getFlow, getForm, getPersonList, getPositionList, getUploadFile, updateApi, updateDateFlow, updateDateForm, updateFile, updateFlow, updateForm, updateVersion, uploadFile, uploadMedia } from '@/app/sevices/form/formServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'



export function useFetchFormQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["form"],
    queryFn: () => fetchForm({ page, pageSize }),
  });
}

export const useGetFormQueryOption = () => {

  return useMutation({
    mutationFn: getForm,
    onError: (error) => {
      console.error("Error get form:", error);
    },


  });
};

export const useUpdateDateFormFormQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDateForm,
    onError: (error) => {
      console.error("Error update date form:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["form"] });
    },


  });
};

export const useCreateNewVersionFormQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewVersionForm,
    onError: (error) => {
      console.error("Error create new version form:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["form"] });
    },


  });
};

export const useCreateFormQueryOption = () => {

  return useMutation({
    mutationFn: createForm,
    onError: (error) => {
      console.error("Error create form:", error);
    },

  });
};

export const useUpdateFormQueryOption = () => {

  return useMutation({
    mutationFn: updateForm,
    onError: (error) => {
      console.error("Error update form:", error);
    },

  });
};




export function useFetchVariableQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["variable", page, pageSize],
    queryFn: () => fetchVariable({ page, pageSize }),
  });
}


export const useCreateVariableQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVariable,
    onError: (error) => {
      console.error("Error create variable:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["variable"] });
    },

  });
};

export const useEditVariableQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editVariable,
    onError: (error) => {
      console.error("Error edit variable:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["variable"] });
    },

  });
};

export const useDeleteVariableQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVariable,
    onError: (error) => {
      console.error("Error delete variable:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["variable"] });
    },

  });
};



export function useFetchMediaQueryOption(id: number | null) {
  return useQuery({
    queryKey: ["media", id],
    queryFn: () => fetchMedia({ id }),
  });
}

export const useCreateFolderMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onError: (error) => {
      console.error("Error create folder media:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },

  });
};

export const useChangeNameFolderMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeNameFolder,
    onError: (error) => {
      console.error("Error change name folder:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },

  });
};


export const useDeleteFolderMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onError: (error) => {
      console.error("Error delete folder media:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },

  });
};

export const useUploadImageMediaQueryOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadMedia,
    onError: (error) => {
      console.error('Error upload media:', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] })
    }
  })
}

export const useChangeNameImageMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeNameImage,
    onError: (error) => {
      console.error("Error change name image:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },

  });
};

export const useDeleteImageMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedia,
    onError: (error) => {
      console.error("Error delete image media:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },

  });
};


export function useFetchApiQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["api", page, pageSize],
    queryFn: () => fetchApi({ page, pageSize }),
  });
}

export const useCreateApiMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApi,
    onError: (error) => {
      console.error("Error create api:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["api"] });
    },

  });
};

export const useUpdateApiMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApi,
    onError: (error) => {
      console.error("Error update api:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["api"] });
    },

  });
};



export const useDeleteApiMediaQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApi,
    onError: (error) => {
      console.error("Error delete api:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["api"] });
    },

  });
};



export function useFetchUploadFileQueryOption(form_data_id: number) {
  return useQuery({
    queryKey: ["uploadFile"],
    queryFn: () => getUploadFile({ form_data_id }),
  });
}


export const useUploadFileQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onError: (error) => {
      console.error("Error upload file:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadFile"] });
    },

  });
};

export const useUpdateFileQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFile,
    onError: (error) => {
      console.error("Error update file:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadFile"] });
    },

  });
};

export const useDeleteFileQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUploadFile,
    onError: (error) => {
      console.error("Error delete file:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadFile"] });
    },

  });
};


export function useFetchFlowQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["flow"],
    queryFn: () => fetchFlow({ page, pageSize }),
  });
}

export const useDeleteFlowQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFlow,
    onError: (error) => {
      console.error("Error delete flow:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["flow"] });
    },

  });
};

export const useUpdateDateFlowQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDateFlow,
    onError: (error) => {
      console.error("Error update date flow:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["flow"] });
    },


  });
};

export const useCreateFlowQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFlow,
    onError: (error) => {
      console.error("Error create flow:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["flow"] });
    },
  });
};

export const useUpdateFlowQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFlow,
    onError: (error) => {
      console.error("Error update flow:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["flow"] });
    },


  });
};

export const useUpdateVersionFlowQueryOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVersion,
    onError: (error) => {
      console.error("Error update version flow:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["flow"] });
    },


  });
};



export const useGetFlowQueryOption = () => {

  return useMutation({
    mutationFn: getFlow,
    onError: (error) => {
      console.error("Error get flow:", error);
    },
  });
};


export function useGetPersonExternalQueryOption(page: number, pageSize: number, f_person_id: string, f_name: string, options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["person", page, pageSize],
    queryFn: () => getPersonList({ page, pageSize, f_person_id, f_name }),
    ...options

  });
}


export function useGetPositionExternalQueryOption(
  page: number,
  pageSize: number,
  f_position_id: string,
  f_position_name: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ['position', page, pageSize, f_position_id, f_position_name],
    queryFn: () => getPositionList({ page, pageSize, f_position_id, f_position_name }),
    ...options
  })
}


export function useGetDepartmentExternalQueryOption(page: number, pageSize: number, f_dept_id: string, department_name: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["department", page, pageSize],
    queryFn: () => getDepartmentList({ page, pageSize, f_dept_id, department_name }),
    ...options

  });
}

export function useFetchFormFlowQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["formFlow"],
    queryFn: () => fetchFormName({ page, pageSize }),
  });
}








