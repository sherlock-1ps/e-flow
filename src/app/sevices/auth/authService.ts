import Axios from "@/libs/axios/axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const checkJwt = async ({ token }: { token: string }) => {
  try {
    // const response = await Axios.post("/config/credential/provider");
    const validToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiZmI1OWEzNmM4N2E2NzY0MmVkNTM3ZWRlZjNjYTI0MTU1ZWJlY2U3Yjk3OWU5NGYzZjZjN2ZhOTlkZDZmYmY0ZTdlMjIwYzM4NjQ5NWMwNzYiLCJpYXQiOjE3NDg4NDIzNjIuMDEzNTkyLCJuYmYiOjE3NDg4NDIzNjIuMDEzNTk1LCJleHAiOjE3ODAzNzgzNjEuOTk5Njc3LCJzdWIiOiI1MTUyMiIsInNjb3BlcyI6W119.WdbbRyLxSpiEOB1-lLQjzmcj8vywTFsGdQ8jTIsBUA6Yzq_SlqAkk0lPFPfKRp-_fvOPGnPuJz0uJlO-yAyvGojREXDPPq8NNkZ5fYUJnDgNzANV8ggnK8Zq2AqqkY6xC6N5j2uG0LU4ecy6tud7ZyrCFnX-j0IRqQrS4oc94MlFB57m703f8ozjIO5xfzTQvjOsBfFxv9jAAvsy6w8tAKyBlbYkF4I9xlebeqD_mDxJr301tnPc-jQ9Ql_LZlFLYPiSJ3CYwxQ127sZR7qWylkHMG076HyxKcJ0rvksC-yYX-cAKT1aZWVfBcECLSu24DY5zt3QKlsLXvqDXmp_nz06B15DBRh8wk_wIOoFMHnRMX9-KjprDYJz9L4jsNY3y49ExJzudpgLVjWmks3YuV3mOpJ3eKTpi38eWiVdfVaVtqWlQ9etqrconOIW3se8IBEovX8NODnMpKTeDnJxoh3NK0nS4G-Nllg6jplV5QH6PAlhJk2h4Cw24lAbacqCCJl6g_M1i2jmBJrL-sJ8Rkgf_uAIxMcre42ZdFvxg2M_YSmzslJ5FHkpGlbQfqwcZi9id6uWPZIQsPtHfb2bbOQkuDK9ZIpMQAUS0tSbc2S3LIBkK-rYe3FeH9MDMwQO16SZjZyd5ahc2GLOZzow9Qw5e2EN7HTU-8ymg9ixtfw"

    if (token !== validToken) {
      console.warn("Invalid token:", token)
      throw new Error("Invalid JWT token")
    }

    return {
      "code": "SUCCESS",
      "result": {
        "total": 0,
        "data": {
          "accessToken": token,
          "refreshToken": "8cd80f89-1852-418d-bc48-2d465765db3e"
        },
        "error": "",
        "code": ""
      }
    }


  } catch (error) {
    console.error("Error auth jwt:", error);

    const e = axiosErrorHandler(error, '/config/')
    throw e;

  }

};

