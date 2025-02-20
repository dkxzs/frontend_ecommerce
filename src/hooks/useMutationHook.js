import { useMutation } from "@tanstack/react-query";

const useMutationHook = (mutationFn, options = {}) => {
  const mutation = useMutation({
    mutationFn: mutationFn,
    ...options,
  });
  return mutation;
};

export { useMutationHook };
