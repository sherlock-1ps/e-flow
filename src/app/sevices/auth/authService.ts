import Axios from "@/libs/axios/axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const checkJwt = async ({ token }: { token: string }) => {
  try {
    // const response = await Axios.post("/config/credential/provider");
    const validToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiM2E0NGM5YjhiMDBiZWNiYjA5OTI2MDA3MWMxNjI2NDFjNzMwN2E0ZjVhMDQxY2I2YjlhMzI2NDU3ZTk0OWI2ZjYzZmZiMTk1YjE3MjNhZTQiLCJpYXQiOjE3NDkwMTY5MDguNjQyMzY0LCJuYmYiOjE3NDkwMTY5MDguNjQyMzY3LCJleHAiOjE3ODA1NTI5MDguNjMxODU0LCJzdWIiOiI1MTUyMiIsInNjb3BlcyI6W119.LK2NR70o0ofqNoNHXPI6FNGDavXij6KNrDsnTQ_1xZOart2U_BXioqmih-I8IQBSwG9AVHBXfcjYh3pgqtCz4Y_aFG3GmQFxVsZ0oFzXHLQ3iOO1372MeVpOLdcsaGQSUweq4g4nkEP8wzu8Obl4NIxby1QZhSiPxGAVsCT0-ICNAAZIDiqmQKJCul1IihWNLMd2l28nG3TqC3m_wF70LSO_J7Of8HuPG863nV5Hf2CR0g9Fd6ewjqpt28x96_e6tRx-BbCO3gRhEqr1K6c5R4ZDjqX7ra1mDQ9SOBWDaP99qNLV_U-dkLG-z4CDB3UKm8JUbf56-KRuCQwR-jKnsl0grDJ8Yq6tWn7aZ6n2y-12GWpm1CN8YSBDLfcPI6U3sU2DwOeg9ZvC-V6mZkzU8RO1whPh92E2dtFwkKgmvhRbx8cqhIezt3x6sym8mQVvedrApZkaCRgIYlyNSr3NsIR8yjay9IKWQTwQrzMycArfOc7q96uQ_NfzOCipriEBKviWVNhUsH1ogIddoPwjoNlHauKd9cbnXTBoJbAsvnDWUPy7XCAmE1j97skLoc4yUKGIM9oSuF7C-G80-AOBtvtVbjhlCVW2qWHi0mg_9bT9V-BXilj3HBvzKXccNgiimxSBLetyFZUnJA6rs90uE9eE06HkPXTQs_2nNAkQg00"

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

